import { type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/structure'
import MyEditor from './grapes'
import { CogIcon } from '@sanity/icons'
import { list } from 'postcss'

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (
        prev: any[],
        { creationContext }: { creationContext: { type: string } },
      ) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem: { templateId: string }) =>
              !types.includes(templateItem.templateId),
          )
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev: any[], { schemaType }: { schemaType: string }) => {
        if (types.includes(schemaType)) {
          return prev.filter(
            ({ action }: { action: string }) => action !== 'duplicate',
          )
        }

        return prev
      },
    },
  }
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[],
): StructureResolver => {
  return (S) => {
    const singletonItems = typeDefArray.map((typeDef) => {
      if (typeDef.name === 'page') {
        // Assuming 'page' is where we want to use MyEditor
        return S.listItem()
          .title(typeDef.title!)
          .icon(typeDef.icon)
          .child(
            S.editor()
              .id(typeDef.name)
              .schemaType(typeDef.name)
              .documentId(typeDef.name)
              .views([
                S.view.component(MyEditor).title('Edit').icon(CogIcon),
                S.view.form(),
              ]),
          )
      }

      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        )
    })

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find((singleton) => singleton.name === listItem.getId()),
    )

    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultListItems])
  }
}
