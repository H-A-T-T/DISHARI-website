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
      emphasized: false,
    },
    {
      num: 2,
      icon: ClipboardList,
      title: t('steps', 'step2Title', lang),
      desc: t('steps', 'step2Desc', lang),
      emphasized: false,
    },
    {
      num: 3,
      icon: CheckCircle2,
      title: t('steps', 'step3Title', lang),
      desc: t('steps', 'step3Desc', lang),
      emphasized: true,
    },
  ]

  return (
    <section id="how-it-works" className="py-16 lg:py-24 px-4 bg-stone-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 text-center mb-2">
          {t('sections', 'howItWorks', lang)}
        </h2>
        <p className="text-stone-500 text-center mb-10">
          {lang === 'bn'
            ? 'মাত্র ৩টি ধাপে আপনার সেবা পান'
            : 'Get your service in just 3 steps'}
        </p>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
          {steps.map((step, index) => (
            <div key={step.num} className="flex flex-col lg:flex-row items-center flex-1">
              {/* Step item (Architectural, NO AI Card) */}
              <div
                className={`flex flex-col items-center text-center w-full max-w-xs ${
                  step.emphasized
                    ? 'border-2 border-stone-900 bg-white p-6 shadow-[5px_5px_0_0_#15803d]'
                    : 'border-2 border-transparent p-6'
                }`}
              >
                {/* Step number */}
                <div className="w-10 h-10 bg-stone-900 text-white font-mono font-black flex items-center justify-center text-base border-2 border-stone-900 shadow-[2px_2px_0_0_#059669]">
                  ০{step.num}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 border-2 border-stone-900 bg-stone-50 flex items-center justify-center mx-auto mt-4 shadow-[3px_3px_0_0_#1c1917]">
                  <step.icon className="w-7 h-7 text-stone-900" />
                </div>

                {/* Title */}
                <p className="font-semibold text-stone-800 text-center mt-4">
                  {step.title}
                </p>

                {/* Description */}
                <p className="text-sm text-stone-500 text-center mt-2 max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* Connecting dashed line (hidden on mobile, hidden after last step) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block flex-1 border-t-2 border-dashed border-green-200 self-center w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
