import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Services', to: '/services' },
  { label: 'Service Areas', to: '/service-areas' },
  { label: 'Maintenance Plans', to: '/maintenance-plans' },
  { label: 'Financing', to: '/financing' },
  { label: 'Commercial HVAC', to: '/commercial-hvac' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 text-brand-dark">
          <div className="rounded-full bg-brand-primary/10 p-2 text-brand-primary">MGM</div>
          <div>
            <p className="text-lg font-bold">MGM A/C Appliances</p>
            <p className="text-xs text-slate-500">Enterprise Service</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn('text-sm font-semibold text-slate-600 hover:text-brand-primary', isActive && 'text-brand-primary')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="secondary" size="sm" onClick={() => (window.location.href = 'tel:+13055550100')}>
            Call 305-555-0100
          </Button>
          <Button size="sm" onClick={() => (window.location.href = '/booking')}>
            Schedule Service
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle navigation">
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn('rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-brand-light', isActive && 'bg-brand-light text-brand-primary')
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Button onClick={() => (window.location.href = '/booking')}>Schedule Service</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
