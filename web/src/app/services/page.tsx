'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  ArrowRight,
  Clock,
  Loader2,
  FileText,
  X,
  Building2,
  Coins,
  ShieldCheck,
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

const CATEGORY_ACCENT_COLORS: Record<ServiceCategory, { bar: string; text: string }> = {
  identity: { bar: 'bg-blue-600', text: 'text-blue-700' },
  education: { bar: 'bg-purple-600', text: 'text-purple-700' },
  land: { bar: 'bg-amber-600', text: 'text-amber-700' },
  welfare: { bar: 'bg-rose-600', text: 'text-rose-700' },
  business: { bar: 'bg-teal-600', text: 'text-teal-700' },
  tax: { bar: 'bg-orange-600', text: 'text-orange-700' },
  overseas: { bar: 'bg-cyan-600', text: 'text-cyan-700' },
  health: { bar: 'bg-emerald-600', text: 'text-emerald-700' },
}

const SUBMISSION_TAGS: Record<string, string> = {
  online_bot: 'সম্পূর্ণ অনলাইন',
  hybrid: 'অনলাইন + সরাসরি যাচাই',
  pdf_only: 'সরাসরি জমা',
}

const POPULAR_SEARCHES = [
  'পাসপোর্ট',
  'NID সংশোধন',
  'জন্ম নিবন্ধন',
  'ট্রেড লাইসেন্স',
  'ভূমি নামজারি',
  'বিধবা ভাতা',
  'আয়কর রিটার্ন',
  'প্রবাসী কল্যাণ',
]

// Bengali Numeral Helper
function toBengaliNumber(num: number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num
    .toString()
    .split('')
    .map((d) => bnDigits[parseInt(d, 10)] ?? d)
    .join('')
}

const categoryKeys = Object.keys(CATEGORY_META) as ServiceCategory[]

