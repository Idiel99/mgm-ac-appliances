import { Link } from 'react-router-dom'
import { useCopy } from '@/context/LanguageContext'
import { CONTACT_PHONE_LINK } from '@/config/site'

export const MobileCTA = () => {
  const copy = useCopy()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,42,68,0.08)] backdrop-blur lg:hidden">
      <div className="flex gap-3">
        <a
          href={CONTACT_PHONE_LINK}
          className="flex-1 rounded-full border border-brand-primary px-5 py-3 text-center text-base font-semibold text-brand-primary"
        >
          {copy.header.callNow}
        </a>
        <Link to="/booking" className="flex-1 rounded-full bg-brand-primary px-5 py-3 text-center text-base font-semibold text-white">
          {copy.header.schedule}
        </Link>
      </div>
    </div>
  )
}
