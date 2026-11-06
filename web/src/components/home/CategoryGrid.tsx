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
    <section className="py-10 lg:py-14 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header — Clean Windows 10 Typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-neutral-200 gap-2">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 tracking-tight">
              {t('sections', 'categories', lang)}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              {t('sections', 'categoriesSub', lang)}
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-semibold text-[#006A4E] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{t('sections', 'viewAll', lang)}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Windows 10 Flat Paper Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORY_ORDER.map((slug) => {
            const meta = CATEGORY_META[slug]
            const Icon = CATEGORY_ICONS[slug]
            const primaryName = lang === 'bn' ? meta.name_bn : meta.name_en
            const secondaryName = lang === 'bn' ? meta.name_en : meta.name_bn

            return (
              <Link
                key={slug}
                href={`/services?category=${slug}`}
                className="bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 p-4 transition-colors group flex items-start gap-3.5 rounded-none border-l-3 border-l-transparent hover:border-l-[#006A4E]"
              >
                {/* Crisp Icon */}
                <div className="mt-0.5 shrink-0">
                  <Icon className={`w-5 h-5 ${meta.color}`} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#006A4E] transition-colors leading-snug truncate">
                    {primaryName}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5 truncate">
                    {secondaryName}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#006A4E] group-hover:translate-x-0.5 transition-all shrink-0 self-center" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
