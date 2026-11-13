'use client'

import Link from 'next/link'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer className="bg-[#004D38] text-white relative">
      {/* Top 3px Bangladesh Red Accent Strip */}
      <div className="h-1 bg-[#C8102E] w-full" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Branding */}
          <div>
            <Link href="/" className="inline-block mb-3 group">
              <DishariLogo
                theme="dark"
                lang={lang}
                className="h-9 sm:h-11 w-auto transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <p className="mt-2 text-emerald-100/90 text-sm leading-relaxed max-w-sm">
              {t('footer', 'mission', lang)}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-[#0D8262] pb-1.5">
              {t('footer', 'quickLinks', lang)}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-emerald-100 hover:text-white font-medium transition-colors"
                >
                  {t('footer', 'services', lang)}
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities"
                  className="text-emerald-100 hover:text-white font-medium transition-colors"
                >
                  {lang === 'bn' ? 'সরকারি সুযোগ ও সহায়তা' : 'Government Opportunities'}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-emerald-100 hover:text-white font-medium transition-colors"
                >
                  {t('footer', 'about', lang)}
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-emerald-100 hover:text-white font-medium transition-colors"
                >
                  {t('nav', 'howItWorks', lang)}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-emerald-100 hover:text-white font-medium transition-colors"
                >
                  {lang === 'bn' ? 'নাগরিক ড্যাশবোর্ড ও লকার' : 'Citizen Dashboard & Locker'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency Helplines */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-[#0D8262] pb-1.5">
              {t('footer', 'helplines', lang)}
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-emerald-100 font-mono text-xs">
                {t('footer', 'national', lang)}
              </li>
              <li className="text-emerald-100 font-mono text-xs">
                {t('footer', 'emergency', lang)}
              </li>
              <li className="text-emerald-100 font-mono text-xs">
                {t('footer', 'antiCorruption', lang)}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0D8262]/60 mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-emerald-200/80">
          <p>{t('footer', 'copyright', lang)}</p>
          <p>{t('footer', 'builtBy', lang)}</p>
        </div>
      </div>
    </footer>
  )
}
