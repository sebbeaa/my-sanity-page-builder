import React, { useEffect, useRef, useState } from 'react'
import grapesjs, { Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-component-code-editor/dist/grapesjs-component-code-editor.min.css'
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

interface GrapesProps {
  props: ObjectConstructor
}

const pId = projectId
const dSet = dataset
const t = token

const client = createClient({
  projectId: pId,
  dataset: dSet,
  apiVersion: '2024-01-29',
  useCdn: false, // `false` if you want fresh data
  token: t,
})

const Grapes: React.FC<GrapesProps> = (props: any) => {
  console.log(props)
  const { value, onChange, id } = props
  const editorRef = useRef<Editor | any>(null)
  const [editor, setEditor] = useState<Editor | any>(null)

  useEffect(() => {
    if (value?.html && value?.css && editor) {
      editor?.setStyle(value?.css || '')
      editor?.setComponents(value?.html || '')
    } else if (editor && !value?.html && !value?.css) {
      editor?.setStyle('')
      editor?.setComponents('')
    }
    editor?.on('load', () => {
      usePanels(editor)
      useBlocks(editor as Editor, client)
    })
  }, [editor, value?.html, value?.css])

  useEffect(() => {
    const editorInstance = grapesjs.init({
      container: '#editor-container',
      fromElement: true,
      plugins: [tailwindPlugin, plugin],
      pluginsOpts: {
        [plugin]: {
          css: true,
          json: true,
          html: true,
          script: true,

          /* options */
        },
        [tailwindPlugin]: {
          /* options */

          prefix: 'tw-',
          config: {
            theme: {
              extend: {
                colors: {
                  primary: '#333',
                  secondary: '#ccc',
                },
              },
            },
          },
        },
      },
      assetManager: {
        upload: false,
        credentials: 'include',
      },
      height: '500px',
    })

    setEditor(editorInstance)
    editorRef.current = editorInstance

    if (editor) {
    }
    return () => {
      editorInstance.off('load', () => null)
      editorInstance.setComponents('')
      editorInstance.setStyle('')
      setEditor(null)
    }
  }, [])

  const handleSave = async (editor: Editor) => {
    if (editor) {
      const css = editor.getCss()
      const html = editor.getHtml()

      if (onChange && html !== undefined) {
        onChange(set({ html, css }))
      }
    }
  }

  return (
    <>
      2
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
