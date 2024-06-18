import { Editor } from 'grapesjs'
import { encryptString } from '../../crypt/encryption'

const handleSaveOrViewCode = async (editor: Editor, name: string, onChange: any, set: any) => {
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
            // Save the values to localStorage based on _id

            onChange(set({ html: encryptedHtml, css: encryptedCss }))
          } else {
            alert(html + `<style>${combinedCss}</style>`)
          }
        }
      },
    })
    editor.runCommand('fullscreen')
  }
}

export default handleSaveOrViewCode
