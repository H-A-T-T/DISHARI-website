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
    <section className="py-16 bg-green-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center ${
                index < stats.length - 1 ? 'lg:border-r lg:border-green-600' : ''
              }`}
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-white">
                {stat.number}
              </p>
              <p className="text-sm text-green-200 mt-2">
                {t('stats', stat.key, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
