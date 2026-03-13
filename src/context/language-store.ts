import { createContext } from 'react'
import type { Language } from '@/i18n/copy'

export interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)
