import React, {useEffect, useRef, useState} from 'react'
import grapesjs, {Editor} from 'grapesjs'
//@ts-ignore
import plugin from 'grapesjs-tailwind'
import CryptoJS from 'crypto-js'
import {Button, Flex} from '@sanity/ui'
import {set} from 'sanity'
import debounce from 'lodash/debounce'

const handleFileChange = async (event: any) => {
  const file = event.target.files[0]
  if (file) {
    // Read the file as an ArrayBuffer
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    // reader.onload = async () => {
    //   // Encrypt the file data
    //   const wordArray = CryptoJS.lib.WordArray.create(reader.result)
    //   const encrypted = CryptoJS.AES.encrypt(wordArray, 'your-secret-key').toString()

    //   // Convert encrypted data to a blob
    //   const encryptedBlob = new Blob([encrypted], {type: file.type})

    //   // Create a File from the Blob
    //   const encryptedFile = new File([encryptedBlob], file.name, {type: file.type})

    //   // Upload the encrypted file to Sanity
    //   const asset = await client.assets.upload('file', encryptedFile, {
    //     filename: file.name,
    //   })

    //   // Add the URL to the GrapesJS editor
    //   const imageUrl = asset.url // You might need to adjust based on your asset handling
    //   editor.AssetManager.add(imageUrl, {name: file.name})
    // }
  }
}

const Grapes: JSX.Element | any = ({
  ref,
  value,
  onChange,
}: {
  ref: any
  value: string
  onChange: any
}) => {
  ref = useRef(null)
  const [editor, setEditor] = useState<null | Editor>(null)
  //   const [encryptedHtml, setEncryptedHtml] = useState('')

  const encryptHtml = (html: string) => CryptoJS.AES.encrypt(html, '').toString()
  const decryptHtml = () => {
    const bytes = CryptoJS.AES.decrypt(value, '')
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  //   useEffect(() => {
  //     const save = async () => onChange(set(encryptedHtml))
  //     save()
  //   }, [encryptedHtml])

  useEffect(() => {
    if (!ref?.current) return
    const editorInstance = grapesjs.init({
      container: ref.current,
      plugins: [plugin],
      pluginsOpts: {[plugin]: {}},
    })

    setEditor(editorInstance)

    editorInstance.Panels.addButton('options', {
      id: 'upload-image',
      className: 'fa fa-upload',
      command: 'upload-image-command',
      attributes: {title: 'Upload Image'},
    })

    editorInstance.onReady(() => {
      editorInstance.addComponents(decryptHtml())
    })

    // editorInstance.on('component:update', handleSave)
    // editorInstance.on('component:remove', handleSave)

    return () => {
      //   editorInstance.off('component:update', () => {})
      //   editorInstance.off('component:remove', () => {})
      editorInstance.destroy()
    }
  }, [ref])

  useEffect(() => {
    if (editor && value) {
      const decryptedContent = decryptHtml()
      editor.setComponents(decryptedContent)
    }
  }, [value])

  const handleSave = debounce(async () => {
    if (!ref?.current) return
    try {
      const html = ref?.current?.getHtml !== undefined ? ref.current.getHtml : editor?.getHtml()
      if (html) {
        const encryptedHtml = encryptHtml(html)
        await onChange(set(encryptedHtml))
      } else null
    } catch (error) {
      console.error('Error in handleSave:', error)
    }
  }, 300)

  return (
    <>
      <div style={{overflow: 'visible', width: '100%'}}>
        <div ref={ref} style={{maxHeight: '700px', height: '500px', width: '100%'}} />
        <Flex gap={2} marginTop={2}>
          <Button onClick={handleSave} text="Save Content" tone="primary" />
        </Flex>
        <input type="file" id="file-input" style={{display: 'none'}} onChange={handleFileChange} />
      </div>
    </>
  )
}

export default Grapes
