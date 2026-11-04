'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  IdCard,
  GraduationCap,
  MapPin,
  HeartHandshake,
  Briefcase,
  Receipt,
  Plane,
  Stethoscope,
  Clock,
  Globe,
  FileText,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Loader2,
  Building2,
  PhoneCall,
  Check,
  ArrowRight,
  FolderLock,
  Layers,
  Printer,
  Copy,
} from 'lucide-react'
import { cn, CATEGORY_META } from '@/lib/utils'
import type { Service, ServiceCategory } from '@/types'
import { fetchServiceBySlug } from '@/lib/api'

const CATEGORY_ICONS: Record<ServiceCategory, React.ElementType> = {
  identity: IdCard,
  education: GraduationCap,
  land: MapPin,
  welfare: HeartHandshake,
  business: Briefcase,
  tax: Receipt,
  overseas: Plane,
  health: Stethoscope,
}

const SUBMISSION_CONFIG: Record<string, { label: string; desc: string }> = {
  online_bot: {
    label: 'সম্পূর্ণ অনলাইন প্রক্রিয়া',
    desc: 'ঘরে বসেই কম্পিউটার বা মোবাইল থেকে আবেদন ও সরকারি ফি পরিশোধ করা যাবে।',
  },
  hybrid: {
    label: 'অনলাইন আবেদন + সরাসরি কার্যালয়ে যাচাই',
    desc: 'অনলাইনে ফর্ম পূরণ শেষে নির্ধারিত কার্যালয়ে ছবি, ফিঙ্গারপ্রিন্ট বা মূল কপি যাচাইয়ের জন্য উপস্থিত হতে হবে।',
  },
  pdf_only: {
    label: 'সরাসরি কার্যালয়ে জমা (অফলাইন)',
    desc: 'ফর্ম সংগ্রহ ও প্রয়োজনীয় কাগজপত্র সত্যায়িত করে সরাসরি সংশ্লিষ্ট অফিসে জমা দিতে হবে।',
  },
}

const COPY_TYPE_CONFIG: Record<string, { label: string; tagStyle: string }> = {
  original: {
    label: '[ মূল কপি আবশ্যক ]',
    tagStyle: 'text-emerald-800 font-bold bg-emerald-50 border border-emerald-300',
  },
  photocopy: {
    label: '[ ফটোকপি গ্রহণযোগ্য ]',
    tagStyle: 'text-stone-700 font-semibold bg-stone-100 border border-stone-300',
  },
  both: {
    label: '[ মূল ও ফটোকপি উভয়ই ]',
    tagStyle: 'text-blue-800 font-bold bg-blue-50 border border-blue-300',
  },
  online_print: {
    label: '[ অনলাইন প্রিন্ট কপি ]',
    tagStyle: 'text-purple-800 font-bold bg-purple-50 border border-purple-300',
  },
  online: {
    label: '[ অনলাইন প্রিন্ট কপি ]',
    tagStyle: 'text-purple-800 font-bold bg-purple-50 border border-purple-300',
  },
}

