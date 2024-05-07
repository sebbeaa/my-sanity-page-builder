import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import Grapes from '../../plugins/grapes/createEditor'

// schemas/singletons/globalBlocks.ts

export default defineType({
  name: 'globalBlocks',
  title: 'Global Blocks',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      initialValue: 'New Global Block',
      validation: (rule) => rule.required(),
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
      title: 'Global Content',

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
        subtitle: 'Global Blocks',
        title,
      }
    },
  },
})
