import './styles.css'
import 'grapesjs/dist/css/grapes.min.css'
import { Button, Flex } from '@sanity/ui'
import { useEffect, useRef, useState } from 'react'
import grapesjs, { Editor } from 'grapesjs'
//@ts-ignore
import plugin from 'grapesjs-tailwind'
import { useBlocks } from './editor/Blocks'
import { usePanels } from './editor/Panels'
import { decryptHtml, encryptHtml, handleFileChange } from '../crypto/encryption'

// Editor component

// Custom React GrapesJS editor component
const Grapes = ({ value, setHtml }: { setHtml: any; value: string }) => {
  const ref = useRef(null)
  const [editor, setEditor] = useState<null | Editor>(null)
  const handleSave = () => {
    if (editor) {
      const html = editor?.getHtml()
      const encryptedHtml = encryptHtml(html)
      setHtml(encryptedHtml)
    }
  }
  useEffect(() => {
    if (!ref) return
    // Initialize GrapesJS
    const editor = grapesjs.init({
      container: ref.current as string | HTMLElement | any,
      fromElement: true,

      plugins: [plugin],
      storageManager: {
        type: 'local',
        autosave: false,
      },
    })

    // Use the blocks and panels
    usePanels(editor)
    useBlocks(editor)
    // Load the editor content
    editor.onReady(async () => {
      // Decrypt the content when the editor is loaded
      if (!editor) return
      editor.setComponents(decryptHtml(value))
    })
    editor.on('component:update', async (editor) => handleSave)
    editor.Commands.add('save', {
      run: function (editor, sender) {
        sender && sender.set('active', 0) // Turn off the button
        handleSave()
      },
    }) // Add the upload image command
    editor.Commands.add('upload-image-command', {
      run: function (editor, sender) {
        sender && sender.set('active', 0) // Turn off the button
        //@ts-ignore
        document?.querySelector('#file-input').click() // Trigger file input click
      },
    })

    // Add further GrapesJS configuration here for blocks, styling, etc....

    editor.on('component:update', async (editor) => {
      editor && value ? handleSave() : null
    })

    setEditor(editor)

    // Clean up
    return () => {
      editor.destroy() // Clean up the GrapesJS instance
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  if (ref)
    return (
      <>
        // Editor component
        <div
          style={{
            overflow: 'visible',
            position: 'absolute',
            top: '-120px',
            width: '100%',
            height: '100%',
          }}
        >
          <div ref={ref} style={{ height: '100%', width: '100vw', margin: '0 auto' }} />
          <Flex gap={2} marginTop={2}>
            <Button onClick={handleSave} text="Save Content" tone="primary" />
          </Flex>

          <>
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, editor as Editor)}
            />
          </>
        </div>
      </>
    )
}

export default Grapes
