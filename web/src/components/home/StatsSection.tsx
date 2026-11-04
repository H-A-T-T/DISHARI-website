'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

const stats = [
  { number: '৫০+', key: 'services' },
  { number: '৮', key: 'divisions' },
  { number: '৩৩৩', key: 'helpline' },
  { number: '১০০%', key: 'free' },
]

export function StatsSection() {
  const { lang } = useLanguage()

  return (
    <section className="py-16 border-y-2 border-stone-900 bg-stone-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-2 border-stone-800 bg-stone-900 divide-y sm:divide-y-0 sm:divide-x-2 divide-stone-800 shadow-[6px_6px_0_0_#059669]">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center p-6 sm:p-8">
              <p className="text-4xl lg:text-5xl font-black text-white font-mono tracking-tight">
                {stat.number}
              </p>
              <p className="text-xs sm:text-sm font-bold text-green-300 mt-2 uppercase tracking-wide">
                {t('stats', stat.key, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
