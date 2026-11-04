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

        {/* Services List */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredServices.map((service) => {
              const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
              const Icon = CATEGORY_ICONS[service.category] || IdCard

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="bg-white rounded-2xl p-4 lg:p-5 border border-stone-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex items-center gap-4"
                >
                  {/* Category icon */}
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
                    <p className="font-semibold text-stone-900 group-hover:text-green-700 transition-colors truncate">
                      {service.name_bn}
                    </p>
                    <p className="text-sm text-stone-500 truncate">{service.name_en}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-stone-400">
                      <Clock className="w-3 h-3" />
                      <span>{service.processing_time_bn}</span>
                    </div>
                  </div>

                  {/* Fee badge + Arrow */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={cn(
                        'text-xs font-medium px-2.5 py-1 rounded-full',
                        service.fee === 'বিনামূল্যে'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-stone-100 text-stone-600'
                      )}
                    >
                      {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                    </span>
                    <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
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
