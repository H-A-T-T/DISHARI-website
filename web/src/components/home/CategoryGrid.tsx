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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {CATEGORY_ORDER.map((slug, idx) => {
            const meta = CATEGORY_META[slug]
            const Icon = CATEGORY_ICONS[slug]

            return (
              <Link
                key={slug}
                href={`/services?category=${slug}`}
                className="bg-white border-2 border-stone-900 p-5 lg:p-6 shadow-[4px_4px_0_0_#1c1917] hover:shadow-[6px_6px_0_0_#15803d] hover:-translate-y-1 transition-all duration-150 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 border border-stone-900 bg-stone-50 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${meta.color}`} />
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-400 group-hover:text-stone-900">
                      ০{idx + 1}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-lg sm:text-xl text-stone-950 group-hover:text-green-800 transition-colors leading-snug">
                    {meta.name_bn}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">{meta.name_en}</p>
                </div>

                {/* View link */}
                <div className="pt-4 mt-3 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-green-800">
                  <span>{lang === 'bn' ? 'সেবা দেখুন' : 'View services'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
