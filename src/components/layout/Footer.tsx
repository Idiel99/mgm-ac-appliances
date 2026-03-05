import { Link } from 'react-router-dom'

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'AC Repair', to: '/services/ac-repair' },
      { label: 'AC Installation', to: '/services/ac-installation' },
      { label: 'Maintenance Plans', to: '/maintenance-plans' },
      { label: 'Commercial HVAC', to: '/commercial-hvac' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Careers', to: '/contact' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' }
    ]
  }
]

export const Footer = () => (
  <footer className="bg-brand-dark text-white">
    <div className="container grid gap-10 py-12 md:grid-cols-4">
      <div className="space-y-3">
        <p className="text-xl font-bold">MGM A/C Appliances</p>
        <p className="text-sm text-white/80">
          South Florida’s enterprise HVAC partner for Miami, Fort Lauderdale, Orlando and Tampa. Fully insured crews
          backed by 24/7 dispatch.
        </p>
        <p className="text-sm text-white/80">Fully insured • BBB A+</p>
      </div>

      {footerLinks.map((section) => (
        <div key={section.title}>
          <p className="text-lg font-semibold">{section.title}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-white/10 py-4 text-center text-xs text-white/70">
      © {new Date().getFullYear()} MGM A/C Appliances — All rights reserved.
    </div>
  </footer>
)
