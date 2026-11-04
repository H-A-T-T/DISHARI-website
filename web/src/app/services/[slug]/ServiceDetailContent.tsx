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
  ListOrdered,
  AlertCircle,
  HelpCircle,
  Loader2,
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

const SUBMISSION_TYPE_LABELS: Record<string, { bn: string; class: string }> = {
  online_bot: { bn: 'সম্পূর্ণ অনলাইন', class: 'bg-green-100 text-green-700' },
  pdf_only: { bn: 'সরাসরি জমা', class: 'bg-amber-100 text-amber-700' },
  hybrid: { bn: 'অনলাইন আবেদন + সরাসরি যাচাই', class: 'bg-blue-100 text-blue-700' },
}

const COPY_TYPE_LABELS: Record<string, { label: string; class: string }> = {
  original: { label: 'মূল কপি আবশ্যক', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  photocopy: { label: 'ফটোকপি', class: 'bg-stone-50 text-stone-600 border-stone-200' },
  both: { label: 'মূল ও ফটোকপি উভয়ই', class: 'bg-blue-50 text-blue-700 border-blue-200' },
  online_print: { label: 'অনলাইন প্রিন্ট কপি', class: 'bg-purple-50 text-purple-700 border-purple-200' },
}

type TabKey = 'docs' | 'steps' | 'info'

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>('docs')

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

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-stone-500">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        <p className="text-base font-medium">ডাটাবেজ থেকে সেবার বিস্তারিত লোড হচ্ছে...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <FileText className="w-16 h-16 text-stone-300 mx-auto" />
          <h1 className="text-2xl font-bold text-stone-800 mt-4">সেবাটি পাওয়া যায়নি</h1>
          <p className="text-stone-500 mt-2">আপনি যে সেবাটি খুঁজছেন সেটি ডাটাবেজে উপস্থিত নেই।</p>
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

  const meta = CATEGORY_META[service.category] || CATEGORY_META.identity
  const Icon = CATEGORY_ICONS[service.category] || IdCard
  const submissionLabel = SUBMISSION_TYPE_LABELS[service.submission_type] || {
    bn: 'সরকারি সেবা',
    class: 'bg-stone-100 text-stone-700',
  }

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: 'docs', label: 'প্রয়োজনীয় কাগজপত্র', count: service.required_docs?.length || 0 },
    { key: 'steps', label: 'ধাপে ধাপে প্রক্রিয়া', count: service.steps?.length || 0 },
    { key: 'info', label: 'ফি ও তথ্য' },
  ]

  return (
    <section className="py-6 lg:py-10 px-4 pb-28">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-green-600 transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          সকল সেবা
        </Link>

        {/* Service Header */}
        <div className="flex items-start gap-4">
          <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center shrink-0', meta.bgColor)}>
            <Icon className={cn('w-7 h-7', meta.color)} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">{service.name_bn}</h1>
            <p className="text-stone-500 mt-1">{service.name_en}</p>
            <p className="text-sm text-stone-500 font-medium mt-1">{service.department_bn}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className={cn('rounded-full px-3 py-1 text-xs font-medium', meta.badgeBg)}>
            {meta.name_bn}
          </span>
          <span className="bg-stone-100 text-stone-700 rounded-full px-3 py-1 text-xs flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {service.processing_time_bn}
          </span>
          <span className="bg-stone-100 text-stone-700 rounded-full px-3 py-1 text-xs font-medium">
            {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
          </span>
          <span className={cn('rounded-full px-3 py-1 text-xs font-medium', submissionLabel.class)}>
            {submissionLabel.bn}
          </span>
        </div>

        {/* Sticky Tab Navigation */}
        <div className="sticky top-16 z-40 bg-[#FAFAF8] border-b border-stone-200 -mx-4 px-4 mt-8">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5',
                  activeTab === tab.key
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                )}
              >
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      activeTab === tab.key ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-500'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Required Documents */}
        {activeTab === 'docs' && (
          <div className="mt-6 space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-900 text-sm font-semibold">অফিসিয়াল চেকলিস্ট</p>
                <p className="text-emerald-700 text-xs mt-0.5">
                  কম্পিউটার দোকানে বা সরকারি অফিসে যাওয়ার আগে নিশ্চিত করুন নিচের প্রতিটি কাগজ আপনার সাথে আছে।
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-sm">
              {service.required_docs && service.required_docs.length > 0 ? (
                service.required_docs.map((doc, idx) => {
                  const copyBadge = COPY_TYPE_LABELS[doc.copy_type] || COPY_TYPE_LABELS.photocopy
                  return (
                    <div key={idx} className="p-4 sm:p-5 flex items-start gap-3 hover:bg-stone-50/50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-stone-900 text-base">{doc.name_bn}</h4>
                          <span className={cn('text-xs px-2.5 py-0.5 rounded-md border font-medium', copyBadge.class)}>
                            {copyBadge.label}
                          </span>
                        </div>
                        {doc.name_en && <p className="text-xs text-stone-500 mt-0.5">{doc.name_en}</p>}
                        {doc.note_bn && (
                          <p className="text-xs text-stone-600 bg-stone-50 rounded-lg p-2 mt-2 border border-stone-200/60 leading-relaxed">
                            💡 {doc.note_bn}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="p-8 text-center text-stone-500">কোনো নির্ধারিত কাগজপত্রের তালিকা পাওয়া যায়নি।</div>
              )}
            </div>

            {/* Smart Document Locker Callout */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-green-900 text-base">📁 স্মার্ট ডকুমেন্ট লকার</h4>
                  <p className="text-green-800 text-xs mt-1 leading-relaxed">
                    আপনার এই কাগজগুলো দিশারীতে সেভ করে রাখলে ফর্ম স্বয়ংক্রিয়ভাবে (Auto-Fill) পূরণ হয়ে যাবে। বারবার খুঁজতে হবে না।
                  </p>
                </div>
                <Link
                  href="/register"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 text-xs font-semibold shrink-0 transition-colors shadow-sm"
                >
                  ডকুমেন্ট সেভ করুন
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Step-by-Step Guide */}
        {activeTab === 'steps' && (
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <ListOrdered className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 text-sm font-semibold">ধাপে ধাপে সরকারি গাইডলাইন</p>
                <p className="text-blue-700 text-xs mt-0.5">
                  অফিসিয়াল পোর্টাল বা কার্যালয় অনুযায়ী আবেদন সম্পন্ন করার সঠিক ক্রম।
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {service.steps && service.steps.length > 0 ? (
                service.steps.map((st) => (
                  <div
                    key={st.step}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:border-green-300 transition-all flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm text-base">
                      {st.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-stone-900">{st.title_bn}</h4>
                      <p className="text-sm text-stone-600 leading-relaxed mt-1.5">{st.description_bn}</p>
                      {st.url && st.url !== '#' && (
                        <a
                          href={st.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-green-700 hover:text-green-800 font-semibold mt-3 hover:underline"
                        >
                          সরাসরি আবেদন পোর্টালে যান <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-stone-500">ধাপের তথ্য পাওয়া যায়নি।</div>
              )}
            </div>

            {/* Important Notes & Common Mistakes */}
            {(service.important_notes_bn?.length || service.common_mistakes_bn?.length) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {service.important_notes_bn && service.important_notes_bn.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>জরুরি জ্ঞাতব্য</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-amber-800 leading-relaxed list-disc list-inside">
                      {service.important_notes_bn.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {service.common_mistakes_bn && service.common_mistakes_bn.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-red-900 font-semibold text-sm mb-2">
                      <HelpCircle className="w-4 h-4 text-red-600" />
                      <span>সাধারণ ভুলসমূহ থেকে সতর্ক থাকুন</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-red-800 leading-relaxed list-disc list-inside">
                      {service.common_mistakes_bn.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Fees & Official Info */}
        {activeTab === 'info' && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-sm">
              <div className="p-4 sm:p-5 flex justify-between items-center">
                <span className="text-stone-500 text-sm">সরকারি ফি</span>
                <div className="text-right">
                  <span className="font-bold text-stone-900 text-lg">
                    {service.fee === 'বিনামূল্যে' ? 'বিনামূল্যে' : `৳${service.fee}`}
                  </span>
                  {service.fee_note_bn && <p className="text-xs text-stone-500 mt-0.5">{service.fee_note_bn}</p>}
                </div>
              </div>
              <div className="p-4 sm:p-5 flex justify-between items-center">
                <span className="text-stone-500 text-sm">প্রক্রিয়াকরণ সময়</span>
                <span className="font-semibold text-stone-800">{service.processing_time_bn}</span>
              </div>
              <div className="p-4 sm:p-5 flex justify-between items-center">
                <span className="text-stone-500 text-sm">আবেদন পদ্ধতি</span>
                <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', submissionLabel.class)}>
                  {submissionLabel.bn}
                </span>
              </div>
              <div className="p-4 sm:p-5 flex justify-between items-start gap-4">
                <span className="text-stone-500 text-sm shrink-0">কোথায় জমা দিতে হবে</span>
                <span className="font-medium text-stone-800 text-right text-sm leading-relaxed max-w-[65%]">
                  {service.apply_location_bn}
                </span>
              </div>
              <div className="p-4 sm:p-5 flex justify-between items-start gap-4">
                <span className="text-stone-500 text-sm shrink-0">দায়িত্বপ্রাপ্ত অধিদপ্তর / মন্ত্রণালয়</span>
                <span className="font-medium text-stone-800 text-sm text-right leading-relaxed max-w-[65%]">
                  {service.department_bn}
                </span>
              </div>
            </div>

            {service.official_url && service.official_url !== '#' && (
              <a
                href={service.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-2xl border border-stone-200 p-5 hover:border-green-400 hover:shadow-md transition-all group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-stone-900 group-hover:text-green-700">সরকারি অফিসিয়াল পোর্টাল</p>
                  <p className="text-xs text-stone-400 truncate mt-0.5">{service.official_url}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-green-600" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-4 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs text-stone-500 font-medium">প্রস্তুত আছেন?</p>
            <p className="text-sm font-bold text-stone-900">{service.name_bn}</p>
          </div>
          <Link
            href="/login"
            className="flex-1 sm:flex-none flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 h-12 font-bold transition-colors shadow-md shadow-green-600/20"
          >
            আবেদন শুরু করুন
          </Link>
        </div>
      </div>
    </section>
  )
}
