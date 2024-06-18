import { defineType, defineField } from 'sanity'

export const grapesEditor = defineType({
  name: 'grapesEditor',
  title: 'Grapes Editor',
  type: 'object',
  fields: [
    defineField({
      name: 'html',
      title: 'HTML',
      type: 'string',
      initialValue: '',
      hidden: false, // Hide this field since it will be managed by the editor
    }),
    defineField({
      name: 'css',
      title: 'CSS',
      type: 'string',
      initialValue: '',
      hidden: false, // Hide this field since it will be managed by the editor
    }),
  ],
})
