import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import Grapes from '../../plugins/grapes/createEditor'
import { password } from 'bun'

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
      name: 'hidePage',
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
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (rule) => rule.required(),
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
          false: false,
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
