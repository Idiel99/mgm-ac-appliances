import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPostBySlug } from '@/content'

const placeholderParagraph = `Florida HVAC systems battle humidity, salt air and nonstop runtime. We design posts to educate homeowners on preventative steps, financing tips and upgrade pathways.`

export const BlogPostPage = () => {
  const { postSlug } = useParams()
  const post = getPostBySlug(postSlug)

  if (!post) {
    return (
      <div className="bg-white py-14">
        <div className="container">
          <p className="text-3xl font-semibold text-brand-dark">Article not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>{post.title} | MGM A/C Appliances</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <article className="container prose max-w-3xl prose-headings:text-brand-dark prose-p:text-slate-600">
        <p className="text-sm uppercase tracking-wide text-brand-primary">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="text-sm text-slate-500">
          {post.date} • {post.author} • {post.readingTime}
        </p>
        <p>{post.excerpt}</p>
        {[...Array(5)].map((_, index) => (
          <p key={index}>{placeholderParagraph}</p>
        ))}
      </article>
    </div>
  )
}
