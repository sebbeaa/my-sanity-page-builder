//@ts-nocheck
import './styles.css'
import 'grapesjs/dist/css/grapes.min.css'
import CryptoJS from 'crypto-js'
import {Button, Flex} from '@sanity/ui'
import {set} from 'sanity'
import React, {useEffect, useRef, useState} from 'react'
import grapesjs from 'grapesjs'
import plugin from 'grapesjs-tailwind'
const worker = new Worker(new URL('./cryptoWorker.js', import.meta.url))

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

const secretKey: null | string = process.env.SANITY_PRIVATE_KEY || null

// Encrypt content function (unchanged)
const encryptHtml = (html: string): string =>
  CryptoJS.AES.encrypt(html, typeof secretKey === 'string' ? secretKey : '').toString()

// Decrypt content function (unchanged)
const decryptHtml = (encryptedHtml: string): string => {
  if (!encryptedHtml) return ''
  const bytes = CryptoJS.AES.decrypt(encryptedHtml, typeof secretKey === 'string' ? secretKey : '')
  return bytes.toString(CryptoJS.enc.Utf8)
}

const Editor = React.forwardRef((props, ref) => {
  const {value, onChange} = props

  return <Grapes ref={ref} value={value} onChange={onChange} />
})

const Grapes = ({ref, value, onChange}) => {
  ref = useRef(null)
  const [editor, setEditor] = useState(null)
  const [encryptedHtml, setEncryptedHtml] = useState('')
  const handleSave = async () => {
    try {
      if (!editor) return
      setEncryptedHtml(encryptHtml(editor.getHtml()))
      await onChange(set(encryptedHtml))
    } catch (error) {
      console.error('Error in handleSave:', error)
    }
  }
  useEffect(() => {
    if (!ref) return
    const editor = grapesjs.init({
      container: ref.current as string | HTMLElement | any,
      plugins: [plugin],
      pluginsOpts: {
        [plugin]: {},
      },
      // Load decrypted content
    })

    editor.Panels.addButton('options', [
      {
        id: 'upload-image',
        className: 'fa fa-upload',
        command: 'upload-image-command',
        attributes: {title: 'Upload Image'},
      },
    ])

    editor.onReady(async () => {
      // Decrypt the content when the editor is loaded
      if (!editor) return
      editor.setComponents(decryptHtml(value))
    })

    editor.on('component:update', async (editor) => {
      // worker.postMessage({
      //   action: 'encrypt',
      //   payload: {
      //     html: editor.getHtml(),
      //     secretKey: secretKey || '',
      //   },
      // })

      // worker.onmessage = (event) => {
      //   if (event.data.action === 'encrypted') {
      //     console.log('Encrypted HTML:', event.data.payload)
      //   }
      // }

      editor && value ? handleSave() : null
    })

    editor.BlockManager.add('text-block', {
      label: 'Text',
      content: '<div data-gjs-type="text">Insert your text here</div>',
      category: 'Basic',
    })

    editor.BlockManager.add('section-block', {
      label: 'Section',
      content:
        '<section><h2>This is a simple section</h2><p>And this is a paragraph within the section</p></section>',
      category: 'Basic',
    })

    editor.Commands.add('upload-image-command', {
      run: function (editor, sender) {
        sender && sender.set('active', 0) // Turn off the button
        document.querySelector('#file-input').click() // Trigger file input click
      },
    })

    // Add further GrapesJS configuration here for blocks, styling, etc.
    setEditor(editor)
    return () => {
      editor.off('component:update')
      editor.off('load')

      editor.destroy() // Clean up the GrapesJS instance
    }
  }, [set])

  // Handle saving content

  return (
    <>
      <div style={{overflow: 'visible', width: '100%'}}>
        <div ref={ref} style={{maxHeight: '700px', height: '500px', width: '100%'}} />
        <Flex gap={2} marginTop={2}>
          <Button onClick={editor?.getHtml() && handleSave} text="Save Content" tone="primary" />
        </Flex>
        <input type="file" id="file-input" style={{display: 'none'}} onChange={handleFileChange} />
      </div>
    </>
  )
}

export default Editor
