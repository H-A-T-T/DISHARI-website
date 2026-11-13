'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { Sparkles, ShieldCheck, ArrowLeft, Lightbulb } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import OpportunityFinder from '@/components/shared/OpportunityFinder'

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={null}>
      <OpportunitiesContent />
    </Suspense>
  )
}

function OpportunitiesContent() {
  const { lang } = useLanguage()
  const isBn = lang === 'bn'

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-24 font-sans">
      {/* ─── Breadcrumb Strip ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-200 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#006A4E] transition-colors">
              {isBn ? 'নীড়পাতা' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-neutral-800 font-semibold">
              {isBn ? 'সরকারি সুযোগ ও সহায়তা অনুসন্ধান' : 'Opportunities Finder'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#006A4E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isBn ? 'যাচাইকৃত সরকারি সার্কুলার' : 'Verified Govt Circulars'}</span>
          </div>
        </div>
      </div>

      {/* ─── Page Hero Banner (Windows 10 Flat Banner) ──────────────────────── */}
      <header className="bg-white border-b border-neutral-200 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-none">
              <Sparkles className="w-3.5 h-3.5 text-[#006A4E]" />
              <span>{isBn ? 'নাগরিক সুযোগ হাব' : 'CITIZEN OPPORTUNITY HUB'}</span>
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {isBn ? 'গেজেট ও মন্ত্রণালয় সমন্বিত' : 'Ministry Integrated'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {isBn
              ? 'আপনার জন্য প্রযোজ্য সরকারি সুযোগ ও ভাতা'
              : 'Targeted Government Opportunities & Benefits'}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
            {isBn
              ? 'সরকার প্রতি বছর সাধারণ নাগরিকদের জন্য নানা ধরণের উপবৃত্তি, যুব প্রশিক্ষণ, কৃষি প্রণোদনা ও ভাতা ঘোষণা করে। নিজের বয়স, শিক্ষা ও এলাকা নির্বাচন করে জেনে নিন কোন কোন সরকারি সুবিধা আপনি পেতে পারেন।'
              : 'Discover official stipends, youth skill development training, farmer incentives, and welfare allowances tailored to your demographic profile.'}
          </p>

          {/* Quick Problem Scenario Tags referencing statement.txt */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-neutral-700 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{isBn ? 'জনপ্রিয় অনুসন্ধান:' : 'Quick Cases:'}</span>
            </span>
            <span className="bg-neutral-100 text-neutral-700 px-2.5 py-1 border border-neutral-200">
              {isBn ? 'বেকার যুব ঋণ ও প্রশিক্ষণ' : 'Youth Loan & Training'}
            </span>
            <span className="bg-neutral-100 text-neutral-700 px-2.5 py-1 border border-neutral-200">
              {isBn ? 'মেধাবী ছাত্র উপবৃত্তি' : 'Student Stipend'}
            </span>
            <span className="bg-neutral-100 text-neutral-700 px-2.5 py-1 border border-neutral-200">
              {isBn ? 'বিধবা ও বয়স্ক ভাতা' : 'Widow Allowance'}
            </span>
            <span className="bg-neutral-100 text-neutral-700 px-2.5 py-1 border border-neutral-200">
              {isBn ? 'প্রবাসী পুনর্বাসন সহায়তা' : 'Migrant Support'}
            </span>
          </div>
        </div>
      </header>

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <OpportunityFinder />
      </main>
    </div>
  )
}