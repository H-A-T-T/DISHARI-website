'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  CheckCircle2,
  Circle,
  Briefcase,
  Printer,
  Sparkles,
  AlertCircle,
  FolderCheck,
  FileCheck2,
  Share2,
  RefreshCw,
  Info
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import type { Service, RequiredDoc, CopyType } from '@/types'
import { cn } from '@/lib/utils'

interface SmartBagCheckerProps {
  service: Service
  userLockerDocTypes?: string[] // e.g. ['nid_front', 'birth_certificate', 'photo']
  className?: string
  checkedInBag?: Record<number, boolean>
  onCheckedChange?: (checked: Record<number, boolean>) => void
}

const COPY_TYPE_LABELS: Record<CopyType, { bn: string; en: string; badgeClass: string }> = {
  original: {
    bn: 'মূল কপি প্রয়োজন',
    en: 'Original Required',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  photocopy: {
    bn: 'সত্যায়িত ফটোকপি',
    en: 'Attested Photocopy',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  online: {
    bn: 'অনলাইন প্রিন্ট কপি',
    en: 'Digital / Online Copy',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  both: {
    bn: 'মূল + ফটোকপি উভয়ই',
    en: 'Both Original & Copy',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300'
  }
}

export function SmartBagChecker({
  service,
  userLockerDocTypes = [],
  className,
  checkedInBag: propsCheckedInBag,
  onCheckedChange
}: SmartBagCheckerProps) {
  const { lang } = useLanguage()
  const isBn = lang === 'bn'

  // Map of doc index -> checked state (is it inside citizen's physical bag?)
  const [internalChecked, setInternalChecked] = useState<Record<number, boolean>>({})
  const checkedInBag = propsCheckedInBag ?? internalChecked

  const updateChecked = (newVal: Record<number, boolean>) => {
    if (onCheckedChange) {
      onCheckedChange(newVal)
    } else {
      setInternalChecked(newVal)
    }
  }

  // Initialize checks: if matching doc is present in citizen locker, auto-check it!
  useEffect(() => {
    if (propsCheckedInBag && Object.keys(propsCheckedInBag).length > 0) return
    const initial: Record<number, boolean> = {}
    service.required_docs.forEach((doc, idx) => {
      // Simple heuristic matching
      const docName = (doc.name_en || doc.name_bn).toLowerCase()
      const hasInLocker = userLockerDocTypes.some(t => {
        if (t.includes('nid') && (docName.includes('nid') || docName.includes('পরিচয়'))) return true
        if (t.includes('birth') && (docName.includes('birth') || docName.includes('জন্ম'))) return true
        if (t.includes('photo') && (docName.includes('photo') || docName.includes('ছবি'))) return true
        if (t.includes('tin') && (docName.includes('tin') || docName.includes('কর'))) return true
        if (t.includes('trade') && (docName.includes('trade') || docName.includes('লাইসেন্স'))) return true
        return false
      })
      if (hasInLocker) {
        initial[idx] = true
      }
    })
    if (Object.keys(initial).length > 0) {
      updateChecked(initial)
    }
  }, [service, userLockerDocTypes])

  const totalDocs = service.required_docs.length
  const checkedCount = Object.values(checkedInBag).filter(Boolean).length
  const percentReady = totalDocs > 0 ? Math.round((checkedCount / totalDocs) * 100) : 100

  const toggleDoc = (idx: number) => {
    const updated = {
      ...checkedInBag,
      [idx]: !checkedInBag[idx]
    }
    updateChecked(updated)
  }

  const markAll = (status: boolean) => {
    const updated: Record<number, boolean> = {}
    service.required_docs.forEach((_, idx) => {
      updated[idx] = status
    })
    updateChecked(updated)
  }

  const handlePrintChecklist = () => {
    window.print()
  }

  return (
    <div
      className={cn(
        'border-2 border-[#006A4E] bg-white rounded-none shadow-xs overflow-hidden',
        className
      )}
    >
      {/* Top Banner (Bangladesh Flag Green with Red Accent) */}
      <div className="bg-[#004D38] text-white p-5 border-b-2 border-[#006A4E] relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#006A4E] border border-emerald-400 flex items-center justify-center rounded-none font-bold shrink-0">
              <Briefcase className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#C8102E] text-white">
                  {isBn ? 'প্রস্তুতি মিটার' : 'PRE-FLIGHT BAG CHECK'}
                </span>
                <span className="text-xs text-emerald-200 font-mono">
                  {isBn ? 'কম্পিউটার দোকানে যাওয়ার আগে' : 'Before visiting service desk'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1">
                {isBn ? '“আমার ব্যাগে সব কাগজ আছে তো?”' : '"Do I have all documents in my bag?"'}
              </h3>
            </div>
          </div>

          {/* Readiness gauge pill */}
          <div className="bg-white/10 border border-emerald-300/40 px-4 py-2 text-right">
            <div className="text-[11px] text-emerald-200 font-mono uppercase font-semibold">
              {isBn ? 'প্রস্তুতি অগ্রগতি' : 'Readiness Score'}
            </div>
            <div className="text-2xl font-black text-white font-mono flex items-center justify-end gap-1.5">
              <span>{percentReady}%</span>
              <span className="text-xs font-normal text-emerald-200">
                ({checkedCount}/{totalDocs})
              </span>
            </div>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="w-full bg-black/30 h-2 mt-4 overflow-hidden rounded-none">
          <div
            className={cn(
              'h-full transition-all duration-300',
              percentReady === 100 ? 'bg-emerald-400' : percentReady >= 50 ? 'bg-amber-400' : 'bg-rose-500'
            )}
            style={{ width: `${percentReady}%` }}
          />
        </div>
      </div>

      {/* Status banner */}
      <div
        className={cn(
          'px-5 py-3 border-b text-xs sm:text-sm font-semibold flex items-center justify-between gap-3',
          percentReady === 100
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
            : percentReady >= 50
            ? 'bg-amber-50 text-amber-900 border-amber-200'
            : 'bg-rose-50 text-rose-900 border-rose-200'
        )}
      >
        <div className="flex items-center gap-2">
          {percentReady === 100 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>
            {percentReady === 100
              ? isBn
                ? '✅ দারুণ! সব প্রয়োজনীয় কাগজপত্র আপনার ব্যাগে প্রস্তুত। আপনি এখন সেবা কেন্দ্রে যেতে পারেন।'
                : '✅ Excellent! All required documents are packed and ready.'
              : isBn
              ? `⚠️ এখনো ${totalDocs - checkedCount}টি জরুরি নথি প্রস্তুত করা বাকি রয়েছে। তালিকা মিলিয়ে ব্যাগে রাখুন।`
              : `⚠️ Still missing ${totalDocs - checkedCount} required document(s). Pack them before leaving.`}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => markAll(percentReady !== 100)}
            className="text-xs font-bold underline hover:opacity-80 cursor-pointer"
          >
            {percentReady === 100
              ? (isBn ? 'সব মুছুন' : 'Reset')
              : (isBn ? 'সব সিলেক্ট করুন' : 'Select All')}
          </button>
        </div>
      </div>

      {/* Document Items List */}
      <div className="p-5 divide-y divide-neutral-200">
        {service.required_docs.map((doc, idx) => {
          const isPacked = !!checkedInBag[idx]
          const copyMeta = COPY_TYPE_LABELS[doc.copy_type] || COPY_TYPE_LABELS.photocopy

          return (
            <div
              key={idx}
              onClick={() => toggleDoc(idx)}
              className={cn(
                'py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 cursor-pointer select-none transition-colors group',
                isPacked ? 'bg-emerald-50/40 -mx-3 px-3' : 'hover:bg-neutral-50 -mx-3 px-3'
              )}
            >
              {/* Checkbox Icon */}
              <div className="mt-0.5 shrink-0">
                {isPacked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#006A4E] transition-transform group-active:scale-90" />
                ) : (
                  <Circle className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                )}
              </div>

              {/* Document details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={cn(
                      'text-sm font-bold',
                      isPacked ? 'text-neutral-900 line-through decoration-emerald-600 decoration-2' : 'text-neutral-900'
                    )}
                  >
                    {isBn ? doc.name_bn : doc.name_en}
                  </span>

                  {/* Copy Type Tag */}
                  <span
                    className={cn(
                      'font-mono text-[10px] font-bold px-2 py-0.5 border uppercase',
                      copyMeta.badgeClass
                    )}
                  >
                    {isBn ? copyMeta.bn : copyMeta.en}
                  </span>
                </div>

                {/* Note / instruction */}
                {doc.note_bn && (
                  <p className="text-xs text-neutral-600 leading-relaxed flex items-center gap-1.5 mt-0.5">
                    <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{doc.note_bn}</span>
                  </p>
                )}
              </div>

              {/* Status pill */}
              <div className="shrink-0 self-center">
                <span
                  className={cn(
                    'font-mono text-[11px] font-bold px-2.5 py-1 border',
                    isPacked
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                  )}
                >
                  {isPacked ? (isBn ? 'ব্যাগে আছে ✓' : 'Packed ✓') : (isBn ? 'বাকি' : 'Missing')}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Controls & Print Slip */}
      <div className="bg-neutral-50 p-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-neutral-600 font-mono">
          {isBn
            ? '💡 টিপস: কোনো কাগজ বাদ পড়লে ইউনিয়ন ডিজিটাল সেন্টার বা দোকানে ২ বার যেতে হতে পারে।'
            : '💡 Tip: Double check all original IDs before traveling to the center.'}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrintChecklist}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 h-10 px-4 bg-white border border-neutral-300 hover:border-[#006A4E] text-neutral-800 text-xs font-bold rounded-none cursor-pointer win-btn"
          >
            <Printer className="w-4 h-4 text-[#006A4E]" />
            <span>{isBn ? 'চেকলিস্ট প্রিন্ট / সেভ করুন' : 'Print Checklist'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SmartBagChecker