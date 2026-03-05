import { Helmet } from 'react-helmet-async'
import { posts } from '@/content'
import { BlogGrid } from '@/components/domain/BlogGrid'

export const BlogPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>HVAC Blog | MGM A/C Appliances</title>
      <meta name="description" content="Guides on Florida HVAC maintenance, humidity control and energy optimization." />
    </Helmet>
    <div className="container space-y-6">
      <header>
        <p className="section-title">HVAC Learning Center</p>
        <p className="section-subtitle">Actionable insights for Florida homeowners, HOAs and facility managers.</p>
      </header>
      <BlogGrid posts={posts} />
    </div>
  </div>
)
