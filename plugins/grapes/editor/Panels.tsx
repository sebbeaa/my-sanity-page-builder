import { Editor } from 'grapesjs'

export const panels = (editor: Editor) => {
  if (!editor) return

  editor.Panels.addButton('options', [
    {
      id: 'save',
      className: 'fa fa-save',
      command: 'handle-save',
      attributes: { title: 'Save' },
    },
  ])

  editor.Panels.addButton('fullscreen', [
    {
      id: 'fullscreen',
      togglable: true,
      
    },
  ])

  const pn = editor.Panels
  const panelViews = pn.addPanel({
    id: 'views',
  })
  panelViews &&
    panelViews?.get('buttons')?.add([
      {
        attributes: {
          title: 'Open Code',
        },
        className: 'fa fa-file-code-o',
        command: 'open-code',
        togglable: true, //do not close when button is clicked again
        id: 'open-code',
      },
    ])
}
