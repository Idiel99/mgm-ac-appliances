import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { copy, type Language } from '@/i18n/copy'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>('en')

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

export const useCopy = () => {
  const { language } = useLanguage()
  return copy[language]
}
