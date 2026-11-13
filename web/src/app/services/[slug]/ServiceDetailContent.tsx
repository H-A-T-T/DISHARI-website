'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Loader2,
  Building2,
  PhoneCall,
  Check,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { cn, CATEGORY_META } from '@/lib/utils'
import type { Service, ServiceCategory, CitizenDocument } from '@/types'
import { fetchServiceBySlug, fetchDocuments, type UserProfile } from '@/lib/api'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import ApplicationModal from '@/components/services/ApplicationModal'
import SmartBagChecker from '@/components/services/SmartBagChecker'

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

function formatNumber(num: number, lang: 'bn' | 'en'): string {
  if (lang === 'en') return num.toString()
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num
    .toString()
    .split('')
    .map((d) => bnDigits[parseInt(d, 10)] ?? d)
    .join('')
}

function formatProcessingTime(time: string, lang: 'bn' | 'en'): string {
  if (!time) return ''
  if (lang === 'bn') return time
  return time
    .replace(/কার্যদিবস/g, ' working days')
    .replace(/সাধারণ/g, 'Regular')
    .replace(/জরুরি/g, 'Express')
    .replace(/তাৎক্ষণিক/g, 'Instant')
    .replace(/রিয়েল-টাইম/g, 'Real-time')
    .replace(/বার্ষিক/g, 'Annual')
    .replace(/সেশন অনুযায়ী/g, 'Per academic session')
    .replace(/দিন/g, ' days')
    .replace(/০/g, '0')
    .replace(/১/g, '1')
    .replace(/২/g, '2')
    .replace(/৩/g, '3')
    .replace(/৪/g, '4')
    .replace(/৫/g, '5')
    .replace(/৬/g, '6')
    .replace(/৭/g, '7')
    .replace(/৮/g, '8')
    .replace(/৯/g, '9')
}

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({})
  const [user, setUser] = useState<UserProfile | null>(null)
  const [userDocs, setUserDocs] = useState<CitizenDocument[]>([])
  const [showAppModal, setShowAppModal] = useState<boolean>(false)

  // Check login and fetch user documents
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dishari_user')
      const logged = localStorage.getItem('dishari_logged_in')
      if (raw && logged === 'true') {
        const u = JSON.parse(raw)
        setUser(u)
        fetchDocuments(u.id).then((docs) => {
          if (docs && docs.length > 0) {
            setUserDocs(docs)
          }
        })
      }
    } catch {}
  }, [])

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

  const checkDocInLocker = (doc: { name_bn: string; name_en?: string }) => {
    return userDocs.some((ud) => {
      if (doc.name_bn.includes('পরিচয়পত্র') || doc.name_bn.includes('NID')) {
        return ud.doc_type === 'nid_front' || ud.doc_type === 'nid_back'
      }
      if (doc.name_bn.includes('জন্ম নিবন্ধন') || doc.name_en?.toLowerCase().includes('birth')) {
        return ud.doc_type === 'birth_certificate'
      }
      if (doc.name_bn.includes('ছবি') || doc.name_en?.toLowerCase().includes('photo')) {
        return ud.doc_type === 'photo'
      }
      if (doc.name_bn.includes('টিআইএন') || doc.name_bn.includes('TIN')) {
        return ud.doc_type === 'tin_certificate'
      }
      if (doc.name_bn.includes('ট্রেড লাইসেন্স')) {
        return ud.doc_type === 'trade_license'
      }
      return false
    })
  }

  // Smart matching: auto-check required docs if already present in user's Document Locker
  useEffect(() => {
    if (service && service.required_docs && userDocs.length > 0) {
      const autoChecks: Record<number, boolean> = {}
      service.required_docs.forEach((doc, idx) => {
        if (checkDocInLocker(doc)) {
          autoChecks[idx] = true
        }
      })
      setCheckedDocs((prev) => ({ ...autoChecks, ...prev }))
    }
  }, [service, userDocs])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#006A4E]" />
          <p className="text-base font-bold text-neutral-800">
            {lang === 'bn' ? 'সেবার তথ্য লোড হচ্ছে...' : 'Loading Service Docket...'}
          </p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-8">
        <div className="border border-neutral-300 bg-white p-8 max-w-md text-center rounded-none shadow-xs">
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            {lang === 'bn' ? 'সেবা পাওয়া যায়নি' : 'Service Not Found'}
          </h2>
          <p className="text-sm text-neutral-600 mb-6">
            {lang === 'bn'
              ? 'আপনার অনুরোধকৃত সরকারি সেবার তথ্য এই মুহূর্তে পাওয়া যায়নি।'
              : 'The requested service docket could not be located.'}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-[#006A4E] bg-[#006A4E] text-white px-5 py-2.5 text-xs uppercase font-bold tracking-wider rounded-none"
          >
            ← {t('serviceDetail', 'backToServices', lang)}
          </Link>
        </div>
      </div>
    )
  }

  const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
  const totalDocs = service.required_docs?.length || 0
  const completedDocsCount = Object.values(checkedDocs).filter(Boolean).length
  const pendingDocsCount = Math.max(0, totalDocs - completedDocsCount)
  const isAllReady = totalDocs > 0 && completedDocsCount === totalDocs
  const percentReady = totalDocs > 0 ? Math.round((completedDocsCount / totalDocs) * 100) : 0

  const getSubmissionLabel = (type: string) => {
    switch (type) {
      case 'online':
        return t('servicesPage', 'subOnline', lang)
      case 'hybrid':
        return t('servicesPage', 'subHybrid', lang)
      case 'pdf_only':
        return t('servicesPage', 'subOffline', lang)
      default:
        return lang === 'bn' ? 'সরকারি সেবা' : 'Civic Service'
    }
  }

  const primaryTitle = lang === 'bn' ? service.name_bn : service.name_en
  const secondaryTitle = lang === 'bn' ? service.name_en : service.name_bn
  const departmentName = lang === 'bn' ? service.department_bn : service.department_en
  const categoryName = lang === 'bn' ? meta.name_bn : meta.name_en
  const feeDisplay =
    service.fee === 'বিনামূল্যে'
      ? lang === 'bn'
        ? 'বিনামূল্যে'
        : 'Free'
      : `৳${service.fee}`

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-neutral-900 font-sans pb-32">
      {/* ─── OFFICIAL BROADSIDE HEADER (Windows 10 Flat Paper Style) ──────── */}
      <header className="border-b border-neutral-200 bg-white pt-7 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb & Docket Reference Code */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-neutral-200">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#006A4E] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>← {t('serviceDetail', 'backToServices', lang)}</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
              <span className="font-bold text-neutral-800">
                {lang === 'bn' ? 'নথি আইডি:' : 'Docket ID:'}
              </span>
              <span>BD-GOV-{service.slug.toUpperCase()}</span>
              <span className="text-neutral-300">|</span>
              <span className="text-[#006A4E] font-semibold">
                {lang === 'bn' ? 'গেজেট যাচাইকৃত ২০২৬' : 'Gazette Verified 2026'}
              </span>
            </div>
          </div>

          {/* Title Area */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Category & Mode Labels */}
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5 text-xs">
                <span className="font-bold text-neutral-800 uppercase tracking-wide">
                  {lang === 'bn' ? 'বিভাগ:' : 'Category:'} {categoryName}
                </span>
                <span className="text-neutral-300">·</span>
                <span className="font-semibold text-[#006A4E] bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-none">
                  {getSubmissionLabel(service.submission_type)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                {primaryTitle}
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 font-medium mt-1">
                {secondaryTitle}
              </p>

              {/* Authority */}
              <div className="flex items-center gap-2 mt-3.5 text-xs sm:text-sm text-neutral-700 font-semibold">
                <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  {lang === 'bn' ? 'মন্ত্রণালয় / দপ্তর:' : 'Ministry / Department:'}{' '}
                  <strong className="text-neutral-900 font-bold">{departmentName}</strong>
                </span>
              </div>
            </div>

            {/* Official Stamp Box — Windows 10 KPI tile */}
            <div className="border border-neutral-200 bg-white p-4 text-center shrink-0 min-w-[190px] rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block">
                {lang === 'bn' ? 'সরকারি তথ্যভাণ্ডার' : 'Official Repository'}
              </span>
              <div className="my-1 flex justify-center">
                <ShieldCheck className="w-7 h-7 text-[#006A4E]" />
              </div>
              <span className="text-xs font-bold text-neutral-900 block">
                {lang === 'bn' ? '১০০% নির্ভুল গেজেট তথ্য' : '100% Verified Gazette Info'}
              </span>
              <span className="text-[10px] text-neutral-500 block mt-0.5">
                {lang === 'bn' ? 'মধ্যস্বত্বভোগী ছাড়াই আবেদনযোগ্য' : 'Direct application without middlemen'}
              </span>
            </div>
          </div>

          {/* ─── EXECUTIVE FACTS LEDGER ───────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-200 bg-white mt-7 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 rounded-none shadow-xs">
            {/* Fact 1: Fee */}
            <div className="p-4 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {t('serviceDetail', 'officialFee', lang)}
              </span>
              <div className="mt-2">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#006A4E] font-mono">
                  {feeDisplay}
                </p>
                <p className="text-xs text-neutral-500 mt-1 leading-snug">
                  {service.fee_note_bn || (lang === 'bn' ? 'অতিরিক্ত কোনো চার্জ প্রযোজ্য নয়' : 'No additional charges apply')}
                </p>
              </div>
            </div>

            {/* Fact 2: Time */}
            <div className="p-4 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {t('serviceDetail', 'processingTime', lang)}
              </span>
              <div className="mt-2">
                <p className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {formatProcessingTime(service.processing_time_bn, lang)}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {lang === 'bn' ? 'ছুটির দিন ব্যতীত কার্যকর কার্যদিবস' : 'Excluding official government holidays'}
                </p>
              </div>
            </div>

            {/* Fact 3: Submission Place */}
            <div className="p-4 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {lang === 'bn' ? 'জমাদানের স্থান' : 'Submission Place'}
              </span>
              <div className="mt-2">
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 leading-relaxed">
                  {service.apply_location_bn}
                </p>
              </div>
            </div>

            {/* Fact 4: Official Portal */}
            <div className="p-4 flex flex-col justify-between bg-neutral-50/50">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {t('serviceDetail', 'officialPortal', lang)}
              </span>
              <div className="mt-2">
                {service.official_url && service.official_url !== '#' ? (
                  <a
                    href={service.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#006A4E] hover:underline"
                  >
                    <span>{t('serviceDetail', 'visitPortal', lang)}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-neutral-500">
                    {lang === 'bn' ? 'সরাসরি সংশ্লিষ্ট কার্যালয়' : 'Direct in-person office'}
                  </span>
                )}
                <p className="text-[11px] text-neutral-400 font-mono truncate mt-1">
                  {service.official_url}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN DOSSIER BODY ─────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* ─── SECTION 1: REQUIRED DOCUMENTS CHECKLIST & READINESS CENTER ──── */}
        <section id="documents" className="scroll-mt-24">
          {/* Section Header */}
          <div className="border-b border-neutral-200 pb-3 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-lg sm:text-xl font-bold text-[#006A4E]">
                  {formatNumber(1, lang).padStart(2, lang === 'bn' ? '০' : '0')}.
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {t('serviceDetail', 'docsChecklistTitle', lang)}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? 'কাগজপত্রের ওপর ক্লিক করে সহজেই প্রস্তুত কিনা চিহ্নিত করুন। স্ক্রল ছাড়াই ওপরের সারসংক্ষেপ দেখে এক নজরে পূর্ণাঙ্গ চিত্র পান।'
                  : 'Check off required papers to verify submission readiness. View your live completion status at a glance without scrolling.'}
              </p>
            </div>

            {/* Quick Count Badge */}
            {totalDocs > 0 && (
              <div className="border border-neutral-200 bg-white px-3.5 py-1.5 shrink-0 text-right rounded-none shadow-xs border-l-3 border-l-[#006A4E]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                  {lang === 'bn' ? 'কাগজপত্র প্রস্তুত' : 'Documents Ready'}
                </span>
                <span className="text-sm font-bold text-neutral-900 font-mono">
                  {formatNumber(completedDocsCount, lang)} / {formatNumber(totalDocs, lang)}{' '}
                  {lang === 'bn' ? 'টি সম্পন্ন' : 'ready'}
                </span>
              </div>
            )}
          </div>

          {/* Interactive Bag Pre-Flight Checklist */}
          {totalDocs > 0 && (
            <SmartBagChecker
              service={service}
              userLockerDocTypes={userDocs.map((d) => d.doc_type)}
              checkedInBag={checkedDocs}
              onCheckedChange={setCheckedDocs}
              className="mb-6"
            />
          )}

          {/* Smart Document Locker Callout */}
          <div className="mt-7 border border-[#006A4E] bg-[#004D38] text-white p-6 rounded-none shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="max-w-2xl">
                <span className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                  {lang === 'bn' ? 'দিশারী ডিজিটাল নাগরিক ভল্ট' : 'Dishari Digital Citizen Vault'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {t('serviceDetail', 'vaultCTA', lang)}
                </h3>
                <p className="text-emerald-100 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                  {t('serviceDetail', 'vaultDesc', lang)}
                </p>
              </div>
              <Link
                href={user ? '/dashboard?tab=locker' : '/register'}
                className="border border-white bg-white hover:bg-neutral-100 text-[#004D38] px-5 py-2.5 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors text-center rounded-none"
              >
                {user
                  ? lang === 'bn'
                    ? 'আমার ডিজিটাল লকার খুলুন →'
                    : 'Open My Document Vault →'
                  : t('serviceDetail', 'vaultBtn', lang) + ' →'}
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: STEP-BY-STEP PROCESS ROADMAP ─────────────────────── */}
        <section id="process" className="scroll-mt-24">
          <div className="border-b border-neutral-200 pb-3 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-lg sm:text-xl font-bold text-[#006A4E]">
                {formatNumber(2, lang).padStart(2, lang === 'bn' ? '০' : '0')}.
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {t('serviceDetail', 'stepsTitle', lang)}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
              {t('serviceDetail', 'stepsDesc', lang)}
            </p>
          </div>

          {/* Numbered Transit Track */}
          <div className="border-l-2 border-neutral-300 ml-4 sm:ml-5 pl-5 sm:pl-7 space-y-6 my-6">
            {service.steps && service.steps.length > 0 ? (
              service.steps.map((st) => (
                <div key={st.step} className="relative">
                  {/* Step Flag Marker (Windows 10 flat square) */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#006A4E] text-white font-mono font-bold flex items-center justify-center text-xs sm:text-sm rounded-none border border-white">
                    {formatNumber(st.step, lang)}
                  </div>

                  {/* Step Content */}
                  <div className="bg-white border border-neutral-200 p-4.5 sm:p-5 rounded-none shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-neutral-100">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                        {st.title_bn}
                      </h3>
                      <span className="font-mono text-xs font-semibold text-neutral-500 uppercase">
                        {t('serviceDetail', 'step', lang)} {formatNumber(st.step, lang)}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {st.description_bn}
                    </p>

                    {st.url && st.url !== '#' && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-100">
                        <a
                          href={st.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006A4E] hover:underline"
                        >
                          <span>{t('serviceDetail', 'visitStepLink', lang)}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-neutral-500 text-sm">
                {lang === 'bn' ? 'ধাপের তথ্য পাওয়া যায়নি।' : 'Step guidelines not available.'}
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 3: OFFICIAL NOTICEBOARD (CAUTIONS & MISTAKES) ───────── */}
        {(service.important_notes_bn?.length || service.common_mistakes_bn?.length) && (
          <section className="scroll-mt-24">
            <div className="border-b border-neutral-200 pb-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-lg sm:text-xl font-bold text-[#006A4E]">
                  {formatNumber(3, lang).padStart(2, lang === 'bn' ? '০' : '0')}.
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {t('serviceDetail', 'importantNotesTitle', lang)}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                {lang === 'bn'
                  ? 'আবেদন বাতিলের হাত থেকে বাঁচতে এবং অনাকাঙ্ক্ষিত হয়রানি এড়াতে নিচের বিষয়গুলো লক্ষ্য রাখুন।'
                  : 'Pay close attention to these rules to avoid rejection and unexpected delays.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Important Notes */}
              {service.important_notes_bn && service.important_notes_bn.length > 0 && (
                <div className="border border-amber-300 bg-amber-50/50 p-5 rounded-none shadow-xs">
                  <div className="flex items-center gap-2 text-amber-950 font-bold text-sm sm:text-base pb-2.5 mb-2.5 border-b border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {lang === 'bn' ? 'জরুরি জ্ঞাতব্য (অফিসিয়াল নিয়ম)' : 'Official Rules & Guidelines'}
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
                    {service.important_notes_bn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono font-bold text-amber-700 shrink-0">
                          {formatNumber(i + 1, lang)}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {service.common_mistakes_bn && service.common_mistakes_bn.length > 0 && (
                <div className="border border-red-300 bg-red-50/50 p-5 rounded-none shadow-xs">
                  <div className="flex items-center gap-2 text-red-950 font-bold text-sm sm:text-base pb-2.5 mb-2.5 border-b border-red-200">
                    <HelpCircle className="w-4 h-4 text-[#C8102E] shrink-0" />
                    <span>{t('serviceDetail', 'commonMistakesTitle', lang)}</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-red-950 leading-relaxed">
                    {service.common_mistakes_bn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-[#C8102E] shrink-0 mt-0.5" />
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
        <section className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs">
          <div className="border-b border-neutral-200 pb-3 mb-4 flex items-center gap-2.5">
            <span className="font-mono text-lg font-bold text-[#006A4E]">
              {formatNumber(4, lang).padStart(2, lang === 'bn' ? '০' : '0')}.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
              {t('serviceDetail', 'feesSectionTitle', lang)}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
            <div className="p-3 border border-neutral-200 bg-neutral-50 rounded-none">
              <span className="font-mono text-[11px] text-neutral-500 block uppercase">
                {t('serviceDetail', 'feesTableTitle', lang)}
              </span>
              <span className="text-lg font-bold text-neutral-900 mt-1 block font-mono">
                {feeDisplay}
              </span>
              {service.fee_note_bn && <p className="text-xs text-neutral-600 mt-0.5">{service.fee_note_bn}</p>}
            </div>

            <div className="p-3 border border-neutral-200 bg-neutral-50 rounded-none">
              <span className="font-mono text-[11px] text-neutral-500 block uppercase">
                {t('serviceDetail', 'processingTime', lang)}
              </span>
              <span className="text-lg font-bold text-neutral-900 mt-1 block">
                {formatProcessingTime(service.processing_time_bn, lang)}
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                {lang === 'bn' ? 'ছুটির দিন ব্যতীত কার্যকর' : 'Working days'}
              </p>
            </div>

            <div className="p-3 border border-neutral-200 bg-neutral-50 rounded-none">
              <span className="font-mono text-[11px] text-neutral-500 block uppercase">
                {t('serviceDetail', 'officeLocationTitle', lang)}
              </span>
              <span className="text-neutral-900 font-semibold mt-1 block leading-relaxed">
                {service.apply_location_bn}
              </span>
            </div>

            <div className="p-3 border border-neutral-200 bg-neutral-50 rounded-none">
              <span className="font-mono text-[11px] text-neutral-500 block uppercase">
                {lang === 'bn' ? 'দায়িত্বপ্রাপ্ত দপ্তর' : 'Authorized Department'}
              </span>
              <span className="text-neutral-900 font-semibold mt-1 block leading-relaxed">
                {departmentName}
              </span>
            </div>
          </div>

          {service.official_url && service.official_url !== '#' && (
            <div className="mt-5 pt-3.5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-[#006A4E] shrink-0" />
                <span>
                  {lang === 'bn' ? 'সরকারি পোর্টাল লিংক:' : 'Government Portal URL:'}{' '}
                  <span className="font-mono text-neutral-900">{service.official_url}</span>
                </span>
              </div>
              <a
                href={service.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white px-4 py-2 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors rounded-none"
              >
                <span>{t('serviceDetail', 'visitPortal', lang)}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </section>

        {/* ─── SECTION 5: NATIONAL HELPLINES ──────────────────────────────── */}
        <section className="border border-[#006A4E] bg-[#004D38] text-white p-6 sm:p-7 rounded-none shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <span className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                {t('serviceDetail', 'helplineTitle', lang)}
              </span>
              <h3 className="text-lg sm:text-xl font-bold">
                {lang === 'bn'
                  ? 'কোনো জটিলতা হলে সরকারি হেল্পলাইনে ফোন করুন'
                  : 'Need Guidance? Call National Helplines Directly'}
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
                {t('serviceDetail', 'helplineDesc', lang)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="tel:333"
                className="border border-white bg-white text-[#004D38] hover:bg-neutral-100 px-5 py-2.5 font-bold text-xs uppercase flex items-center gap-1.5 transition-colors rounded-none"
              >
                <PhoneCall className="w-4 h-4 text-[#006A4E]" />
                <span>{lang === 'bn' ? '৩৩৩ (জাতীয় হেল্পলাইন)' : '333 (National Helpline)'}</span>
              </a>
              <a
                href="tel:999"
                className="border border-[#C8102E] bg-[#C8102E] hover:bg-red-700 text-white px-4 py-2.5 font-bold text-xs uppercase flex items-center gap-1.5 transition-colors rounded-none"
              >
                <span>{lang === 'bn' ? '৯৯৯ (জরুরি সেবা)' : '999 (Emergency Services)'}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── PERSISTENT ACTION BAR (Flat Windows 10 style with Readiness HUD) ─── */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 z-40 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="font-mono text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wide block truncate">
              {departmentName}
            </span>
            <p className="text-sm sm:text-base font-bold text-neutral-900 truncate">
              {primaryTitle}
              <span className="text-[#006A4E] ml-2 font-bold font-mono text-xs sm:text-sm">
                ({feeDisplay})
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Live Document Readiness HUD Pill */}
            {totalDocs > 0 && (
              <a
                href="#documents"
                className={cn(
                  'hidden sm:inline-flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-colors win-press',
                  isAllReady
                    ? 'bg-emerald-50 border-[#006A4E] text-[#006A4E]'
                    : 'bg-amber-50 border-amber-300 text-amber-900 hover:border-amber-400'
                )}
                title={lang === 'bn' ? 'কাগজপত্রের চেকলিস্টে যান' : 'Jump to document checklist'}
              >
                <span className="font-bold">
                  {isAllReady
                    ? lang === 'bn'
                      ? '✓ শতভাগ প্রস্তুত'
                      : '✓ 100% Ready'
                    : lang === 'bn'
                    ? `কাগজপত্র: ${formatNumber(completedDocsCount, lang)}/${formatNumber(totalDocs, lang)}`
                    : `Docs: ${completedDocsCount}/${totalDocs}`}
                </span>
                {!isAllReady && (
                  <span className="px-1.5 py-0.5 bg-amber-200 text-amber-950 font-bold text-[10px]">
                    {lang === 'bn' ? `${formatNumber(pendingDocsCount, lang)}টি বাকি` : `${pendingDocsCount} left`}
                  </span>
                )}
              </a>
            )}

            {service.official_url && service.official_url !== '#' && (
              <a
                href={service.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 px-3.5 py-2 text-xs font-semibold rounded-none transition-colors"
              >
                <span>{t('serviceDetail', 'visitPortal', lang)}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {user ? (
              <button
                type="button"
                onClick={() => setShowAppModal(true)}
                className="border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white px-5 sm:px-7 py-2.5 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-none transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{t('serviceDetail', 'applyBtn', lang)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/login"
                className="border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white px-5 sm:px-7 py-2.5 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-none transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>{t('serviceDetail', 'applyBtn', lang)}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Guided Application Preparation Wizard Modal */}
      <AnimatePresence>
        {showAppModal && user && (
          <ApplicationModal
            service={service}
            user={user}
            userDocs={userDocs}
            lang={lang}
            onClose={() => setShowAppModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
