'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

export function AITeaser() {
  const { lang } = useLanguage()

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto bg-stone-950 border-2 border-stone-900 p-8 lg:p-12 overflow-hidden relative shadow-[8px_8px_0_0_#059669]">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left — text */}
          <div className="flex-1">
            <span className="font-mono text-xs text-green-400 font-bold uppercase tracking-wider block mb-2">
              [ কৃত্রিম বুদ্ধিমত্তা নাগরিক সহকারী ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {t('sections', 'aiTeaser', lang)}
            </h2>
            <p className="text-stone-300 mt-4 leading-relaxed text-base">
              {lang === 'bn'
                ? 'বাংলায় কথা বলুন। ভয়েসে প্রশ্ন করুন। আমরা বলব — কী করতে হবে, কোথায় যেতে হবে।'
                : 'Speak in Bangla. Ask questions by voice. We will tell you — what to do and where to go.'}
            </p>
            <button className="border-2 border-white bg-transparent hover:bg-white hover:text-stone-950 text-white px-6 h-12 font-bold mt-6 transition-colors cursor-pointer">
              {lang === 'bn' ? 'অপেক্ষা তালিকায় যোগ দিন →' : 'Join waitlist →'}
            </button>
          </div>

          {/* Right — fake chat mockup */}
          <div className="border-2 border-stone-700 bg-stone-900 p-5 w-full lg:w-88 space-y-4 shadow-[4px_4px_0_0_#000]">
            <div className="text-[11px] font-mono text-stone-400 pb-2 border-b border-stone-800">
              দিশারী জনবন্ধু এআই সিমুলেশন
            </div>
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-green-700 text-white border border-green-500 p-3 text-sm max-w-[85%] font-medium">
                আমি পাসপোর্ট করতে চাই, কী কাগজ লাগবে?
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex justify-start">
              <div className="bg-stone-800 text-stone-200 border border-stone-700 p-3 text-sm max-w-[90%] leading-relaxed">
                আপনার ১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন অথবা NID নম্বর জানা থাকলে আমাকে দিন। আমি নিজেই epassport.gov.bd পোর্টাল থেকে ফরম যাচাই করে দিচ্ছি... ✅
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
