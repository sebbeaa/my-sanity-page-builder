import React from 'react'
import {useEditor} from './GrapesContext'
import {Button, Flex} from '@sanity/ui'

const GrapesJSEditor: React.FC = () => {
  const {editorRef, editor, onChange} = useEditor()

  const handleSave = () => {
    if (editor) {
      const html = editor.getHtml()
      onChange(html)
    }
  }

  return (
    <>
      <div style={{overflow: 'visible', width: '100%'}}>
        <div ref={editorRef} style={{maxHeight: '400px', width: '100%'}}></div>
        <Flex gap={2} marginTop={2}>
          <Button onClick={handleSave} text="Save Content" tone="primary" />
        </Flex>
      </div>
    </>
  )
}

export default GrapesJSEditor
