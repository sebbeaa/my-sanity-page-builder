import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: 'dholx6dc',
  dataset: 'encrypted',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
