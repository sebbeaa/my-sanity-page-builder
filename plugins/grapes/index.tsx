import { forwardRef, useEffect, useState } from 'react'
import { defineField, set } from 'sanity'

import Grapes from './createEditor'

const MyEditor = forwardRef((props, ref) => {
  const { value, onChange }: any = props
  const [html, setHtml] = useState(value)
  useEffect(() => {
    html && onChange(set(html))
  }, [html])
  return <Grapes setHtml={setHtml} ref={ref} value={value} onChange={onChange} />
})

export default defineField({
  name: 'content',
  type: 'string',
  title: 'HTML',
  components: {
    input: MyEditor as any,
  },
})
