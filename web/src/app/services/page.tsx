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
  ArrowRight,
  Clock,
  Loader2,
  FileText,
  X,
  Building2,
  ShieldCheck,
} from 'lucide-react'
import { cn, CATEGORY_META } from '@/lib/utils'
import type { Service, ServiceCategory } from '@/types'
import { fetchAllServices } from '@/lib/api'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

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
  identity: { bar: 'bg-[#006A4E]', text: 'text-[#006A4E]' },
  education: { bar: 'bg-blue-600', text: 'text-blue-700' },
  land: { bar: 'bg-amber-600', text: 'text-amber-700' },
  welfare: { bar: 'bg-[#C8102E]', text: 'text-[#C8102E]' },
  business: { bar: 'bg-teal-600', text: 'text-teal-700' },
  tax: { bar: 'bg-orange-600', text: 'text-orange-700' },
  overseas: { bar: 'bg-cyan-600', text: 'text-cyan-700' },
  health: { bar: 'bg-emerald-600', text: 'text-emerald-700' },
}

function formatNumber(num: number, lang: 'bn' | 'en'): string {
  if (lang === 'en') return num.toString()
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num
    .toString()
    .split('')
    .map((d) => bnDigits[parseInt(d, 10)] ?? d)
    .join('')
}

function formatProcessingTime(time: string, lang: 'bn' | 'en'): string {
  if (!time) return ''
  if (lang === 'bn') return time
  return time
    .replace(/কার্যদিবস/g, ' working days')
    .replace(/সাধারণ/g, 'Regular')
    .replace(/জরুরি/g, 'Express')
    .replace(/তাৎক্ষণিক/g, 'Instant')
    .replace(/রিয়েল-টাইম/g, 'Real-time')
    .replace(/বার্ষিক/g, 'Annual')
    .replace(/সেশন অনুযায়ী/g, 'Per academic session')
    .replace(/দিন/g, ' days')
    .replace(/০/g, '0')
    .replace(/১/g, '1')
    .replace(/২/g, '2')
    .replace(/৩/g, '3')
    .replace(/৪/g, '4')
    .replace(/৫/g, '5')
    .replace(/৬/g, '6')
    .replace(/৭/g, '7')
    .replace(/৮/g, '8')
    .replace(/৯/g, '9')
}

const categoryKeys = Object.keys(CATEGORY_META) as ServiceCategory[]

