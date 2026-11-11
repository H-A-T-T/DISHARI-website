'use client'

import { BellRing, Calendar, AlertTriangle, ExternalLink, Sparkles } from 'lucide-react'
import type { CitizenDeadline } from '@/types'

interface DeadlinesViewProps {
  deadlines: CitizenDeadline[]
  lang: 'bn' | 'en'
}

export default function DeadlinesView({ deadlines, lang }: DeadlinesViewProps) {
  return (
    <div className="space-y-7">
      {/* ─── Top Banner (Windows 10 Flat Card) ─────────────────────────────── */}
      <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006A4E] uppercase mb-1">
          <BellRing className="w-4 h-4 text-[#006A4E]" />
          <span>{lang === 'bn' ? 'জাতীয় নাগরিক ডেডলাইন ও সুযোগ রাডার' : 'National Citizen Deadlines & Welfare Radar'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
          {lang === 'bn' ? 'আসন্ন সরকারি সময়সীমা ও সুযোগ' : 'Upcoming Government Deadlines & Opportunities'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
          {lang === 'bn'
            ? 'ট্যাক্স রিটার্ন, শিক্ষা উপবৃত্তি, সমাজকল্যাণ ভাতা কিংবা লাইসেন্স নবায়নের সরকারি শেষ তারিখগুলো এখানে আগে থেকে জানিয়ে দেওয়া হয়।'
            : 'Stay ahead of national deadlines for tax filing, educational stipends, social allowances, and annual license renewals.'}
        </p>
      </div>

      {/* ─── Deadlines List (Windows 10 Flat Tiles with Press Feedback) ─────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
        {deadlines.map((item) => {
          const isUrgent = item.urgency === 'high'
          const title = lang === 'bn' ? item.title_bn : item.title_en
          const desc = lang === 'bn' ? item.description_bn : item.description_en

          return (
            <div
              key={item.id}
              className={`win-tile p-5 rounded-none shadow-xs flex flex-col justify-between ${
                isUrgent ? 'border-t-3 border-t-[#C8102E]' : 'border-t-3 border-t-[#006A4E]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 border rounded-none inline-flex items-center gap-1.5 ${
                      isUrgent
                        ? 'bg-red-50 text-[#C8102E] border-red-200'
                        : 'bg-emerald-50 text-[#006A4E] border-emerald-200'
                    }`}
                  >
                    {isUrgent ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
                        <span>{lang === 'bn' ? 'জরুরি ডেডলাইন' : 'High Urgency'}</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3.5 h-3.5 text-[#006A4E] shrink-0" />
                        <span>{lang === 'bn' ? 'চলমান কার্যক্রম' : 'Ongoing Cycle'}</span>
                      </>
                    )}
                  </span>

                  <div className="flex items-center gap-1 font-mono text-xs font-semibold text-neutral-600">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{item.deadline}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">{title}</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{desc}</p>

                {/* Required Documents Badge List */}
                <div className="mt-3.5 pt-2.5 border-t border-neutral-100">
                  <span className="font-mono text-[11px] font-bold text-neutral-500 block mb-1 uppercase">
                    {lang === 'bn' ? 'প্রয়োজনীয় কাগজপত্র:' : 'Required Papers:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.required_docs.map((doc, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200 rounded-none"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                {item.official_link && (
                  <a
                    href={item.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[36px] px-3.5 border border-neutral-800 bg-neutral-900 hover:bg-[#006A4E] text-white font-bold text-xs uppercase inline-flex items-center gap-1.5 rounded-none transition-colors win-press"
                  >
                    <span>{lang === 'bn' ? 'অফিসিয়াল পোর্টাল' : 'Gov Portal'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── Welfare Recommender Teaser ───────────────────────────────────── */}
      <div className="border border-[#006A4E] bg-[#004D38] text-white p-5 sm:p-6 rounded-none shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase mb-1.5">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{lang === 'bn' ? 'নাগরিক কল্যাণ সহকারী' : 'Citizen Welfare Assistant'}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">
          {lang === 'bn' ? 'আপনার জন্য প্রযোজ্য সরকারি সুযোগ ও সহায়তা' : 'Government Welfare Schemes Matched to You'}
        </h3>
        <p className="text-emerald-100 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
          {lang === 'bn'
            ? 'আপনার প্রোফাইলে বয়স, এলাকা ও পেশা পূরণ থাকলে দিশারী স্বয়ংক্রিয়ভাবে আপনাকে দেখাবে কোন ভাতা বা স্কলারশিপের জন্য আপনি যোগ্য হতে পারেন।'
            : 'Keep your citizen profile updated to receive personalized alerts for scholarship quotas, entrepreneur grants, and social allowances.'}
        </p>
      </div>
    </div>
  )
}
