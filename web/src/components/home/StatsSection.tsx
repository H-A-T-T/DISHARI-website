'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { fetchAllServices } from '@/lib/api'

function toBanglaDigits(n: number | string): string {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return String(n)
    .split('')
    .map((c) => bn[parseInt(c, 10)] ?? c)
    .join('')
}

export function StatsSection() {
  const { lang } = useLanguage()
  const [serviceCount, setServiceCount] = useState<number | null>(null)

  useEffect(() => {
    fetchAllServices()
      .then((services) => {
        if (services && services.length > 0) {
          setServiceCount(services.length)
        }
      })
      .catch(() => {})
  }, [])

  const serviceNumberDisplay = serviceCount
    ? lang === 'bn'
      ? `${toBanglaDigits(serviceCount)}+`
      : `${serviceCount}+`
    : t('stats', 's1Num', lang)

  const stats = [
    { num: serviceNumberDisplay, key: 'services' },
    { num: t('stats', 's2Num', lang), key: 'divisions' },
    { num: t('stats', 's3Num', lang), key: 'helpline' },
    { num: t('stats', 's4Num', lang), key: 'free' },
  ]

  return (
    <section className="py-12 bg-[#F5F6F8] border-y border-neutral-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Windows 10 Flat Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="bg-white border border-neutral-200 border-t-3 border-t-[#006A4E] p-5 sm:p-6 text-center shadow-xs rounded-none"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#006A4E] font-mono tracking-tight">
                {stat.num}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-600 mt-2 uppercase tracking-wide">
                {t('stats', stat.key, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
