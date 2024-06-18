import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import Grapes from '../../plugins/grapes'

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
      title: 'Global Block Content',
      type: 'grapesEditor',
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
