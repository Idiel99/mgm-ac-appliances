import { useLanguage, useCopy } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'drawer'
}

export const LanguageSwitcher = ({ variant = 'desktop' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage()
  const copy = useCopy()
  const isDrawer = variant === 'drawer'

  return (
    <div className={cn('flex items-center gap-2', isDrawer ? 'mt-4' : '')}>
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{copy.header.languageLabel}</span>
      <div className="inline-flex rounded-full border border-slate-200">
        {(['en', 'es'] as const).map((lang) => (
          <button
            key={lang}
            className={cn(
              'px-3 py-1 text-xs font-semibold',
              language === lang ? 'rounded-full bg-brand-primary text-white' : 'text-brand-dark'
            )}
            onClick={() => setLanguage(lang)}
            type="button"
          >
            {copy.header.options[lang]}
          </button>
        ))}
      </div>
    </div>
  )
}
