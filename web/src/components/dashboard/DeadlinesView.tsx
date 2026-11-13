'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BellRing,
  Calendar,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Download,
  Receipt,
  FileCheck2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import type { CitizenDeadline } from '@/types'

interface DeadlinesViewProps {
  deadlines: CitizenDeadline[]
  lang: 'bn' | 'en'
}

export default function DeadlinesView({ deadlines, lang }: DeadlinesViewProps) {
  const isBn = lang === 'bn'
  const [filterCat, setFilterCat] = useState<string>('all')

  const filteredDeadlines = deadlines.filter((d) => {
    if (filterCat === 'all') return true
    return d.category === filterCat
  })

  // Generates and downloads a standard .ics calendar invite for any deadline
  const handleAddToCalendar = (item: CitizenDeadline) => {
    const title = isBn ? item.title_bn : item.title_en
    const desc = isBn ? item.description_bn : item.description_en

    // Format deadline date as YYYYMMDD
    const cleanDate = item.deadline.replace(/[^0-9]/g, '')
    const startDate = cleanDate.length === 8 ? cleanDate : '20261130'
    const endDate = startDate

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dishari Civic Assistant//Deadlines//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title} [দিশারী সরকারি ডেডলাইন]`,
      `DESCRIPTION:${desc} \\nঅফিসিয়াল তথ্য: ${item.official_link || 'https://dishari.gov.bd'}`,
      `DTSTART;VALUE=DATE:${startDate}`,
      `DTEND;VALUE=DATE:${endDate}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P3D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${title} এর সরকারি সময়সীমা ঘনিয়ে আসছে!`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `dishari-deadline-${item.id}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-7">
      {/* ─── Top Banner (Windows 10 Flat Card) ─────────────────────────────── */}
      <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006A4E] uppercase mb-1">
          <BellRing className="w-4 h-4 text-[#006A4E]" />
          <span>{isBn ? 'জাতীয় নাগরিক ডেডলাইন ও সুযোগ রাডার' : 'National Citizen Deadlines & Welfare Radar'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
          {isBn ? 'আসন্ন সরকারি সময়সীমা ও সুযোগ' : 'Upcoming Government Deadlines & Opportunities'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
          {isBn
            ? 'ট্যাক্স রিটার্ন, শিক্ষা উপবৃত্তি, সমাজকল্যাণ ভাতা কিংবা লাইসেন্স নবায়নের সরকারি শেষ তারিখগুলো এখানে আগে থেকে জানিয়ে দেওয়া হয়। ক্যালেন্ডারে যোগ করে সময়মতো সতর্কবার্তা পান।'
            : 'Stay ahead of national deadlines for tax filing, educational stipends, social allowances, and annual license renewals with 1-click calendar sync.'}
        </p>

        {/* Filter Chips */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-700 mr-1 font-mono">
            {isBn ? 'ফিল্টার:' : 'Filter:'}
          </span>
          <button
            type="button"
            onClick={() => setFilterCat('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border win-press cursor-pointer ${
              filterCat === 'all'
                ? 'bg-[#006A4E] text-white border-[#006A4E]'
                : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            {isBn ? 'সব ডেডলাইন' : 'All Deadlines'}
          </button>
          <button
            type="button"
            onClick={() => setFilterCat('tax')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border win-press cursor-pointer ${
              filterCat === 'tax'
                ? 'bg-[#006A4E] text-white border-[#006A4E]'
                : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            {isBn ? 'আয়কর ও রাজস্ব' : 'Tax & Revenue'}
          </button>
          <button
            type="button"
            onClick={() => setFilterCat('education')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border win-press cursor-pointer ${
              filterCat === 'education'
                ? 'bg-[#006A4E] text-white border-[#006A4E]'
                : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            {isBn ? 'উপবৃত্তি ও শিক্ষা' : 'Education & Grants'}
          </button>
          <button
            type="button"
            onClick={() => setFilterCat('welfare')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border win-press cursor-pointer ${
              filterCat === 'welfare'
                ? 'bg-[#006A4E] text-white border-[#006A4E]'
                : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            {isBn ? 'ভাতা ও সমাজকল্যাণ' : 'Welfare & Allowances'}
          </button>
        </div>
      </div>

      {/* ─── SPECIAL FEATURE: DEDICATED TAX ASSISTANT PANEL ───────────────── */}
      <div className="border-2 border-orange-300 bg-orange-50/70 p-5 sm:p-6 rounded-none shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-orange-600 text-white flex items-center justify-center shrink-0 font-bold">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-orange-200 text-orange-950 border border-orange-300">
                  {isBn ? 'জাতীয় আয়কর সহকারী' : 'TAX & DEADLINE ASSISTANT'}
                </span>
                <span className="text-xs font-bold text-orange-800 font-mono">
                  {isBn ? 'শেষ তারিখ: ৩০ নভেম্বর ২০২৬' : 'Deadline: Nov 30, 2026'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mt-1">
                {isBn ? 'বার্ষিক আয়কর রিটার্ন দাখিলের বিশেষ নির্দেশিকা' : 'Annual Income Tax Return Special Filing Guide'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 mt-1 max-w-2xl leading-relaxed">
                {isBn
                  ? 'কাদের জন্য রিটার্ন বাধ্যতামূলক? টিআইএন (TIN) সার্টিফিকেটধারী, মোটরগাড়ি মালিক, সিটি কর্পোরেশনে ট্রেড লাইসেন্সধারী এবং ৫০,০০০+ টাকার সঞ্চয়পত্র ক্রয়কারী ব্যক্তিদের ৩০ নভেম্বরের মধ্যে রিটার্ন জমা দেওয়া বাধ্যতামূলক।'
                  : 'Mandatory filing for TIN holders, car owners, trade license holders, and savings cert purchasers over ৳50,000 before November 30.'}
              </p>

              {/* Tax Checklist Strip */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-800 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{isBn ? 'বেতন বা আয়ের প্রমাণপত্র (Salary Cert)' : 'Salary & Income Proof'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{isBn ? 'ব্যাংক হিসাব বিবরণী (Bank Statement)' : 'Bank Account Statement'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{isBn ? 'সঞ্চয়পত্র বা বিনিয়োগ সনদ' : 'Investment & Savings Cert'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{isBn ? 'সম্পদ ও দায়ের বিবরণ (Asset Statement)' : 'Asset & Liability Breakdown'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 self-start md:self-center">
            <a
              href="https://etaxnbr.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="win-press inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-none"
            >
              <span>{isBn ? 'ই-ট্যাক্স এনবিআর পোর্টালে যান' : 'Go to eTax NBR Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/services/tax-return"
              className="win-press inline-flex items-center justify-center gap-1 px-4 py-2 bg-white border border-neutral-300 hover:border-orange-600 text-neutral-800 text-xs font-semibold rounded-none"
            >
              <span>{isBn ? 'দিশারী ট্যাক্স গাইড দেখুন' : 'Dishari Tax Guide'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Deadlines List (Windows 10 Flat Tiles with Press Feedback) ─────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
        {filteredDeadlines.map((item) => {
          const isUrgent = item.urgency === 'high'
          const title = isBn ? item.title_bn : item.title_en
          const desc = isBn ? item.description_bn : item.description_en

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
                        <span>{isBn ? 'জরুরি ডেডলাইন' : 'High Urgency'}</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3.5 h-3.5 text-[#006A4E] shrink-0" />
                        <span>{isBn ? 'চলমান কার্যক্রম' : 'Ongoing Cycle'}</span>
                      </>
                    )}
                  </span>

                  <div className="flex items-center gap-1 font-mono text-xs font-semibold text-neutral-600">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{item.deadline}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">{title}</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{desc}</p>

                {/* Required Documents Badge List */}
                <div className="mt-3.5 pt-2.5 border-t border-neutral-100">
                  <span className="font-mono text-[11px] font-bold text-neutral-500 block mb-1 uppercase">
                    {isBn ? 'প্রয়োজনীয় কাগজপত্র:' : 'Required Papers:'}
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

              {/* Action Buttons: 1-Click Calendar Sync & Official Link */}
              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToCalendar(item)}
                  className="win-press h-9 px-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-bold inline-flex items-center gap-1.5 rounded-none cursor-pointer"
                  title={isBn ? 'ফোনের ক্যালেন্ডারে অ্যালার্ট সেট করুন' : 'Sync to your device calendar'}
                >
                  <Download className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>{isBn ? 'ক্যালেন্ডারে যোগ' : 'Add to Cal'}</span>
                </button>

                {item.official_link && (
                  <a
                    href={item.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[36px] px-3.5 border border-neutral-800 bg-neutral-900 hover:bg-[#006A4E] text-white font-bold text-xs uppercase inline-flex items-center gap-1.5 rounded-none transition-colors win-press"
                  >
                    <span>{isBn ? 'অফিসিয়াল পোর্টাল' : 'Gov Portal'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── Welfare Recommender Teaser linking to Opportunities Finder ───── */}
      <div className="border border-[#006A4E] bg-[#004D38] text-white p-5 sm:p-6 rounded-none shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase mb-1">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{isBn ? 'নাগরিক সুযোগ রাডার' : 'Citizen Opportunity Hub'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {isBn ? 'আপনার প্রোফাইলের সাথে ম্যাচিং সরকারি সুযোগ ও ভাতা' : 'Personalized Grants & Scheme Matcher'}
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            {isBn
              ? 'যুব প্রশিক্ষণ, কৃষক প্রণোদনা, বিধবা ভাতা কিংবা উপবৃত্তির চলমান সার্কুলারগুলো দেখতে সুযোগ সার্চার ব্যবহার করুন।'
              : 'Browse active quotas for youth skill training, farmer stimuli, and educational stipends.'}
          </p>
        </div>

        <Link
          href="/opportunities"
          className="win-press shrink-0 px-4 py-2.5 bg-white text-[#006A4E] hover:bg-emerald-50 text-xs font-bold uppercase inline-flex items-center gap-1.5 rounded-none shadow-sm transition-colors"
        >
          <span>{isBn ? 'সকল সুযোগ ব্রাউজ করুন' : 'Browse Schemes'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}