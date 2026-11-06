'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

const stats = [
  { numKey: 's1Num', key: 'services' },
  { numKey: 's2Num', key: 'divisions' },
  { numKey: 's3Num', key: 'helpline' },
  { numKey: 's4Num', key: 'free' },
]

export function StatsSection() {
  const { lang } = useLanguage()

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
                {t('stats', stat.numKey, lang)}
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
