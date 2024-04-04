import './styles.css'
import React, {useState} from 'react'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import CryptoJS from 'crypto-js'
import {Box, Button, Dialog, Flex, Select} from '@sanity/ui'
import {StringInputProps, set, useClient} from 'sanity'
import {
  FiBold,
  FiItalic,
  FiCode,
  FiMinus,
  FiType,
  FiMinimize,
  FiMaximize,
  FiPlusSquare,
} from 'react-icons/fi'
import {BsTypeH2, BsTypeH3, BsTypeH4, BsTypeH5, BsTypeH6} from 'react-icons/bs'
import {AiOutlineOrderedList, AiOutlineUnorderedList} from 'react-icons/ai'
import styled from 'styled-components'
import {GridLayout} from './GridExtension'
import {GridItem} from './GridItem'

import {Extension} from '@tiptap/core'

export interface GridItemExtensionOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gridItemExtension: {
      /**
       * Append a grid item to the grid layout
       */
      appendGridItem: () => ReturnType
    }
  }
}

export const GridItemExtension = Extension.create<GridItemExtensionOptions>({
  name: 'gridItemExtension',

  addCommands() {
    return {
      appendGridItem:
        () =>
        ({chain}) => {
          return chain()
            .insertContent({
              type: 'gridItem',
              content: [{type: 'paragraph', content: [{type: 'text', text: 'New Grid Item'}]}],
            })
            .run()
        },
    }
  },
})

// Usage inside EncryptedTiptapEditor component
const FancyButton = styled(Button)`
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`

const AppendGridItemButton = ({editor}: {editor: ReturnType<typeof useEditor>}) => {
  return (
    <FancyButton
      onClick={() => editor?.commands.appendGridItem()}
      icon={FiPlusSquare}
      text="Append Grid Item"
      tone="primary"
    />
  )
}

const insertGridLayout = (editor: any, columns: number) => {
  const gridItems = Array.from({length: columns}, () => ({
    type: 'gridItem',
    content: [{type: 'paragraph', content: [{type: 'text', text: 'Box Item'}]}],
  }))

  const gridLayout = {
    type: 'gridLayout',
    content: gridItems,
  }

  editor.commands.insertContent(gridLayout)
}

// Function to insert a new grid item into an existing grid layout
const insertBoxItem = (editor: any) => {
  const boxI = {
    type: 'gridItem',
    content: [{type: 'paragraph', content: [{type: 'text', text: 'Section'}]}],
  }

  editor.commands.insertContent(boxI)
}

const insertImageItem = (editor: any, src: any) => {
  const imageI = {
    type: 'imageItem',
    attrs: {
      src,
    },
  }

  editor.commands.insertContent(imageI)
}
interface EncryptedTiptapEditorProps extends StringInputProps {
  fullscreen: boolean
  setFullscreen: (fullscreen: boolean) => void
}

const EditorContainer = styled.div`
  .ProseMirror {
    min-height: 100%; /* Minimum height */
    max-height: min-content; /* Maximum height before scrolling */
    overflow-y: auto; /* Enable vertical scrolling *
    border: 1px solid var(--card-border-color); /* Border color */
  }
`

const DialogContainer = styled.div`
  overflow: hidden;
`
const secretKey: null | string = process.env.SANITY_PRIVATE_KEY || null

TextAlign.configure({
  defaultAlignment: 'left',
})

const Toolbar = ({editor, handleGridInsert, handleFileChange}: any) => {
  if (editor)
    return (
      <Flex wrap="wrap" gap={2} marginBottom={2}>
        {/* Heading 2 */}
        <Button
          icon={BsTypeH2}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
        />
        {/* Heading 3 */}
        <Button
          icon={BsTypeH3}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
        />
        {/* Heading 4 */}
        <Button
          icon={BsTypeH4}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
        />
        {/* Heading 5 */}
        <Button
          icon={BsTypeH5}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
        />
        {/* Heading 6 */}
        <Button
          icon={BsTypeH6}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
        />

        {/* Bold */}
        <Button
          icon={FiBold}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        {/* Italic */}
        <Button
          icon={FiItalic}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        {/* Strike */}
        <Button
          icon={FiMinus}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        {/* Code */}
        <Button
          icon={FiCode}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleCode().run()}
        />
        {/* Bullet List */}
        <Button
          icon={AiOutlineUnorderedList}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        {/* Ordered List */}
        <Button
          icon={AiOutlineOrderedList}
          mode="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <Button
          mode="ghost"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({textAlign: 'left'}) ? 'is-active' : ''}
        >
          left
        </Button>
        <Button
          mode="ghost"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({textAlign: 'center'}) ? 'is-active' : ''}
        >
          center
        </Button>
        <Button
          mode="ghost"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({textAlign: 'right'}) ? 'is-active' : ''}
        >
          right
        </Button>
        <Button
          mode="ghost"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({textAlign: 'justify'}) ? 'is-active' : ''}
        >
          justify
        </Button>
        <Button mode="ghost" onClick={() => editor.chain().focus().unsetTextAlign().run()}>
          unsetTextAlign
        </Button>

        {/* Horizontal Rule */}
        <Button
          icon={FiMinus}
          mode="ghost"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        {/* Hard Break */}
        <Button
          icon={FiType}
          mode="ghost"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        />

        <Button mode="ghost" onClick={() => insertBoxItem(editor)}>
          insert section
        </Button>
        <input title="media" type="file" onChange={handleFileChange} accept="image/*" />

        <Select width={2} defaultValue={'2'} onChange={handleGridInsert} fontSize={2}>
          <option value="2">2 Columns</option>
          <option value="3">3 Columns</option>
          <option value="4">4 Columns</option>
        </Select>
      </Flex>
    )
}

