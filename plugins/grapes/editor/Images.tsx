import { Editor } from 'grapesjs'

import { client } from '../api'
const fetchImagesFromSanity = async (editor: Editor) => {
  if (!editor) return
  const query = '*[_type == "image"]{url, originalFilename}'
  try {
    const results = await client.fetch(query)
    if (results.length) {
      results.forEach((asset: any) => {
        // Add each image to the GrapesJS Asset Manager
        editor.AssetManager.add({
          src: asset.url,
          name: asset.originalFilename || 'No name',
          type: asset.mimeType, // Use 'mimeType' as the image type
        })
      })
    } else {
      console.log('No images found in Sanity dataset.')
    }
  } catch (error) {
    console.error('Error fetching images from Sanity:', error)
  }
}

export default fetchImagesFromSanity
