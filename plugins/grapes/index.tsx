import { defineField, set } from 'sanity'

import Grapes from './createEditor'

export const MyEditor = (props: any) => {
  const { id, value, onChange } = props

  return <Grapes value={value} onchange={onChange} id={id} set={set} />
}

export default defineField({
  name: 'content',
  type: 'string',
  title: 'Content',
  components: {
    input: (props: any) => {
      return <MyEditor {...props} />
    },
  },
})
