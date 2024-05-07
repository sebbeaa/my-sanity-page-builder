import { ObjectArrayFormNode, defineField } from 'sanity'
import Grapes from './createEditor'

export default defineField({
  name: 'content',
  type: 'object',
  title: 'Content',
  fields: [
    {
      name: 'html',
      type: 'string',
      title: 'HTML Content',
    },
    {
      name: 'css',
      type: 'string',
      title: 'CSS Styling',
    },
  ],
  components: {
    input: Grapes,
  },
})
