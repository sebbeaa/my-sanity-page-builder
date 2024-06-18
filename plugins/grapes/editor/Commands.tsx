import { Editor } from 'grapesjs'
import { CodeEditor } from '../codeEditor/code-editor'
import { openCodeStr, getObject, getConstructor } from '../codeEditor/vars'
import { encryptString } from '../../crypt/encryption'
export const Commands = (editor: Editor, opts: any) => {
  let codeEditor: any = null

  editor.Commands.add(openCodeStr, {
    run: (editor) => {
      !codeEditor &&
        (codeEditor = new CodeEditor(editor, opts as any)) &&
        codeEditor.buildCodePanel()
      codeEditor.showCodePanel()
    },
    stop: (editor) => {
      codeEditor && codeEditor.hideCodePanel()
    },
  })

  editor.Commands.add(getObject, () => {
    return codeEditor
  })

  editor.Commands.add(getConstructor, () => {
    return CodeEditor
  })

  const handleSaveOrViewCode = async (editor: Editor, name: string, onChange?: any, set?: any) => {
    if (editor) {
      const body = editor.Canvas.getDocument().body
      const event = new Event('change', {
        bubbles: true,
        cancelable: true,
      })

      body.dispatchEvent(event)

      editor.runCommand('get-tailwindCss', {
        callback: (tailwindCss: string) => {
          const html = editor.getHtml()
          const editorCss = editor.getCss() // Get the CSS from the editor
          const combinedCss = editorCss + tailwindCss // Combine the CSS from the editor with the Tailwind CSS
          if (onChange && editor.getHtml() !== undefined) {
            const encryptedHtml = encryptString(html)
            const encryptedCss = encryptString(combinedCss)

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
  editor.Commands.add('handle-save', {
    run(editor, sender, opts = {}) {
      handleSaveOrViewCode(editor, 'save')
    },
  })
  editor.Commands.add('fullscreen', {
    async run(editor, sender) {
      const el = editor.getEl()
      console.log('el', el)
      const style: CSSStyleDeclaration | undefined = el?.style
      if (style) {
        // Other options: 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'
        el?.classList.contains('de-zoom')
          ? el?.classList.replace('de-zoom', 'fullscreen-zoom-animation')
          : el?.classList.add('fullscreen-zoom-animation')
        style.top = '0'
        style.bottom = '0'
        style.left = '0'
        style.right = '0'
        style.position = 'fixed'
        style.width = '100vw'
        style.marginTop = '50px'
        style.height = '94vh'
        style.zIndex = '1000000'
        style.transformOrigin = 'center' // Add transform origin of center
      }
    },
    async stop(editor, sender) {
      const el = editor.getEl()
      const style: CSSStyleDeclaration | undefined = el?.style
      if (style) {
        el?.classList.contains('fullscreen-zoom-animation')
          ? el?.classList.replace('fullscreen-zoom-animation', 'de-zoom')
          : el?.classList.add('de-zoom')
        style.transformOrigin = 'center' // Add transform origin of center
        style.animation = 'zoomAnimation 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);'
        style.width = '100%'
        style.marginTop = '0'
        style.height = '535px'
        style.zIndex = '10'
        style.position = 'relative'
      }
    },
  })
}
