import './styles.css'
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-component-code-editor/dist/grapesjs-component-code-editor.min.css'
import grapesjs, { Editor } from 'grapesjs'
//@ts-ignore
import tailwindPlugin from 'grapesjs-tailwind'
//@ts-ignore
import plugin from 'grapesjs-component-code-editor'
import { Button, Flex } from '@sanity/ui'
import { createClient } from '@sanity/client'
import { useEffect, useRef, useState } from 'react'
import { useBlocks } from './editor/Blocks'
import { usePanels } from './editor/Panels'

import { dataset, projectId, token } from './api'
import fetchImagesFromSanity from './editor/Images'

const pId = projectId
const dSet = dataset
const t = token

// Custom React GrapesJS editor component
const Grapes = ({ value, onchange, set, id }: { value: any; onchange: any; set: any; id: any }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<null | Editor>(null)
  const client = createClient({
    projectId: pId,
    dataset: dSet,
    apiVersion: '2024-01-29',
    useCdn: false, // `false` if you want fresh data
    token: t,
  })
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
    const files = event.target.files
    if (!files) {
      console.error('No files selected.')
      return
    }

    // Additional custom processing or validation can go here
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log(`Uploading file: ${file.name}`)

      try {
        const asset = await client.assets.upload(
          'image',
          new File([file], file.name, { type: file.type }),
          {
            filename: file.name,
          },
        )
        if (asset) {
          const assetUrl = `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${asset._id}.${asset.extension}`
          editor.AssetManager.add({
            src: assetUrl,
            name: file.name,
            type: 'image', // or 'file' depending on your use case
          })
          console.log('File uploaded successfully:', assetUrl)
        } else {
          console.error('Failed to upload the file.')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
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

    if (id === 'headerFooter') {
      if (!editor) return
      editor.BlockManager.add('header', {
        label: 'Header',
        content: '<header class=" fixed top-0 left-0 right-0 pt-10 px-5">Header</header>',
        category: 'Basic',
      })
      editor.BlockManager.add('footer', {
        label: 'Footer',
        content: `<footer class=" fixed bottom left-0 right-0 pt-10 px-5">Footer</footer>`,
        category: 'Basic',
      })
      !value &&
        editor.setComponents(
          '<header>Header</header><div class="h-100%">Main Content</div><footer>Footer</footer>',
        )
    } else {
      usePanels(editor)
      useBlocks(editor as Editor, client)
    }

    editor.onReady(async () => {
      if (value) {
        editor.setComponents(value)
      } else {
        editor.setComponents('')
      }

      fetchImagesFromSanity(editor, client)

      editor.Commands.add('save', {
        run: function () {
          handleSave()
        },
      })

      editor.Commands.add('upload-image-command', {
        run: function (editor, sender) {
          sender && sender.set('active', 0)
          const fileInput = document?.querySelector('#gjs-am-uploadFile') as HTMLInputElement
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
        <div id="container-wrapper">
          <div ref={ref} id="editorContainer" />
          <Flex gap={2} marginTop={2}>
            <Button onClick={handleSave} text="Save Content" tone="primary" />
          </Flex>

          <>
            <input type="file" id="gjs-am-uploadFile" onChange={(e) => handleFileChange(e)} />
          </>
        </div>
      </>
    )
}

export default Grapes
