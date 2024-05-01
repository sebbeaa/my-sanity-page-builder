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

import { dataset, projectId, token, url } from './api'
import fetchImagesFromSanity from './editor/Images'

const pId = projectId
const dSet = dataset
const t = token
const u = url

const upload = async (files: any): Promise<any | string> => {
  const formData = new FormData()
  formData.append('file', files[0])
  const response = await fetch('/api/assets', {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()
  return data.url as string
}

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
      assetManager: {
        upload: false,
        uploadName: 'files',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${t}`,
        },
      },
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
      usePanels(editor, handleSave)
      useBlocks(editor as Editor, client)
    }

    editor.onReady(async () => {
      if (value) {
        editor.setComponents(value)
      } else {
        editor.setComponents('')
      }

      fetchImagesFromSanity(editor, client)

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
        </div>
      </>
    )
}

export default Grapes
