import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileCTA } from './MobileCTA'

export const AppShell = () => {
  const location = useLocation()
  const hideMobileCTA = location.pathname.startsWith('/booking')

  return (
    <div className="flex min-h-screen flex-col bg-brand-light">
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      {!hideMobileCTA && <MobileCTA />}
    </div>
  )
}
