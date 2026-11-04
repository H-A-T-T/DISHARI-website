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
  Search,
  ChevronRight,
  Clock,
  Loader2,
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

const categoryKeys = Object.keys(CATEGORY_META) as ServiceCategory[]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)

    fetchAllServices(activeCategory || undefined, searchQuery || undefined)
      .then((data) => {
        if (active) {
          setServices(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
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

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3 text-stone-500">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <span>ডাটাবেজ থেকে সেবা লোড হচ্ছে...</span>
          </div>
        )}

        {/* Service List */}
        {!loading && (
          <div className="mt-6 space-y-3">
            {services.length > 0 ? (
              services.map((service) => {
                const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
                const Icon = CATEGORY_ICONS[service.category] || IdCard
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
                          'text-xs font-medium px-2.5 py-1 rounded-full',
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
        )}

        {/* Bottom Note */}
        <p className="text-stone-400 text-sm text-center mt-8">ডাটাবেজে আরও সেবা যুক্ত হচ্ছে...</p>
      </div>
    </section>
  )
}
