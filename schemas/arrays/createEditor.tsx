import './styles.css'
import React, {useState, useEffect, useRef} from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage' // Or any other plugins you need
import 'grapesjs/dist/css/grapes.min.css' // Import GrapesJS styles

import CryptoJS from 'crypto-js'
import {Box, Button, Dialog, Flex} from '@sanity/ui'
import {StringInputProps, set} from 'sanity'

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

const Editor: React.FC<StringInputProps> = ({value, onChange}) => {
  const [fullscreen, setFullscreen] = useState(false)
  let editor: any = null
  const editorRef = useRef(null)

  useEffect(() => {
    editor = grapesjs.init({
      container: editorRef?.current as string | HTMLElement | any,
      plugins: ['grapesjs-preset-webpage'], // Or your preferred plugins
      // Load decrypted content
      components: value ? decryptHtml(value) : '',
    })

    // Add further GrapesJS configuration here for blocks, styling, etc.

    return () => {
      editor.destroy() // Clean up the GrapesJS instance
    }
  }, [value])

  // Handle saving content
  const handleSave = () => {
    const html = editor.getHtml()
    onChange(set(encryptHtml(html))) // Replace with your Sanity save function
  }

  return (
    <>
      <div style={{overflow: 'visible', width: '100%'}}>
        <div ref={editorRef} style={{maxHeight: '400px', width: '100%'}} />
        <Flex gap={2} marginTop={2}>
          <Button text="Open" mode="bleed" onClick={() => setFullscreen(true)} />
          <Button onClick={handleSave} text="Save Content" tone="primary" />
        </Flex>
      </div>
    </>
  )
}

export default Editor
