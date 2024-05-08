import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import Grapes from '../../plugins/grapes/createEditor'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed on the header & footer of your site.',
      type: 'array',
      of: [
        {
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'homeDocument',
            },
            {
              type: 'pages',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
    // defineField({
    //   name: 'content',
    //   title: 'Header and Footer',
    //   type: 'object',

    //   fields: [
    //     {
    //       name: 'html',
    //       type: 'string',
    //       title: 'HTML Content',
    //       initialValue: '<h1>Header</h1>',
    //     },
    //     {
    //       name: 'css',
    //       type: 'string',
    //       title: 'CSS Styling',
    //       initialValue: 'color: black;',
    //     },
    //   ],

    //   components: {
    //     input: Grapes,
    //   },
    // }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu Items',
      }
    },
  },
})
