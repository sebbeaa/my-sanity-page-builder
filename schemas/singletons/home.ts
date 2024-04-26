import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'content',
      type: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: true,
      initialValue: 'Home',
    }),
  ],
  preview: {
    select: {
      title: 'Home',
    },
    prepare({}) {
      return {
        subtitle: 'Home',
      }
    },
  },
})
