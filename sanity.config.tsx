import { media } from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'
import { getStudioEnvironmentVariables } from 'sanity/cli'
import homeDocument from './schemas/singletons/home'
import settings from './schemas/singletons/settings'

import pages from './schemas/documents/page'
import { singletonPlugin } from './plugins/settings'
import { pageStructure } from './plugins/settings'
import htmlEditor from './plugins/grapes'
import { defineConfig } from 'sanity'
import globalBlocks from './schemas/singletons/globalBlocks'
import blogPost from './schemas/documents/blog'
import { dataset, projectId, token } from './plugins/grapes/api'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: projectId,
  dataset: dataset,

  plugins: [
    singletonPlugin(['home', 'settings', 'userSchema']),
    structureTool({
      structure: pageStructure([homeDocument, settings]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    media(),

    globalBlocks,
  ],

  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons

      homeDocument,
      settings,
      // Documents
      blogPost,
      pages,

      globalBlocks,
    ],
  },
})

export { projectId, dataset, token }
