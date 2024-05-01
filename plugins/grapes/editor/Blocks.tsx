import { Component, Editor } from 'grapesjs'
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

  const addedPosts = new Set()

  editor.on('load', async () => {
    // This set tracks added posts to prevent duplicates

    // Define a block for the container of all blog posts
    editor.BlockManager.add('blog-posts-container', {
      label: 'All Blog Posts',
      content: {
        tagName: 'section',
        classes: ['container', 'px-5', 'py-24', 'mx-auto', 'flex', 'flex-wrap', '-m-4'],
        attributes: { id: 'all-blog-posts' },
      },
      attributes: {
        class: 'fa fa-newspaper-o',
      },
      category: 'Blog',
    })

    // Fetch and display all blog posts
  })

  editor.on('component:add', (component: Component) => {
    // Check if the component is the blog posts container
    if (component.get('id') === 'blog-posts-container') {
      const container = editor.getWrapper()?.find('#all-blog-posts')[0]

      client &&
        client.fetch('*[_type == "blog"][0..5]').then((blogPosts: any) => {
          blogPosts.map((post: any, i: number) => {
            if (!addedPosts.has(post._id)) {
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
              container?.append(postContent)
              addedPosts.add(post._id)
              editor.BlockManager.add(post._id, {
                label: post.title,
                content: postContent,
                category: 'Blog',
              })
            }
          })
        })
    }
  })
  client &&
    client.fetch('*[_type == "globalBlocks"]').then((blocks: any) => {
      // Initialize your GrapesJS editor here
      // and load the blocks into the editor
      if (blocks.length === 0) return
      blocks.forEach((block: any) => {
        editor.BlockManager.add(block.id, {
          label: 'Global Block - ' + block.title,
          content: block.globalContent,
          category: 'Global Blocks',
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
    content:
      '<section><h2>This is a simple section</h2><p>And this is a paragraph within the section</p></section>',
    category: 'Basic',
  })
}
