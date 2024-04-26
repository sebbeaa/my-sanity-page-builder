import CryptoJS from 'crypto-js'

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

export const handleFileChange = async (event: any) => {
  const file = event.target.files[0]
  if (file) {
    // Read the file as an ArrayBuffer
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    // reader.onload = async () => {
    //   // Encrypt the file data
    //   const wordArray = CryptoJS.lib.WordArray.create(reader.result)
    //   const encrypted = CryptoJS.AES.encrypt(wordArray, 'your-secret-key').toString()

    //   // Convert encrypted data to a blob
    //   const encryptedBlob = new Blob([encrypted], { type: file.type })

    //   // Create a File from the Blob
    //   const encryptedFile = new File([encryptedBlob], file.name, { type: file.type })

    //   // Upload the encrypted file to Sanity
    //   const asset = await client.assets.upload('file', encryptedFile, {
    //     filename: file.name,
    //   })

    //   // Add the URL to the GrapesJS editor
    //   const imageUrl = asset.url // You might need to adjust based on your asset handling
    //   editor.AssetManager.add(imageUrl, { name: file.name })
    // }
  }
}
