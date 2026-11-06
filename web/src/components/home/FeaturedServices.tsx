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

export function FeaturedServices() {
  const { lang } = useLanguage()
  const [featuredServices, setFeaturedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchAllServices()
      .then((data) => {
        if (active) {
          const topSlugs = [
            'passport',
            'nid-correction',
            'birth-registration',
            'widow-allowance',
            'scholarship',
            'trade-license',
          ]
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
    <section className="py-10 lg:py-14 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header — Clean Windows 10 Typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-neutral-200 gap-2">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 tracking-tight">
              {t('sections', 'featured', lang)}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              {t('sections', 'featuredSub', lang)}
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

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12 gap-3 text-neutral-500 font-semibold">
            <Loader2 className="w-5 h-5 animate-spin text-[#006A4E]" />
            <span className="text-sm">{t('sections', 'loadingServices', lang)}</span>
          </div>
        )}

        {/* Services List (Windows 10 Flat Paper Ledger) */}
        {!loading && (
          <div className="border border-neutral-200 bg-white divide-y divide-neutral-200 rounded-none shadow-none">
            {featuredServices.map((service) => {
              const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
              const Icon = CATEGORY_ICONS[service.category] || IdCard
              const categoryTag = lang === 'bn' ? meta.name_bn : meta.name_en
              const primaryName = lang === 'bn' ? service.name_bn : service.name_en
              const feeDisplay =
                service.fee === 'বিনামূল্যে'
                  ? lang === 'bn'
                    ? 'বিনামূল্যে'
                    : 'Free'
                  : `৳${service.fee}`

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="p-3.5 sm:p-4 hover:bg-neutral-50 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-l-3 border-l-transparent hover:border-l-[#006A4E]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="shrink-0">
                      <Icon className={cn('w-5 h-5', meta.color)} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                          {categoryTag}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#006A4E] transition-colors leading-snug truncate">
                        {primaryName}
                      </h3>
                    </div>
                  </div>

                  {/* Facts + Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 pl-8 sm:pl-0 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{formatProcessingTime(service.processing_time_bn, lang)}</span>
                    </div>

                    <span
                      className={cn(
                        'text-xs font-mono font-bold px-2 py-0.5 border rounded-none',
                        service.fee === 'বিনামূল্যে'
                          ? 'text-[#006A4E] bg-emerald-50 border-emerald-200'
                          : 'text-neutral-900 bg-neutral-100 border-neutral-300'
                      )}
                    >
                      {feeDisplay}
                    </span>

                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#006A4E] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedServices
