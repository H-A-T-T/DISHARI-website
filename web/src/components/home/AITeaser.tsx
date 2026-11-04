'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

export function AITeaser() {
  const { lang } = useLanguage()

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto bg-stone-900 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left — text */}
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              ✨ {t('sections', 'aiTeaser', lang)}
            </h2>
            <p className="text-stone-400 mt-4 leading-relaxed">
              {lang === 'bn'
                ? 'বাংলায় কথা বলুন। ভয়েসে প্রশ্ন করুন। আমরা বলব — কী করতে হবে, কোথায় যেতে হবে।'
                : 'Speak in Bangla. Ask questions by voice. We will tell you — what to do and where to go.'}
            </p>
            <button className="border border-white/20 text-white hover:bg-white/10 rounded-xl px-6 h-12 font-medium mt-6 transition-colors cursor-pointer">
              {lang === 'bn' ? 'আগ্রহী হলে জানান →' : 'Let us know if interested →'}
            </button>
          </div>

          {/* Right — fake chat mockup */}
          <div className="bg-stone-800 rounded-2xl p-4 w-full lg:w-80 space-y-3">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-green-600 text-white rounded-2xl rounded-br-md px-4 py-3 text-sm max-w-[80%]">
                আমি পাসপোর্ট করতে চাই
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex justify-start">
              <div className="bg-stone-700 text-stone-200 rounded-2xl rounded-bl-md px-4 py-3 text-sm max-w-[85%]">
                আপনার NID ও ছবি প্রস্তুত আছে? তাহলে শুরু করা যাক! আমি আপনার হয়ে ফর্ম পূরণ করে দিচ্ছি... ✅
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
