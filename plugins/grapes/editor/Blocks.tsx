import { Editor } from 'grapesjs'

export const useBlocks = (editor: Editor) => {
  editor.BlockManager.add('text-block', {
    label: 'Text',
    content: '<div data-gjs-type="text">Insert your text here</div>',
    category: 'Basic',
  })

  editor.BlockManager.add('section-block', {
    label: 'Section',
    content:
      '<section><h2>This is a simple section</h2><p>And this is a paragraph within the section</p></section>',
    category: 'Basic',
  })
}
