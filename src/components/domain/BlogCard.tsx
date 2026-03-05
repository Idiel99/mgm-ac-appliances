import { Link } from 'react-router-dom'
import type { PostItem } from '@/content/types'

interface BlogCardProps {
  post: PostItem
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
    <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">{post.category}</p>
    <h3 className="mt-2 text-2xl font-semibold text-brand-dark">{post.title}</h3>
    <p className="mt-3 text-slate-600">{post.excerpt}</p>
    <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
      {post.date} • {post.author} • {post.readingTime}
    </p>
    <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-1 font-semibold text-brand-primary">
      Read article →
    </Link>
  </article>
)
