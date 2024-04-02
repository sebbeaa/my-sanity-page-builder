'use client'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {StringInputProps, set, unset} from 'sanity'
import CryptoJS from 'crypto-js'
import {Box, Button, Text} from '@sanity/ui'
import highlight from 'highlight.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const htmlVisualEditorSchema = {
  title: 'HTML Visual Editor',
  name: 'htmlVisualEditorSchema',
  type: 'object',
  fields: [
    {
      name: 'html',
      title: 'HTML Code',
      type: 'string',
    },
  ],
}

const encryptHtml = (html: string, secret: string): string => {
  return CryptoJS.AES.encrypt(html, secret).toString()
}

// Decryption function
const decryptHtml = (encryptedHtml: string, secret: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedHtml, secret)
  return bytes.toString(CryptoJS.enc.Utf8)
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
  'background',
  'align',
  'direction',
]

const Editor = React.forwardRef<ReactQuill, any>((props: StringInputProps, ref) => {
  const {onChange, value = ''} = props
  const handleChange = useCallback(
    ({content}: any) => onChange(content ? set(content) : unset()),
    [onChange],
  )
  let apiKey
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
    apiKey = process.env.NEXT_PUBLIC_PRIVATE_READ_TOKEN
  }, [])
  const [encryptedHtml, setEncryptedHtml] = useState('')
  const [pureHtml, setPureHtml] = useState<any>('')
  const modules = useMemo(
    () => ({
      toolbar: [
        [{header: [2, 3, 4, 5, 6, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{list: 'ordered'}, {list: 'bullet'}],
        [{align: []}],
        ['link'],
        ['clean'],
      ],

      syntax: {
        highlight: (text: string) => {
          return highlight.highlightAuto(text).value
        },
      },
      clipboard: {
        matchVisual: false,
      },
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true,
      },
    }),
    [],
  )
  if (isClient) {
    return (
      <div className=" grid-cols-6 grid-flow-row">
        <ReactQuill
          ref={ref}
          value={decryptHtml(value, 'apiKey')}
          onChange={(content) => {
            setEncryptedHtml(encryptHtml(content, 'apiKey'))
            handleChange({
              content: encryptHtml(content, 'apiKey'),
            })
          }}
          modules={modules}
          formats={formats}
        />
        <div className="min-w-full w-64 overflow-hidden"></div>
        <Box padding={4}>{pureHtml && <Text>{pureHtml}</Text>}</Box>

        <Button onClick={() => alert(encryptedHtml ? encryptedHtml : value)}>Encrypted Data</Button>
        <Button
          onClick={() => {
            const decrypt: string = decryptHtml(value, 'apiKey')
            setPureHtml(decrypt)
          }}
          tone="primary"
        >
          Decrypt
        </Button>
        {pureHtml !== '' && (
          <>
            <Button tone="critical" onClick={() => setPureHtml('')}>
              Clear
            </Button>
          </>
        )}
      </div>
    )
  } else return <div>Loading...</div>
})

export default Editor
