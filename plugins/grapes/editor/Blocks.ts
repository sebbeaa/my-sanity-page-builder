import { Editor } from 'grapesjs'
import { TailWindBlogComponents } from '../components/tailwindBlog'
import { client } from '../api'
import ImageUrlBuilder from '@sanity/image-url'
import { decryptString } from '../../crypt/encryption'

export const blocks = async (editor: Editor) => {
  if (!editor) return

  const builder = ImageUrlBuilder(client)

  function urlFor(source: any) {
    return builder.image(source)
  }

  const allBlocks = editor?.BlockManager.getAll()

  // Filter blocks that belong to the 'Blog' category
  const blogBlocks = allBlocks.filter((block: any) => block.get('category').id === 'Blog')

  // Remove each block found
  blogBlocks.forEach((block) => {
    editor.BlockManager.remove(block.id as string)
  })

  let addedPosts = new Set()

  editor.Blocks.add('iframe-block', {
    label: 'iFrame',
    content: `
       <div height="min-content">
      
      <iframe class="container min-h-48 mx-auto" src="https://example.com" width="100%" height="300px"></iframe>
        </div>
      `,
    category: 'Basic',
    // media:
    //   '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zm-1 17h-5v-2h5v2zm0-4h-5v-2h5v2zm0-4h-5V9h5v2zm-8 8H4v-2h7v2zm0-4H4v-2h7v2zm0-4H4V9h7v2zm-4-6h2v2h-2V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm-4-8h2v2h-2V9zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/></svg>',
  })

  editor.Blocks.add('button-block', {
    label: 'Button',
    content: `
        <section class="container px-5 py-24 mx-auto flex flex-wrap m-4 place-items-center justify-center">
          <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Button
          </button>
        </section>
      `,
    category: 'Basic',
  })

  TailWindBlogComponents.forEach((component) => {
    editor.BlockManager.add(component.id, {
      label: component.label,
      content: component.html(),
      category: 'Extra Blocks',
    })
  })

  editor.on('load', async () => {
    if (client) {
      await client.fetch('*[_type == "globalBlocks"]').then((blocks: any) => {
        // Initialize your GrapesJS editor here
        // and load the blocks into the editor
        if (!blocks) return
        if (blocks.length === 0) return
        blocks.forEach(async (block: any) => {
          if (!block.content) return
          editor.BlockManager.add(block.id, {
            label: 'Global Block - ' + block.title,
            content: await decryptString(block.content.html),
            category: 'Global Blocks',
          })
        })
      })

      await client.fetch('*[_type == "prod"]').then((res) => {
        if (!res) return
        // Store the syncTags and "render" the data
        const blogPosts = res.result
        if (!blogPosts?.url) return
        blogPosts.map((post: any, i: number) => {
          const postContent = `
          <div class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${urlFor(post.thumbnail)}" alt="${post.title}">
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${post.title}</h1>
                <p class="leading-relaxed mb-3">${post.excerpt}</p>
                <a href="/post/${post.slug.current}" class="text-indigo-500 inline-flex items-center">Read More</a>
              </div>
            </div>
          </div>
        `
          editor.BlockManager.add(post._id, {
            label: post.title,
            content: postContent,
            category: 'Blog',
          })
          if (!addedPosts.has(post._id)) {
            container?.append(postContent)
            addedPosts.add(post._id)
          }
        })

        const container = editor.getWrapper()?.find('#all-blog-posts')[0]
      })

      await client.fetch('*[_type == "globalBlocks"]').then((blocks: any) => {
        if (!blocks) return
        // Initialize your GrapesJS editor here
        // and load the blocks into the editor
        if (blocks.length === 0) return
        blocks.forEach(async (block: any) => {
          if (!block.content) return
          editor.BlockManager.add(block.id, {
            label: 'Global Block - ' + block.title,
            content: await decryptString(block.content.html),
            category: 'Global Blocks',
            media: await decryptString(block.content),
          })
        })
      })

      // Tailwind Components
    }
  })
}
