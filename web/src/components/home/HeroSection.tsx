'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, Clock, FileText, Loader2, X, ShieldCheck, PhoneCall } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { fetchAllServices } from '@/lib/api'
import type { Service } from '@/types'
import { HeroLogoIntro } from './HeroLogoIntro'

export function HeroSection() {
  const { lang } = useLanguage()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Service[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const quickTags = [
    { label: t('hero', 'tagPassport', lang), query: lang === 'bn' ? 'পাসপোর্ট' : 'passport' },
    { label: t('hero', 'tagNid', lang), query: lang === 'bn' ? 'NID সংশোধন' : 'nid' },
    { label: t('hero', 'tagBirth', lang), query: lang === 'bn' ? 'জন্ম নিবন্ধন' : 'birth' },
    { label: t('hero', 'tagScholarship', lang), query: lang === 'bn' ? 'উপবৃত্তি' : 'scholarship' },
    { label: t('hero', 'tagAllowance', lang), query: lang === 'bn' ? 'ভাতা' : 'allowance' },
    { label: t('hero', 'tagTrade', lang), query: lang === 'bn' ? 'ট্রেড লাইসেন্স' : 'trade' },
  ]

  // Live search debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setDropdownOpen(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timeout = setTimeout(async () => {
      try {
        const matches = await fetchAllServices(undefined, query.trim())
        setResults(matches.slice(0, 5))
        setDropdownOpen(true)
      } finally {
        setIsSearching(false)
      }
    }, 250)

    return () => clearTimeout(timeout)
  }, [query])

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      setDropdownOpen(false)
      router.push(`/services?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    } else if (e.key === 'Escape') {
      setDropdownOpen(false)
    }
  }

  const handleSelectService = (slug: string) => {
    setDropdownOpen(false)
    router.push(`/services/${slug}`)
  }

  return (
    <section className="bg-white pt-10 pb-12 lg:pt-16 lg:pb-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Direct Headline, Search Box, Quick Links & Civic Notice */}
          <div className="lg:col-span-7">
            {/* Headline — Bold, authoritative Windows 10 typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-tight max-w-2xl">
              {lang === 'bn' ? (
                <>
                  সরকারি সেবা এখন আপনার হাতের
                  <span className="text-[#006A4E]"> মুঠোয়</span>
                </>
              ) : (
                <>
                  Government Services, Now
                  <br />
                  <span className="text-[#006A4E]">Within Your Reach</span>
                </>
              )}
            </h1>

            {/* Subheadline — Clean, uncluttered */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg mt-3.5 font-normal">
              {t('hero', 'subheadline', lang)}
            </p>

            {/* Live Search Terminal (Windows 10 Flat Modern Search) */}
            <div ref={dropdownRef} className="mt-6 relative w-full max-w-xl z-30">
              <div className="h-13 w-full border border-neutral-300 bg-white flex items-center px-3.5 gap-2.5 focus-within:border-[#006A4E] transition-colors rounded-none shadow-none">
                {isSearching ? (
                  <Loader2 className="w-4 h-4 text-[#006A4E] animate-spin shrink-0" />
                ) : (
                  <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                )}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (results.length > 0) setDropdownOpen(true)
                  }}
                  placeholder={t('hero', 'searchPlaceholder', lang)}
                  className="flex-1 h-full bg-transparent outline-none text-sm sm:text-base placeholder:text-neutral-400 font-medium text-neutral-900"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('')
                      setResults([])
                      setDropdownOpen(false)
                    }}
                    className="p-1 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors mr-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className="bg-[#006A4E] hover:bg-[#004D38] text-white px-4 h-9 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer rounded-none border border-[#006A4E] flex items-center gap-1.5"
                >
                  <span>{t('hero', 'searchButton', lang)}</span>
                </button>
              </div>

              {/* Real-time Autocomplete Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 shadow-none divide-y divide-neutral-100 overflow-hidden animate-in fade-in-50 duration-150 rounded-none">
                  {results.length > 0 ? (
                    <>
                      <div className="p-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-xs font-mono font-semibold text-neutral-600">
                        <span>{lang === 'bn' ? 'সরাসরি সরকারি সেবা ফলাফল' : 'Instant Service Matches'}</span>
                        <span>{results.length} {lang === 'bn' ? 'টি সেবা' : 'services'}</span>
                      </div>
                      {results.map((item) => (
                        <div
                          key={item.slug}
                          onClick={() => handleSelectService(item.slug)}
                          className="p-3.5 hover:bg-neutral-50 cursor-pointer transition-colors flex items-center justify-between gap-3 group border-l-2 border-transparent hover:border-[#006A4E]"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#006A4E] shrink-0" />
                              <h4 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#006A4E] truncate">
                                {lang === 'bn' ? item.name_bn : item.name_en}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500 font-mono">
                              <span>{item.fee}</span>
                              <span className="text-neutral-300">•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-neutral-400" />
                                <span>{item.processing_time_bn}</span>
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#006A4E] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                      <div
                        onClick={handleSearch}
                        className="p-2.5 bg-neutral-50 hover:bg-neutral-100 cursor-pointer transition-colors text-center text-xs font-semibold text-neutral-800 border-t border-neutral-200"
                      >
                        {lang === 'bn' ? `"${query}" এর সকল ফলাফল দেখুন →` : `View all results for "${query}" →`}
                      </div>
                    </>
                  ) : (
                    <div className="p-5 text-center text-neutral-500 text-sm">
                      {lang === 'bn'
                        ? `"${query}" দিয়ে কোনো সরকারি সেবা পাওয়া যায়নি।`
                        : `No services found matching "${query}".`}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Filter Tags (Flat Windows 10 chips) */}
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1">
                {t('hero', 'popular', lang)}:
              </span>
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => {
                    setQuery(tag.query)
                  }}
                  className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-[#006A4E] px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors cursor-pointer rounded-none"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Subtle Flat Civic Info Strip */}
            <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#006A4E] shrink-0" />
                <span className="font-medium">{lang === 'bn' ? 'সরকারি সেবা নির্দেশিকা' : 'Official Service Guidelines'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#006A4E] shrink-0" />
                <span className="font-medium">{lang === 'bn' ? '৩৩৩ নাগরিক হেল্পলাইন' : '333 Citizen Helpline'}</span>
              </div>
              <div className="font-mono text-neutral-400 text-[11px]">
                {lang === 'bn' ? '১০০% বিনামূল্যে তথ্য' : '100% Free Information'}
              </div>
            </div>
          </div>

          {/* Right Column: Seamless Animated Logo Intro */}
          <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <HeroLogoIntro />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
