import React, { useEffect, useRef, useState } from 'react'
import grapesjs, { Editor } from 'grapesjs'

import 'grapesjs-component-code-editor/dist/grapesjs-component-code-editor.min.css'
import 'grapesjs/dist/css/grapes.min.css'
import './styles.css'

// @ts-ignore
import tailwindPlugin from 'grapesjs-tailwind'
// @ts-ignore
import plugin from 'grapesjs-component-code-editor'
import { Button, Flex } from '@sanity/ui'
import { useBlocks } from './editor/Blocks'
import { usePanels } from './editor/Panels'
import { createClient } from '@sanity/client'
import { dataset, projectId, token } from './api'
import { set } from 'sanity'
import fetchImagesFromSanity from './editor/Images'

interface GrapesProps {
  props: ObjectConstructor
}

const pId = projectId
const dSet = dataset
const t = token

export const client = createClient({
  projectId: pId,
  dataset: dSet,
  apiVersion: '2024-01-29',
  useCdn: false, // `false` if you want fresh data
  token: t,
})

const Grapes: React.FC<GrapesProps> = (props: any) => {
  const { value, onChange, schemaType } = props
  console.log(schemaType.title === 'Header and Footer')
  const editorRef = useRef<Editor | any>()
  const [editor, setEditor] = useState<Editor | any>(null)

  useEffect(() => {
    const editorInstance = grapesjs.init({
      container: '#editor-container',
      fromElement: true,

      plugins: [tailwindPlugin, plugin],
      pluginsOpts: {
        [tailwindPlugin]: {
          // options
          tailwindPlayCdn: 'https://cdn.tailwindcss.com',
        },
      },

      assetManager: {
        upload: false,
        credentials: 'include',
      },
      height: '500px',
    })

    fetchImagesFromSanity(editorInstance as Editor, client)
    useBlocks(editorInstance as Editor, client)
    usePanels(editorInstance as Editor)

    setEditor(editorInstance)
    editorRef.current = editorInstance

    editorInstance.on('load', () => {
      if (value) {
        editorInstance?.setStyle(value?.css || '')
        editorInstance?.setComponents(value?.html || '')
      }
    })

    return () => {
      editorInstance.off('load', () => null)
      editorInstance.setComponents('')
      editorInstance.setStyle('')
    }
  }, [value])

  const handleSave = async (editor: Editor) => {
    if (editor) {
      editor.runCommand('get-tailwindCss', {
        /* Options here */
        callback: function (css: string) {
          const components = editor.getComponents()
          let html = ''
          if (schemaType.title === 'Header and Footer') {
            const header = components.find((cmp) => cmp.id === 'nav')
            const footer = components.find((cmp) => cmp.id === 'footer')
            html = (header?.toHTML() || '') + (footer?.toHTML() || '')
          } else {
            html = components.map((cmp) => cmp.toHTML()).join('')
          }
          if (onChange && editor.getHtml() !== undefined) {
            onChange(set({ html: html, css }))
          }
        },
      })
    }
  }

  return (
    <>
      {schemaType.title === 'Header and Footer' && (
        <>
          <div id="nav">Nav content here</div>
          <div id="footer">Footer content here</div>
        </>
      )}
      <div id="container-wrapper">
        <div ref={editorRef} id="editor-container" />
        <Flex gap={2} marginTop={2}>
          {editor && (
            <>
              <Button onClick={() => handleSave(editor)} text="Save Content" tone="primary" />
            </>
          )}
        </Flex>
      </div>
    </>
  )
}

export default Grapes
