'use client'

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
  ChevronRight,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { CATEGORY_META } from '@/lib/utils'
import type { ServiceCategory } from '@/types'

const CATEGORY_ICONS: Record<ServiceCategory, React.ComponentType<{ className?: string }>> = {
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
const featuredServices = [
  { slug: 'passport', name_bn: 'পাসপোর্ট আবেদন', name_en: 'Passport Application', category: 'identity' as ServiceCategory, fee: '৩,৪৫০', processing_time_bn: '২১ কার্যদিবস', submission_type: 'hybrid' },
  { slug: 'nid-correction', name_bn: 'NID সংশোধন', name_en: 'NID Correction', category: 'identity' as ServiceCategory, fee: '২৩০', processing_time_bn: '৪৫ কার্যদিবস', submission_type: 'online_bot' },
  { slug: 'birth-registration', name_bn: 'জন্ম নিবন্ধন', name_en: 'Birth Registration', category: 'identity' as ServiceCategory, fee: 'বিনামূল্যে', processing_time_bn: '৭ কার্যদিবস', submission_type: 'hybrid' },
  { slug: 'widow-allowance', name_bn: 'বিধবা ভাতা', name_en: 'Widow Allowance', category: 'welfare' as ServiceCategory, fee: 'বিনামূল্যে', processing_time_bn: '৬০+ কার্যদিবস', submission_type: 'pdf_only' },
  { slug: 'scholarship', name_bn: 'উপবৃত্তি আবেদন', name_en: 'Scholarship Application', category: 'education' as ServiceCategory, fee: 'বিনামূল্যে', processing_time_bn: 'সেশন অনুযায়ী', submission_type: 'online_bot' },
  { slug: 'trade-license', name_bn: 'ট্রেড লাইসেন্স', name_en: 'Trade License', category: 'business' as ServiceCategory, fee: '৫০০-৫,০০০', processing_time_bn: '৭-১৫ কার্যদিবস', submission_type: 'pdf_only' },
]

export function FeaturedServices() {
  const { lang } = useLanguage()

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 text-center mb-2">
          {t('sections', 'featured', lang)}
        </h2>
        <p className="text-stone-500 text-center mb-10">
          {lang === 'bn'
            ? 'সবচেয়ে বেশি ব্যবহৃত সরকারি সেবাসমূহ'
            : 'Most commonly used government services'}
        </p>

        {/* Service list */}
        <div className="space-y-3">
          {featuredServices.map((service) => {
            const meta = CATEGORY_META[service.category]
            const Icon = CATEGORY_ICONS[service.category]
            const isFree = service.fee === 'বিনামূল্যে'

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white rounded-2xl p-4 lg:p-5 border border-stone-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex items-center gap-4"
              >
                {/* Category icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.bgColor}`}
                >
                  <Icon className={`w-6 h-6 ${meta.color}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-800">{service.name_bn}</p>
                  <p className="text-sm text-stone-500">{service.name_en}</p>
                  <p className="text-xs text-stone-400 mt-1">
                    ⏱ {service.processing_time_bn}
                  </p>
                </div>

                {/* Fee + Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={
                      isFree
                        ? 'bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium'
                        : 'bg-stone-100 text-stone-600 rounded-full px-3 py-1 text-xs'
                    }
                  >
                    {isFree ? service.fee : `৳${service.fee}`}
                  </span>
                  <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* View all link */}
        <div className="flex justify-center mt-8">
          <Link
            href="/services"
            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
          >
            {t('sections', 'viewAll', lang)} →
          </Link>
        </div>
      </div>
    </section>
  )
}
