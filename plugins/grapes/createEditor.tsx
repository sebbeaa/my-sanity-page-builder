import React, { useEffect, useRef, useState } from 'react'
import grapesjs, { Component, Editor } from 'grapesjs'

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

import { set } from 'sanity'
import fetchImagesFromSanity from './editor/Images'
import { client } from './api'

interface GrapesProps {
  props: ObjectConstructor
}

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

    editorInstance.onReady(() => {
      editorInstance.onReady(() => {
        const fullscreenButton = editorInstance.Panels.getButton('options', 'fullscreen')
        if (fullscreenButton) {
          fullscreenButton.set('attributes', { ref: 'fullscreen-button' })
          fullscreenButton.on('click', () => {
            editorInstance.runCommand('core:fullscreen')

            // Introduce a slight delay for Safari
            setTimeout(() => {
              if (editorInstance.Commands && editorInstance.Commands) {
                editorInstance.runCommand('stop')
              }
            }, 100) // Adjust delay as needed
          })
        }
      })
    })

    return () => {
      editorInstance.off('load', () => null)
      editorInstance.setComponents('')
      editorInstance.setStyle('')
      editorInstance.destroy()
    }
  }, [value])
  const handleSave = async (editor: Editor) => {
    if (editor) {
      // --- Select Body Element ---
      const bodyComponent = editor.getWrapper()

      if (bodyComponent?.attributes.tagName === 'body' && editor.getComponents()) {
        editor.select(editor.getWrapper())
      } else {
        console.warn('Body component not found.')
        return
      }

      // --- Trigger Change Event ---
      editor.trigger('change') // This is the key addition

      // --- Proceed with Saving ---
      editor.runCommand('get-tailwindCss', {
        callback: (css: string) => {
          const components = editor.getComponents()

          let html = ''
          html = components.map((cmp) => cmp.toHTML()).join('')

          if (onChange && editor.getComponents() !== undefined) {
            onChange(set({ html: html, css }))
          }
        },
      })
    }
  }

  return (
    <>
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
