'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

const quickTags = [
  { label: 'পাসপোর্ট', query: 'পাসপোর্ট' },
  { label: 'NID সংশোধন', query: 'NID সংশোধন' },
  { label: 'জন্ম নিবন্ধন', query: 'জন্ম নিবন্ধন' },
  { label: 'উপবৃত্তি', query: 'উপবৃত্তি' },
  { label: 'ভাতা', query: 'ভাতা' },
  { label: 'ট্রেড লাইসেন্স', query: 'ট্রেড লাইসেন্স' },
]

export function HeroSection() {
  const { lang } = useLanguage()
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/services?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="dot-grid py-16 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border-2 border-stone-900 bg-white text-stone-900 px-3.5 py-1 text-xs sm:text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#1c1917]">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
          <span>{t('hero', 'badge', lang)}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight max-w-2xl mt-6">
          {lang === 'bn' ? (
            <>
              সরকারি সেবা এখন আপনার হাতের
              <br />
              <span className="text-green-600">মুঠোয়</span>
            </>
          ) : (
            <>
              Government Services, Now
              <br />
              <span className="text-green-600">Within Your Reach</span>
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-stone-500 leading-relaxed max-w-lg mt-4">
          {t('hero', 'subheadline', lang)}
        </p>

        {/* Search bar */}
        <div className="mt-8 relative flex items-center w-full max-w-xl">
          <div className="h-16 w-full border-2 border-stone-900 shadow-[5px_5px_0_0_#1c1917] bg-white flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-green-700 transition-all">
            <Search className="w-5 h-5 text-stone-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('hero', 'searchPlaceholder', lang)}
              className="flex-1 h-full bg-transparent outline-none text-base placeholder:text-stone-400 font-medium"
            />
            <button
              onClick={handleSearch}
              className="bg-stone-900 hover:bg-green-700 text-white px-6 h-11 font-bold transition-colors shrink-0 cursor-pointer border-2 border-stone-900 flex items-center gap-1.5"
            >
              <span>{t('hero', 'searchButton', lang)}</span>
            </button>
          </div>
        </div>

        {/* Quick filter tags (Editorial tags, NOT cramped pills) */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wide self-center mr-1">
            জনপ্রিয়:
          </span>
          {quickTags.map((tag) => (
            <Link
              key={tag.query}
              href={`/services?q=${encodeURIComponent(tag.query)}`}
              className="bg-white border border-stone-300 hover:border-stone-900 hover:bg-stone-50 px-3 py-1 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
