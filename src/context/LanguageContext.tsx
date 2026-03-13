import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import type { Language } from '@/i18n/copy'
import { LanguageContext } from './language-store'

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>('en')

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}
