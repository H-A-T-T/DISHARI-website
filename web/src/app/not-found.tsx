'use client'

import Link from 'next/link'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

export default function NotFound() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#F5F6F8] py-16">
      <div className="border border-neutral-200 bg-white p-8 sm:p-10 text-center max-w-lg rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
        <Link href="/" className="mb-5 inline-block">
          <DishariLogo
            theme="light"
            lang={lang}
            className="h-8 sm:h-9 w-auto"
          />
        </Link>
        <p className="font-mono text-5xl sm:text-6xl font-black text-neutral-300 tracking-wider">
          {lang === 'bn' ? '৪০৪' : '404'}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-2">
          {t('notFound', 'title', lang)}
        </h1>
        <p className="text-neutral-600 mt-2 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
          {t('notFound', 'desc', lang)}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white px-5 py-2.5 font-bold text-xs uppercase tracking-wider transition-colors rounded-none shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('notFound', 'backHome', lang)}</span>
        </Link>
      </div>
    </div>
  )
}
