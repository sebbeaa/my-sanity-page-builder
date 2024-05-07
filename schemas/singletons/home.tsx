import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import Grapes from '../../plugins/grapes/createEditor'

export default defineType({
  name: 'homeDocument',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      type: 'string',

      initialValue: 'Home',
      hidden: false,
    }),
    defineField({
      name: 'content',
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
      title: 'Home Content',

      components: {
        input: Grapes,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})
