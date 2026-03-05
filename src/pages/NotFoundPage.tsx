import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export const NotFoundPage = () => (
  <div className="bg-white py-20">
    <Helmet>
      <title>Page Not Found | MGM A/C Appliances</title>
    </Helmet>
    <div className="container text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">404</p>
      <h1 className="mt-2 text-4xl font-bold text-brand-dark">The air here is empty.</h1>
      <p className="mt-4 text-slate-600">Let’s get you back to cool.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-brand-primary px-6 py-3 font-semibold text-white">
        Return home
      </Link>
    </div>
  </div>
)
