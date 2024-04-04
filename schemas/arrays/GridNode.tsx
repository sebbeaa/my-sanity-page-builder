import React from 'react'
import {useDrop} from 'react-dnd'

const GridNodeComponent = ({content, editor, getPos}: any) => {
  const [, drop] = useDrop(() => ({
    accept: 'GRID_ITEM',
    drop: (item, monitor) => {
      // Implement drop logic here
      const dropPosition = getPos()
      editor.commands.insertContent(/* ... */)
    },
  }))

  return (
    <div ref={drop} className="grid-layout">
      {content}
    </div>
  )
}

export default GridNodeComponent
