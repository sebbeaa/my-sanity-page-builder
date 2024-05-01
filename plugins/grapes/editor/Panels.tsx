import { Editor } from 'grapesjs'
import { url } from '../api'

export const usePanels = (editor: Editor, handleSave: any) => {
  if (!editor) return

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
        id: 'gjs-am-file-uploader',
        className: 'fa fa-upload',
        command: 'upload-image-command',
        attributes: { title: 'Upload Image' },
      },
    ])
  editor.Commands.add('save', {
    run: function () {
      handleSave()
    },
  })

  editor.Commands.add('upload-image-command', {
    run: function (editor, sender) {
      sender && sender.set('active', 0)
      location.replace(new URL(url + '/media'))
    },
  })
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
