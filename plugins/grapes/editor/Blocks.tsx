import { Editor } from 'grapesjs'
import imageUrlBuilder from '@sanity/image-url'

export const useBlocks = async (editor: Editor, client: any) => {
  if (!editor) return
  const builder = imageUrlBuilder(client)

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

  editor.on('load', async () => {
    // This set tracks added posts to prevent duplicates
    client &&
      client.fetch('*[_type == "globalBlocks"]').then((blocks: any) => {
        // Initialize your GrapesJS editor here
        // and load the blocks into the editor
        if (blocks.length === 0) return
        blocks.forEach((block: any) => {
          editor.BlockManager.add(block.id, {
            label: block.title,
            content: block.content.html,
            category: 'Global Block - ' + block.title,
          })
        })
      })
    editor.BlockManager.add('text-block', {
      label: 'Text',
      content: '<div data-gjs-type="text">Insert your text here</div>',
      category: 'Basic',
    })

    editor.BlockManager.add('section-block', {
      label: 'Section',
      content: '<section><div class="container bg-zinc-400 h-40"></div></section>',
      category: 'Basic',
    })
    // Define a block for the container of all blog posts

    await client.fetch('*[_type == "blog"][0..5]').then((blogPosts: any) => {
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
      })

      // Fetch and display all blog posts
    })
  })
}
