import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'

import home from './schemas/singletons/home'
import settings from './schemas/singletons/settings'

import page from './schemas/documents/page'
import {singletonPlugin} from './plugins/settings'
import html from './schemas/arrays/createEditor'
import {pageStructure} from './plugins/settings'
import htmlEditor from './schemas/arrays/htmlEditor'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'myStudio'

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID as string | 'any',

  dataset: process.env.SANITY_STUDIO_API_DATASET as string | 'any',

  plugins: [
    singletonPlugin(['home', 'settings']),
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    media(),
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
      // Objects
    ],
  },
})
