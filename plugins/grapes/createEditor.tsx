import './styles.css'
import 'grapesjs/dist/css/grapes.min.css'
import { Button, Flex } from '@sanity/ui'
import { StringInputProps, set } from 'sanity'
import { forwardRef, useEffect, useRef, useState } from 'react'
import grapesjs, { Editor } from 'grapesjs'
//@ts-ignore
import plugin from 'grapesjs-tailwind'
import { useBlocks } from './editor/Blocks'
import { usePanels } from './editor/Panels'
import { decryptHtml, encryptHtml, handleFileChange } from '../crypto/encryption'

// Editor component

// Custom React GrapesJS editor component
const Grapes = ({
  value,
  onChange,
  html,
  setHtml,
}: {
  ref: any
  setHtml: any
  html: any
  value: StringInputProps
  onChange: any
}) => {
  const ref = useRef(null)
  const [editor, setEditor] = useState<null | Editor>(null)
  const handleSave = async () => {
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
      editor.setComponents(decryptHtml(html))
    })
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

    // Set the editor state
    setEditor(editor)

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

    // Clean up
    return () => {
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
          <Button onClick={handleSave} text="Save Content" tone="primary" />
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

const MyEditor = forwardRef((props, ref) => {
  const { value, onChange }: any = props
  const [html, setHtml] = useState(value)
  useEffect(() => {
    html && onChange(set(html))
  }, [html])
  return <Grapes html={html} setHtml={setHtml} ref={ref} value={value} onChange={onChange} />
})

export default MyEditor
