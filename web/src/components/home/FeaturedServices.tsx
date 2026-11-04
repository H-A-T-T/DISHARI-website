'use client'

import { useState, useEffect } from 'react'
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
  Clock,
  Loader2,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
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

export function FeaturedServices() {
  const { lang } = useLanguage()
  const [featuredServices, setFeaturedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchAllServices()
      .then((data) => {
        if (active) {
          // Take top 6 popular services
          const topSlugs = ['passport', 'nid-correction', 'birth-registration', 'widow-allowance', 'scholarship', 'trade-license']
          const filtered = data.filter((s) => topSlugs.includes(s.slug))
          setFeaturedServices(filtered.length > 0 ? filtered : data.slice(0, 6))
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

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 text-center mb-2">
          {t('sections', 'featured', lang)}
        </h2>
        <p className="text-stone-500 text-center mb-10">
          {lang === 'bn'
            ? 'সবচেয়ে বেশি জিজ্ঞাসিত ও প্রয়োজনীয় সেবা'
            : 'Most requested and essential citizen services'}
        </p>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12 gap-3 text-stone-400">
            <Loader2 className="w-5 h-5 animate-spin text-green-600" />
            <span className="text-sm">ডাটাবেজ থেকে সেবাসমূহ আসছে...</span>
          </div>
        )}

        {/* Services List (NO CARDS, Civic Broadside Ledger) */}
        {!loading && (
          <div className="border-2 border-stone-900 bg-white divide-y-2 divide-stone-200 shadow-[6px_6px_0_0_#1c1917]">
            {featuredServices.map((service, idx) => {
              const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
              const Icon = CATEGORY_ICONS[service.category] || IdCard

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="p-4 sm:p-6 hover:bg-stone-50 transition-colors duration-150 group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-mono text-sm sm:text-base font-bold text-stone-400 group-hover:text-stone-900 w-6">
                      ০{idx + 1}
                    </span>
                    <div className="w-10 h-10 border border-stone-900 bg-stone-50 flex items-center justify-center shrink-0">
                      <Icon className={cn('w-5 h-5', meta.color)} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                          [{meta.name_bn}]
                        </span>
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl text-stone-950 group-hover:text-green-800 transition-colors leading-snug truncate">
                        {service.name_bn}
                      </h3>
                      <p className="text-xs text-stone-500 truncate">{service.name_en}</p>
                    </div>
                  </div>

                  {/* Facts + Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 pl-10 sm:pl-0 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{service.processing_time_bn}</span>
                    </div>

                    <span
                      className={cn(
                        'text-xs font-mono font-bold px-2 py-0.5 border',
                        service.fee === 'বিনামূল্যে'
                          ? 'border-green-600 text-green-800 bg-green-50'
                          : 'border-stone-400 text-stone-900 bg-stone-100'
                      )}
                    >
                      {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                    </span>

                    <span className="text-xs font-bold text-stone-900 group-hover:text-green-800 flex items-center gap-1">
                      <span>নিয়মাবলী</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* View all button */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <span>{t('sections', 'viewAll', lang)}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
