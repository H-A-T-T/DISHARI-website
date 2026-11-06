'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

export function AITeaser() {
  const { lang } = useLanguage()

  return (
    <section className="py-14 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto bg-[#004D38] border border-[#006A4E] p-7 sm:p-10 lg:p-12 text-white relative rounded-none shadow-sm">
        {/* Top 3px Bangladesh Red Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8102E]" />

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left — text */}
          <div className="flex-1">
            <span className="inline-block px-2.5 py-0.5 bg-[#C8102E] text-white text-[11px] font-bold uppercase tracking-wider mb-2.5 rounded-none">
              {t('sections', 'aiTeaserBadge', lang)}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {t('sections', 'aiTeaser', lang)}
            </h2>
            <p className="text-emerald-100 mt-3 leading-relaxed text-sm sm:text-base">
              {t('sections', 'aiTeaserDesc', lang)}
            </p>
            <button className="border border-white bg-white hover:bg-neutral-100 text-[#004D38] px-6 h-10 font-bold text-xs uppercase tracking-wider mt-5 transition-colors cursor-pointer rounded-none">
              {t('sections', 'joinWaitlist', lang)}
            </button>
          </div>

          {/* Right — chat mockup */}
          <div className="border border-[#0D8262] bg-[#003627] p-4.5 w-full lg:w-96 space-y-3.5 rounded-none shadow-sm">
            <div className="text-[11px] font-mono text-emerald-300 pb-2 border-b border-[#0D8262]/50 font-bold uppercase">
              {t('sections', 'simHeader', lang)}
            </div>
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-[#006A4E] text-white border border-[#0D8262] p-2.5 text-xs sm:text-sm max-w-[88%] font-medium rounded-none">
                {t('sections', 'simUser', lang)}
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex justify-start">
              <div className="bg-[#002B1F] text-emerald-100 border border-[#0D8262]/40 p-2.5 text-xs sm:text-sm max-w-[92%] leading-relaxed rounded-none">
                {t('sections', 'simAi', lang)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AITeaser
