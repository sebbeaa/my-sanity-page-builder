importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js')

self.onmessage = (event) => {
  const {action, payload} = event.data

  if (action === 'encrypt') {
    const encrypted = CryptoJS.AES.encrypt(payload.html, payload.secretKey).toString()
    self.postMessage({action: 'encrypted', payload: encrypted})
  } else if (action === 'decrypt') {
    const bytes = CryptoJS.AES.decrypt(payload.encryptedHtml, payload.secretKey)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    self.postMessage({action: 'decrypted', payload: decrypted})
  }
}
