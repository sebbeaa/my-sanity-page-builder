import { Editor } from 'grapesjs'
import CryptoJS from 'crypto-js'
import { client } from '../../plugins/grapes/api'

const secretKey: string = 'your-super-secret-key'

export async function encryptString(data: string): Promise<string> {
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString()
  return encrypted
}

export async function decryptString(encryptedData: string): Promise<string> {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8)
  return decrypted
}

// Plugin Definition
const sanityEncryptedStoragePlugin = (editor: Editor, options: any = {}) => {
  async function encryptFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const wordArray = CryptoJS.lib.WordArray.create(event?.target?.result as ArrayBuffer)
        const encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString()
        resolve(encrypted)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }

  async function uploadToSanity(encryptedData: string, filename: string): Promise<string> {
    const document = {
      _type: 'file',
      title: filename,
      file: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: '',
        },
      },
    }

    try {
      const response = await client.assets.upload(
        'file',
        new Blob([encryptedData], { type: 'application/octet-stream' }),
        {
          filename: filename,
        },
      )
      document.file.asset._ref = response._id
      const createdDoc = await client.create(document)
      return createdDoc._id
    } catch (error) {
      console.error('Error uploading file to Sanity:', error)
      throw error
    }
  }

  async function fetchFromSanity(assetId: string): Promise<string> {
    try {
      const asset = await client.getDocument(assetId)
      const response = await fetch(asset?.file?.asset?.url)
      const blob = await response.blob()
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.onload = (event: any) => {
          const wordArray = CryptoJS.lib.WordArray.create(event.target.result as ArrayBuffer)
          const decrypted = CryptoJS.AES.decrypt(wordArray as any, secretKey)
          const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)
          resolve(decryptedString)
        }
        reader.onerror = reject
        reader.readAsText(blob)
      })
    } catch (error) {
      console.error('Error fetching file from Sanity:', error)
      throw error
    }
  }

  // Here you can add functions to integrate these functionalities with GrapesJS editor events
  editor.Commands.add('encrypt-and-upload', {
    run: async (editor, sender) => {
      sender && sender.set('active') // Active state
      try {
        const file = await selectFile() // Implement selectFile to handle file selection from the user
        const encryptedData = await encryptFile(file)
        const assetId = await uploadToSanity(encryptedData, file.name)
        console.log('Uploaded asset ID:', assetId)
      } catch (error) {
        console.error('Error during encrypt and upload:', error)
      }
    },
  })

  editor.Commands.add('fetch-and-decrypt', {
    run: async (editor, sender) => {
      sender && sender.set('active') // Active state
      try {
        const assetId = prompt('Enter asset ID:') // Replace with a proper input method
        if (assetId) {
          const encryptedData = await fetchFromSanity(assetId)
          console.log('Decrypted data:', encryptedData)
        } else {
          console.error('No asset ID provided')
        }
      } catch (error) {
        console.error('Error during fetch and decrypt:', error)
      }
    },
  })
}

// Helper function to handle file selection (implement as needed)
async function selectFile(): Promise<File> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = () => {
      if (input.files) resolve(input.files[0])
      else reject(new Error('No file selected'))
    }
    input.click()
  })
}

// Register the plugin with GrapesJS
export default sanityEncryptedStoragePlugin
