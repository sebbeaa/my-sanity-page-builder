import {Node, mergeAttributes} from '@tiptap/core'

export const GridItem = Node.create({
  name: 'gridItem',

  // Content that's allowed inside a grid item
  content: 'block+', // Allow any block-level nodes
  draggable: true, // Allow dragging this node
  // Define how a GridItem is rendered
  addAttributes() {
    return {
      // Add attributes you might need for styling or custom behavior
    }
  },

  // How your Node is represented in the editor's view
  parseHTML() {
    return [{tag: 'div', class: 'grid-item'}] // Basic div with a class
  },

  // How your Node's content is represented when converted to HTML
  renderHTML({HTMLAttributes}) {
    return [
      'div',
      mergeAttributes({class: 'grid-item'}, HTMLAttributes),
      0, // Content will be inserted here
    ]
  },
})
