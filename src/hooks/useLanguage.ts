import { useContext } from 'react'
import { LanguageContext } from '@/context/language-store'
import { copy, type Language } from '@/i18n/copy'

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

export const useCopy = () => {
  const { language } = useLanguage()
  return copy[language as Language]
}
