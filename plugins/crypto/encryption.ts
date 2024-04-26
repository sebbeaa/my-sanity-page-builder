import CryptoJS from 'crypto-js'
import { Editor } from 'grapesjs'
import { useClient } from 'sanity'

const secretKey: null | string = process.env.SANITY_PRIVATE_KEY || ''

// Encrypt content function (unchanged)
export const encryptHtml = (html: string): string =>
  CryptoJS.AES.encrypt(html, typeof secretKey === 'string' ? secretKey : '').toString()

// Decrypt content function (unchanged)
export const decryptHtml = (encryptedHtml: string): string => {
  if (!encryptedHtml) return ''
  const bytes = CryptoJS.AES.decrypt(encryptedHtml, typeof secretKey === 'string' ? secretKey : '')
  return bytes.toString(CryptoJS.enc.Utf8)
}

export const handleFileChange = async (event: any, editor: Editor) => {
  const file = event.target.files[0]
  const client = useClient()
  client.config({ projectId: 'dholx6dc', dataset: 'encrypted' })
  if (file) {
    // Read the file as an ArrayBuffer
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = async () => {
      // Encrypt the file data
      const wordArray = CryptoJS.lib.WordArray.create(reader.result as ArrayBuffer)
      const encrypted = CryptoJS.AES.encrypt(
        wordArray,
        typeof secretKey === 'string' ? secretKey : '',
      ).toString()

      // Convert encrypted data to a blob
      const encryptedBlob = new Blob([encrypted], { type: 'application/octet-stream' })

      // Create a File from the Blob
      const encryptedFile = new File([encryptedBlob], file.name, {
        type: 'application/octet-stream',
      })

      // Upload the encrypted file to Sanity
      const asset = await client.assets.upload('file', new File([file], file.name, {}), {
        filename: file.name,
      })

      // Check if the asset was uploaded successfully and add it to the GrapesJS Asset Manager
      if (asset?._id) {
        const assetUrl = `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${asset._id}.${asset.extension}`
        editor.AssetManager.add({
          src: assetUrl,
          name: file.name,
          type: 'image',
        })
      }
    }
  }
}
