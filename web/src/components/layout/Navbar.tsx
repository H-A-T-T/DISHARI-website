'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  FileText,
  Info,
  HelpCircle,
  LayoutDashboard,
  ShieldCheck,
  PhoneCall,
  User,
  LogOut,
  FolderLock
} from 'lucide-react'
import NotificationDropdown from '@/components/layout/NotificationDropdown'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ full_name?: string; citizen_id?: string } | null>(null)
  const { lang, setLang } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check login state
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dishari_user')
      if (raw) {
        setUser(JSON.parse(raw))
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }, [pathname])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    try {
      localStorage.removeItem('dishari_user')
      localStorage.removeItem('dishari_logged_in')
    } catch {}
    setUser(null)
    setMobileMenuOpen(false)
    window.location.href = '/'
  }

  return (
    <>
      {/* ── Windows 10 Top National Green Accent Strip ─────────────────────── */}
      <div className="h-1 bg-[#006A4E] w-full sticky top-0 z-50" />

      <header
        className={cn(
          'sticky top-1 z-40 h-16 sm:h-17 transition-all duration-200 bg-white border-b border-neutral-200',
          scrolled ? 'shadow-xs' : ''
        )}
      >
        <nav className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
          {/* Prominent Cropped Bangladesh-themed Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <DishariLogo
              theme="light"
              lang={lang}
              className="h-9 sm:h-11 w-auto transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Center nav links — Flat Windows 10 style */}
          <div className="hidden lg:flex items-center gap-7">
            <Link
              href="/services"
              className={cn(
                'font-bold text-sm tracking-wide transition-colors py-2 border-b-2',
                pathname === '/services'
                  ? 'text-[#006A4E] border-[#006A4E]'
                  : 'text-neutral-700 hover:text-[#006A4E] border-transparent'
              )}
            >
              {t('nav', 'services', lang)}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-neutral-700 hover:text-[#006A4E] font-bold text-sm tracking-wide transition-colors py-2 border-b-2 border-transparent"
            >
              {t('nav', 'howItWorks', lang)}
            </Link>
            <Link
              href="/about"
              className={cn(
                'font-bold text-sm tracking-wide transition-colors py-2 border-b-2',
                pathname === '/about'
                  ? 'text-[#006A4E] border-[#006A4E]'
                  : 'text-neutral-700 hover:text-[#006A4E] border-transparent'
              )}
            >
              {t('nav', 'about', lang)}
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                'font-bold text-sm tracking-wide transition-colors py-2 border-b-2 flex items-center gap-1.5',
                pathname.startsWith('/dashboard')
                  ? 'text-[#006A4E] border-[#006A4E]'
                  : 'text-neutral-700 hover:text-[#006A4E] border-transparent'
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2.5">
            {/* Language toggle — Windows 10 Flat Segmented Control */}
            <div className="border border-neutral-300 bg-neutral-100 p-0.5 flex items-center text-xs font-bold rounded-none">
              <button
                onClick={() => setLang('bn')}
                className={cn(
                  'px-2.5 py-1 transition-colors cursor-pointer font-bold min-h-[32px] rounded-none',
                  lang === 'bn'
                    ? 'bg-[#006A4E] text-white'
                    : 'text-neutral-700 hover:text-neutral-950'
                )}
                aria-label="Switch to Bangla"
              >
                বাং
              </button>
              <button
                onClick={() => setLang('en')}
                className={cn(
                  'px-2.5 py-1 transition-colors cursor-pointer font-bold min-h-[32px] rounded-none',
                  lang === 'en'
                    ? 'bg-[#006A4E] text-white'
                    : 'text-neutral-700 hover:text-neutral-950'
                )}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* In-App Citizen Notifications & Alerts Center */}
            <NotificationDropdown />

            {/* Desktop Auth Controls */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white px-3.5 h-9 text-xs font-semibold rounded-none transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span className="max-w-[120px] truncate">{user.full_name || 'নাগরিক'}</span>
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 px-4 h-9 text-xs font-semibold rounded-none transition-colors"
                >
                  {t('nav', 'login', lang)}
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white px-4 h-9 text-xs font-semibold rounded-none transition-colors"
                >
                  {t('nav', 'register', lang)}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle - Minimum 48px touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] p-2 border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100 rounded-none transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Drawer Navigation ───────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white border-l border-neutral-200 shadow-xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header with 3px green accent */}
            <div>
              <div className="h-1 bg-[#006A4E] w-full" />
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="shrink-0">
                  <DishariLogo theme="light" lang={lang} className="h-8 w-auto" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 rounded-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Citizen Greeting / Profile Banner */}
            {user ? (
              <div className="m-4 p-4 border border-[#006A4E] bg-white border-l-4 border-l-[#006A4E] text-neutral-900 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#006A4E] font-bold uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'স্বাগতম নাগরিক' : 'Welcome Citizen'}</span>
                </div>
                <h4 className="font-bold text-base text-neutral-950 truncate">{user.full_name}</h4>
                <p className="font-mono text-xs text-neutral-500 mt-0.5">
                  ID: {user.citizen_id || 'BD-USER-782'}
                </p>
              </div>
            ) : null}

            {/* Full-width Navigation Links */}
            <div className="px-4 py-2 flex flex-col divide-y divide-neutral-100 flex-1">
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3.5 py-3.5 min-h-[48px] text-base font-bold transition-colors',
                  pathname === '/services' ? 'text-[#006A4E]' : 'text-neutral-800 hover:text-[#006A4E]'
                )}
              >
                <div className="w-8 h-8 border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 rounded-none">
                  <FileText className="w-4 h-4 text-[#006A4E]" />
                </div>
                <span>{t('nav', 'services', lang)}</span>
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3.5 py-3.5 min-h-[48px] text-base font-bold transition-colors',
                  pathname.startsWith('/dashboard') ? 'text-[#006A4E]' : 'text-neutral-800 hover:text-[#006A4E]'
                )}
              >
                <div className="w-8 h-8 border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 rounded-none">
                  <LayoutDashboard className="w-4 h-4 text-blue-700" />
                </div>
                <span>{lang === 'bn' ? 'নাগরিক ড্যাশবোর্ড ও লকার' : 'Citizen Dashboard & Locker'}</span>
              </Link>

              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3.5 py-3.5 min-h-[48px] text-base font-bold text-neutral-800 hover:text-[#006A4E] transition-colors"
              >
                <div className="w-8 h-8 border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 rounded-none">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                </div>
                <span>{t('nav', 'howItWorks', lang)}</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3.5 py-3.5 min-h-[48px] text-base font-bold transition-colors',
                  pathname === '/about' ? 'text-[#006A4E]' : 'text-neutral-800 hover:text-[#006A4E]'
                )}
              >
                <div className="w-8 h-8 border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 rounded-none">
                  <Info className="w-4 h-4 text-purple-700" />
                </div>
                <span>{t('nav', 'about', lang)}</span>
              </Link>

              {/* Emergency Helpline Strip */}
              <div className="py-4 mt-2">
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                  {lang === 'bn' ? 'জরুরি জাতীয় সেবা নম্বর' : 'Emergency National Helplines'}
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold">
                  <a
                    href="tel:333"
                    className="p-2 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 min-h-[44px] flex flex-col justify-center rounded-none"
                  >
                    <span className="text-neutral-900 font-bold text-sm">৩৩৩</span>
                    <span className="text-[10px] text-neutral-500">তথ্য সেবা</span>
                  </a>
                  <a
                    href="tel:999"
                    className="p-2 border border-red-200 bg-red-50/50 hover:bg-red-50 min-h-[44px] flex flex-col justify-center rounded-none"
                  >
                    <span className="text-[#C8102E] font-bold text-sm">৯৯৯</span>
                    <span className="text-[10px] text-neutral-500">জরুরি</span>
                  </a>
                  <a
                    href="tel:106"
                    className="p-2 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 min-h-[44px] flex flex-col justify-center rounded-none"
                  >
                    <span className="text-neutral-900 font-bold text-sm">১০৬</span>
                    <span className="text-[10px] text-neutral-500">দুদক</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full min-h-[44px] border border-red-300 bg-white hover:bg-red-50 text-[#C8102E] font-bold text-sm flex items-center justify-center gap-2 rounded-none transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'লগআউট করুন' : 'Log Out'}</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs flex items-center justify-center rounded-none"
                  >
                    {t('nav', 'login', lang)}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-semibold text-xs flex items-center justify-center rounded-none"
                  >
                    {t('nav', 'register', lang)}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
