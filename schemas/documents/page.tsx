import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType, getValueAtPath } from 'sanity'
import Grapes from '../../plugins/grapes/createEditor'
import grapes from '../../plugins/grapes'
export default defineType({
  type: 'document',
  name: 'pages',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      initialValue: 'New Page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'object',
      fields: [
        {
          name: 'html',
          type: 'string',
          title: 'HTML Content',
          initialValue: '',
        },
        {
          name: 'css',
          type: 'string',
          title: 'CSS Styling',
          initialValue: '',
        },
      ],

      components: {
        input: Grapes,

        history: {
          false: true,
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Private Page',
        title,
      }
    },
  },
})