export default function ServicesPage() {
  const [allServices, setAllServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const s of allServices) {
      counts[s.category] = (counts[s.category] || 0) + 1
    }
    return counts
  }, [allServices])

  // Filtered services
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
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 font-sans">
      {/* ─── Editorial Header / Gazette Broadside ─────────────────────────── */}
      <section className="border-b-2 border-stone-900 pt-8 sm:pt-12 pb-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Top Gazette Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-200 text-xs sm:text-sm font-semibold text-stone-600">
            <div className="flex items-center gap-3">
              <span className="font-bold text-stone-900 tracking-wider">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-green-700 font-bold">নাগরিক সেবা নির্দেশিকা ২০২৬</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>গেজেট ও বিধিমালা অনুযায়ী হালনাগাদকৃত</span>
            </div>
          </div>

          {/* Headline & Mission in Kalpurush Typography */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-tight">
                সরকারি সেবাসমূহ ও <span className="text-green-700 underline decoration-green-600/40 decoration-4 underline-offset-8">আবেদন নির্দেশিকা</span>
              </h1>
              <p className="text-base sm:text-lg text-stone-700 mt-4 leading-relaxed font-normal">
                কোন কাগজ লাগবে? সরকারি ফি কত? কোথায় যেতে হবে? প্রতিটি সেবার পূর্ণাঙ্গ তথ্য জানুন কোনো দালাল বা মধ্যস্বত্বভোগী ছাড়াই।
              </p>
            </div>

            {/* Total Count Stamp */}
            <div className="border-2 border-stone-900 bg-stone-50 p-4 text-center shrink-0 min-w-[140px] shadow-[4px_4px_0_0_#1c1917]">
              <span className="text-xs uppercase font-bold text-stone-500 block tracking-wider">
                তালিকাভুক্ত সেবা
              </span>
              <span className="text-3xl sm:text-4xl font-black text-stone-900 block mt-0.5">
                {toBengaliNumber(allServices.length)}টি
              </span>
            </div>
          </div>

          {/* ─── Architectural Search Terminal (No rounded pills) ─────────── */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="relative flex flex-col sm:flex-row items-stretch border-2 border-stone-900 bg-white shadow-[6px_6px_0_0_#1c1917]">
              <div className="flex items-center flex-1 px-4 py-2">
                <Search className="w-5 h-5 text-stone-500 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="কোন সরকারি সেবাটি খুঁজছেন? (যেমন: পাসপোর্ট, জন্ম নিবন্ধন, উপবৃত্তি...)"
                  className="w-full h-12 bg-transparent text-stone-900 placeholder:text-stone-400 text-base sm:text-lg focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-stone-400 hover:text-stone-800 transition-colors mr-2 cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="bg-stone-900 hover:bg-green-700 text-white font-bold px-8 py-3.5 text-base transition-colors shrink-0 flex items-center justify-center gap-2 border-t-2 sm:border-t-0 sm:border-l-2 border-stone-900"
              >
                <span>অনুসন্ধান</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Popular Shortcut Tags (Spacious, non-cramped text tags) */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs sm:text-sm">
              <span className="font-bold text-stone-500 uppercase tracking-wide">
                জনপ্রিয় অনুসন্ধান:
              </span>
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="text-stone-700 hover:text-green-800 font-semibold underline decoration-stone-300 hover:decoration-green-600 transition-all cursor-pointer mr-2 py-0.5"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content / Civic Ledger ──────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Category Navigation Strip (Clean Underline Tabs, NOT pills!) */}
        <div className="border-b-2 border-stone-300 mb-8 overflow-x-auto scrollbar-none">
          <nav className="flex gap-1 sm:gap-2 whitespace-nowrap min-w-max pb-px">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-4 py-3 text-base font-bold transition-all border-b-2 -mb-[2px] cursor-pointer flex items-center gap-2',
                !activeCategory
                  ? 'border-green-700 text-green-800 bg-white'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-400'
              )}
            >
              <span>সকল সেবা</span>
              <span className="font-mono text-xs px-1.5 py-0.5 bg-stone-100 text-stone-700 border border-stone-300 font-normal">
                {toBengaliNumber(allServices.length)}
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
                    'px-4 py-3 text-base font-bold transition-all border-b-2 -mb-[2px] cursor-pointer flex items-center gap-2',
                    isActive
                      ? 'border-green-700 text-green-800 bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-400'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{meta.name_bn}</span>
                  <span className="font-mono text-xs px-1.5 py-0.5 bg-stone-100 text-stone-700 border border-stone-300 font-normal">
                    {toBengaliNumber(count)}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Status / Filter Summary */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {activeCategory ? CATEGORY_META[activeCategory].name_bn : 'সেবার তালিকা'}
            </h2>
            <span className="font-mono text-xs text-stone-500 font-bold uppercase tracking-wider">
              [ {toBengaliNumber(filteredServices.length)}টি সেবা তালিকাভুক্ত ]
            </span>
          </div>

          {(activeCategory || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory(null)
                setSearchQuery('')
              }}
              className="text-xs text-stone-600 hover:text-stone-950 font-bold underline cursor-pointer"
            >
              সব ফিল্টার সাফ করুন
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-green-700" />
            <p className="text-lg font-bold text-stone-800">সরকারি ডাটাবেজ থেকে সেবাসমূহ লোড হচ্ছে...</p>
          </div>
        )}

        {/* ─── CIVIC SERVICE LEDGER (NO CARDS!) ───────────────────────────── */}
        {!loading && (
          <div className="divide-y-2 divide-stone-200 border-y-2 border-stone-900 bg-white">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => {
                const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
                const Icon = CATEGORY_ICONS[service.category] || IdCard
                const accent = CATEGORY_ACCENT_COLORS[service.category] || {
                  bar: 'bg-blue-600',
                  text: 'text-blue-700',
                }
                const submissionLabel =
                  SUBMISSION_TAGS[service.submission_type] || 'সরকারি সেবা'
                const serialNum = toBengaliNumber(index + 1).padStart(2, '০')

                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group block p-5 sm:p-7 hover:bg-stone-50 transition-colors duration-150 relative"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Serial + Title + Department */}
                      <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                        {/* Serial Number & Color Bar */}
                        <div className="flex items-center gap-2 shrink-0 pt-0.5">
                          <span className={cn('w-1.5 h-10 block', accent.bar)} />
                          <span className="font-mono text-lg sm:text-xl font-bold text-stone-400 group-hover:text-stone-900 transition-colors w-7">
                            {serialNum}
                          </span>
                        </div>

                        {/* Title & Department */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                              [{meta.name_bn}]
                            </span>
                            <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 border border-stone-200">
                              {submissionLabel}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-stone-950 group-hover:text-green-800 transition-colors leading-snug">
                            {service.name_bn}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                            {service.name_en}
                          </p>

                          <div className="flex items-center gap-1.5 mt-2 text-xs text-stone-600">
                            <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span className="truncate">{service.department_bn}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Transparent Facts Strip + Action */}
                      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-8 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-100 shrink-0">
                        {/* Fee */}
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                            সরকারি ফি
                          </span>
                          <span
                            className={cn(
                              'text-base sm:text-lg font-black',
                              service.fee === 'বিনামূল্যে' ? 'text-green-700' : 'text-stone-900'
                            )}
                          >
                            {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                          </span>
                        </div>

                        {/* Delivery Time */}
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                            <Clock className="w-3 h-3" /> সময়সীমা
                          </span>
                          <span className="text-sm sm:text-base font-bold text-stone-800">
                            {service.processing_time_bn}
                          </span>
                        </div>

                        {/* Documents Count */}
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                            <FileText className="w-3 h-3" /> প্রয়োজনীয় কাগজ
                          </span>
                          <span className="text-sm sm:text-base font-bold text-stone-800">
                            {toBengaliNumber(service.required_docs?.length || 0)}টি
                          </span>
                        </div>

                        {/* Action Link Button */}
                        <div className="hidden sm:flex items-center gap-1 text-sm font-black text-stone-900 group-hover:text-green-700 transition-colors pl-2">
                          <span>পূর্ণাঙ্গ নিয়মাবলী</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              /* Empty Search State */
              <div className="py-16 px-4 text-center">
                <p className="text-2xl font-bold text-stone-800">কোনো সেবা পাওয়া যায়নি</p>
                <p className="text-stone-500 text-sm mt-2">
                  &ldquo;{searchQuery}&rdquo; সম্পর্কিত কোনো সরকারি তথ্য তালিকায় নেই। বানান যাচাই করুন।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory(null)
                  }}
                  className="mt-6 border-2 border-stone-900 bg-stone-900 text-white font-bold px-6 py-2.5 text-sm hover:bg-green-700 transition-colors"
                >
                  সকল সেবা পুনরায় দেখুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* Gazette & Assistance Footer Strip */}
        <div className="mt-12 p-6 border-2 border-stone-300 bg-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-stone-900 text-base">
              সরাসরি জাতীয় হেল্পলাইন ৩৩৩
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
              সরকারি যেকোনো সেবা সংক্রান্ত পরামর্শ বা অভিযোগের জন্য দিন-রাত যেকোনো সময় কল করতে পারেন।
            </p>
          </div>
          <a
            href="tel:333"
            className="border-2 border-stone-900 bg-white text-stone-950 hover:bg-stone-900 hover:text-white font-black px-6 py-3 text-sm shrink-0 transition-colors shadow-[3px_3px_0_0_#1c1917]"
          >
            ৩৩৩ এ কল করুন
          </a>
        </div>
      </main>
    </div>
  )
}