function toBengaliNumber(num: number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num
    .toString()
    .split('')
    .map((d) => bnDigits[parseInt(d, 10)] ?? d)
    .join('')
}

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({})

  useEffect(() => {
    let active = true
    setLoading(true)

    fetchServiceBySlug(slug)
      .then((data) => {
        if (active) {
          setService(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  const toggleDoc = (index: number) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-[#FAFAF8] text-stone-700">
        <Loader2 className="w-9 h-9 animate-spin text-green-700" />
        <p className="text-xl font-bold">সরকারি কার্যপত্র লোড হচ্ছে...</p>
        <p className="text-xs text-stone-500 font-mono">নথি যাচাই প্রক্রিয়াধীন</p>
      </div>
    )
  }

  if (!service) {
    return (
      <section className="py-20 px-4 bg-[#FAFAF8] min-h-[70vh]">
        <div className="max-w-xl mx-auto border-2 border-stone-900 bg-white p-8 text-center shadow-[6px_6px_0_0_#1c1917]">
          <h1 className="text-2xl font-bold text-stone-900">সেবাটি পাওয়া যায়নি</h1>
          <p className="text-stone-600 mt-2 text-sm leading-relaxed">
            আপনি যে সেবাটি খুঁজছেন সেটি ডাটাবেজে তালিকাভুক্ত নেই অথবা লিঙ্ক পরিবর্তিত হয়েছে।
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-6 border-2 border-stone-900 bg-stone-900 text-white px-6 py-3 font-bold hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            সকল সেবায় ফিরে যান
          </Link>
        </div>
      </section>
    )
  }

  const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
  const Icon = CATEGORY_ICONS[service.category] || IdCard
  const submission =
    SUBMISSION_CONFIG[service.submission_type] || SUBMISSION_CONFIG.hybrid

  const totalDocs = service.required_docs?.length || 0
  const completedDocsCount = Object.values(checkedDocs).filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 font-sans pb-36">
      {/* ─── DOCKET COVER / OFFICIAL BROADSIDE HEADER ─────────────────────── */}
      <header className="border-b-2 border-stone-900 bg-white pt-8 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb & Docket Reference Code */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-green-800 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>← সকল সরকারি সেবা তালিকায় ফিরুন</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-stone-500">
              <span className="font-bold text-stone-900">নথি আইডি:</span>
              <span>BD-GOV-{service.slug.toUpperCase()}</span>
              <span className="text-stone-300">|</span>
              <span className="text-green-700 font-semibold">[ গেজেট যাচাইকৃত ২০২৬ ]</span>
            </div>
          </div>

          {/* Title Area in Kalpurush Typography */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Category & Mode Labels (Text brackets, NOT pills) */}
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs sm:text-sm">
                <span className="font-bold text-stone-900 uppercase tracking-wide">
                  বিভাগ: {meta.name_bn}
                </span>
                <span className="text-stone-300">·</span>
                <span className="font-semibold text-green-800 bg-green-50 px-2.5 py-0.5 border border-green-300">
                  {submission.label}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight leading-tight">
                {service.name_bn}
              </h1>
              <p className="text-base sm:text-lg text-stone-500 font-medium mt-1">
                {service.name_en}
              </p>

              {/* Authority */}
              <div className="flex items-center gap-2 mt-4 text-xs sm:text-sm text-stone-700 font-semibold">
                <Building2 className="w-4 h-4 text-stone-500 shrink-0" />
                <span>মন্ত্রণালয় / দপ্তর: <strong className="text-stone-950 font-bold">{service.department_bn}</strong></span>
              </div>
            </div>

            {/* Official Stamp Box */}
            <div className="border-2 border-stone-900 bg-stone-50 p-5 text-center shrink-0 min-w-[200px] shadow-[4px_4px_0_0_#1c1917]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 block">
                সরকারি তথ্যভাণ্ডার
              </span>
              <div className="my-1.5 flex justify-center">
                <ShieldCheck className="w-8 h-8 text-green-700" />
              </div>
              <span className="text-sm font-bold text-stone-900 block">
                ১০০% নির্ভুল গেজেট তথ্য
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                মধ্যস্বত্বভোগী ছাড়াই আবেদনযোগ্য
              </span>
            </div>
          </div>

          {/* ─── EXECUTIVE FACTS LEDGER (Structured Grid, NO CARDS!) ───────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-stone-900 bg-stone-50 mt-8 divide-y sm:divide-y-0 sm:divide-x-2 divide-stone-900">
            {/* Fact 1: Fee */}
            <div className="p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                [ সরকারি ফি ]
              </span>
              <div className="mt-2">
                <p className="text-2xl sm:text-3xl font-black text-stone-950">
                  {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                </p>
                <p className="text-xs text-stone-600 mt-1 leading-snug">
                  {service.fee_note_bn || 'অতিরিক্ত কোনো চার্জ প্রযোজ্য নয়'}
                </p>
              </div>
            </div>

            {/* Fact 2: Time */}
            <div className="p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                [ সময়সীমা ]
              </span>
              <div className="mt-2">
                <p className="text-xl sm:text-2xl font-bold text-stone-950">
                  {service.processing_time_bn}
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  ছুটির দিন ব্যতীত কার্যকর কার্যদিবস
                </p>
              </div>
            </div>

            {/* Fact 3: Submission Place */}
            <div className="p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                [ জমাদানের স্থান ]
              </span>
              <div className="mt-2">
                <p className="text-xs sm:text-sm font-bold text-stone-950 leading-relaxed">
                  {service.apply_location_bn}
                </p>
              </div>
            </div>

            {/* Fact 4: Official Portal */}
            <div className="p-4 sm:p-5 flex flex-col justify-between bg-white">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                [ সরকারি পোর্টাল ]
              </span>
              <div className="mt-2">
                {service.official_url && service.official_url !== '#' ? (
                  <a
                    href={service.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-green-800 hover:text-green-950 hover:underline"
                  >
                    <span>সরাসরি অফিসিয়াল সাইট</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-stone-500">সরাসরি সংশ্লিষ্ট কার্যালয়</span>
                )}
                <p className="text-[11px] text-stone-400 font-mono truncate mt-1">
                  {service.official_url}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN DOSSIER BODY (NO CARDS!) ─────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-14">
        {/* ─── SECTION 1: REQUIRED DOCUMENTS CHECKLIST LEDGER ──────────────── */}
        <section id="documents" className="scroll-mt-24">
          <div className="border-b-2 border-stone-900 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-stone-900">০১.</span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
                  প্রয়োজনীয় কাগজপত্র যাচাই তালিকা
                </h2>
              </div>
              <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                কম্পিউটারের দোকানে বা সরকারি অফিসে যাওয়ার আগে নিশ্চিত করুন নিচের প্রতিটি কাগজ আপনার কাছে প্রস্তুত রয়েছে। মিলিয়ে নিতে টিক দিন।
              </p>
            </div>

            {/* Interactive Progress Indicator */}
            {totalDocs > 0 && (
              <div className="border-2 border-stone-900 bg-white px-4 py-2 shrink-0 text-right shadow-[3px_3px_0_0_#1c1917]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block">
                  কাগজপত্র প্রস্তুত
                </span>
                <span className="text-base font-black text-stone-950">
                  {toBengaliNumber(completedDocsCount)} / {toBengaliNumber(totalDocs)}টি সম্পন্ন
                </span>
              </div>
            )}
          </div>

          {/* Lined Document Ledger Table (NO CARDS!) */}
          <div className="border-y-2 border-stone-900 divide-y-2 divide-stone-200 bg-white">
            {service.required_docs && service.required_docs.length > 0 ? (
              service.required_docs.map((doc, idx) => {
                const isChecked = !!checkedDocs[idx]
                const copyConfig =
                  COPY_TYPE_CONFIG[doc.copy_type] || COPY_TYPE_CONFIG.photocopy

                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(idx)}
                    className={cn(
                      'p-4 sm:p-6 transition-colors duration-150 cursor-pointer flex items-start gap-4 select-none',
                      isChecked ? 'bg-stone-100/70' : 'hover:bg-stone-50'
                    )}
                  >
                    {/* Square Checkbox [✓] */}
                    <button
                      type="button"
                      className={cn(
                        'w-7 h-7 border-2 border-stone-900 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        isChecked ? 'bg-stone-900 text-white' : 'bg-white hover:border-green-700'
                      )}
                      aria-label="কাগজ প্রস্তুত টিক দিন"
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3
                          className={cn(
                            'text-lg sm:text-xl font-bold leading-snug transition-colors',
                            isChecked ? 'line-through text-stone-400' : 'text-stone-950'
                          )}
                        >
                          {doc.name_bn}
                        </h3>

                        {/* Status Tag (Bracketed text, NOT a cramped pill!) */}
                        <span className={cn('text-xs px-2.5 py-1 font-mono uppercase tracking-wider shrink-0 self-start sm:self-auto', copyConfig.tagStyle)}>
                          {copyConfig.label}
                        </span>
                      </div>

                      {doc.name_en && (
                        <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                          {doc.name_en}
                        </p>
                      )}

                      {/* Clear Indented Instruction Note */}
                      {doc.note_bn && (
                        <div className="mt-3 border-l-4 border-amber-600 bg-amber-50/70 p-3 text-xs sm:text-sm text-amber-950 leading-relaxed">
                          <strong className="font-bold">গুরুত্বপূর্ণ নির্দেশনা:</strong> {doc.note_bn}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-8 text-center text-stone-500">
                এই সেবার জন্য কোনো নির্দিষ্ট কাগজপত্রের আবশ্যকতা উল্লেখ নেই।
              </div>
            )}
          </div>

          {/* Smart Document Locker Callout (Citizen Dossier Perk) */}
          <div className="mt-8 border-2 border-stone-900 bg-stone-950 text-white p-6 sm:p-8 shadow-[6px_6px_0_0_#059669]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-mono text-xs text-green-400 font-bold uppercase tracking-wider block mb-1">
                  [ দিশারী ডিজিটাল নাগরিক ভল্ট ]
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  বারবার কাগজপত্র খোঁজা ও ফটোকপির ঝামেলা বন্ধ করুন
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                  আপনার জাতীয় পরিচয়পত্র, জন্ম সনদ ও ছবি একবার দিশারী সুরক্ষিত লকারে সেভ করে রাখুন। পরবর্তীতে যেকোনো সরকারি ফরম পূরণের সময় এটি এক ক্লিকে স্বয়ংক্রিয়ভাবে যুক্ত হয়ে যাবে।
                </p>
              </div>
              <Link
                href="/register"
                className="border-2 border-white bg-green-700 hover:bg-green-600 text-white px-6 py-3 font-bold text-sm shrink-0 transition-colors text-center"
              >
                কাগজপত্র সেভ করুন →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: STEP-BY-STEP PROCESS ROADMAP ─────────────────────── */}
        <section id="process" className="scroll-mt-24">
          <div className="border-b-2 border-stone-900 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl sm:text-2xl font-black text-stone-900">০২.</span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
                ধাপে ধাপে সরকারি আবেদন প্রক্রিয়া
              </h2>
            </div>
            <p className="text-sm text-stone-600 mt-1 leading-relaxed">
              সংশ্লিষ্ট মন্ত্রণালয়ের নির্ধারিত গাইডলাইন অনুযায়ী ধাপে ধাপে সম্পন্ন করুন।
            </p>
          </div>

          {/* Connected Numbered Transit Track */}
          <div className="border-l-4 border-stone-900 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 my-6">
            {service.steps && service.steps.length > 0 ? (
              service.steps.map((st) => (
                <div key={st.step} className="relative">
                  {/* Step Flag Marker */}
                  <div className="absolute -left-[38px] sm:-left-[46px] top-0 w-8 h-8 sm:w-10 sm:h-10 bg-stone-900 text-white font-mono font-black flex items-center justify-center text-sm sm:text-base border-2 border-white shadow-xs">
                    {toBengaliNumber(st.step)}
                  </div>

                  {/* Step Content */}
                  <div className="bg-white border-2 border-stone-900 p-5 sm:p-6 shadow-[4px_4px_0_0_#1c1917]">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-stone-200">
                      <h3 className="text-lg sm:text-xl font-bold text-stone-950">
                        {st.title_bn}
                      </h3>
                      <span className="font-mono text-xs font-bold text-stone-500 uppercase">
                        ধাপ {toBengaliNumber(st.step)}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                      {st.description_bn}
                    </p>

                    {st.url && st.url !== '#' && (
                      <div className="mt-4 pt-3 border-t border-stone-100">
                        <a
                          href={st.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-green-800 hover:text-green-950 hover:underline"
                        >
                          <span>সরাসরি অফিসিয়াল পোর্টালে এই ধাপটি সম্পন্ন করুন</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-stone-500">ধাপের তথ্য পাওয়া যায়নি।</div>
            )}
          </div>
        </section>

        {/* ─── SECTION 3: OFFICIAL NOTICEBOARD (CAUTIONS & MISTAKES) ───────── */}
        {(service.important_notes_bn?.length || service.common_mistakes_bn?.length) && (
          <section className="scroll-mt-24">
            <div className="border-b-2 border-stone-900 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-stone-900">০৩.</span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
                  জরুরি নোটিশ ও সাধারণ ভুলসমূহ
                </h2>
              </div>
              <p className="text-sm text-stone-600 mt-1">
                আবেদন বাতিলের হাত থেকে বাঁচতে এবং অনাকাঙ্ক্ষিত হয়রানি এড়াতে নিচের বিষয়গুলো লক্ষ্য রাখুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Important Notes */}
              {service.important_notes_bn && service.important_notes_bn.length > 0 && (
                <div className="border-2 border-amber-600 bg-amber-50/90 p-6 shadow-[4px_4px_0_0_#d97706]">
                  <div className="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg pb-3 mb-3 border-b border-amber-300">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>জরুরি জ্ঞাতব্য (অফিসিয়াল নিয়ম)</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-amber-950 leading-relaxed">
                    {service.important_notes_bn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-mono font-bold text-amber-700">[{toBengaliNumber(i + 1)}]</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {service.common_mistakes_bn && service.common_mistakes_bn.length > 0 && (
                <div className="border-2 border-rose-600 bg-rose-50/90 p-6 shadow-[4px_4px_0_0_#e11d48]">
                  <div className="flex items-center gap-2 text-rose-950 font-black text-base sm:text-lg pb-3 mb-3 border-b border-rose-300">
                    <HelpCircle className="w-5 h-5 text-rose-700 shrink-0" />
                    <span>যেসব কারণে আবেদন বাতিল বা বিলম্ব হয়</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-rose-950 leading-relaxed">
                    {service.common_mistakes_bn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-mono font-bold text-rose-700">[✕]</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ─── SECTION 4: OFFICE JURISDICTION & DETAILS ───────────────────── */}
        <section className="border-2 border-stone-900 bg-white p-6 sm:p-8 shadow-[6px_6px_0_0_#1c1917]">
          <div className="border-b-2 border-stone-900 pb-3 mb-4 flex items-center gap-3">
            <span className="font-mono text-xl font-black text-stone-900">০৪.</span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-950">
              অফিসিয়াল তথ্য ও জমাদান নির্দেশিকা
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 border border-stone-200 bg-stone-50">
              <span className="font-mono text-xs text-stone-500 block uppercase">[ নির্ধারিত ফি ]</span>
              <span className="text-xl font-black text-stone-950 mt-1 block">
                {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
              </span>
              {service.fee_note_bn && <p className="text-xs text-stone-600 mt-1">{service.fee_note_bn}</p>}
            </div>

            <div className="p-3 border border-stone-200 bg-stone-50">
              <span className="font-mono text-xs text-stone-500 block uppercase">[ সময়কাল ]</span>
              <span className="text-xl font-bold text-stone-950 mt-1 block">
                {service.processing_time_bn}
              </span>
              <p className="text-xs text-stone-600 mt-1">ছুটির দিন ব্যতীত কার্যকর</p>
            </div>

            <div className="p-3 border border-stone-200 bg-stone-50">
              <span className="font-mono text-xs text-stone-500 block uppercase">[ জমাদান স্থল ]</span>
              <span className="text-stone-950 font-bold mt-1 block leading-relaxed">
                {service.apply_location_bn}
              </span>
            </div>

            <div className="p-3 border border-stone-200 bg-stone-50">
              <span className="font-mono text-xs text-stone-500 block uppercase">[ দায়িত্বপ্রাপ্ত দপ্তর ]</span>
              <span className="text-stone-950 font-bold mt-1 block leading-relaxed">
                {service.department_bn}
              </span>
            </div>
          </div>

          {service.official_url && service.official_url !== '#' && (
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700">
                <ShieldCheck className="w-5 h-5 text-green-700 shrink-0" />
                <span>সরকারি পোর্টাল লিংক: <span className="font-mono text-stone-950">{service.official_url}</span></span>
              </div>
              <a
                href={service.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-stone-900 bg-stone-900 hover:bg-green-700 text-white px-5 py-2.5 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>অফিসিয়াল পোর্টাল খুলুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </section>

        {/* ─── SECTION 5: NATIONAL HELPLINES ──────────────────────────────── */}
        <section className="border-2 border-stone-900 bg-green-800 text-white p-6 sm:p-8 shadow-[6px_6px_0_0_#1c1917]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-green-300 font-bold uppercase tracking-wider block mb-1">
                [ জরুরি নাগরিক সেবা ]
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                কোনো জটিলতা হলে সরকারি হেল্পলাইনে ফোন করুন
              </h3>
              <p className="text-green-100 text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
                জাতীয় কল সেন্টার ৩৩৩-এ যেকোনো সরকারি সেবা সংক্রান্ত প্রশ্ন ও সহায়তার জন্য ২৪ ঘণ্টা বিনামূল্যে কল করা যায়।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:333"
                className="border-2 border-white bg-white text-green-950 hover:bg-stone-100 px-6 py-3 font-black text-sm flex items-center gap-2 transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-green-800" />
                <span>৩৩৩ (জাতীয় হেল্পলাইন)</span>
              </a>
              <a
                href="tel:999"
                className="border-2 border-white bg-green-900 hover:bg-green-950 text-white px-5 py-3 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <span>৯৯৯ (জরুরি সেবা)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── PERSISTENT ARCHITECTURAL ACTION BAR (NO BUBBLY PILLS) ───────── */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-stone-900 bg-white/95 backdrop-blur-md p-3 sm:p-4 z-40 shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wide block truncate">
              {service.department_bn}
            </span>
            <p className="text-sm sm:text-base font-black text-stone-950 truncate">
              {service.name_bn}
              <span className="text-green-800 ml-2 font-bold font-mono text-xs sm:text-sm">
                ({service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`})
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {service.official_url && service.official_url !== '#' && (
              <a
                href={service.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 border-2 border-stone-900 bg-white hover:bg-stone-100 text-stone-900 px-4 py-2.5 text-xs font-bold transition-colors"
              >
                <span>অফিসিয়াল সাইট</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              href="/login"
              className="border-2 border-stone-900 bg-green-700 hover:bg-green-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm sm:text-base transition-colors shadow-[3px_3px_0_0_#1c1917] flex items-center gap-2"
            >
              <span>আবেদন শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
