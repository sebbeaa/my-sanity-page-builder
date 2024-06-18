import React, { useEffect, useRef } from 'react'

import grapesjs, { Editor } from 'grapesjs'
// @ts-ignore
import tailwindPlugin from 'grapesjs-tailwind'
import './styles.css'
import 'grapesjs/dist/css/grapes.min.css'

import basicBlocks from 'grapesjs-blocks-basic'
import parserPostCSS from 'grapesjs-parser-postcss'

import { blocks } from './editor/Blocks'
import { panels } from './editor/Panels'

import CodeEditor from '../../plugins/grapes/codeEditor'
import { set } from 'sanity'
import { decryptString, encryptString } from '../crypt/encryption'

import fetchImagesFromSanity from './editor/Images'
import { SanityDocument } from '@sanity/client'
import forms from 'grapesjs-plugin-forms'
import ckeEditor from 'grapesjs-plugin-ckeditor'

const Grapes: React.FC<SanityDocument> = (props: SanityDocument) => {
  const { value, onChange } = props

  const editorRef = useRef<Editor | any>()
  const handleSaveOrViewCode = async (editor: Editor, name: string) => {
    if (editor) {
      const body = editor.Canvas.getDocument().body
      const event = new Event('change', {
        bubbles: true,
        cancelable: true,
      })

      body.dispatchEvent(event)

      editor.runCommand('get-tailwindCss', {
        callback: async (tailwindCss: string) => {
          const html = editor.getHtml()
          const editorCss = editor.getCss() // Get the CSS from the editor
          const combinedCss = editorCss + tailwindCss // Combine the CSS from the editor with the Tailwind CSS
          if (onChange && editor.getHtml() !== undefined) {
            const encryptedHtml = await encryptString(html)
            const encryptedCss = await encryptString(combinedCss)

            if (name === 'save') {
              onChange(set({ html: encryptedHtml, css: encryptedCss }))
            } else {
              alert(html + `<style>${combinedCss}</style>`)
            }
          }
        },
      })
    }
  }

  useEffect(() => {
    const editorInstance = grapesjs.init({
      container: '#editor-container',
      fromElement: true,
      storageManager: false,
      plugins: [
        ckeEditor,
        blocks,
        panels,
        CodeEditor,
        parserPostCSS,
        fetchImagesFromSanity,
        basicBlocks,
        forms,
        tailwindPlugin,
      ],
      jsInHtml: true,
      // @ts-ignore
      allowScripts: true,
      pluginsOpts: {
        [tailwindPlugin]: {
          // tailwindPlayCdn: async () => await import('../../global.tailwind.css') as URL,
          allowScripts: true,
          editJs: true,
          editHtml: true,
          editCss: true,
        },
        [CodeEditor as any]: {
          // options
          // options
        },
      },
      height: '535px',
    })

    // insertGlobalBlocks(editorInstance)

    const loadHandler = async () => {
      editorRef.current = editorInstance

      const html = await decryptString(value?.html || '')
      const css = await decryptString(value?.css || '')

      editorInstance.setComponents(html)
      editorInstance.setStyle(css)
    }

    editorInstance.on('load', loadHandler)
    editorInstance.onReady(() => {
      console.log('props', props)
      editorInstance.Commands.add('handle-save', {
        run(editor, sender, opts = {}) {
          editorInstance.onReady(() => {
            handleSaveOrViewCode(editorInstance, 'save')
          })
        },
      })
    })

    return () => {
      editorInstance.off('load', loadHandler)
      editorInstance.destroy()
      editorRef.current = null
    }
  })

  return (
    <>
      <div id="container-wrapper">
        <div ref={editorRef} id="editor-container" />
      </div>
    </>
  )
}

export default Grapes
