import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iframe',
      title: 'IFrame',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      title: 'HTML Editor',
      name: 'html',
      type: 'html',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Private Page',
        title,
      }
    },
  },
})
