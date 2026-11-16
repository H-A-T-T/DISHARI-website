'use client'

import Link from 'next/link'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'

const CIVIC_SOLUTIONS = [
  {
    serialBn: '০১',
    serialEn: '01',
    categoryBn: 'ভূমি সেবা ও উত্তরাধিকার',
    categoryEn: 'Land Services & Inheritance',
    scopeBn: 'ভূমি মন্ত্রণালয় · e-Mutation',
    scopeEn: 'Ministry of Land · e-Mutation',
    titleBn: 'পৈতৃক জমির নামজারি ও মধ্যস্বত্বভোগী সিন্ডিকেট নিরসন',
    titleEn: 'Inherited Land Mutation & Eliminating Middlemen',
    challengeBn:
      'উত্তরাধিকার সূত্রে প্রাপ্ত জমির নামজারি করতে গিয়ে বহু নাগরিক সরকারি ফি (১,১৭০ টাকা) এবং প্রয়োজনীয় ওয়ারিশান ও পরচা দলিলের স্পষ্ট তালিকা না জানায় দালালদের হাতে অতিরিক্ত টাকা ও সময় হারান।',
    challengeEn:
      'When mutating inherited ancestral land, citizens unaware of the official government fee (1,170 BDT) and the checklist of succession deeds often lose significant time and money to brokers.',
    solutionBn:
      'দিশারী সরাসরি mutation.land.gov.bd-এর অনুমোদিত ফি, ডিসিআর ফি, কোর্ট ফি ও ওয়ারিশান সার্টিফিকেটের চেকলিস্ট তুলে ধরে এবং দালাল ছাড়াই অনলাইনে আবেদন ট্র্যাকিংয়ের পূর্ণাঙ্গ গাইডলাইন দেয়।',
    solutionEn:
      'Dishari provides the exact statutory fee breakdown (Court, Notice, Record Correction & DCR), a verified inheritance checklist, and step-by-step guidance for direct online submission.',
    link: '/services/land-mutation',
    linkTextBn: 'নামজারি নির্দেশিকা দেখুন',
    linkTextEn: 'View Land Mutation Guide',
  },
  {
    serialBn: '০২',
    serialEn: '02',
    categoryBn: 'পরিচয়পত্র ও শিক্ষা সহায়তা',
    categoryEn: 'Identity & Educational Scholarships',
    scopeBn: 'নির্বাচন কমিশন ও প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট',
    scopeEn: 'Election Commission & PM Education Trust',
    titleBn: 'NID ভুল সংশোধন ও সময়মতো উপবৃত্তি আবেদন নিশ্চিতকরণ',
    titleEn: 'NID Correction & Timely Scholarship Access',
    challengeBn:
      'NID ও জন্মনিবন্ধনের নামের বানানে অমিলের কারণে অসচ্ছল শিক্ষার্থীদের ব্যাংক হিসাব ও উপবৃত্তি আটকে যায়। কোন প্রত্যয়নটি অনলাইনে জমা দিতে হবে এবং আবেদনের শেষ সময় কখন—তা আগে থেকে জানা যায় না।',
    challengeEn:
      'Mismatches between NID and birth records often block students’ stipend accounts. Without knowing the required institutional endorsements or strict deadlines, students miss out on vital funding.',
    solutionBn:
      'দিশারী নির্বাচন কমিশনের services.nidw.gov.bd অনুযায়ী প্রমাণক দলিলের তালিকা (SSC, মা-বাবার NID) এবং প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্টের (pmeat.gov.bd) ডেডলাইন অ্যালার্ট নোটিফিকেশন প্রদান করে।',
    solutionEn:
      'Dishari outlines the required legal evidentiary papers for NID changes and pushes automated deadline radar alerts for active secondary and higher secondary stipend cycles.',
    link: '/services/scholarship',
    linkTextBn: 'উপবৃত্তি নির্দেশিকা দেখুন',
    linkTextEn: 'View Scholarship Guide',
  },
  {
    serialBn: '০৩',
    serialEn: '03',
    categoryBn: 'ব্যবসা ও ট্রেড লাইসেন্স',
    categoryEn: 'Business Compliance & Trade Licenses',
    scopeBn: 'স্থানীয় সরকার বিভাগ ও বিসিক',
    scopeEn: 'Local Government Division & BSCIC',
    titleBn: 'ক্ষুদ্র উদ্যোক্তাদের ই-ট্রেড লাইসেন্স ও আর্থিক অন্তর্ভুক্তি',
    titleEn: 'Cottage Enterprise e-Trade Licensing & Compliance',
    challengeBn:
      'কুটির শিল্প বা অনলাইন উদ্যোক্তারা ব্যবসা শুরু করতে গিয়ে ইউনিয়ন পরিষদ নাকি পৌরসভায় যেতে হবে, বাণিজ্যিক হোল্ডিং লাগবে কি না এবং সরকারি লাইসেন্স ফি কত তা নিয়ে বিভ্রান্তিতে ভোগেন।',
    challengeEn:
      'Cottage and online entrepreneurs frequently struggle to identify whether their trade license should be issued by the Union Council or Municipality, leading to unauthorized processing surcharges.',
    solutionBn:
      'দিশারী ব্যবসার ধরন ও ভৌগোলিক অবস্থান অনুযায়ী সঠিক ই-ট্রেড লাইসেন্স ফি, ট্রেডমার্ক ও ব্যাংক একাউন্ট খোলার প্রয়োজনীয় কাগজের স্বয়ংক্রিয় চেকলিস্ট প্রদান করে।',
    solutionEn:
      'Dishari generates localized checklists and clear fee benchmarks for Union and Municipal e-Trade licenses, preparing entrepreneurs for formal commercial registration and SME loans.',
    link: '/services/trade-license',
    linkTextBn: 'ট্রেড লাইসেন্স নির্দেশিকা দেখুন',
    linkTextEn: 'View Trade License Guide',
  },
  {
    serialBn: '০৪',
    serialEn: '04',
    categoryBn: 'প্রবাসী কল্যাণ ও অভিবাসন সুরক্ষা',
    categoryEn: 'Expatriate Welfare & Migration Safety',
    scopeBn: 'প্রবাসী কল্যাণ মন্ত্রণালয় ও বিএমইটি',
    scopeEn: 'Ministry of Expatriate Welfare & BMET',
    titleBn: 'বিএমইটি স্মার্ট কার্ড ও প্রবাসী কর্মসংস্থান স্বচ্ছতা',
    titleEn: 'BMET Smart Clearance & Remittance Protection',
    challengeBn:
      'বিদেশে গমনেচ্ছু শ্রমিকরা ভিসা পাওয়ার পর বিএমইটি ইমিগ্রেশন ক্লিয়ারেন্স, পিডিও ওরিয়েন্টেশন, বায়োমেট্রিক ও কল্যাণ তহবিলের সঠিক ক্রমধারা না বুঝে জেলা অফিসে দিনের পর দিন হয়রানির শিকার হন।',
    challengeEn:
      'Migrant workers with valid overseas visas often endure bureaucratic delays trying to navigate BMET biometrics, Pre-Departure Orientation (PDO), and mandatory migrant welfare insurance.',
    solutionBn:
      'দিশারী প্রবাসী কর্মীর জন্য বিএমইটি স্মার্ট কার্ড প্রাপ্তির ৫টি সুনির্দিষ্ট ধাপ, জেলা কর্মসংস্থান অফিসের ভূমিকা ও প্রবাসী কল্যাণ ব্যাংকের পুনর্বাসন ঋণ তথ্যের নির্ভরযোগ্য পথ দেখায়।',
    solutionEn:
      'Dishari maps the 5 sequential steps for BMET clearance, verified welfare desk services, and government-backed returnee rehabilitation credit programs.',
    link: '/services/passport',
    linkTextBn: 'পরিচয় ও পাসপোর্ট সেবা দেখুন',
    linkTextEn: 'View Identity & Passport Services',
  },
]

