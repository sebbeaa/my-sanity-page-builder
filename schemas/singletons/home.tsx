import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { MyEditor } from '../../plugins/grapes'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'homeContent',
      type: 'content',
      title: 'Home Content',
      components: {
        input: (props) => {
          return <MyEditor {...props} documentType={props.schemaType.name} />
        },
      },
      hidden: false,
    }),
    defineField({
      name: 'title',
      type: 'string',

      initialValue: 'Home',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})
