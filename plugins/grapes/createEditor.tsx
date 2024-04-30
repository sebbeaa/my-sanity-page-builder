import './styles.css'
import 'grapesjs/dist/css/grapes.min.css'
import { Button, Flex } from '@sanity/ui'
import { useEffect, useRef, useState } from 'react'
import grapesjs, { Editor } from 'grapesjs'
//@ts-ignore
import tailwindPlugin from 'grapesjs-tailwind'
import { useBlocks } from './editor/Blocks'
import { usePanels } from './editor/Panels'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'YOUR_DATASET',
  apiVersion: '2024-01-29',
  useCdn: false,
})

// Custom React GrapesJS editor component
const Grapes = ({ value, onchange, set, id }: { value: any; onchange: any; set: any; id: any }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<null | Editor>(null)
  const [loading, setLoading] = useState(true)
  const handleSave = () => {
    if (editor) {
      const html = editor?.getHtml()
      const css = editor?.getCss()
      const combined = `<style>${css}</style>${html}`
      value !== html && onchange(set(combined))
    }
  }
  const handleFileChange = async (event: any) => {
    if (!editor) return
    const file = event.target.files[0]
    if (file) {
      // Read the file as an ArrayBuffer
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = async () => {
        // Upload the encrypted file to Sanity
        const asset = await client.assets.upload('file', new File([file], file.name, {}), {
          filename: file.name,
        })

        // Check if the asset was uploaded successfully and add it to the GrapesJS Asset Manager
        if (asset?._id) {
          const assetUrl = `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${asset._id}.${asset.extension}`
          editor.AssetManager.add({
            src: assetUrl,
            name: file.name,
            type: 'image',
          })
        }
      }
    }
  }
  useEffect(() => {
    if (!ref.current) return
    const editor = grapesjs.init({
      container: ref.current,
      plugins: [tailwindPlugin],

      height: '450px',
      width: 'auto',
    })

    usePanels(editor)
    useBlocks(editor)
    client.fetch('*[_type == "globalBlocks"]').then((blocks) => {
      // Initialize your GrapesJS editor here
      // and load the blocks into the editor
      console.log(blocks)
      if (blocks.length === 0) return
      blocks.forEach((block: any) => {
        editor.BlockManager.add(block.id, {
          label: 'Global Block - ' + block.title,
          content: block.globalContent,
          category: 'Global Blocks',
        })
      })
    })

    editor.onReady(async () => {
      if (value) {
        editor.setComponents(value)
      } else {
        editor.setComponents('')
      }
    })

    editor.Commands.add('save', {
      run: function (editor, sender) {
        handleSave()
      },
    })

    editor.Commands.add('upload-image-command', {
      run: function (editor, sender) {
        sender && sender.set('active', 0)
        const fileInput = document?.querySelector('#file-input') as HTMLInputElement
        fileInput?.click()
      },
    })

    if (id === 'globalContent') {
      editor.on('component:add', (component) => {
        // Check if the added component is a 'section' or 'div'
        if (component.is('section')) {
          // Assuming 'section' is the type or you can use component.tagName === 'DIV' for divs
          // Count existing sections
          const existingSections = editor.getComponents().filter((comp) => comp.is('section'))

          // If there is already one section, prevent adding a new one
          if (existingSections.length > 1) {
            component.remove() // This removes the newly added section
            alert('Only one section is allowed.')
          }
        }
      })
    }
    setLoading(false)
    setEditor(editor)

    return () => {
      editor.destroy()
      setEditor(null)
      // ref.current = null
    }
  }, [id])

  if (ref)
    return (
      <>
        // Editor component
        {loading && (
          <div
            style={{
              overflow: 'visible',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              height: '600px',
              width: 'auto',
              backgroundColor: 'darkblue',
            }}
          >
            Loading...
          </div>
        )}
        <div
          style={{
            overflow: 'visible',
            position: 'absolute',
            top: '-10px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
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
              onChange={(e) => handleFileChange(e)}
            />
          </>
        </div>
      </>
    )
}

export default Grapes
