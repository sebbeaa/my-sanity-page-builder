import { createClient } from '@sanity/client'

export const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID
export const dataset = import.meta.env.SANITY_STUDIO_DATASET
export const token = import.meta.env.SANITY_STUDIO_TOKEN
export const url = import.meta.env.SANITY_STUDIO_URL

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-29',
  useCdn: false, // `false` if you want fresh data
  token,
})
