'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Loader2,
  ShieldCheck,
  Copy,
  Printer,
  Sparkles,
  Building2,
  PhoneCall,
  Check,
  MapPinned,
  Coins,
  CalendarCheck,
  ArrowRight,
  FolderLock,
  Layers,
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

const SUBMISSION_TYPE_CONFIG: Record<
  string,
  { label: string; desc: string; class: string; icon: React.ElementType }
> = {
  online_bot: {
    label: 'সম্পূর্ণ অনলাইন প্রক্রিয়া',
    desc: 'ঘরে বসেই ইন্টারনেট ও মোবাইল ব্যাংকিংয়ের মাধ্যমে সম্পন্ন করা যায়।',
    class: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Globe,
  },
  hybrid: {
    label: 'অনলাইন আবেদন + সরাসরি যাচাই',
    desc: 'অনলাইনে ফর্ম পূরণ ও ফি প্রদান শেষে নির্ধারিত অফিসে বায়োমেট্রিক বা মূল কপি যাচাইয়ের জন্য উপস্থিত হতে হয়।',
    class: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Layers,
  },
  pdf_only: {
    label: 'সরাসরি জমা (অফলাইন)',
    desc: 'ফর্ম সংগ্রহ ও প্রয়োজনীয় কাগজপত্র সত্যায়িত করে সংশ্লিষ্ট কার্যালয়ে সশরীরে জমা দিতে হয়।',
    class: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: MapPinned,
  },
}

const COPY_TYPE_CONFIG: Record<
  string,
  { label: string; class: string; icon: React.ElementType }
