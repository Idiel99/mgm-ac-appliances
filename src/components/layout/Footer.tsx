import { Link } from 'react-router-dom'
import { useCopy } from '@/context/LanguageContext'

const footerLinks = [
  {
    titleKey: 'services',
    links: [
      { labelKey: 'acRepair', to: '/services/ac-repair' },
      { labelKey: 'acInstallation', to: '/services/ac-installation' },
      { labelKey: 'maintenancePlans', to: '/maintenance-plans' },
      { labelKey: 'commercial', to: '/commercial-hvac' }
    ]
  },
  {
    titleKey: 'company',
    links: [
      { labelKey: 'about', to: '/about' },
      { labelKey: 'blog', to: '/blog' },
      { labelKey: 'gallery', to: '/gallery' },
      { labelKey: 'careers', to: '/contact' }
    ]
  },
  {
    titleKey: 'legal',
    links: [
      { labelKey: 'privacy', to: '/privacy' },
      { labelKey: 'terms', to: '/terms' }
    ]
  }
] as const

export const Footer = () => {
  const copy = useCopy()

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-xl font-bold">MGM A/C Appliances</p>
          <p className="text-sm text-white/80">{copy.footer.description}</p>
          <p className="text-sm text-white/80">{copy.footer.bottomLine}</p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.titleKey}>
            <p className="text-lg font-semibold">{copy.footer.sections[section.titleKey]}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {section.links.map((link) => (
                <li key={link.labelKey}>
                  <Link to={link.to} className="hover:text-white">
                    {copy.footer.links[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} MGM A/C Appliances — {copy.footer.bottomLine}
      </div>
    </footer>
  )
}
