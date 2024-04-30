import { Editor } from 'grapesjs'

export const usePanels = (editor: Editor) => {
  editor.Panels.addButton('options', [
    {
      id: 'save',
      className: 'fa fa-save',
      command: 'save',
      attributes: { title: 'Save' },
    },
  ]),
    editor.Panels.addButton('options', [
      {
        id: 'upload-image',
        className: 'fa fa-upload',
        command: 'upload-image-command',
        attributes: { title: 'Upload Image' },
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
        togglable: false, //do not close when button is clicked again
        id: 'open-code',
      },
    ])
}
