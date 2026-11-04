'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  IdCard,
  GraduationCap,
  MapPin,
  HeartHandshake,
  Briefcase,
  Receipt,
  Plane,
  Stethoscope,
  Search,
  ChevronRight,
  Clock,
  Loader2,
  FileText,
  X,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { cn, CATEGORY_META } from '@/lib/utils'
import type { Service, ServiceCategory } from '@/types'
import { fetchAllServices } from '@/lib/api'

const CATEGORY_ICONS: Record<ServiceCategory, React.ElementType> = {
  identity: IdCard,
  education: GraduationCap,
  land: MapPin,
  welfare: HeartHandshake,
  business: Briefcase,
  tax: Receipt,
  overseas: Plane,
  health: Stethoscope,
}

const CATEGORY_BORDER_COLORS: Record<ServiceCategory, string> = {
  identity: 'border-l-blue-500 hover:border-l-blue-600',
  education: 'border-l-purple-500 hover:border-l-purple-600',
  land: 'border-l-amber-500 hover:border-l-amber-600',
  welfare: 'border-l-pink-500 hover:border-l-pink-600',
  business: 'border-l-teal-500 hover:border-l-teal-600',
  tax: 'border-l-orange-500 hover:border-l-orange-600',
  overseas: 'border-l-cyan-500 hover:border-l-cyan-600',
  health: 'border-l-emerald-500 hover:border-l-emerald-600',
}

