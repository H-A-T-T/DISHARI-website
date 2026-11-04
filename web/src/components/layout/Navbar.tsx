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
          {/* Language toggle pill */}
          <div className="bg-stone-100 rounded-full px-1 py-1 flex items-center text-sm cursor-pointer">
            <button
              onClick={() => setLang('bn')}
              className={cn(
                'px-3 py-0.5 rounded-full transition-all',
                lang === 'bn'
                  ? 'bg-white shadow-sm text-stone-900 font-medium'
                  : 'text-stone-500'
              )}
            >
              বাং
            </button>
            <button
              onClick={() => setLang('en')}
              className={cn(
                'px-3 py-0.5 rounded-full transition-all',
                lang === 'en'
                  ? 'bg-white shadow-sm text-stone-900 font-medium'
                  : 'text-stone-500'
              )}
            >
              EN
            </button>
          </div>

          {/* Login — hidden on mobile */}
          <Link
            href="/login"
            className="hidden lg:inline-flex items-center justify-center text-green-700 hover:bg-green-50 rounded-xl px-5 h-10 font-medium transition-colors"
          >
            {t('nav', 'login', lang)}
          </Link>

          {/* Register — hidden on mobile */}
          <Link
            href="/register"
            className="hidden lg:inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 h-10 font-medium transition-colors"
          >
            {t('nav', 'register', lang)}
          </Link>
        </div>
      </nav>
    </header>
  )
}
