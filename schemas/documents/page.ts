import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      initialValue: 'New Page' as any,
      validation: (rule) => rule.required(),
      hidden: true,
    }),
    defineField({
      name: 'content',
      type: 'content',
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
