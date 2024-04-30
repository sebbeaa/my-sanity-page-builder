import { media } from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'

import home from './schemas/singletons/home'
import settings from './schemas/singletons/settings'

import page from './schemas/documents/page'
import { singletonPlugin } from './plugins/settings'
import { pageStructure } from './plugins/settings'
import htmlEditor from './plugins/grapes'
import { defineConfig } from 'sanity'
import globalBlocks from './schemas/singletons/globalBlocks'
import blogPost from './schemas/documents/blog'
import { dataset, projectId } from './plugins/api'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: projectId,
  dataset: dataset,

  plugins: [
    singletonPlugin(['home', 'settings']),
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    media(),
    htmlEditor,
    globalBlocks,
  ],

  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      blogPost,
      page,
      htmlEditor,
      globalBlocks,
    ],
  },
})
