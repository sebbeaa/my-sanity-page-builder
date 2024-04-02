import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'intro',
  title: 'Intro',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'socialIcons',
      title: 'Social icons',
      type: 'object',
      fields: [
        defineField({
          initialValue: 'No',
          name: 'enable',
          title: 'Enable social icons?',
          type: 'string',
          options: {
            list: ['Yes', 'No'],
          }, 
        }),
        defineField({
          name: 'links',
          title: 'Social links',
          type: 'array',
          of: [{ name: 'link', title: 'Link', type: 'url' }],
        }),
      ],
    }),
    defineField({
      name: 'Image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Image Text',
          description:
            'this text gets read to screen readers, and helps google find images!',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
})
