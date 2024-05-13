import { Editor } from 'grapesjs'
import imageUrlBuilder from '@sanity/image-url'
import urlBuilder from '@sanity/image-url'

export const useBlocks = async (editor: Editor, client: any) => {
  if (!editor) return

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
      content:
        '<section><h2>This is a simple section</h2><p>And this is a paragraph within the section</p></section>',
      category: 'Basic',
    })

    editor.BlockManager.add('text-block', {
      label: 'Text',
      content: '<div data-gjs-type="text">Insert your text here</div>',
      category: 'Basic',
    })

    editor.BlockManager.add('section-block', {
      label: 'Section',
      content: {
        tagName: 'section',
        classes: ['container', 'px-5', 'py-24', 'mx-auto', 'flex', 'flex-wrap', 'm-4'],
        attributes: { id: 'all-blog-posts' },
      },
      category: 'Basic',
    })

    editor.BlockManager.add('image-block', {
      label: 'Image',
      content: '<img src="https://via.placeholder.com/400">',
      category: 'Basic',
    })

    editor.BlockManager.add('button-block', {
      label: 'Button',
      content:
        '<div class="p-2 w-full"><button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button></div>',
      category: 'Basic',
    })
    // Define a block for the container of all blog posts
    editor.BlockManager.add('blog-posts-container', {
      label: 'All Blog Posts',
      content: {
        tagName: 'section',
        classes: ['container', 'px-5', 'py-24', 'mx-auto', 'flex', 'flex-wrap', 'm-4'],
        attributes: { id: 'all-blog-posts' },
      },
      attributes: {
        class: 'fa fa-newspaper-o',
      },
      category: 'Blog',
    })

    // ... (your existing code for loading global blocks)

    // Add Tailwind components
    ;[
      {
        id: 'blog-hero',
        label: 'Hero Section',
        html: '<section class="bg-gradient-to-br from-purple-200 to-pink-200 py-20 text-center"> <h1 class="text-5xl font-extrabold text-gray-900 mb-4">{{ title }}</h1><p class="text-xl text-gray-700">{{ excerpt }}</p></section>',
      },
      {
        id: 'blog-post-card',
        label: 'Post Card',
        html: '<div class="bg-white shadow-md rounded-lg overflow-hidden"> <img src="{{ thumbnail.asset.url }}" alt="{{ title }}" class="w-full h-64 object-cover" /><div class="p-6"> <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ title }}</h2> <p class="text-gray-700 mb-4">{{ excerpt }}</p> <a href="/post/{{ slug.current }}" class="text-indigo-500 hover:underline">Read more</a></div></div>',
      },
      {
        id: 'blog-content',
        label: 'Content Section',
        html: '<article class="prose lg:prose-xl max-w-none">{{ content }}</article>',
      },
      {
        id: 'call-to-action',
        label: 'Call to Action',
        html: '<div class="bg-indigo-500 text-white py-8 px-12 text-center rounded-lg"> <h2 class="text-3xl font-bold mb-4">Subscribe to our newsletter</h2> <p class="text-lg mb-6">Get the latest updates and exclusive content delivered straight to your inbox.</p> <input type="email" placeholder="Your email address" class="py-3 px-4 rounded-l-md border-r-0" /> <button class="bg-indigo-600 hover:bg-indigo-700 py-3 px-6 rounded-r-md">Subscribe</button></div>',
      },
      {
        id: 'blog-footer',
        label: 'Footer',
        html: '<footer class="bg-gray-800 py-8 text-center text-white"> <p>© 2023 Your Blog Name</p> </footer>',
      },
      {
        id: 'author-bio',
        label: 'Author Bio',
        html: '<div class="flex items-center mt-8"> <img src="{{ authorImage.asset.url }}" alt="Author Image" class="w-12 h-12 rounded-full mr-4"> <div> <h3 class="text-lg font-medium text-gray-900">{{ authorName }}</h3> <p class="text-gray-600">{{ authorBio }}</p> </div></div>',
      },
      {
        id: 'related-posts',
        label: 'Related Posts',
        html: '<section class="mt-12"> <h2 class="text-2xl font-semibold text-gray-900 mb-4">Related Posts</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> </div></section>',
      },
    ].forEach((component: any) => {
      let content = component.html

      // Replace placeholders with actual blog post data (if available)
      // if (blogPost) {
      //   content = content.replace(/{{ title }}/g, blogPost.title || '')
      //   content = content.replace(/{{ excerpt }}/g, blogPost.excerpt || '')
      //   content = content.replace(
      //     /{{ thumbnail.asset.url }}/g,
      //     blogPost.thumbnail?.asset?.url || '',
      //   )
      //   content = content.replace(
      //     /{{ authorImage.asset.url }}/g,
      //     blogPost.authorImage?.asset?.url || '',
      //   )
      //   content = content.replace(/{{ authorName }}/g, blogPost.authorName || '')
      //   content = content.replace(/{{ authorBio }}/g, blogPost.authorBio || '')
      //   // ... (replace other placeholders as needed)
      // }

      editor.BlockManager.add(component.id, {
        label: component.label,
        content: content,
        category: 'Tailwind Components', // You can customize the category
      })
    })

    await client.fetch('*[_type == "blog"][0..5]').then((blogPosts: any) => {
      blogPosts.map((post: any, i: number) => {
        const postContent = `
          <div class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${urlBuilder(post.thumbnail)}" alt="${post.title}">
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
