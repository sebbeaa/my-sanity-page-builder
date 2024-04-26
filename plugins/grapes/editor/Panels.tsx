import { Editor } from 'grapesjs'

export const usePanels = (editor: Editor) => {
  editor.Panels.addButton('options', [
    {
      id: 'save',
      className: 'fa fa-save',
      command: 'save',
      attributes: { title: 'Save' },
    },
  ])
}
