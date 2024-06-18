import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import Grapes from '../../plugins/grapes'

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
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'SEO title for the page',
      validation: (rule) => rule.required(),
      initialValue: '',
    }),
    defineField({
      type: 'text',
      name: 'overview',
      title: 'Overview',
      description: 'SEO overview for the page',
      validation: (rule) => rule.required(),
      initialValue: '',
    }),
    defineField({
      name: 'pageSettings',
      title: 'Page Settings',
      type: 'object',
      initialValue: {
        private: false,
        password: '',
      },
      fields: [
        defineField({
          type: 'boolean',
          name: 'private',
          title: 'Private Page',
          initialValue: false,
        }),
        defineField({
          type: 'string',
          name: 'password',
          title: 'Password',
          hidden: ({ parent }) => !parent?.private,
          initialValue: '',
        }),
      ],
    }),
    defineField({
      title: 'Home Content',
      name: 'content',
      type: 'grapesEditor',
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