const Editor: React.FC<EncryptedTiptapEditorProps> = ({value, onChange}) => {
  const [fullscreen, setFullscreen] = useState(false)
  const client = useClient()

  // Encrypt content function
  const encryptHtml = (html: string): string =>
    CryptoJS.AES.encrypt(html, typeof secretKey === 'string' ? secretKey : '').toString()

  // Decrypt content function
  const decryptHtml = (encryptedHtml: string): string => {
    if (!encryptedHtml) return ''
    const bytes = CryptoJS.AES.decrypt(
      encryptedHtml,
      typeof secretKey === 'string' ? secretKey : '',
    )
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      GridLayout,
      GridItem,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    onUpdate: ({editor}) => {
      const html = editor.getHTML()
      // Encrypt content as you type and trigger onChange for saving as draft
      onChange(set(encryptHtml(html)))
    },
    content: value ? decryptHtml(value) : '',
    editable: true, // Make it editable only if in decrypted view
  })

  const handleGridInsert = (event: any) => {
    const columns = parseInt(event.target.value, 10)
    insertGridLayout(editor, columns)
  }

  const encryptFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (event) {
        const binaryStr = event.target?.result
        if (typeof binaryStr === 'string') {
          const encrypted = CryptoJS.AES.encrypt(binaryStr, 'your-secret-key').toString()
          resolve(encrypted)
        } else {
          reject(new Error('File reading failed'))
        }
      }
      reader.onerror = function (error) {
        reject(error)
      }
      reader.readAsBinaryString(file)
    })
  }

  const uploadEncryptedFile = async (encrypted: string, fileName: string) => {
    const byteCharacters = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted))
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], {type: 'application/octet-stream'})
    const file = new File([blob], fileName)

    return await client.assets.upload('file', file, {
      filename: fileName,
    })
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const encrypted = await encryptFile(file)
        const asset = await uploadEncryptedFile(encrypted, file.name)
        insertImageItem(editor, asset?.url ? (asset.url as any) : '')
        // editor?.chain().focus().setNode('encryptedImage', {src: asset}).run()
        // Handle the uploaded asset as needed, e.g., store its reference in the current document
      } catch (error) {
        console.error('Error uploading encrypted file:', error)
      }
    }
  }

  const showAlertWithHtml = () => {
    if (editor) {
      const html = editor.getHTML()
      alert(html) // Shows the current HTML content
    }
  }

  // Helper function to manually trigger an update (e.g., for a 'Save' button)
  const saveContent = () => {
    if (!editor) return
    const html = editor.getHTML()
    onChange(set(encryptHtml(html))) // Manually trigger encryption and save
  }

  return (
    <>
      {fullscreen ? (
        <Dialog
          header="Fullscreen Editor"
          id="fullscreen-editor"
          onClose={() => setFullscreen(false)}
          width={'auto'}
          controls={false}
          height={'stretch'}
          open={true}
          scrolling="hidden"
          animate={true}
          __unstable_hideCloseButton
        >
          <DialogContainer>
            <Box overflow={'hidden'} style={{overflow: 'hidden'}} id="box" padding={4}>
              <Toolbar
                editor={editor}
                handleGridInsert={handleGridInsert}
                handleFileChange={handleFileChange}
              />

              <EditorContainer>
                <div className="h-full w-full">
                  <EditorContent editor={editor} />
                  <Button
                    icon={FiMinimize}
                    mode="bleed"
                    onClick={() => setFullscreen(false)}
                    style={{position: 'static', bottom: '0', left: '0'}}
                  />
                </div>
              </EditorContainer>
            </Box>
          </DialogContainer>
        </Dialog>
      ) : (
        <>
          <Toolbar
            editor={editor}
            handleGridInsert={handleGridInsert}
            handleFileChange={handleFileChange}
          />
          <EditorContainer>
            <EditorContent editor={editor} />
            <Button
              icon={FiMaximize}
              mode="bleed"
              onClick={() => setFullscreen(true)}
              style={{marginTop: '12px'}}
            />
          </EditorContainer>
          <Flex gap={2} marginTop={2}>
            <Button onClick={showAlertWithHtml} text="Show HTML" tone="primary" />
            <Button onClick={saveContent} text="Save Content" tone="primary" />
          </Flex>
        </>
      )}
    </>
  )
}

export default Editor
