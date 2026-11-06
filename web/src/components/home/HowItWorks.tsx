'use client'

import { Search, ClipboardList, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

export function HowItWorks() {
  const { lang } = useLanguage()

  const steps = [
    {
      num: 1,
      icon: Search,
      title: t('steps', 'step1Title', lang),
      desc: t('steps', 'step1Desc', lang),
    },
    {
      num: 2,
      icon: ClipboardList,
      title: t('steps', 'step2Title', lang),
      desc: t('steps', 'step2Desc', lang),
    },
    {
      num: 3,
      icon: CheckCircle2,
      title: t('steps', 'step3Title', lang),
      desc: t('steps', 'step3Desc', lang),
    },
  ]

  return (
    <section id="how-it-works" className="py-10 lg:py-14 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header — Clean Windows 10 Typography */}
        <div className="mb-6 pb-3 border-b border-neutral-200">
          <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 tracking-tight">
            {t('sections', 'howItWorks', lang)}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            {t('sections', 'howItWorksSub', lang)}
          </p>
        </div>

        {/* Seamless 3-Step Flat Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => {
            const stepSerial = lang === 'bn' ? `০${step.num}` : `0${step.num}`

            return (
              <div
                key={step.num}
                className="bg-white border border-neutral-200 p-5 rounded-none border-t-3 border-t-neutral-300 hover:border-t-[#006A4E] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-neutral-400">
                    {stepSerial}
                  </span>
                  <step.icon className="w-5 h-5 text-[#006A4E]" />
                </div>

                <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
