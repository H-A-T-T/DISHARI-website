'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-stone-200'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group py-1">
          <Image
            src="/dishari_logo.svg"
            alt="দিশারী — ডিজিটাল নাগরিক সহায়ক"
            width={120}
            height={48}
            className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Center nav links — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/services"
            className="text-stone-600 hover:text-green-700 font-medium transition-colors"
          >
            {t('nav', 'services', lang)}
          </Link>
          <Link
            href="#how-it-works"
            className="text-stone-600 hover:text-green-700 font-medium transition-colors"
          >
            {t('nav', 'howItWorks', lang)}
          </Link>
          <Link
            href="/about"
            className="text-stone-600 hover:text-green-700 font-medium transition-colors"
          >
            {t('nav', 'about', lang)}
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language toggle (Rectangular, NO Cramped Pill) */}
          <div className="border border-stone-400 bg-stone-100 p-0.5 flex items-center text-xs font-bold">
            <button
              onClick={() => setLang('bn')}
              className={cn(
                'px-2.5 py-1 transition-all cursor-pointer',
                lang === 'bn'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-950'
              )}
            >
              বাং
            </button>
            <button
              onClick={() => setLang('en')}
              className={cn(
                'px-2.5 py-1 transition-all cursor-pointer',
                lang === 'en'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-950'
              )}
            >
              EN
            </button>
          </div>

          {/* Login — hidden on mobile */}
          <Link
            href="/login"
            className="hidden lg:inline-flex items-center justify-center border-2 border-stone-900 bg-white hover:bg-stone-100 text-stone-900 px-4 h-9 text-xs font-bold transition-colors"
          >
            {t('nav', 'login', lang)}
          </Link>

          {/* Register — hidden on mobile */}
          <Link
            href="/register"
            className="hidden lg:inline-flex items-center justify-center border-2 border-stone-900 bg-stone-900 hover:bg-green-700 text-white px-5 h-9 text-xs font-bold transition-colors shadow-[2px_2px_0_0_#1c1917]"
          >
            {t('nav', 'register', lang)}
          </Link>
        </div>
      </nav>
    </header>
  )
}
