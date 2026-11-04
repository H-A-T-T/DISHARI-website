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

const CATEGORY_ORDER: ServiceCategory[] = [
  'identity',
  'education',
  'land',
  'welfare',
  'business',
  'tax',
  'overseas',
  'health',
]

export function CategoryGrid() {
  const { lang } = useLanguage()

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 text-center mb-2">
          {t('sections', 'categories', lang)}
        </h2>
        <p className="text-stone-500 text-center mb-10">
          {lang === 'bn'
            ? 'আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন'
            : 'Choose a category based on your need'}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {CATEGORY_ORDER.map((slug) => {
            const meta = CATEGORY_META[slug]
            const Icon = CATEGORY_ICONS[slug]

            return (
              <Link
                key={slug}
                href={`/services?category=${slug}`}
                className={`bg-white rounded-2xl p-5 lg:p-6 border border-stone-200 border-l-4 ${meta.borderColor} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${meta.bgColor}`}
                >
                  <Icon className={`w-6 h-6 ${meta.color}`} />
                </div>

                {/* Name */}
                <p className="font-semibold text-stone-800">{meta.name_bn}</p>
                <p className="text-sm text-stone-500 mt-0.5">{meta.name_en}</p>

                {/* View link */}
                <p className="text-sm text-stone-500 mt-3 flex items-center gap-1">
                  {lang === 'bn' ? 'সেবা দেখুন' : 'View services'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