export default function AboutPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-neutral-900 font-sans pb-24">
      {/* ─── Editorial Header / Gazette Banner (Windows 10 Flat Paper) ─────── */}
      <section className="border-b border-neutral-200 bg-white pt-9 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Logo & Official Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-200">
            <Link href="/" className="inline-block group">
              <DishariLogo
                theme="light"
                lang={lang}
                className="h-8 sm:h-9 w-auto transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-neutral-600 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
              <span>{t('aboutPage', 'gazetteTag', lang)}</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#006A4E] block mb-2">
              {t('aboutPage', 'declaration', lang)}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              {lang === 'bn' ? (
                <>
                  সরকারি সেবা হবে{' '}
                  <span className="text-[#006A4E]">
                    সহজ, স্বচ্ছ ও মধ্যস্বত্বভোগীহীন
                  </span>
                </>
              ) : (
                <>
                  Government Services Will Be{' '}
                  <span className="text-[#006A4E]">
                    Simple, Transparent & Free of Middlemen
                  </span>
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 mt-3.5 leading-relaxed font-normal">
              {t('aboutPage', 'subheadline', lang)}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* Core Manifesto Quote — Windows 10 Flat Paper Card */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-none shadow-xs border-l-4 border-l-[#006A4E]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
            {t('aboutPage', 'corePhilosophyTag', lang)}
          </span>
          <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 leading-snug">
            &ldquo;{t('aboutPage', 'coreQuote', lang)}&rdquo;
          </blockquote>
          <div className="mt-3.5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono font-medium">
            <span>{t('aboutPage', 'initiative', lang)}</span>
          </div>
        </section>

        {/* Problem & Solution (Split View) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Problem */}
          <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#C8102E]">
            <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-neutral-100">
              <span className="font-mono text-xs font-bold uppercase text-[#C8102E]">
                {t('aboutPage', 'currentRealityTag', lang)}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                {t('aboutPage', 'currentRealityTitle', lang)}
              </h2>
            </div>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              {t('aboutPage', 'currentRealityDesc', lang)}
            </p>
          </div>

          {/* Solution */}
          <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
            <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-neutral-100">
              <span className="font-mono text-xs font-bold uppercase text-[#006A4E]">
                {t('aboutPage', 'solutionTag', lang)}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                {t('aboutPage', 'solutionTitle', lang)}
              </h2>
            </div>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              {t('aboutPage', 'solutionDesc', lang)}
            </p>
          </div>
        </section>

        {/* ─── Real Civic Challenges & Systemic Solutions ──────────────── */}
        <section>
          <div className="border-b border-neutral-200 pb-2.5 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#006A4E]">
                {t('aboutPage', 'caseStudiesTag', lang)}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {t('aboutPage', 'caseStudiesTitle', lang)}
              </h2>
            </div>
            <span className="font-mono text-xs font-medium text-neutral-500">
              {t('aboutPage', 'caseStudiesSub', lang)}
            </span>
          </div>

          <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white rounded-none shadow-xs">
            {CIVIC_SOLUTIONS.map((item) => {
              const serial = lang === 'bn' ? item.serialBn : item.serialEn
              const category = lang === 'bn' ? item.categoryBn : item.categoryEn
              const scope = lang === 'bn' ? item.scopeBn : item.scopeEn
              const title = lang === 'bn' ? item.titleBn : item.titleEn
              const challenge = lang === 'bn' ? item.challengeBn : item.challengeEn
              const solution = lang === 'bn' ? item.solutionBn : item.solutionEn
              const linkText = lang === 'bn' ? item.linkTextBn : item.linkTextEn

              return (
                <div key={item.serialEn} className="p-5 sm:p-6 hover:bg-neutral-50/70 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Serial Flag */}
                    <div className="font-mono text-base sm:text-lg font-bold text-[#006A4E] shrink-0 w-8">
                      {serial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-mono font-semibold text-neutral-800 uppercase bg-neutral-100 px-2 py-0.5 border border-neutral-200 rounded-none">
                          {category}
                        </span>
                        <span className="text-xs text-neutral-500 font-medium font-mono">
                          {scope}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-3">
                        {title}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
                        <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-none">
                          <span className="text-[11px] font-mono font-bold text-[#C8102E] block uppercase tracking-wide mb-1">
                            {lang === 'bn' ? '⚠️ বিদ্যমান নাগরিক সংকট' : '⚠️ Administrative Challenge'}
                          </span>
                          <p className="text-xs text-neutral-700 leading-relaxed">
                            {challenge}
                          </p>
                        </div>

                        <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-none">
                          <span className="text-[11px] font-mono font-bold text-[#006A4E] block uppercase tracking-wide mb-1">
                            {lang === 'bn' ? '✓ দিশারীর স্থায়ী সমাধান' : '✓ Dishari Systemic Solution'}
                          </span>
                          <p className="text-xs text-neutral-700 leading-relaxed">
                            {solution}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <Link
                          href={item.link}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006A4E] hover:text-[#004D38] border border-[#006A4E]/30 bg-white hover:bg-emerald-50/50 px-3 py-1.5 rounded-none win-press transition-colors"
                        >
                          <span>{linkText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── Platform Features & Capabilities Matrix ─────────────────────── */}
        <section className="border border-neutral-200 bg-white p-5 sm:p-8 rounded-none shadow-xs">
          <div className="border-b border-neutral-200 pb-3 mb-6">
            <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider block mb-1">
              {lang === 'bn' ? 'প্ল্যাটফর্মের সক্ষমতা ও উদ্ভাবন' : 'Platform Capabilities & Roadmap'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {lang === 'bn' ? 'দিশারীর মূল সেবাসমূহ ও প্রযুক্তিগত সুবিধা' : 'Dishari Core Features & Technology'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'সাধারণ নাগরিক যেন ঘরে বসেই আত্মবিশ্বাসের সাথে সরকারি কাজ সম্পন্ন করতে পারেন, সেজন্য প্রতিটি ফিচার পরিকল্পিতভাবে তৈরি।'
                : 'Every capability is engineered so everyday citizens can confidently navigate public administration without harassment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'directory',
                titleBn: 'যাচাইকৃত সরকারি সেবা ডিরেক্টরি',
                titleEn: 'Verified Citizen Services Directory',
                status: 'active',
                descBn: 'পাসপোর্ট, এনআইডি, নামজারি, উপবৃত্তি ও ভাতাসহ ১৫টির বেশি সেবার নির্ভুল সরকারি ফি, প্রক্রিয়াকরণ সময় ও সরকারি গেজেট লিংক।',
                descEn: 'Accurate gazette fees, processing timelines, and direct official portal links for 15+ citizen services.',
              },
              {
                id: 'checklist',
                titleBn: 'স্মার্ট ডকুমেন্ট চেকলিস্ট',
                titleEn: 'Smart Document Checklist',
                status: 'active',
                descBn: 'কোন কাজের জন্য মূল কপি লাগবে, কোনটির ফটোকপি লাগবে এবং কোনো বিশেষ প্রত্যয়ন প্রয়োজন কি না—কম্পিউটার দোকানে যাওয়ার আগেই নিশ্চিত হতে পারবেন।',
                descEn: 'Know in advance whether original or photocopied documents are mandatory, avoiding wasted trips to local computer stalls.',
              },
              {
                id: 'locker',
                titleBn: 'ডিজিটাল নাগরিক লকার (Document Locker)',
                titleEn: 'Digital Citizen Document Locker',
                status: 'active',
                descBn: 'এনআইডি, জন্ম সনদ, পাসপোর্ট সাইজ ছবি ও ট্রেড লাইসেন্স একবার নিরাপদে সেভ করুন। যেকোনো ফর্মে ১-ক্লিকে ব্যবহারযোগ্য।',
                descEn: 'Securely store NID, Birth Certificate, Photo, and Trade License once to seamlessly attach to any civic form.',
              },
              {
                id: 'dockets',
                titleBn: 'আবেদন ডকেট ও সহকারী প্রস্তুতি',
                titleEn: 'Guided Application Docket Preparation',
                status: 'active',
                descBn: 'সেবা বাছাই করে এক ক্লিকে সম্পূর্ণ আবেদন কার্যপত্র তৈরি, প্রিন্ট ও সরাসরি সরকারি পোর্টালে তথ্য উপস্থাপনের সুবিধা।',
                descEn: 'Generate verified civic dockets, printable summaries, and guided submission links with full document linkage.',
              },
              {
                id: 'deadlines',
                titleBn: 'জাতীয় ডেডলাইন ও ভাতা রাডার',
                titleEn: 'National Deadlines & Welfare Radar',
                status: 'active',
                descBn: 'আয়কর রিটার্নের শেষ তারিখ, শিক্ষা সহায়তা উপবৃত্তি চক্র এবং ইউনিয়ন সমাজসেবা ভাতার নোটিফিকেশন সময়মতো পৌঁছে দেওয়া।',
                descEn: 'Timely reminders for tax return filing, scholarship cycles, and social welfare allowance beneficiary renewals.',
              },
              {
                id: 'bot',
                titleBn: 'অদৃশ্য বোট অটোমেশন (Playwright Bot)',
                titleEn: 'Invisible Bot Submission Automation',
                status: 'upcoming',
                descBn: 'জটিল সরকারি ওয়েবসাইটের বিভ্রান্তিকর ফরম মানুষের হয়ে স্বয়ংক্রিয় সার্ভার-সাইড ব্রাউজার বোট দিয়ে পূরণ ও জমা দেওয়া।',
                descEn: 'Server-side headless browser workers invisibly navigating government portals to submit forms without citizen friction.',
              },
              {
                id: 'ai-voice',
                titleBn: 'জনবন্ধু এআই ভয়েস সহকারী (Bangla Voice AI)',
                titleEn: 'Jonobondhu Voice Assistant (Regional Dialects)',
                status: 'active',
                descBn: 'কীবোর্ডে টাইপ না করে নিজের আঞ্চলিক ভাষায় মুখে কথা বলে সরকারি সেবা ও কাগজপত্র সংক্রান্ত প্রশ্নের তাৎক্ষণিক সমাধান।',
                descEn: 'Conversational voice assistant capable of understanding everyday Bengali accents and giving step-by-step oral guidance.',
              },
            ].map((f) => (
              <div
                key={f.id}
                className="border border-neutral-200 bg-white p-4 sm:p-5 rounded-none shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                      {lang === 'bn' ? f.titleBn : f.titleEn}
                    </h3>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 border rounded-none shrink-0 ${
                        f.status === 'active'
                          ? 'bg-emerald-50 text-[#006A4E] border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {f.status === 'active'
                        ? lang === 'bn'
                          ? 'সক্রিয়'
                          : 'Active'
                        : lang === 'bn'
                        ? 'শীঘ্রই আসছে'
                        : 'Coming Soon'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {lang === 'bn' ? f.descBn : f.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── The National Vision Charter ──────────────────────────────────── */}
        <section className="border border-[#006A4E] bg-[#004D38] text-white p-7 sm:p-10 rounded-none shadow-xs relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8102E]" />

          <span className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-widest block mb-1.5">
            {t('aboutPage', 'visionTag', lang)}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t('aboutPage', 'visionTitle', lang)}
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base mt-3 leading-relaxed max-w-3xl">
            {t('aboutPage', 'visionQuote1', lang)}{' '}
            <strong className="text-white underline decoration-emerald-400 underline-offset-4">
              {t('aboutPage', 'visionQuoteAction', lang)}
            </strong>
            <br />
            {t('aboutPage', 'visionQuote2', lang)}{' '}
            <strong className="text-emerald-300">
              {t('aboutPage', 'visionQuoteAnswer', lang)}
            </strong>
          </p>

          <div className="mt-7 pt-5 border-t border-[#0D8262]/60 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-emerald-200/80">
              {t('aboutPage', 'coreTeam', lang)}
            </span>
            <Link
              href="/services"
              className="border border-white bg-white hover:bg-neutral-100 text-[#004D38] font-bold px-5 py-2.5 text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 rounded-none"
            >
              <span>{t('aboutPage', 'viewAllBtn', lang)}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
