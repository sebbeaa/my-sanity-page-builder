import Editor from './createEditor'
import {defineField} from 'sanity'

export default defineField({
  name: 'content',
  type: 'string',
  title: 'HTML',
  components: {
    input: Editor as any,
  },
})