const SUBMISSION_BADGES: Record<string, { label: string; class: string }> = {
  online_bot: { label: 'সম্পূর্ণ অনলাইন', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  hybrid: { label: 'অনলাইন + অফিস', class: 'bg-blue-50 text-blue-700 border-blue-200' },
  pdf_only: { label: 'সরাসরি জমা', class: 'bg-amber-50 text-amber-700 border-amber-200' },
}

const POPULAR_TAGS = [
  'পাসপোর্ট',
  'NID সংশোধন',
  'জন্ম নিবন্ধন',
  'ভূমি নামজারি',
  'বিধবা ভাতা',
  'ট্রেড লাইসেন্স',
  'আয়কর রিটার্ন',
  'প্রবাসী কল্যাণ',
]

const categoryKeys = Object.keys(CATEGORY_META) as ServiceCategory[]

export default function ServicesPage() {
  const [allServices, setAllServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch initial services from backend database
  useEffect(() => {
    let active = true
    setLoading(true)

    fetchAllServices()
      .then((data) => {
        if (active) {
          setAllServices(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  // Count services per category for the filter pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const s of allServices) {
      counts[s.category] = (counts[s.category] || 0) + 1
    }
    return counts
  }, [allServices])

  // Client-side instant filter and search
  const filteredServices = useMemo(() => {
    return allServices.filter((s) => {
      const matchesCategory = activeCategory ? s.category === activeCategory : true
      if (!matchesCategory) return false

      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      return (
        s.name_bn.toLowerCase().includes(q) ||
        s.name_en.toLowerCase().includes(q) ||
        s.department_bn?.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    })
  }, [allServices, activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero Header Strip with Dot Grid Pattern */}
      <section
        className="relative border-b border-stone-200/80 pt-10 pb-12 px-4 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(#16a34a1a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Civic Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200/80 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-xs mb-4">
            <span>🇧🇩</span>
            <span>সরকারি সেবা · সহজ ভাষায় · নির্ভরযোগ্য তথ্য</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                সকল সরকারি <span className="text-green-600">সেবা নির্দেশিকা</span>
              </h1>
              <p className="text-stone-600 text-sm sm:text-base max-w-2xl mt-2.5 leading-relaxed font-normal">
                প্রয়োজনীয় কাগজপত্র, নির্ভুল সরকারি ফি এবং ধাপে ধাপে আবেদন প্রক্রিয়া জেনে নিন সহজে।
                কোনো মধ্যস্বত্বভোগী বা দালালের অতিরিক্ত খরচ ছাড়াই।
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-stone-500 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-stone-200/60 shadow-xs">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span>গেজেট ও সরকারি পোর্টাল থেকে নিয়মিত হালনাগাদকৃত</span>
            </div>
          </div>

          {/* Prominent Search Bar (h-16, 64px tall, bold tactile feel) */}
          <div className="mt-8 relative max-w-3xl">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/50 focus-within:border-green-500 focus-within:shadow-xl focus-within:shadow-green-100/50 transition-all duration-200">
              <div className="pl-5 pr-2 text-green-600 flex items-center justify-center pointer-events-none">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="আপনি কোন সেবাটি খুঁজছেন? যেমন: পাসপোর্ট, NID সংশোধন..."
                className="w-full h-16 bg-transparent text-stone-900 placeholder:text-stone-400 text-base sm:text-lg focus:outline-none pr-28 sm:pr-32"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-2 text-stone-400 hover:text-stone-600 mr-2 transition-colors cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="absolute right-2.5">
                <span className="hidden sm:inline-flex bg-green-600 text-white rounded-xl h-11 px-5 items-center justify-center font-bold text-sm shadow-xs select-none">
                  অনুসন্ধান
                </span>
              </div>
            </div>

            {/* Popular Shortcut Chips */}
            <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-none pb-1 text-xs">
              <span className="text-stone-500 shrink-0 font-medium">জনপ্রিয় সন্ধান:</span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="bg-white hover:bg-green-50 text-stone-700 hover:text-green-700 border border-stone-200 hover:border-green-300 rounded-full px-3 py-1 shrink-0 transition-all cursor-pointer shadow-2xs font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Filter Pills Bar */}
        <div className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              বিভাগ অনুযায়ী ফিল্টার করুন
            </span>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs text-green-700 hover:text-green-800 font-semibold cursor-pointer hover:underline"
              >
                ফিল্টার মুছুন
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all whitespace-nowrap flex items-center gap-2 shadow-2xs shrink-0',
                !activeCategory
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-stone-50 border border-stone-200/80 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
              )}
            >
              <span>সকল সেবা</span>
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-bold',
                  !activeCategory ? 'bg-green-700/80 text-white' : 'bg-stone-200/70 text-stone-600'
                )}
              >
                {allServices.length}
              </span>
            </button>

            {categoryKeys.map((key) => {
              const meta = CATEGORY_META[key]
              const Icon = CATEGORY_ICONS[key] || IdCard
              const isActive = activeCategory === key
              const count = categoryCounts[key] || 0

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={cn(
                    'px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all whitespace-nowrap flex items-center gap-2 shrink-0 shadow-2xs',
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      isActive ? 'text-green-400' : meta.color
                    )}
                  />
                  <span>{meta.name_bn}</span>
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full font-bold',
                      isActive ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-500'
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-stone-800">
              {activeCategory ? CATEGORY_META[activeCategory].name_bn : 'উপলব্ধ সেবাসমূহ'}
            </h2>
            <span className="bg-stone-100 text-stone-600 font-bold text-xs px-2.5 py-1 rounded-full border border-stone-200/80">
              {filteredServices.length}টি পাওয়া গেছে
            </span>
          </div>

          {(activeCategory || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory(null)
                setSearchQuery('')
              }}
              className="text-xs text-stone-500 hover:text-stone-900 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>সকল ফিল্টার রিসেট করুন</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-stone-500">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            <p className="text-base font-semibold text-stone-700">সরকারি ডাটাবেজ থেকে সেবা লোড হচ্ছে...</p>
            <p className="text-xs text-stone-400">অফিসিয়াল তথ্য যাচাই সম্পন্ন হচ্ছে</p>
          </div>
        )}

        {/* Services Grid (2 Columns on Desktop, 1 Column on Mobile) */}
        {!loading && (
          <>
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredServices.map((service) => {
                  const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
                  const Icon = CATEGORY_ICONS[service.category] || IdCard
                  const borderStyle = CATEGORY_BORDER_COLORS[service.category] || 'border-l-blue-500'
                  const submission = SUBMISSION_BADGES[service.submission_type] || {
                    label: 'সরকারি সেবা',
                    class: 'bg-stone-50 text-stone-700 border-stone-200',
                  }

                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className={cn(
                        'bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 border-l-4 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between relative overflow-hidden',
                        borderStyle
                      )}
                    >
                      {/* Top Row: Icon + Badges */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div
                            className={cn(
                              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200',
                              meta.bgColor
                            )}
                          >
                            <Icon className={cn('w-6 h-6', meta.color)} />
                          </div>

                          <div className="flex flex-wrap items-center justify-end gap-1.5">
                            <span
                              className={cn(
                                'text-xs px-2.5 py-1 rounded-full font-semibold border',
                                meta.badgeBg
                              )}
                            >
                              {meta.name_bn}
                            </span>
                            <span
                              className={cn(
                                'text-xs px-2.5 py-1 rounded-full font-medium border',
                                submission.class
                              )}
                            >
                              {submission.label}
                            </span>
                          </div>
                        </div>

                        {/* Service Title & English Subtitle */}
                        <h3 className="font-bold text-lg sm:text-xl text-stone-900 group-hover:text-green-700 transition-colors leading-snug">
                          {service.name_bn}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                          {service.name_en}
                        </p>

                        {/* Authority / Ministry */}
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-stone-500 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="truncate">{service.department_bn}</span>
                        </div>
                      </div>

                      {/* Bottom Info Strip & Action */}
                      <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-3">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {/* Fee */}
                          <div className="bg-stone-50/80 rounded-xl p-2 border border-stone-200/60 flex flex-col">
                            <span className="text-stone-400 font-medium text-[11px]">সরকারি ফি</span>
                            <span
                              className={cn(
                                'font-bold mt-0.5 truncate',
                                service.fee === 'বিনামূল্যে' ? 'text-green-700' : 'text-stone-900'
                              )}
                            >
                              {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                            </span>
                          </div>

                          {/* Time */}
                          <div className="bg-stone-50/80 rounded-xl p-2 border border-stone-200/60 flex flex-col">
                            <span className="text-stone-400 font-medium text-[11px] flex items-center gap-1">
                              <Clock className="w-3 h-3" /> সময়
                            </span>
                            <span className="font-semibold text-stone-800 mt-0.5 truncate" title={service.processing_time_bn}>
                              {service.processing_time_bn}
                            </span>
                          </div>

                          {/* Documents Count */}
                          <div className="bg-stone-50/80 rounded-xl p-2 border border-stone-200/60 flex flex-col">
                            <span className="text-stone-400 font-medium text-[11px] flex items-center gap-1">
                              <FileText className="w-3 h-3" /> কাগজ
                            </span>
                            <span className="font-semibold text-stone-800 mt-0.5 truncate">
                              {service.required_docs?.length || 0}টি প্রয়োজন
                            </span>
                          </div>
                        </div>

                        {/* CTA Link inside Card */}
                        <div className="flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-green-700 pt-1">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            কাগজপত্র ও আবেদন প্রক্রিয়া দেখুন
                          </span>
                          <span className="inline-flex items-center gap-1 text-green-700 font-bold group-hover:translate-x-1 transition-transform">
                            বিস্তারিত <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              /* Empty Search State */
              <div className="bg-white rounded-3xl border border-stone-200/90 p-12 text-center max-w-xl mx-auto shadow-sm my-8">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">কোনো সেবা খুঁজে পাওয়া যায়নি</h3>
                <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                  &ldquo;<span className="font-semibold text-stone-800">{searchQuery}</span>&rdquo; সংক্রান্ত কোনো সরকারি সেবা তালিকাভুক্ত নেই। অনুগ্রহ করে সঠিক বানান যাচাই করুন অথবা ক্যাটাগরি ফিল্টার পরিবর্তন করুন।
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory(null)
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 h-11 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    সকল সেবা প্রদর্শন করুন
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Trust & Gazette Footer Note */}
        <div className="mt-14 bg-gradient-to-r from-stone-100 to-stone-50 rounded-2xl p-5 border border-stone-200/80 text-center max-w-3xl mx-auto">
          <p className="text-xs text-stone-600 leading-relaxed">
            <span className="font-bold text-stone-800">নাগরিক সহায়তা বার্তা:</span> দিশারীতে প্রকাশিত সকল তথ্য গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সংশ্লিষ্ট মন্ত্রণালয় ও অধিদপ্তরের গেজেট অনুসারে যাচাইকৃত। যে কোনো জটিলতায় সরকারি হেল্পলাইন <span className="font-bold text-green-700">৩৩৩</span> নম্বরে কল করুন।
          </p>
        </div>
      </main>
    </div>
  )
}
