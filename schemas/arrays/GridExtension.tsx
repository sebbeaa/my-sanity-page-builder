import {Extension, Node} from '@tiptap/core'
import {useDrop} from 'react-dnd'

export const GridLayout = Node.create({
  name: 'gridLayout',

  group: 'block',
  content: 'gridItem+',

  parseHTML() {
    return [
      {
        tag: 'div.grid-layout', // Assuming your grid layout is represented by a <div> with a class of `grid-layout`
      },
    ]
  },

  renderHTML({HTMLAttributes}) {
    return ['div', {class: 'grid-layout', ...HTMLAttributes}, 0]
  },
})

export const GridLayoutExtension = Extension.create({
  name: 'gridLayouExtension',

  addNodeView() {
    return ({node, editor, getPos}: any) => {
      const layout = document.createElement('div')
      // ... your grid layout rendering logic ...
      layout.className = 'grid-layout'
      const [, drop] = useDrop(() => ({
        accept: 'GRID_ITEM',
        drop: (item, monitor) => {
          // ... your drop logic ...
          const droppedItem = monitor.getItem()
          const dropPosition = getPos()

          // You can access the dropped item's properties here
          console.log(droppedItem)

          // You can also access the position where the item was dropped
          console.log(dropPosition)

          // Here you can implement your logic to handle the dropped item
          // For example, you might want to insert the dropped item at the drop position in your grid layout
          editor.commands.insertContent(
            {
              type: 'gridItem',
              content: droppedItem,
            },
            dropPosition,
          )
        },
      }))

      drop(layout) // Attach the drop reference

      return {
        dom: layout,
        // ... other configuration ...
      }
    }
  },
})
