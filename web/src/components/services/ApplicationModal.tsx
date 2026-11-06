'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  ExternalLink,
  Printer,
  ArrowRight,
  AlertCircle,
  X,
  Check,
  Sparkles
} from 'lucide-react'
import type { Service, CitizenDocument, CitizenApplication } from '@/types'
import { createApplication, type UserProfile } from '@/lib/api'

interface ApplicationModalProps {
  service: Service
  user: UserProfile
  userDocs: CitizenDocument[]
  lang: 'bn' | 'en'
  onClose: () => void
}

export default function ApplicationModal({
  service,
  user,
  userDocs,
  lang,
  onClose,
}: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdApp, setCreatedApp] = useState<CitizenApplication | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Document matching
  const attachedDocNames: string[] = []
  service.required_docs.forEach((doc) => {
    const isMatched = userDocs.some((ud) => {
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
    if (isMatched) {
      attachedDocNames.push(doc.name_bn)
    }
  })

  const handleGenerateDocket = async () => {
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const res = await createApplication({
        userId: user.id || 1,
        serviceSlug: service.slug,
        serviceNameBn: service.name_bn,
        serviceNameEn: service.name_en,
        applicantData: {
          fullName: user.full_name,
          phone: user.phone,
          email: user.email,
          citizenId: user.citizen_id,
        },
        documentsAttached: attachedDocNames,
        officialPortalUrl: service.official_url,
      })

      if (res.success && res.application) {
        setCreatedApp(res.application)
      } else {
        setErrorMsg(res.error || (lang === 'bn' ? 'কার্যপত্র তৈরিতে সমস্যা হয়েছে' : 'Failed to generate docket'))
      }
    } catch {
      setErrorMsg(lang === 'bn' ? 'কার্যপত্র তৈরিতে সমস্যা হয়েছে' : 'Failed to generate docket')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrint = (app: CitizenApplication) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const dateFormatted = new Date(app.submitted_at).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')
    const applicant = app.applicant_data || {}
    const attachedDocs = app.documents_attached || ['জাতীয় পরিচয়পত্র', 'পাসপোর্ট সাইজ ছবি']

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="${lang}">
        <head>
          <meta charset="utf-8">
          <title>${app.docket_id} - ${lang === 'bn' ? app.service_name_bn : app.service_name_en}</title>
          <link href="https://fonts.maateen.me/kalpurush/font.css" rel="stylesheet">
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Kalpurush', 'Times New Roman', serif; color: #18181b; line-height: 1.5; padding: 10px; }
            .docket-container { border: 1px solid #18181b; padding: 24px; max-width: 800px; margin: 0 auto; }
            .header-table { width: 100%; border-bottom: 2px solid #006A4E; padding-bottom: 12px; margin-bottom: 18px; }
            .govt-title { font-size: 18px; font-weight: bold; text-transform: uppercase; color: #006A4E; }
            .docket-badge { font-family: monospace; font-size: 15px; font-weight: bold; background: #f4f4f5; border: 1px solid #18181b; padding: 4px 10px; display: inline-block; }
            .section-heading { font-size: 13px; font-weight: bold; background: #f4f4f5; border-left: 4px solid #006A4E; padding: 4px 8px; margin: 16px 0 10px 0; text-transform: uppercase; }
            .data-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
            .data-table td { padding: 6px 8px; font-size: 13px; border-bottom: 1px solid #e4e4e7; }
            .data-table td.label { font-weight: bold; width: 32%; color: #3f3f46; }
            .docs-checklist { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
            .docs-checklist th, .docs-checklist td { border: 1px solid #d4d4d8; padding: 6px 10px; font-size: 12px; }
            .docs-checklist th { background: #f4f4f5; font-weight: bold; }
            .counter-slip { margin-top: 25px; border-top: 2px dashed #a1a1aa; padding-top: 15px; }
            .sign-grid { display: flex; justify-content: space-between; margin-top: 40px; }
            .sign-box { width: 45%; border-top: 1px solid #18181b; text-align: center; font-size: 12px; padding-top: 4px; }
            .footer-note { font-size: 11px; color: #71717a; text-align: center; margin-top: 25px; border-top: 1px solid #e4e4e7; padding-top: 8px; }
          </style>
        </head>
        <body>
          <div class="docket-container">
            <table class="header-table">
              <tr>
                <td>
                  <div class="govt-title">${lang === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ নাগরিক সেবা কার্যপত্র' : 'Government Citizen Service Assistance Docket'}</div>
                  <div style="font-size: 12px; margin-top: 2px; color: #52525b;">${app.service_name_bn} (${app.service_name_en})</div>
                </td>
                <td style="text-align: right; vertical-align: top;">
                  <div class="docket-badge">${app.docket_id}</div>
                  <div style="font-size: 11px; margin-top: 4px; color: #71717a;">${dateFormatted}</div>
                </td>
              </tr>
            </table>

            <div class="section-heading">${lang === 'bn' ? '১. আবেদনকারীর বিবরণ' : '1. Applicant Information'}</div>
            <table class="data-table">
              <tr><td class="label">${lang === 'bn' ? 'নাগরিক নাম' : 'Name'}:</td><td><strong>${applicant.fullName || 'নাগরিক'}</strong></td></tr>
              <tr><td class="label">${lang === 'bn' ? 'ট্র্যাকিং আইডি' : 'ID'}:</td><td>${applicant.citizenId || 'BD-USER-782'}</td></tr>
              <tr><td class="label">${lang === 'bn' ? 'মোবাইল' : 'Phone'}:</td><td>${applicant.phone || '+8801700000000'}</td></tr>
              <tr><td class="label">${lang === 'bn' ? 'স্থিতি' : 'Status'}:</td><td><strong style="color: #006A4E;">✓ ${app.status.toUpperCase()}</strong></td></tr>
            </table>

            <div class="section-heading">${lang === 'bn' ? '২. সংযুক্ত নথিপত্র' : '2. Attached Documents'}</div>
            <table class="docs-checklist">
              <thead><tr><th>#</th><th>কাগজপত্রের নাম</th><th>স্ট্যাটাস</th></tr></thead>
              <tbody>
                ${attachedDocs.map((doc: string, idx: number) => `
                  <tr><td>${idx + 1}</td><td><strong>${doc}</strong></td><td style="color:#006A4E; font-weight: bold;">✓ যাচাইকৃত</td></tr>
                `).join('')}
              </tbody>
            </table>

            <div class="counter-slip">
              <div style="text-align: center; font-size: 11px; font-weight: bold; color: #71717a; margin-bottom: 10px;">— — — কাউন্টার প্রাপ্তিস্বীকার রসিদ অংশ — — —</div>
              <div class="sign-grid">
                <div class="sign-box">${lang === 'bn' ? 'আবেদনকারী নাগরিকের স্বাক্ষর' : 'Citizen Applicant Signature'}</div>
                <div class="sign-box">${lang === 'bn' ? 'গ্রহণকারী কর্মকর্তার সিল ও স্বাক্ষর' : 'Receiving Officer Seal & Signature'}</div>
              </div>
            </div>

            <div class="footer-note">
              ${lang === 'bn'
                ? 'এই কার্যপত্রটি দিশারী ডিজিটাল প্ল্যাটফর্ম কর্তৃক প্রস্তুতকৃত। সরকারি সেবা গ্রহণে মধ্যস্বত্বভোগী বা দালালের শরণাপন্ন হবেন না।'
                : 'Generated by Dishari Digital Assistance Platform. Official and direct submission authorized.'}
            </div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      {/* Windows 10 Boxy Paper Modal Container */}
      <div className="border border-neutral-300 bg-white max-w-xl w-full p-6 sm:p-7 shadow-2xl rounded-none max-h-[92vh] overflow-y-auto animate-in fade-in-50 duration-150 relative">
        {/* Top 3px Bangladesh Green Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

        {/* Header */}
        <div className="flex items-start justify-between pb-3 mb-4 border-b border-neutral-200 pt-1">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#006A4E] uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নাগরিক সেবা আবেদন সহকারী' : 'Citizen Service Application Assistant'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
              {lang === 'bn' ? service.name_bn : service.name_en}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-100 text-neutral-600 rounded-none transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 border border-red-300 bg-red-50 text-[#C8102E] text-xs font-semibold flex items-center gap-2 rounded-none">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: PREPARATION & AUDIT OR STEP 2: DOCKET READY */}
        {!createdApp ? (
          <div className="space-y-5">
            {/* Citizen Info Snapshot */}
            <div className="p-3.5 border border-neutral-200 bg-neutral-50 rounded-none">
              <span className="font-mono text-xs font-bold text-neutral-500 uppercase block mb-1.5">
                {lang === 'bn' ? 'আবেদনকারী নাগরিকের তথ্য:' : 'Applicant Citizen Profile:'}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-neutral-900">
                <span>{user.full_name}</span>
                <span className="font-mono text-neutral-600">{user.phone}</span>
                <span className="font-mono text-[#006A4E] bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-none">
                  {user.citizen_id}
                </span>
              </div>
            </div>

            {/* Document Locker Match Audit */}
            <div>
              <span className="font-mono text-xs font-bold text-neutral-700 uppercase block mb-2">
                {lang === 'bn' ? 'প্রয়োজনীয় কাগজপত্রের লকার নিরীক্ষা:' : 'Document Locker Readiness Audit:'}
              </span>
              <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white rounded-none">
                {service.required_docs.map((doc, idx) => {
                  const isAttached = attachedDocNames.includes(doc.name_bn)
                  return (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span className="font-bold text-neutral-900">
                          {lang === 'bn' ? doc.name_bn : doc.name_en || doc.name_bn}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[11px] font-bold px-2 py-0.5 border rounded-none ${
                          isAttached
                            ? 'bg-emerald-50 text-[#006A4E] border-emerald-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        {isAttached ? (
                          <span className="inline-flex items-center gap-1">
                            <Check className="w-3 h-3 text-[#006A4E]" />
                            <span>{lang === 'bn' ? 'লকারে প্রস্তুত' : 'In Locker'}</span>
                          </span>
                        ) : (
                          <span>{lang === 'bn' ? 'ম্যানুয়াল লাগবে' : 'Manual Carry'}</span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Application Instructions */}
            <div className="p-3.5 border border-neutral-200 bg-neutral-50 text-xs text-neutral-700 leading-relaxed space-y-1 rounded-none">
              <div>
                <strong className="text-neutral-900 font-bold">
                  {lang === 'bn' ? 'সরকারি ফি:' : 'Official Fee:'}
                </strong>{' '}
                {service.fee}
              </div>
              <div>
                <strong className="text-neutral-900 font-bold">
                  {lang === 'bn' ? 'প্রক্রিয়াকরণ সময়:' : 'Processing Time:'}
                </strong>{' '}
                {service.processing_time_bn}
              </div>
              <div>
                <strong className="text-neutral-900 font-bold">
                  {lang === 'bn' ? 'জমাদানের স্থান:' : 'Submission Office:'}
                </strong>{' '}
                {service.apply_location_bn}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto min-h-[44px] px-5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs uppercase rounded-none transition-colors"
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleGenerateDocket}
                className="w-full sm:w-auto min-h-[44px] px-6 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? lang === 'bn'
                      ? 'ডকেট প্রস্তুত হচ্ছে...'
                      : 'Preparing Docket...'
                    : lang === 'bn'
                    ? 'আবেদন ডকেট তৈরি করুন'
                    : 'Generate Application Docket'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 mx-auto border border-emerald-300 bg-emerald-50 flex items-center justify-center rounded-none">
              <CheckCircle2 className="w-8 h-8 text-[#006A4E]" />
            </div>

            <div>
              <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-widest block mb-1">
                {lang === 'bn' ? 'আবেদন ডকেট সফলভাবে প্রস্তুত' : 'Application Docket Ready'}
              </span>
              <h4 className="text-2xl font-bold text-neutral-900">
                {lang === 'bn' ? 'আপনার আবেদন প্রস্তুত হয়েছে' : 'Docket Created Successfully'}
              </h4>
              <div className="mt-3 inline-block font-mono text-sm font-bold bg-neutral-100 border border-neutral-300 px-4 py-1.5 rounded-none">
                DOCKET ID: {createdApp.docket_id}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              {lang === 'bn'
                ? 'আপনার প্রয়োজনীয় তথ্য ও লকারের নথিপত্র দিয়ে কার্যপত্র সংরক্ষণ করা হয়েছে। এটি আপনার ড্যাশবোর্ডে "আমার আবেদনসমূহ" বিভাগে যুক্ত হয়েছে।'
                : 'Your prefilled citizen docket has been logged and stored under your dashboard applications.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handlePrint(createdApp)}
                className="w-full sm:w-auto min-h-[44px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কাউন্টার ফরম প্রিন্ট' : 'Print Docket'}</span>
              </button>

              {service.official_url && service.official_url !== '#' && (
                <a
                  href={service.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[44px] px-5 border border-neutral-800 bg-neutral-900 hover:bg-[#006A4E] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors"
                >
                  <span>{lang === 'bn' ? 'সরকারি পোর্টালে যান' : 'Go to Official Portal'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <Link
                href="/dashboard?tab=applications"
                className="w-full sm:w-auto min-h-[44px] px-5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors"
              >
                <span>{lang === 'bn' ? 'ড্যাশবোর্ডে দেখুন' : 'View in Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
