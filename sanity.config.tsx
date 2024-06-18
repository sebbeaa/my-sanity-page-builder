import { structureTool } from 'sanity/structure'
import homeDocument from './schemas/singletons/home'
import settings from './schemas/singletons/settings'

import pages from './schemas/documents/page'
import { singletonPlugin } from './plugins/settings'
import { pageStructure } from './plugins/settings'
import { defineConfig } from 'sanity'
import globalBlocks from './schemas/documents/globalBlocks'
import { dataset, projectId, token } from './plugins/grapes/api'
import allOrders from './schemas/hidden/ordersSchema'
import prod from './schemas/documents/prod'
import Grapes from './plugins/grapes'
import { grapesEditor } from './schemas/documents/editor'
import { media } from 'sanity-plugin-media'

let client

export default client = defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: projectId,
  dataset: dataset,
  apiVersion: 'vX',
  plugins: [
    singletonPlugin(['homeDocument', 'settings', 'userSchema', 'allOrders']),
    structureTool({
      structure: pageStructure([homeDocument, settings, allOrders]),
    }),
    media(),
  ],

  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      allOrders,
      homeDocument,
      settings,
      // Documents
      grapesEditor,
      pages,
      prod,
      globalBlocks,
    ],
  },
  form: {
    components: {
      input: (props: any) => {
        if (props.schemaType.name === 'grapesEditor') {
          return <Grapes {...props} />
        }
        return props.renderDefault(props)
      },
    },
  },
})

export { projectId, dataset, token }
