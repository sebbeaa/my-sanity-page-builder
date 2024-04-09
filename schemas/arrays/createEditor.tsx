//@ts-nocheck
import './styles.css'
import React, {useEffect, useRef, useState} from 'react'
import grapesjs from 'grapesjs'
import plugin from 'grapesjs-tailwind'
import 'grapesjs/dist/css/grapes.min.css'
import CryptoJS from 'crypto-js'
import {Button, Flex} from '@sanity/ui'
import {set} from 'sanity'

interface EditorProps {
  value: string
  onChange: (value: any) => void
}

const Editor: React.FC<EditorProps> = ({value, onChange}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<grapesjs.Editor | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      const initEditor = grapesjs.init({
        container: editorRef.current,
        plugins: [plugin],
        pluginsOpts: {
          [plugin]: {},
        },
        components: decryptHtml(value),
      })

      // Save Content Command

      initEditor.Commands.add('upload-image-command', {
        run: function (editor, sender) {
          sender && sender.set('active', false) // Turn off the button
          document.querySelector<HTMLInputElement>('#file-input')?.click() // Trigger file input click
        },
      })

      initEditor.Commands.add('save-command', {
        run: function (editor, sender) {
          sender && sender.set('active', false) // Turn off the button
          const html = editor.getHtml()
          onChange(set(encryptHtml(html))) // Replace with your Sanity save function
        },
      })

      initEditor.Commands.add('preview-command', {
        run: function (editor) {
          editor.runCommand('preview')
        },
      })

      // Adding Buttons to the Panel
      initEditor.Panels.addButton('options', [
        {
          id: 'upload-image',
          className: 'fa fa-upload',
          command: 'upload-image-command',
          attributes: {title: 'Upload Image'},
        },
        {
          id: 'save',
          className: 'fa fa-save',
          command: 'save-command',
          attributes: {title: 'Save Content'},
        },
        {
          id: 'preview',
          className: 'fa fa-eye',
          command: 'preview-command',
          attributes: {title: 'Toggle Preview'},
        },
      ])

      setEditor(initEditor)
    }

    return () => {
      editor?.destroy()
    }
  }, [value])

  // Encrypt and Decrypt functions remain the same
  const secretKey: string | null = process.env.SANITY_PRIVATE_KEY || null

  const encryptHtml = (html: string): string =>
    CryptoJS.AES.encrypt(html, secretKey ?? '').toString()

  const decryptHtml = (encryptedHtml: string): string => {
    if (!encryptedHtml) return ''
    const bytes = CryptoJS.AES.decrypt(encryptedHtml, secretKey ?? '')
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  // File change handler integrates here
  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      // Read the file as an ArrayBuffer
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = async () => {
        // Encrypt the file data
        const wordArray = CryptoJS.lib.WordArray.create(reader.result)
        const encrypted = CryptoJS.AES.encrypt(wordArray, 'your-secret-key').toString()

        // Convert encrypted data to a blob
        const encryptedBlob = new Blob([encrypted], {type: file.type})

        // Create a File from the Blob
        const encryptedFile = new File([encryptedBlob], file.name, {type: file.type})

        // Upload the encrypted file to Sanity
        const asset = await client.assets.upload('file', encryptedFile, {
          filename: file.name,
        })

        // Add the URL to the GrapesJS editor
        const imageUrl = asset.url // You might need to adjust based on your asset handling
        editor.AssetManager.add(imageUrl, {name: file.name})
      }
    }
  }

  return (
    <>
      <div style={{overflow: 'visible', width: '100%'}}>
        <div ref={editorRef} style={{maxHeight: '400px', width: '100%'}} />
        <input type="file" id="file-input" style={{display: 'none'}} onChange={handleFileChange} />
      </div>
    </>
  )
}

export default Editor
