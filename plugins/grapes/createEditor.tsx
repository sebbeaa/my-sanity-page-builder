//@ts-nocheck
import './styles.css'
import 'grapesjs/dist/css/grapes.min.css'
import { Button, Flex } from '@sanity/ui'
import { set } from 'sanity'
import React, { useEffect, useRef, useState } from 'react'
import grapesjs from 'grapesjs'
import plugin from 'grapesjs-tailwind'
import { useBlocks } from './editor/Blocks'
import { usePanels } from './editor/Panels'
import { decryptHtml, encryptHtml, handleFileChange } from '../crypto/encryption'

// Editor component

// Custom React GrapesJS editor component
const Grapes = ({ value, onChange }) => {
  const ref = useRef(null)
  const [editor, setEditor] = useState(null)
  const handleSave = async () => {
    try {
      if (!editor) return
      const encryptedHtml = encryptHtml(editor.getHtml())
      await onChange(set(encryptedHtml))
    } catch (error) {
      console.error('Error in handleSave:', error)
    }
  }
  useEffect(() => {
    if (!ref) return
    // Initialize GrapesJS
    const editor = grapesjs.init({
      container: ref.current as string | HTMLElement | any,
      plugins: [plugin],
      pluginsOpts: {
        [plugin]: {},
      },
    })

    // Use the blocks and panels
    usePanels(editor)
    useBlocks(editor, document)
    // Load the editor content
    editor.onReady(async () => {
      // Decrypt the content when the editor is loaded
      if (!editor) return
      editor.setComponents(decryptHtml(value))
    })
    // Add the upload image command
    editor.Commands.add('upload-image-command', {
      run: function (editor, sender) {
        sender && sender.set('active', 0) // Turn off the button
        document.querySelector('#file-input').click() // Trigger file input click
      },
    })

    // Add further GrapesJS configuration here for blocks, styling, etc....

    // Set the editor state
    setEditor(editor)

    // Clean up
    return () => {
      editor.off('component:update')
      editor.off('load')

      editor.destroy() // Clean up the GrapesJS instance
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set, value, onChange, ref])

  return (
    <>
      // Editor component
      <div style={{ overflow: 'visible', position: 'absolute', width: '100%', height: '100%' }}>
        <div ref={ref} style={{ maxHeight: '700px', height: '500px', width: '100%' }} />
        <Flex gap={2} marginTop={2}>
          <Button onClick={editor?.getHtml() && handleSave} text="Save Content" tone="primary" />
        </Flex>
        <input
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </>
  )
}

const Editor = React.forwardRef((props, ref) => {
  const { value, onChange } = props
  return <Grapes value={value} onChange={onChange} />
})

export default Editor
