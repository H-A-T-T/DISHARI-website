'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Language } from '@/types'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bn',
  setLang: () => {},
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('bn')

  useEffect(() => {
    const stored = localStorage.getItem('dishari-lang') as Language | null
    if (stored === 'bn' || stored === 'en') {
      setLangState(stored)
      document.documentElement.lang = stored
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('dishari-lang', newLang)
    document.documentElement.lang = newLang
  }

  const toggle = () => setLang(lang === 'bn' ? 'en' : 'bn')

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
