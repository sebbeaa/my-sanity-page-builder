import { client } from '../api'

export const fetchBlogPosts = async () => {
  const query = '*[_type == "blogPost"][0...5]'
  const clientConfig = client.withConfig({
    perspective: 'raw',
  })
  const blogPosts = await clientConfig.fetch(query)
  return blogPosts
}

const subscribeToBlogPosts = (onUpdate: (posts: any[]) => void) => {
  const query = '*[_type == "blog"][0...5]'
  const clientConfig = client.withConfig({
    perspective: 'previewDrafts',
  })
  const subscription = clientConfig.listen(query).subscribe((update) => {
    fetchBlogPosts().then(onUpdate)
  })

  return () => subscription.unsubscribe()
}

export default subscribeToBlogPosts
