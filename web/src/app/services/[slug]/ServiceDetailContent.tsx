'use client'

import Link from 'next/link'
import { useState } from 'react'
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
  AlertTriangle,
  FileText,
  ExternalLink,
} from 'lucide-react'
import { cn, CATEGORY_META } from '@/lib/utils'
import type { ServiceCategory } from '@/types'

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

// TODO: Replace with dynamic data from services.json
const allServices = [
  { slug: 'passport', name_bn: 'পাসপোর্ট আবেদন', name_en: 'Passport Application', category: 'identity' as const, fee: '৩,৪৫০', fee_note_bn: 'সাধারণ আবেদন (৪৮ পাতা, ৫ বছর)', processing_time_bn: '২১ কার্যদিবস', submission_type: 'hybrid' as const, official_url: 'https://www.epassport.gov.bd', apply_location_bn: 'অনলাইনে আবেদন করুন, তারপর নিকটস্থ আঞ্চলিক পাসপোর্ট অফিসে যান', department_bn: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর' },
  { slug: 'passport-renewal', name_bn: 'পাসপোর্ট নবায়ন', name_en: 'Passport Renewal', category: 'identity' as const, fee: '৩,৪৫০', fee_note_bn: 'পুনর্নবীকরণ (৪৮ পাতা, ৫ বছর)', processing_time_bn: '২১ কার্যদিবস', submission_type: 'hybrid' as const, official_url: 'https://www.epassport.gov.bd', apply_location_bn: 'অনলাইনে আবেদন করুন, তারপর নিকটস্থ আঞ্চলিক পাসপোর্ট অফিসে যান', department_bn: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর' },
  { slug: 'nid-correction', name_bn: 'NID সংশোধন', name_en: 'NID Correction', category: 'identity' as const, fee: '২৩০', fee_note_bn: 'তথ্য সংশোধন ফি', processing_time_bn: '৪৫ কার্যদিবস', submission_type: 'online_bot' as const, official_url: 'https://services.nidw.gov.bd', apply_location_bn: 'অনলাইনে আবেদন করুন', department_bn: 'বাংলাদেশ নির্বাচন কমিশন' },
  { slug: 'birth-registration', name_bn: 'জন্ম নিবন্ধন', name_en: 'Birth Registration', category: 'identity' as const, fee: 'বিনামূল্যে', fee_note_bn: '৪৫ দিনের মধ্যে বিনামূল্যে, পরে ৫০ টাকা বিলম্ব ফি', processing_time_bn: '৭ কার্যদিবস', submission_type: 'hybrid' as const, official_url: 'https://bdris.gov.bd', apply_location_bn: 'ইউনিয়ন পরিষদ, পৌরসভা, বা সিটি কর্পোরেশন', department_bn: 'স্থানীয় সরকার বিভাগ' },
  { slug: 'birth-registration-correction', name_bn: 'জন্ম নিবন্ধন সংশোধন', name_en: 'Birth Certificate Correction', category: 'identity' as const, fee: '৫০', fee_note_bn: 'সংশোধন ফি', processing_time_bn: '৭-৩০ কার্যদিবস', submission_type: 'hybrid' as const, official_url: 'https://bdris.gov.bd', apply_location_bn: 'ইউনিয়ন পরিষদ, পৌরসভা, বা সিটি কর্পোরেশন', department_bn: 'স্থানীয় সরকার বিভাগ' },
  { slug: 'death-registration', name_bn: 'মৃত্যু নিবন্ধন', name_en: 'Death Registration', category: 'identity' as const, fee: 'বিনামূল্যে', fee_note_bn: '৪৫ দিনের মধ্যে বিনামূল্যে', processing_time_bn: '৭ কার্যদিবস', submission_type: 'hybrid' as const, official_url: 'https://bdris.gov.bd', apply_location_bn: 'ইউনিয়ন পরিষদ, পৌরসভা, বা সিটি কর্পোরেশন', department_bn: 'স্থানীয় সরকার বিভাগ' },
  { slug: 'widow-allowance', name_bn: 'বিধবা ভাতা', name_en: 'Widow Allowance', category: 'welfare' as const, fee: 'বিনামূল্যে', fee_note_bn: 'কোনো ফি নেই', processing_time_bn: '৬০+ কার্যদিবস', submission_type: 'pdf_only' as const, official_url: 'https://dss.gov.bd', apply_location_bn: 'ইউনিয়ন পরিষদ বা উপজেলা সমাজসেবা অফিস', department_bn: 'সমাজসেবা অধিদপ্তর' },
  { slug: 'old-age-allowance', name_bn: 'বয়স্ক ভাতা', name_en: 'Old Age Allowance', category: 'welfare' as const, fee: 'বিনামূল্যে', fee_note_bn: 'কোনো ফি নেই', processing_time_bn: '৬০+ কার্যদিবস', submission_type: 'pdf_only' as const, official_url: 'https://dss.gov.bd', apply_location_bn: 'ইউনিয়ন পরিষদ বা উপজেলা সমাজসেবা অফিস', department_bn: 'সমাজসেবা অধিদপ্তর' },
  { slug: 'disability-allowance', name_bn: 'প্রতিবন্ধী ভাতা', name_en: 'Disability Allowance', category: 'welfare' as const, fee: 'বিনামূল্যে', fee_note_bn: 'কোনো ফি নেই', processing_time_bn: '৬০+ কার্যদিবস', submission_type: 'pdf_only' as const, official_url: 'https://dss.gov.bd', apply_location_bn: 'ইউনিয়ন পরিষদ বা উপজেলা সমাজসেবা অফিস', department_bn: 'সমাজসেবা অধিদপ্তর' },
  { slug: 'scholarship', name_bn: 'উপবৃত্তি আবেদন', name_en: 'Scholarship Application', category: 'education' as const, fee: 'বিনামূল্যে', fee_note_bn: 'কোনো ফি নেই', processing_time_bn: 'সেশন অনুযায়ী', submission_type: 'online_bot' as const, official_url: 'https://shed.gov.bd', apply_location_bn: 'শিক্ষা প্রতিষ্ঠানের মাধ্যমে অনলাইনে', department_bn: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর' },
  { slug: 'trade-license', name_bn: 'ট্রেড লাইসেন্স', name_en: 'Trade License', category: 'business' as const, fee: '৫০০-৫,০০০', fee_note_bn: 'ব্যবসার ধরন ও আকার অনুযায়ী', processing_time_bn: '৭-১৫ কার্যদিবস', submission_type: 'pdf_only' as const, official_url: '#', apply_location_bn: 'সিটি কর্পোরেশন, পৌরসভা, বা ইউনিয়ন পরিষদ', department_bn: 'স্থানীয় সরকার প্রতিষ্ঠান' },
  { slug: 'land-mutation', name_bn: 'ভূমি নামজারি', name_en: 'Land Mutation', category: 'land' as const, fee: '১,০০০-৫,০০০', fee_note_bn: 'জমির মূল্যের উপর নির্ভরশীল', processing_time_bn: '৩০-৯০ কার্যদিবস', submission_type: 'pdf_only' as const, official_url: 'https://land.gov.bd', apply_location_bn: 'সহকারী কমিশনার (ভূমি) অফিস', department_bn: 'ভূমি মন্ত্রণালয়' },
  { slug: 'tin-certificate', name_bn: 'টিআইএন সার্টিফিকেট', name_en: 'TIN Certificate', category: 'tax' as const, fee: 'বিনামূল্যে', fee_note_bn: 'কোনো ফি নেই', processing_time_bn: 'তাৎক্ষণিক', submission_type: 'online_bot' as const, official_url: 'https://secure.incometax.gov.bd/TINHome', apply_location_bn: 'অনলাইনে আবেদন করুন', department_bn: 'জাতীয় রাজস্ব বোর্ড (NBR)' },
  { slug: 'tax-return', name_bn: 'আয়কর রিটার্ন', name_en: 'Income Tax Return', category: 'tax' as const, fee: 'বিনামূল্যে', fee_note_bn: 'কোনো ফি নেই, তবে কর প্রযোজ্য', processing_time_bn: 'বার্ষিক', submission_type: 'hybrid' as const, official_url: 'https://etaxnbr.gov.bd', apply_location_bn: 'অনলাইন বা নিকটস্থ কর অফিস', department_bn: 'জাতীয় রাজস্ব বোর্ড (NBR)' },
  { slug: 'overseas-welfare-card', name_bn: 'প্রবাসী কল্যাণ কার্ড', name_en: 'Overseas Welfare Card', category: 'overseas' as const, fee: 'বিনামূল্যে', fee_note_bn: 'কোনো ফি নেই', processing_time_bn: '৭-১৫ কার্যদিবস', submission_type: 'hybrid' as const, official_url: 'https://bmet.gov.bd', apply_location_bn: 'জেলা কর্মসংস্থান ও জনশক্তি অফিস', department_bn: 'জনশক্তি, কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো (BMET)' },
]

const SUBMISSION_TYPE_LABELS: Record<string, { bn: string; class: string }> = {
  online_bot: { bn: 'অনলাইন', class: 'bg-green-100 text-green-700' },
  pdf_only: { bn: 'সরাসরি', class: 'bg-amber-100 text-amber-700' },
  hybrid: { bn: 'অনলাইন + সরাসরি', class: 'bg-blue-100 text-blue-700' },
}

type TabKey = 'docs' | 'steps' | 'info'

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState<TabKey>('docs')

  const service = allServices.find((s) => s.slug === slug)

  if (!service) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <FileText className="w-16 h-16 text-stone-300 mx-auto" />
          <h1 className="text-2xl font-bold text-stone-800 mt-4">সেবাটি পাওয়া যায়নি</h1>
          <p className="text-stone-500 mt-2">আপনি যে সেবাটি খুঁজছেন সেটি এখনো যোগ করা হয়নি।</p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-6 bg-green-600 text-white rounded-xl px-6 h-12 font-medium hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            সকল সেবা দেখুন
          </Link>
        </div>
      </section>
    )
  }

  const meta = CATEGORY_META[service.category]
  const Icon = CATEGORY_ICONS[service.category]
  const submissionLabel = SUBMISSION_TYPE_LABELS[service.submission_type]

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'docs', label: 'প্রয়োজনীয় কাগজপত্র' },
    { key: 'steps', label: 'ধাপে ধাপে প্রক্রিয়া' },
    { key: 'info', label: 'ফি ও তথ্য' },
  ]

  return (
    <section className="py-6 lg:py-10 px-4 pb-28">
      <div className="max-w-4xl mx-auto">
        <Link href="/services" className="inline-flex items-center gap-2 text-stone-500 hover:text-green-600 transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          সকল সেবা
        </Link>

        <div className="flex items-start gap-4">
          <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center shrink-0', meta.bgColor)}>
            <Icon className={cn('w-7 h-7', meta.color)} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">{service.name_bn}</h1>
            <p className="text-stone-500 mt-1">{service.name_en}</p>
            <p className="text-sm text-stone-400 mt-0.5">{service.department_bn}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className={cn('rounded-full px-3 py-1 text-xs font-medium', meta.badgeBg)}>{meta.name_bn}</span>
          <span className="bg-stone-100 text-stone-700 rounded-full px-3 py-1 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {service.processing_time_bn}
          </span>
          <span className="bg-stone-100 text-stone-700 rounded-full px-3 py-1 text-xs">
            {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
          </span>
          <span className={cn('rounded-full px-3 py-1 text-xs font-medium', submissionLabel.class)}>{submissionLabel.bn}</span>
        </div>

        <div className="sticky top-16 z-40 bg-[#FAFAF8] border-b border-stone-200 -mx-4 px-4 mt-8">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer',
                  activeTab === tab.key ? 'border-green-600 text-green-700' : 'border-transparent text-stone-500 hover:text-stone-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {activeTab === 'docs' && (
            <div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 text-sm font-medium">বিস্তারিত তালিকা শীঘ্রই আসছে</p>
                  <p className="text-amber-700 text-xs mt-1">এই সেবার প্রয়োজনীয় কাগজপত্রের সম্পূর্ণ তালিকা শীঘ্রই যোগ করা হবে।</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                <p className="text-green-800 text-sm font-medium">📄 আপনার নথিপত্র সেভ করুন</p>
                <p className="text-green-700 text-xs mt-1">আপনার কাগজপত্র আপলোড করলে আমরা স্বয়ংক্রিয়ভাবে চেক করব কোন কোন কাগজ আপনার আছে।</p>
                <Link href="/register" className="inline-flex items-center gap-1 text-green-700 text-sm font-medium mt-3 hover:underline">নিবন্ধন করুন →</Link>
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 text-sm font-medium">ধাপে ধাপে গাইড শীঘ্রই আসছে</p>
                <p className="text-amber-700 text-xs mt-1">এই সেবার বিস্তারিত প্রক্রিয়া শীঘ্রই যোগ করা হবে। ততক্ষণ সরকারি ওয়েবসাইট দেখুন।</p>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
                <div className="p-4 flex justify-between items-center">
                  <span className="text-stone-500 text-sm">ফি</span>
                  <div className="text-right">
                    <span className="font-medium text-stone-800">{service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}</span>
                    {service.fee_note_bn && <p className="text-xs text-stone-400 mt-0.5">{service.fee_note_bn}</p>}
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-stone-500 text-sm">প্রক্রিয়াকরণ সময়</span>
                  <span className="font-medium text-stone-800">{service.processing_time_bn}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-stone-500 text-sm">আবেদন পদ্ধতি</span>
                  <span className={cn('rounded-full px-3 py-1 text-xs font-medium', submissionLabel.class)}>{submissionLabel.bn}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-stone-500 text-sm">কোথায় আবেদন করবেন</span>
                  <span className="font-medium text-stone-800 text-right text-sm max-w-[60%]">{service.apply_location_bn}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-stone-500 text-sm">দায়িত্বপ্রাপ্ত বিভাগ</span>
                  <span className="font-medium text-stone-800 text-sm text-right max-w-[60%]">{service.department_bn}</span>
                </div>
              </div>
              {service.official_url && service.official_url !== '#' && (
                <a href={service.official_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white rounded-xl border border-stone-200 p-4 hover:border-green-300 transition-colors group">
                  <Globe className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800 group-hover:text-green-700">সরকারি ওয়েবসাইট</p>
                    <p className="text-xs text-stone-400 truncate">{service.official_url}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 z-30">
        <div className="max-w-4xl mx-auto">
          <Link href="/login" className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-semibold transition-colors">
            আবেদন শুরু করুন
          </Link>
        </div>
      </div>
    </section>
  )
}