export default function ServicesPage() {
  const { lang } = useLanguage()
  const [allServices, setAllServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const popularSearches = useMemo(() => {
    return lang === 'bn'
      ? ['পাসপোর্ট', 'NID সংশোধন', 'জন্ম নিবন্ধন', 'ট্রেড লাইসেন্স', 'ভূমি নামজারি', 'বিধবা ভাতা', 'আয়কর রিটার্ন', 'প্রবাসী কল্যাণ']
      : ['Passport', 'NID Correction', 'Birth Certificate', 'Trade License', 'Land Mutation', 'Allowance', 'Tax Return', 'Overseas Welfare']
  }, [lang])

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
      const matchCat = activeCategory ? s.category === activeCategory : true
      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchCat

      const matchSearch =
        s.name_bn.toLowerCase().includes(q) ||
        s.name_en.toLowerCase().includes(q) ||
        s.department_bn.toLowerCase().includes(q) ||
        s.department_en.toLowerCase().includes(q) ||
        (s.required_docs &&
          s.required_docs.some(
            (d) =>
              d.name_bn.toLowerCase().includes(q) ||
              d.name_en.toLowerCase().includes(q)
          ))

      return matchCat && matchSearch
    })
  }, [allServices, activeCategory, searchQuery])

  const getSubmissionLabel = (type: string) => {
    switch (type) {
      case 'online':
        return t('servicesPage', 'subOnline', lang)
      case 'hybrid':
        return t('servicesPage', 'subHybrid', lang)
      case 'pdf_only':
        return t('servicesPage', 'subOffline', lang)
      default:
        return lang === 'bn' ? 'সরকারি সেবা' : 'Civic Service'
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-neutral-900 font-sans">
      {/* ─── Editorial Header / Gazette Broadside (Flat paper style) ─────── */}
      <section className="border-b border-neutral-200 pt-8 sm:pt-10 pb-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Top Gazette Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-5 border-b border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-600">
            <div className="flex items-center gap-3">
              <span className="font-bold text-neutral-900 tracking-wider">
                {t('servicesPage', 'govtStamp', lang)}
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-[#006A4E] font-bold">{t('servicesPage', 'guideYear', lang)}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
              <span>{t('servicesPage', 'gazetteUpdated', lang)}</span>
            </div>
          </div>

          {/* Headline & Mission */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                {lang === 'bn' ? (
                  <>
                    সরকারি সেবাসমূহ ও <span className="text-[#006A4E]">আবেদন নির্দেশিকা</span>
                  </>
                ) : (
                  <>
                    Government Services & <span className="text-[#006A4E]">Application Guides</span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed font-normal">
                {t('servicesPage', 'subheadline', lang)}
              </p>
            </div>

            {/* Total Count Stamp — Windows 10 KPI Tile */}
            <div className="border border-neutral-200 bg-white p-3.5 text-center shrink-0 min-w-[130px] rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
              <span className="text-[11px] uppercase font-bold text-neutral-500 block tracking-wider">
                {t('servicesPage', 'totalCountLabel', lang)}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006A4E] block mt-0.5 font-mono">
                {formatNumber(allServices.length, lang)} {t('servicesPage', 'unitServices', lang)}
              </span>
            </div>
          </div>

          {/* ─── Search Terminal ─────────── */}
          <div className="mt-7 pt-5 border-t border-neutral-200">
            <div className="relative flex flex-col sm:flex-row items-stretch border border-neutral-300 bg-white rounded-none shadow-xs">
              <div className="flex items-center flex-1 px-4 py-2">
                <Search className="w-4 h-4 text-neutral-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('servicesPage', 'searchPlaceholder', lang)}
                  className="w-full h-10 bg-transparent text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base focus:outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-neutral-400 hover:text-neutral-800 transition-colors mr-2 cursor-pointer"
                    title={t('servicesPage', 'clearSearch', lang)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="bg-[#006A4E] hover:bg-[#004D38] text-white font-bold px-6 py-2.5 text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer rounded-none border border-[#006A4E]"
              >
                <span>{t('servicesPage', 'searchBtn', lang)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Popular Shortcut Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs">
              <span className="font-bold text-neutral-500 uppercase tracking-wide">
                {t('servicesPage', 'popularLabel', lang)}
              </span>
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="text-neutral-700 hover:text-[#006A4E] font-medium transition-colors cursor-pointer mr-2 py-0.5 hover:underline"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content / Civic Ledger ──────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        {/* Category Navigation Strip */}
        <div className="border-b border-neutral-200 mb-8 overflow-x-auto scrollbar-none">
          <nav className="flex gap-1 whitespace-nowrap min-w-max pb-px">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all border-b-2 -mb-[2px] cursor-pointer flex items-center gap-2 rounded-none',
                !activeCategory
                  ? 'border-[#006A4E] text-[#006A4E] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
              )}
            >
              <span>{t('servicesPage', 'allServicesTab', lang)}</span>
              <span className="font-mono text-xs px-1.5 py-0.2 bg-neutral-100 text-neutral-700 border border-neutral-200 font-semibold rounded-none">
                {formatNumber(allServices.length, lang)}
              </span>
            </button>

            {categoryKeys.map((key) => {
              const meta = CATEGORY_META[key]
              const Icon = CATEGORY_ICONS[key] || IdCard
              const isActive = activeCategory === key
              const count = categoryCounts[key] || 0
              const categoryTitle = lang === 'bn' ? meta.name_bn : meta.name_en

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={cn(
                    'px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all border-b-2 -mb-[2px] cursor-pointer flex items-center gap-2 rounded-none',
                    isActive
                      ? 'border-[#006A4E] text-[#006A4E] bg-white'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{categoryTitle}</span>
                  <span className="font-mono text-xs px-1.5 py-0.2 bg-neutral-100 text-neutral-600 border border-neutral-200 font-semibold rounded-none">
                    {formatNumber(count, lang)}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-[#006A4E]" />
            <p className="text-sm font-semibold text-neutral-700">{t('servicesPage', 'loading', lang)}</p>
          </div>
        )}

        {/* ─── CIVIC SERVICE LEDGER (Windows 10 Flat Paper List) ───────────── */}
        {!loading && (
          <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white rounded-none shadow-xs">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => {
                const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
                const accent = CATEGORY_ACCENT_COLORS[service.category] || {
                  bar: 'bg-[#006A4E]',
                  text: 'text-[#006A4E]',
                }
                const submissionLabel = getSubmissionLabel(service.submission_type)
                const serialNum = formatNumber(index + 1, lang).padStart(2, lang === 'bn' ? '০' : '0')
                const primaryName = lang === 'bn' ? service.name_bn : service.name_en
                const secondaryName = lang === 'bn' ? service.name_en : service.name_bn
                const department = lang === 'bn' ? service.department_bn : service.department_en
                const categoryName = lang === 'bn' ? meta.name_bn : meta.name_en
                const feeDisplay =
                  service.fee === 'বিনামূল্যে'
                    ? t('servicesPage', 'free', lang)
                    : `৳${service.fee}`

                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group block p-4 sm:p-6 hover:bg-neutral-50/70 transition-colors duration-150 relative border-l-4 border-l-transparent hover:border-l-[#006A4E]"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Serial + Title + Department */}
                      <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                        {/* Serial Number & Color Bar */}
                        <div className="flex items-center gap-2 shrink-0 pt-0.5">
                          <span className={cn('w-1 h-9 block rounded-none', accent.bar)} />
                          <span className="font-mono text-base sm:text-lg font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors w-7">
                            {serialNum}
                          </span>
                        </div>

                        {/* Title & Department */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                              {categoryName}
                            </span>
                            <span className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-neutral-200 rounded-none">
                              {submissionLabel}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-[#006A4E] transition-colors leading-snug">
                            {primaryName}
                          </h3>
                          <p className="text-xs text-neutral-500 font-medium mt-0.5">
                            {secondaryName}
                          </p>

                          <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-600">
                            <Building2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span className="truncate">{department}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Transparent Facts Strip + Action */}
                      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-8 pt-3 lg:pt-0 border-t lg:border-t-0 border-neutral-100 shrink-0">
                        {/* Fee */}
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                            {t('servicesPage', 'officialFee', lang)}
                          </span>
                          <span
                            className={cn(
                              'text-sm sm:text-base font-bold',
                              service.fee === 'বিনামূল্যে' ? 'text-[#006A4E]' : 'text-neutral-900'
                            )}
                          >
                            {feeDisplay}
                          </span>
                        </div>

                        {/* Delivery Time */}
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {t('servicesPage', 'timeLimit', lang)}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                            {formatProcessingTime(service.processing_time_bn, lang)}
                          </span>
                        </div>

                        {/* Documents Count */}
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                            <FileText className="w-3 h-3" /> {t('servicesPage', 'requiredDocs', lang)}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                            {formatNumber(service.required_docs?.length || 0, lang)} {t('servicesPage', 'docsUnit', lang)}
                          </span>
                        </div>

                        {/* Arrow Action */}
                        <div className="w-8 h-8 border border-neutral-300 bg-white flex items-center justify-center group-hover:bg-[#006A4E] group-hover:border-[#006A4E] group-hover:text-white transition-all rounded-none">
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="py-20 text-center px-4">
                <Search className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-neutral-900">{t('servicesPage', 'noResultsTitle', lang)}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
                  {t('servicesPage', 'noResultsDesc', lang)}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory(null)
                    }}
                    className="mt-4 px-4 py-2 bg-[#006A4E] text-white text-xs font-semibold rounded-none cursor-pointer"
                  >
                    {t('servicesPage', 'resetFilter', lang)}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
