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
