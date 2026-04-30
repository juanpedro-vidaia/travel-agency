import posts, { type Post, type PostCategory } from '@/lib/data/posts'

function activePosts(): Post[] {
  return posts.filter((post) => post.active)
}

export function getAllPosts(): Post[] {
  return activePosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  return activePosts().find((post) => post.slug === slug)
}

export function getRecentPosts(count: number): Post[] {
  return getAllPosts().slice(0, count)
}

export function getFeaturedPost(): Post | undefined {
  return activePosts().find((post) => post.featured)
}

export function getPostsByCategory(category: PostCategory): Post[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getRelatedPosts(slug: string, count = 3): Post[] {
  const post = getPostBySlug(slug)
  if (!post) return []
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, count)
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