> = {
  original: {
    label: 'মূল কপি আবশ্যক',
    class: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    icon: ShieldCheck,
  },
  photocopy: {
    label: 'ফটোকপি গ্রহণযোগ্য',
    class: 'bg-stone-100 text-stone-700 border-stone-300',
    icon: Copy,
  },
  both: {
    label: 'মূল ও ফটোকপি উভয়ই',
    class: 'bg-blue-50 text-blue-800 border-blue-300',
    icon: Layers,
  },
  online_print: {
    label: 'অনলাইন প্রিন্ট কপি',
    class: 'bg-purple-50 text-purple-800 border-purple-300',
    icon: Printer,
  },
  online: {
    label: 'অনলাইন প্রিন্ট কপি',
    class: 'bg-purple-50 text-purple-800 border-purple-300',
    icon: Printer,
  },
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-stone-500 bg-[#FAFAF8]">
        <Loader2 className="w-9 h-9 animate-spin text-green-600" />
        <p className="text-base font-bold text-stone-800">অফিসিয়াল ডাটাবেজ থেকে সেবার তথ্য লোড হচ্ছে...</p>
        <p className="text-xs text-stone-400">বাংলাদেশ সরকার নির্দেশিত হালনাগাদ তথ্য যাচাই করা হচ্ছে</p>
      </div>
    )
  }

  if (!service) {
    return (
      <section className="py-20 px-4 bg-[#FAFAF8] min-h-[70vh]">
        <div className="max-w-xl mx-auto text-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900">সেবাটি পাওয়া যায়নি</h1>
          <p className="text-stone-500 mt-2 text-sm leading-relaxed">
            আপনি যে সেবাটি খুঁজছেন সেটি ডাটাবেজে তালিকাভুক্ত নেই অথবা সেবাটির লিঙ্ক পরিবর্তিত হয়েছে।
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 h-12 font-bold transition-colors shadow-sm"
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
  const submissionConfig =
    SUBMISSION_TYPE_CONFIG[service.submission_type] || SUBMISSION_TYPE_CONFIG.hybrid
  const SubmissionIcon = submissionConfig.icon

  const totalDocs = service.required_docs?.length || 0
  const completedDocsCount = Object.values(checkedDocs).filter(Boolean).length
  const progressPercent = totalDocs > 0 ? Math.round((completedDocsCount / totalDocs) * 100) : 0

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-32">
      {/* ─── Hero Header & Breadcrumb ─────────────────────────────────────── */}
      <header
        className="relative border-b border-stone-200/90 pt-8 pb-10 px-4 overflow-hidden bg-white"
        style={{
          backgroundImage: 'radial-gradient(#16a34a14 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb / Back Link */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-green-700 font-semibold text-xs sm:text-sm mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>সকল সরকারি সেবা তালিকায় ফিরুন</span>
          </Link>

          {/* Service Title and Badges */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Category Icon */}
            <div
              className={cn(
                'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-stone-200/80',
                meta.bgColor
              )}
            >
              <Icon className={cn('w-9 h-9 sm:w-11 sm:h-11', meta.color)} />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={cn('text-xs px-3 py-1 rounded-full font-bold border', meta.badgeBg)}>
                  {meta.name_bn}
                </span>
                <span className={cn('text-xs px-3 py-1 rounded-full font-semibold border flex items-center gap-1.5', submissionConfig.class)}>
                  <SubmissionIcon className="w-3.5 h-3.5" />
                  {submissionConfig.label}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {service.name_bn}
              </h1>
              <p className="text-stone-500 text-sm sm:text-base font-medium mt-1">
                {service.name_en}
              </p>

              {/* Department */}
              <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm text-stone-600 font-medium">
                <Building2 className="w-4 h-4 text-stone-400 shrink-0" />
                <span>দায়িত্বপ্রাপ্ত কর্তৃপক্ষ: <strong className="text-stone-800">{service.department_bn}</strong></span>
              </div>
            </div>
          </div>

          {/* ─── High-Contrast Quick Facts Command Bar (POPS OUT!) ─────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
            {/* Fact 1: Fee */}
            <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/40 border border-green-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-green-800 mb-1">
                <span className="text-xs font-bold">সরকারি ফি</span>
                <Coins className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                </p>
                <p className="text-[11px] text-green-700/90 font-medium mt-0.5 line-clamp-1" title={service.fee_note_bn || ''}>
                  {service.fee_note_bn || 'কোনো লুকায়িত চার্জ নেই'}
                </p>
              </div>
            </div>

            {/* Fact 2: Processing Time */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-1">
                <span className="text-xs font-bold">সময়সীমা</span>
                <Clock className="w-4 h-4 text-stone-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                  {service.processing_time_bn}
                </p>
                <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                  সাধারণ কার্যদিবস হিসেবে গণ্য
                </p>
              </div>
            </div>

            {/* Fact 3: Office / Submission Place */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-1">
                <span className="text-xs font-bold">জমা স্থান</span>
                <MapPin className="w-4 h-4 text-stone-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-2" title={service.apply_location_bn}>
                  {service.apply_location_bn}
                </p>
              </div>
            </div>

            {/* Fact 4: Official Portal */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-1">
                <span className="text-xs font-bold">অফিসিয়াল পোর্টাল</span>
                <Globe className="w-4 h-4 text-stone-400" />
              </div>
              <div>
                {service.official_url && service.official_url !== '#' ? (
                  <a
                    href={service.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-green-700 hover:text-green-800 hover:underline mt-0.5"
                  >
                    <span>পোর্টাল ভিজিট করুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-stone-400">সরাসরি কার্যালয়</span>
                )}
                <p className="text-[11px] text-stone-400 truncate mt-0.5">
                  {service.official_url}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── SEAMLESS, NON-ENCAPSULATED MAIN BODY ───────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ─── SECTION 1: SMART DOCUMENT CHECKLIST ───────────────────────── */}
        <section className="scroll-mt-24" id="documents">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  ১
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  প্রয়োজনীয় কাগজপত্র ও চেকলিস্ট
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                সরকারি অফিসে বা কম্পিউটারের দোকানে যাওয়ার আগে নিশ্চিত করুন নিচের প্রতিটি কাগজ প্রস্তুত আছে। সহজে মিলিয়ে নিতে টিক দিন।
              </p>
            </div>

            {/* Progress Badge */}
            {totalDocs > 0 && (
              <div className="bg-white border border-stone-200 rounded-xl px-4 py-2 shadow-xs shrink-0 flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">আপনার প্রস্তুতি</span>
                  <span className="text-sm font-bold text-stone-900">
                    {completedDocsCount}/{totalDocs}টি সম্পন্ন
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-black text-xs text-green-700 border border-green-200">
                  {progressPercent}%
                </div>
              </div>
            )}
          </div>

          {/* Interactive Checklist Cards */}
          <div className="space-y-3">
            {service.required_docs && service.required_docs.length > 0 ? (
              service.required_docs.map((doc, idx) => {
                const isChecked = !!checkedDocs[idx]
                const copyConfig =
                  COPY_TYPE_CONFIG[doc.copy_type] || COPY_TYPE_CONFIG.photocopy
                const CopyIcon = copyConfig.icon

                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(idx)}
                    className={cn(
                      'rounded-2xl p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex items-start gap-4 shadow-xs select-none',
                      isChecked
                        ? 'bg-green-50/60 border-green-300 ring-1 ring-green-400/40'
                        : 'bg-white border-stone-200/90 hover:border-green-300 hover:shadow-md'
                    )}
                  >
                    {/* Interactive Checkbox */}
                    <div
                      className={cn(
                        'w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all',
                        isChecked
                          ? 'bg-green-600 border-green-600 text-white shadow-xs'
                          : 'border-stone-300 bg-white hover:border-green-500'
                      )}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3
                          className={cn(
                            'text-base sm:text-lg font-bold transition-colors leading-snug',
                            isChecked ? 'text-green-950 line-through decoration-green-600/60' : 'text-stone-900'
                          )}
                        >
                          {doc.name_bn}
                        </h3>

                        {/* Copy Type Badge */}
                        <span
                          className={cn(
                            'text-xs px-2.5 py-1 rounded-md border font-semibold inline-flex items-center gap-1.5 shrink-0',
                            copyConfig.class
                          )}
                        >
                          <CopyIcon className="w-3.5 h-3.5" />
                          <span>{copyConfig.label}</span>
                        </span>
                      </div>

                      {doc.name_en && (
                        <p className="text-xs text-stone-500 font-medium mt-0.5">
                          {doc.name_en}
                        </p>
                      )}

                      {/* Important Note Box */}
                      {doc.note_bn && (
                        <div className="mt-2.5 bg-stone-50 rounded-xl p-2.5 sm:p-3 border border-stone-200/70 text-xs text-stone-700 leading-relaxed flex items-start gap-2">
                          <span className="text-amber-600 shrink-0 font-bold">💡 নির্দেশ:</span>
                          <span>{doc.note_bn}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center text-stone-500 border border-stone-200">
                এই সেবার জন্য কোনো নির্দিষ্ট কাগজপত্রের আবশ্যকতা উল্লেখ নেই।
              </div>
            )}
          </div>

          {/* Smart Document Locker Callout (Seamless, not hidden!) */}
          <div className="mt-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6 pointer-events-none">
              <FolderLock className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full px-3 py-1 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-green-400" />
                  <span>স্মার্ট ডকুমেন্ট লকার</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  আপনার এই কাগজগুলো কি বারবার খুঁজতে হয়?
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                  দিশারী সুরক্ষিত লকারে আপনার NID, জন্ম নিবন্ধন ও ছবি একবার সেভ করে রাখুন। যেকোনো সরকারি ফরম পূরণের সময় এটি এক ক্লিকে স্বয়ংক্রিয়ভাবে যুক্ত হয়ে যাবে।
                </p>
              </div>
              <Link
                href="/register"
                className="bg-green-600 hover:bg-green-500 text-white rounded-xl px-5 h-12 flex items-center justify-center font-bold text-sm shrink-0 transition-all shadow-md hover:shadow-green-500/20"
              >
                কাগজপত্র সেভ করুন →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: STEP-BY-STEP ROADMAP ─────────────────────────────── */}
        <section className="scroll-mt-24" id="process">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold">
                ২
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                ধাপে ধাপে সরকারি আবেদন প্রক্রিয়া
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
              সংশ্লিষ্ট মন্ত্রণালয়ের নির্ধারিত গাইডলাইন অনুযায়ী ধাপে ধাপে সম্পন্ন করুন।
            </p>
          </div>

          {/* Connected Vertical Timeline */}
          <div className="relative pl-4 sm:pl-6 space-y-6 before:content-[''] before:absolute before:left-8 sm:before:left-10 before:top-4 before:bottom-6 before:w-0.5 before:border-l-2 before:border-dashed before:border-green-300">
            {service.steps && service.steps.length > 0 ? (
              service.steps.map((st) => (
                <div key={st.step} className="relative flex items-start gap-4 sm:gap-6 group">
                  {/* Step Number Circle */}
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-green-600 text-white font-black flex items-center justify-center shrink-0 shadow-md text-base sm:text-lg border-2 border-white ring-4 ring-green-100 z-10">
                    {st.step}
                  </div>

                  {/* Step Content Card */}
                  <div className="flex-1 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs hover:border-green-300 hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-stone-900">
                        {st.title_bn}
                      </h3>
                      <span className="text-xs bg-stone-100 text-stone-600 font-semibold px-2.5 py-0.5 rounded-full">
                        ধাপ {st.step}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
                      {st.description_bn}
                    </p>

                    {st.url && st.url !== '#' && (
                      <div className="mt-4 pt-3 border-t border-stone-100">
                        <a
                          href={st.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-green-700 hover:text-green-800 font-bold hover:underline"
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
              <div className="bg-white rounded-2xl p-8 text-center text-stone-500 border border-stone-200">
                ধাপের তথ্য পাওয়া যায়নি।
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 3: WARNINGS & COMMON MISTAKES (POPS OUT!) ───────────── */}
        {(service.important_notes_bn?.length || service.common_mistakes_bn?.length) && (
          <section className="scroll-mt-24">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  ৩
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  জরুরি সতর্কতা ও সাধারণ ভুলসমূহ
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                আবেদন বাতিলের হাত থেকে বাঁচতে এবং অনাকাঙ্ক্ষিত হয়রানি এড়াতে নিচের বিষয়গুলো লক্ষ্য রাখুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Important Notes */}
              {service.important_notes_bn && service.important_notes_bn.length > 0 && (
                <div className="bg-amber-50/80 border-2 border-amber-200/90 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>জরুরি জ্ঞাতব্য (অফিসিয়াল নিয়ম)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                    {service.important_notes_bn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-black mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {service.common_mistakes_bn && service.common_mistakes_bn.length > 0 && (
                <div className="bg-rose-50/80 border-2 border-rose-200/90 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-950 font-extrabold text-base mb-3">
                    <HelpCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>যেসব ভুলে আবেদন বাতিল বা দেরি হয়</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-rose-900 leading-relaxed">
                    {service.common_mistakes_bn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 font-black mt-0.5">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ─── SECTION 4: DETAILED FEE & SUBMISSION RULES ─────────────────── */}
        <section className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold">
              ৪
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              অফিসিয়াল ফি ও কার্যালয় নির্দেশিকা
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
              <span className="text-stone-500 font-medium block">নির্ধারিত সরকারি ফি</span>
              <span className="text-xl font-black text-stone-900 mt-1 block">
                {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
              </span>
              {service.fee_note_bn && (
                <p className="text-xs text-stone-500 mt-1">{service.fee_note_bn}</p>
              )}
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
              <span className="text-stone-500 font-medium block">প্রক্রিয়াকরণ সময়</span>
              <span className="text-xl font-bold text-stone-900 mt-1 block">
                {service.processing_time_bn}
              </span>
              <p className="text-xs text-stone-500 mt-1">ছুটির দিন ব্যতীত কার্যকর</p>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
              <span className="text-stone-500 font-medium block">কোথায় জমা দিতে হবে</span>
              <span className="text-stone-900 font-bold mt-1 block leading-relaxed">
                {service.apply_location_bn}
              </span>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
              <span className="text-stone-500 font-medium block">মন্ত্রণালয় / দপ্তর</span>
              <span className="text-stone-900 font-bold mt-1 block leading-relaxed">
                {service.department_bn}
              </span>
            </div>
          </div>

          {/* Official Verification Callout */}
          {service.official_url && service.official_url !== '#' && (
            <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">বাংলাদেশ সরকার অনুমোদিত সরকারি পোর্টাল</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{service.official_url}</p>
                </div>
              </div>
              <a
                href={service.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-900 hover:bg-stone-800 text-white rounded-xl px-5 h-11 text-xs font-bold inline-flex items-center justify-center gap-2 shrink-0 transition-colors shadow-xs"
              >
                <span>অফিসিয়াল সাইট খুলুন</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </section>

        {/* ─── SECTION 5: CITIZEN HELPLINES ──────────────────────────────── */}
        <section className="bg-gradient-to-r from-green-700 to-green-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-green-600/60 rounded-full px-3 py-1 text-xs font-semibold mb-2">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>সরাসরি সাহায্য প্রয়োজন?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                কোনো জটিলতা হলে সরকারি হেল্পলাইনে যোগাযোগ করুন
              </h3>
              <p className="text-green-100 text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
                জাতীয় কল সেন্টার ৩৩৩-এ যেকোনো সরকারি সেবা সম্পর্কিত তথ্য ২৪ ঘণ্টা বিনামূল্যে জানা যায়।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:333"
                className="bg-white text-green-800 hover:bg-green-50 rounded-2xl px-6 py-3 font-black text-sm flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 text-green-700" />
                <span>৩৩৩ (জাতীয় হেল্পলাইন)</span>
              </a>
              <a
                href="tel:999"
                className="bg-green-600 hover:bg-green-500 text-white rounded-2xl px-5 py-3 font-bold text-xs flex items-center gap-2 transition-colors border border-green-500"
              >
                <span>৯৯৯ (জরুরি সেবা)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── PERSISTENT STICKY BOTTOM ACTION BAR (POPS OUT!) ────────────── */}
      <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200/90 p-3.5 sm:p-4 z-40 shadow-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-stone-500 block truncate">
              {service.department_bn}
            </span>
            <p className="text-sm sm:text-base font-black text-stone-900 truncate">
              {service.name_bn}
              <span className="text-green-700 ml-2 font-bold text-xs sm:text-sm">
                ({service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`})
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {service.official_url && service.official_url !== '#' && (
              <a
                href={service.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl px-4 h-12 text-xs font-bold transition-colors"
              >
                <span>অফিসিয়াল সাইট</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              href="/login"
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 sm:px-8 h-12 flex items-center justify-center font-black text-sm sm:text-base transition-all shadow-md shadow-green-600/30 hover:shadow-lg hover:shadow-green-600/40"
            >
              <span>আবেদন শুরু করুন</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
