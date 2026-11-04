'use client'

import { useState, useMemo } from 'react'
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
} from 'lucide-react'
import { cn, CATEGORY_META } from '@/lib/utils'
import type { ServiceCategory, SubmissionType } from '@/types'

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

// TODO: Replace with dynamic data from services.json
const allServices = [
  { slug: 'passport', name_bn: 'পাসপোর্ট আবেদন', name_en: 'Passport Application', category: 'identity' as const, fee: '৩,৪৫০', processing_time_bn: '২১ কার্যদিবস', submission_type: 'hybrid' as const },
  { slug: 'passport-renewal', name_bn: 'পাসপোর্ট নবায়ন', name_en: 'Passport Renewal', category: 'identity' as const, fee: '৩,৪৫০', processing_time_bn: '২১ কার্যদিবস', submission_type: 'hybrid' as const },
  { slug: 'nid-correction', name_bn: 'NID সংশোধন', name_en: 'NID Correction', category: 'identity' as const, fee: '২৩০', processing_time_bn: '৪৫ কার্যদিবস', submission_type: 'online_bot' as const },
  { slug: 'birth-registration', name_bn: 'জন্ম নিবন্ধন', name_en: 'Birth Registration', category: 'identity' as const, fee: 'বিনামূল্যে', processing_time_bn: '৭ কার্যদিবস', submission_type: 'hybrid' as const },
  { slug: 'birth-registration-correction', name_bn: 'জন্ম নিবন্ধন সংশোধন', name_en: 'Birth Certificate Correction', category: 'identity' as const, fee: '৫০', processing_time_bn: '৭-৩০ কার্যদিবস', submission_type: 'hybrid' as const },
  { slug: 'death-registration', name_bn: 'মৃত্যু নিবন্ধন', name_en: 'Death Registration', category: 'identity' as const, fee: 'বিনামূল্যে', processing_time_bn: '৭ কার্যদিবস', submission_type: 'hybrid' as const },
  { slug: 'widow-allowance', name_bn: 'বিধবা ভাতা', name_en: 'Widow Allowance', category: 'welfare' as const, fee: 'বিনামূল্যে', processing_time_bn: '৬০+ কার্যদিবস', submission_type: 'pdf_only' as const },
  { slug: 'old-age-allowance', name_bn: 'বয়স্ক ভাতা', name_en: 'Old Age Allowance', category: 'welfare' as const, fee: 'বিনামূল্যে', processing_time_bn: '৬০+ কার্যদিবস', submission_type: 'pdf_only' as const },
  { slug: 'disability-allowance', name_bn: 'প্রতিবন্ধী ভাতা', name_en: 'Disability Allowance', category: 'welfare' as const, fee: 'বিনামূল্যে', processing_time_bn: '৬০+ কার্যদিবস', submission_type: 'pdf_only' as const },
  { slug: 'scholarship', name_bn: 'উপবৃত্তি আবেদন', name_en: 'Scholarship Application', category: 'education' as const, fee: 'বিনামূল্যে', processing_time_bn: 'সেশন অনুযায়ী', submission_type: 'online_bot' as const },
  { slug: 'trade-license', name_bn: 'ট্রেড লাইসেন্স', name_en: 'Trade License', category: 'business' as const, fee: '৫০০-৫,০০০', processing_time_bn: '৭-১৫ কার্যদিবস', submission_type: 'pdf_only' as const },
  { slug: 'land-mutation', name_bn: 'ভূমি নামজারি', name_en: 'Land Mutation', category: 'land' as const, fee: '১,০০০-৫,০০০', processing_time_bn: '৩০-৯০ কার্যদিবস', submission_type: 'pdf_only' as const },
  { slug: 'tin-certificate', name_bn: 'টিআইএন সার্টিফিকেট', name_en: 'TIN Certificate', category: 'tax' as const, fee: 'বিনামূল্যে', processing_time_bn: 'তাৎক্ষণিক', submission_type: 'online_bot' as const },
  { slug: 'tax-return', name_bn: 'আয়কর রিটার্ন', name_en: 'Income Tax Return', category: 'tax' as const, fee: 'বিনামূল্যে', processing_time_bn: 'বার্ষিক', submission_type: 'hybrid' as const },
  { slug: 'overseas-welfare-card', name_bn: 'প্রবাসী কল্যাণ কার্ড', name_en: 'Overseas Welfare Card', category: 'overseas' as const, fee: 'বিনামূল্যে', processing_time_bn: '৭-১৫ কার্যদিবস', submission_type: 'hybrid' as const },
]

const categoryKeys = Object.keys(CATEGORY_META) as ServiceCategory[]

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesCategory = !activeCategory || service.category === activeCategory
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        !query ||
        service.name_bn.toLowerCase().includes(query) ||
        service.name_en.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <section className="py-8 lg:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-stone-900 mb-6">সকল সেবা</h1>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all whitespace-nowrap',
              !activeCategory
                ? 'bg-green-600 text-white'
                : 'bg-white border border-stone-200 text-stone-600 hover:border-green-300'
            )}
          >
            সব
          </button>
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all whitespace-nowrap',
                activeCategory === key
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-green-300'
              )}
            >
              {CATEGORY_META[key].name_bn}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="সেবা খুঁজুন..."
            className="h-12 w-full border border-stone-200 rounded-xl bg-white px-4 text-base placeholder:text-stone-400 focus:border-green-500 outline-none transition-colors"
          />
        </div>

        {/* Service List */}
        <div className="mt-6 space-y-3">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => {
              const meta = CATEGORY_META[service.category]
              const Icon = CATEGORY_ICONS[service.category]
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="bg-white rounded-2xl p-4 border border-stone-200 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center gap-4"
                >
                  {/* Category Icon */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                      meta.bgColor
                    )}
                  >
                    <Icon className={cn('w-6 h-6', meta.color)} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-stone-900 group-hover:text-green-700 transition-colors truncate">
                      {service.name_bn}
                    </h3>
                    <p className="text-sm text-stone-500 truncate">{service.name_en}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-stone-400">
                      <Clock className="w-3 h-3" />
                      <span>{service.processing_time_bn}</span>
                    </div>
                  </div>

                  {/* Fee & Chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        service.fee === 'বিনামূল্যে'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-stone-100 text-stone-600'
                      )}
                    >
                      {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                    </span>
                    <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-green-500 transition-colors" />
                  </div>
                </Link>
              )
            })
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="w-12 h-12 text-stone-300" />
              <p className="text-stone-500 mt-4 text-lg">কোনো সেবা পাওয়া যায়নি</p>
            </div>
          )}
        </div>

        {/* Bottom Note */}
        <p className="text-stone-400 text-sm text-center mt-8">আরও সেবা আসছে...</p>
      </div>
    </section>
  )
}
