import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'blog',
  title: 'Blog',
  icon: DocumentIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short description or excerpt of the blog post',
    },
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
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'URL slug for the blog post, used for dynamic routing',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Blog',
        title,
      }
    },
  },
})
