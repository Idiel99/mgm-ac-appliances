import type { PostItem } from '@/content/types'
import { BlogCard } from './BlogCard'

interface BlogGridProps {
  posts: PostItem[]
}

export const BlogGrid = ({ posts }: BlogGridProps) => (
  <div className="grid gap-6 md:grid-cols-2">
    {posts.map((post) => (
      <BlogCard key={post.slug} post={post} />
    ))}
  </div>
)
