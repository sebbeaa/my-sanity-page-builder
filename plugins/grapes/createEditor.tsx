import { Button, Flex } from '@sanity/ui'
import { useEffect, useRef, useState } from 'react'
import { useBlocks } from './editor/Blocks'
import { usePanels } from './editor/Panels'
import grapesjs, { Editor } from 'grapesjs'
//@ts-ignore
import tailwindPlugin from 'grapesjs-tailwind'
//@ts-ignore
import plugin from 'grapesjs-component-code-editor'
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-component-code-editor/dist/grapesjs-component-code-editor.min.css'
import 'grapesjs-plugin-toolbox/dist/grapesjs-plugin-toolbox.min.css'
import './styles.css'

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId, token } from '../api'

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-01-29',
  useCdn: false, // `false` if you want fresh data
  token: token,
})

// Custom React GrapesJS editor component
const Grapes = ({ value, onchange, set, id }: { value: any; onchange: any; set: any; id: any }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<null | Editor>(null)

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
      plugins: [tailwindPlugin, plugin],
      pluginsOpts: {
        [plugin]: {
          // options
        },
      },
      storageManager: false,
      height: '450px',
      width: 'auto',
    })

    usePanels(editor)
    useBlocks(editor as Editor, client)

    editor.onReady(async () => {
      if (value) {
        editor.setComponents(value)
      } else {
        editor.setComponents('')
      }

      editor.Commands.add('save', {
        run: function () {
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

      setEditor(editor)
    })

    return () => {
      editor.destroy()
      editor.off('update', () => {
        return
      })
      editor.off('load', () => {
        return
      })
      setEditor(null)
      // ref.current = null
    }
  }, [value, id])

  if (ref)
    return (
      <>
        // Editor component
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
