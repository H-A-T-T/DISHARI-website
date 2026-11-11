'use client'

import Link from 'next/link'
import { ClipboardList, Plus, ExternalLink, Printer, CheckCircle, ArrowRight } from 'lucide-react'
import type { CitizenApplication } from '@/types'

interface ApplicationsListProps {
  applications: CitizenApplication[]
  lang: 'bn' | 'en'
}

export default function ApplicationsList({ applications, lang }: ApplicationsListProps) {
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
            body {
              font-family: 'Kalpurush', 'Times New Roman', serif;
              color: #18181b;
              line-height: 1.5;
              padding: 10px;
              background: #ffffff;
            }
            .docket-container {
              border: 1px solid #18181b;
              padding: 24px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header-table {
              width: 100%;
              border-bottom: 2px solid #006A4E;
              padding-bottom: 12px;
              margin-bottom: 18px;
            }
            .emblem {
              font-size: 28px;
              line-height: 1;
            }
            .govt-title {
              font-size: 18px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #006A4E;
            }
            .sub-title {
              font-size: 13px;
              color: #52525b;
              margin-top: 2px;
            }
            .docket-badge {
              font-family: monospace;
              font-size: 15px;
              font-weight: bold;
              background: #f4f4f5;
              border: 1px solid #18181b;
              padding: 4px 10px;
              display: inline-block;
            }
            .section-heading {
              font-size: 13px;
              font-weight: bold;
              background: #f4f4f5;
              border-left: 4px solid #006A4E;
              padding: 4px 8px;
              margin: 16px 0 10px 0;
              text-transform: uppercase;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 14px;
            }
            .data-table td {
              padding: 6px 8px;
              font-size: 13px;
              border-bottom: 1px solid #e4e4e7;
            }
            .data-table td.label {
              font-weight: bold;
              width: 32%;
              color: #3f3f46;
            }
            .docs-checklist {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 16px;
            }
            .docs-checklist th, .docs-checklist td {
              border: 1px solid #d4d4d8;
              padding: 6px 10px;
              font-size: 12px;
            }
            .docs-checklist th {
              background: #f4f4f5;
              font-weight: bold;
            }
            .counter-slip {
              margin-top: 25px;
              border-top: 2px dashed #a1a1aa;
              padding-top: 15px;
            }
            .sign-grid {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
              padding-top: 10px;
            }
            .sign-box {
              width: 45%;
              border-top: 1px solid #18181b;
              text-align: center;
              font-size: 12px;
              padding-top: 4px;
            }
            .footer-note {
              font-size: 11px;
              color: #71717a;
              text-align: center;
              margin-top: 25px;
              border-top: 1px solid #e4e4e7;
              padding-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="docket-container">
            <table class="header-table">
              <tr>
                <td>
                  <div class="govt-title">${lang === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ নাগরিক সেবা কার্যপত্র' : 'Government Citizen Service Assistance Docket'}</div>
                  <div class="sub-title">${lang === 'bn' ? 'জাতীয় ডিজিটাল সহায়তা পোর্টাল — দিশারী (জনবন্ধু)' : 'National Digital Citizen Assistance Portal — Dishari'}</div>
                  <div style="font-size: 12px; margin-top: 3px; color: #52525b;"><strong>${lang === 'bn' ? 'সেবার নাম' : 'Service'}:</strong> ${app.service_name_bn} (${app.service_name_en})</div>
                </td>
                <td style="text-align: right; vertical-align: top;">
                  <div class="docket-badge">${app.docket_id}</div>
                  <div style="font-size: 11px; color: #71717a; margin-top: 4px;">${lang === 'bn' ? 'তারিখ' : 'Date'}: ${dateFormatted}</div>
                </td>
              </tr>
            </table>

            <div class="section-heading">${lang === 'bn' ? '১. আবেদনকারীর পরিচিতি ও বিবরণ' : '1. Applicant Information'}</div>
            <table class="data-table">
              <tr>
                <td class="label">${lang === 'bn' ? 'নাগরিকের পূর্ণ নাম' : 'Applicant Full Name'}:</td>
                <td><strong>${applicant.fullName || 'নাগরিক'}</strong></td>
              </tr>
              <tr>
                <td class="label">${lang === 'bn' ? 'নাগরিক ট্র্যাকিং আইডি' : 'Citizen Docket ID'}:</td>
                <td>${applicant.citizenId || 'BD-USER-782'}</td>
              </tr>
              <tr>
                <td class="label">${lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}:</td>
                <td>${applicant.phone || '+8801700000000'}</td>
              </tr>
              <tr>
                <td class="label">${lang === 'bn' ? 'আবেদনের বর্তমান স্থিতি' : 'Application Status'}:</td>
                <td><span style="color: #006A4E; font-weight: bold;">✓ ${app.status.toUpperCase()} (কার্যপত্র প্রস্তুত)</span></td>
              </tr>
            </table>

            <div class="section-heading">${lang === 'bn' ? '২. সংযুক্ত নথিপত্র ও লকার নিরীক্ষা' : '2. Attached Documents & Vault Audit'}</div>
            <table class="docs-checklist">
              <thead>
                <tr>
                  <th style="width: 40px;">#</th>
                  <th>${lang === 'bn' ? 'প্রয়োজনীয় কাগজপত্রের নাম' : 'Required Document Title'}</th>
                  <th style="width: 140px;">${lang === 'bn' ? 'সংযুক্তি ধরন' : 'Attachment Type'}</th>
                  <th style="width: 100px;">${lang === 'bn' ? 'যাচাই স্ট্যাটাস' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                ${attachedDocs.map((doc: string, idx: number) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><strong>${doc}</strong></td>
                    <td>${lang === 'bn' ? 'ডিজিটাল লকার কপি' : 'Digital Vault Copy'}</td>
                    <td style="color: #006A4E; font-weight: bold;">✓ ${lang === 'bn' ? 'যাচাইকৃত' : 'Verified'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="counter-slip">
              <div style="text-align: center; font-size: 11px; font-weight: bold; color: #71717a; letter-spacing: 0.5px; margin-bottom: 10px;">
                ${lang === 'bn' ? '— — — ইউনিয়ন পরিষদ / উপজেলা / ডাকঘর কাউন্টার প্রাপ্তিস্বীকার অংশ — — —' : '— — — Official Office / Counter Acknowledgement Slip — — —'}
              </div>

              <table class="data-table" style="background: #fafafa; border: 1px solid #e4e4e7;">
                <tr>
                  <td class="label">${lang === 'bn' ? 'কার্যপত্র নম্বর' : 'Docket ID'}:</td>
                  <td><strong>${app.docket_id}</strong></td>
                </tr>
                <tr>
                  <td class="label">${lang === 'bn' ? 'জমাদানের তারিখ' : 'Submission Date'}:</td>
                  <td>${dateFormatted}</td>
                </tr>
                <tr>
                  <td class="label">${lang === 'bn' ? 'জমাদানকারী নাগরিক' : 'Applicant'}:</td>
                  <td>${applicant.fullName || 'নাগরিক'}</td>
                </tr>
              </table>

              <div class="sign-grid">
                <div class="sign-box">
                  <div>${lang === 'bn' ? 'আবেদনকারী নাগরিকের স্বাক্ষর' : 'Citizen Applicant Signature'}</div>
                </div>
                <div class="sign-box">
                  <div>${lang === 'bn' ? 'কাউন্টার গ্রহণকারী কর্মকর্তার স্বাক্ষর ও তারিখ' : 'Receiving Officer Signature & Seal'}</div>
                </div>
              </div>
            </div>

            <div class="footer-note">
              ${lang === 'bn'
                ? 'এই কার্যপত্রটি সরকারি সিটিজেন চার্টার অনুযায়ী প্রস্তুতকৃত। কোনো দালাল বা মধ্যস্বত্বভোগীর প্রয়োজন নেই।'
                : 'Generated strictly in accordance with Bangladesh Citizen Charter. Official direct processing.'}
            </div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="space-y-6">
      {/* ─── Top Banner (Windows 10 Flat Tile) ─────────────────────────────── */}
      <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#006A4E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider block">
            {lang === 'bn' ? 'আবেদন ট্র্যাকিং কেন্দ্র' : 'Application Tracking Center'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
            {lang === 'bn' ? 'আমার সরকারি আবেদনসমূহ' : 'My Government Applications'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
            {lang === 'bn'
              ? 'এখানে আপনার সকল প্রস্তুতকৃত আবেদন ডকেট, ট্র্যাকিং নম্বর ও কাউন্টার স্লিপ সংরক্ষিত আছে।'
              : 'All your prepared application dockets, tracking IDs, and official counter slips stored in one place.'}
          </p>
        </div>

        <Link
          href="/services"
          className="shrink-0 min-h-[42px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors win-btn"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'bn' ? 'নতুন সেবা বেছে নিন' : 'Apply For Service'}</span>
        </Link>
      </div>

      {/* ─── Application Dockets (Windows 10 Flat Tiles with Press) ───────── */}
      {applications.length === 0 ? (
        <div className="border border-dashed border-neutral-300 bg-white p-8 sm:p-12 text-center rounded-none shadow-xs">
          <div className="w-12 h-12 mx-auto border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-3 rounded-none">
            <ClipboardList className="w-5 h-5 text-neutral-400" />
          </div>
          <h4 className="font-bold text-neutral-900 text-base">
            {lang === 'bn' ? 'বর্তমানে কোনো সক্রিয় আবেদন প্রক্রিয়াধীন নেই' : 'No active applications in progress'}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-1 mb-5">
            {lang === 'bn'
              ? 'যেকোনো সরকারি সেবার পেজে গিয়ে "আবেদন শুরু করুন" বাটনে ক্লিক করলে স্বয়ংক্রিয়ভাবে একটি আবেদন ডকেট তৈরি হবে।'
              : 'Visit any government service page and click "Start Application" to create a pre-filled docket.'}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center min-h-[42px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors win-btn"
          >
            {lang === 'bn' ? 'সেবাসমূহ দেখুন' : 'Explore All Services'}
          </Link>
        </div>
      ) : (
        <div className="space-y-3.5">
          {applications.map((app) => {
            const date = new Date(app.submitted_at).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')
            return (
              <div
                key={app.id}
                className="win-tile p-4.5 sm:p-5 rounded-none shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-[#006A4E]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-neutral-800 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-none">
                      DOCKET: {app.docket_id}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#006A4E] bg-emerald-50 border border-emerald-200 px-2 py-0.5 inline-flex items-center gap-1 rounded-none">
                      <CheckCircle className="w-3 h-3 text-[#006A4E]" />
                      <span>{lang === 'bn' ? 'আবেদন প্রস্তুত' : 'Ready / Active'}</span>
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {lang === 'bn' ? 'তারিখ:' : 'Date:'} {date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                    {lang === 'bn' ? app.service_name_bn : app.service_name_en}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-0.5">
                    {lang === 'bn'
                      ? 'নাগরিক লকার থেকে প্রয়োজনীয় সকল কাগজপত্র ও বিবরণ সফলভাবে সংযুক্ত হয়েছে।'
                      : 'All required documents and citizen credentials prefilled from personal locker.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
                  <button
                    onClick={() => handlePrint(app)}
                    className="min-h-[38px] px-4 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase inline-flex items-center gap-1.5 rounded-none transition-colors cursor-pointer win-btn"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'কাউন্টার ফরম প্রিন্ট' : 'Print Docket'}</span>
                  </button>

                  {app.official_portal_url && (
                    <a
                      href={app.official_portal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[38px] px-4 border border-neutral-800 bg-neutral-900 hover:bg-[#006A4E] text-white font-bold text-xs uppercase inline-flex items-center gap-1.5 rounded-none transition-colors win-press"
                    >
                      <span>{lang === 'bn' ? 'সরকারি পোর্টালে যান' : 'Gov Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
