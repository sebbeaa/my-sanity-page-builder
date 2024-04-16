import client from './vite.config'
import { media } from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'

import home from './schemas/singletons/home'
import settings from './schemas/singletons/settings'

import page from './schemas/documents/page'
import { singletonPlugin } from './plugins/settings'
import { pageStructure } from './plugins/settings'
import htmlEditor from './plugins/grapes'
import { defineConfig } from 'sanity'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: 'dholx6dc',
  dataset: 'encrypted',

  plugins: [
    singletonPlugin(['home', 'settings']),
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    media(),
    htmlEditor,
  ],

  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      page,
      htmlEditor,
    ],
  },
})
