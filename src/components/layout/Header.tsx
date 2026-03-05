import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useCopy } from '@/context/LanguageContext'
import { CONTACT_PHONE_LINK } from '@/config/site'

const navConfig = [
  { key: 'services', to: '/services' },
  { key: 'serviceAreas', to: '/service-areas' },
  { key: 'maintenancePlans', to: '/maintenance-plans' },
  { key: 'financing', to: '/financing' },
  { key: 'commercial', to: '/commercial-hvac' },
  { key: 'blog', to: '/blog' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' }
] as const

export const Header = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const copy = useCopy()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3 text-brand-dark">
          <div className="rounded-full bg-brand-primary/10 p-2 text-brand-primary">MGM</div>
          <div>
            <p className="text-lg font-bold">MGM A/C Appliances</p>
            <p className="text-xs text-slate-500">{copy.header.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:mr-6 lg:flex lg:flex-1">
          {navConfig.map(({ key, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn('text-sm font-semibold text-slate-600 hover:text-brand-primary', isActive && 'text-brand-primary')
              }
            >
              {copy.header.nav[key]}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Button size="sm" onClick={() => navigate('/booking')}>
            {copy.header.schedule}
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle navigation">
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navConfig.map(({ key, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn('rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-brand-light', isActive && 'bg-brand-light text-brand-primary')
                }
                onClick={() => setOpen(false)}
              >
                {copy.header.nav[key]}
              </NavLink>
            ))}
            <LanguageSwitcher variant="drawer" />
            <Button onClick={() => navigate('/booking')}>{copy.header.schedule}</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
