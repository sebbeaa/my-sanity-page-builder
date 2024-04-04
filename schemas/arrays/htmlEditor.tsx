import Editor from './createEditor'
import {defineField} from 'sanity'

export default defineField({
  name: 'html',
  type: 'object',
  title: 'HTML Editor',
  fields: [
    {
      name: 'content',
      title: 'HTML Code',
      type: 'string',
      components: {
        input: Editor,
      },
    },
  ],
})
