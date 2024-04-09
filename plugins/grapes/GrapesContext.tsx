//@ts-nocheck
import {createContext, useContext, useEffect, useRef, ReactNode, useMemo} from 'react'
import grapesjs from 'grapesjs'
import {Editor} from 'grapesjs'
import plugin from 'grapesjs-tailwind'
import 'grapesjs/dist/css/grapes.min.css'

interface EditorContextType {
  editor: Editor | null
  editorRef: React.RefObject<HTMLDivElement>
  onChange: (html: string) => void
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within a EditorProvider')
  }
  return context
}

interface EditorProviderProps {
  children: ReactNode
  value: string
  onChange: (html: string) => void
}

export const EditorProvider: React.FC<EditorProviderProps> = ({children, value, onChange}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const editor = useRef<Editor | null>(null)

  useEffect(() => {
    if (!editor.current && editorRef.current) {
      editor.current = grapesjs.init({
        container: editorRef.current,
        plugins: [plugin],
        pluginsOpts: {
          [plugin]: {},
        },
        components: value,
      })

      // Custom logic for editor instance
      // Setup commands, panels, etc., here

      return () => {
        editor.current?.destroy()
        editor.current = null
      }
    }
  }, [value])

  const contextValue = useMemo(
    () => ({
      editor: editor.current,
      editorRef,
      onChange,
    }),
    [onChange],
  )

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>
}
