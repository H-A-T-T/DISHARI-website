'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Upload,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Check,
  Plus,
  Eye,
  X,
  Sparkles,
  Scan,
  Loader2,
  Copy,
  Edit3
} from 'lucide-react'
import type { CitizenDocument, DocType } from '@/types'
import { uploadDocument, deleteDocument, scanDocumentOCR } from '@/lib/api'
import { win10DialogBackdropMotion, win10DialogMotion } from '@/lib/motion'

interface DocumentLockerProps {
  documents: CitizenDocument[]
  onRefresh: () => void
  lang: 'bn' | 'en'
}

const DOC_TYPES: { type: DocType; nameBn: string; nameEn: string; required: boolean; descBn: string; descEn: string }[] = [
  {
    type: 'nid_front',
    nameBn: 'জাতীয় পরিচয়পত্র (সামনের অংশ)',
    nameEn: 'National ID (Front)',
    required: true,
    descBn: '১০ বা ১৭ ডিজিটের স্মার্ট/লেমিনেটেড NID কার্ড',
    descEn: '10 or 17 digit Smart / Laminated NID card',
  },
  {
    type: 'nid_back',
    nameBn: 'জাতীয় পরিচয়পত্র (পেছনের অংশ)',
    nameEn: 'National ID (Back)',
    required: true,
    descBn: 'ঠিকানা ও রক্তের গ্রুপ সংবলিত পেছনের পাতা',
    descEn: 'Back side showing address and blood group',
  },
  {
    type: 'birth_certificate',
    nameBn: 'ডিজিটাল জন্ম নিবন্ধন সনদ',
    nameEn: 'Digital Birth Certificate',
    required: true,
    descBn: '১৭ ডিজিটের অনলাইন ভেরিফাইড জন্ম সনদ',
    descEn: '17-digit online verified birth certificate',
  },
  {
    type: 'educational_transcript',
    nameBn: 'এডমিট কার্ড / শিক্ষাগত সনদ',
    nameEn: 'Admit Card / Educational Certificate',
    required: false,
    descBn: 'এসএসসি / এইচএসসি প্রবেশপত্র বা নম্বরপত্র',
    descEn: 'SSC / HSC admit card, transcript or marksheet',
  },
  {
    type: 'photo',
    nameBn: 'পাসপোর্ট সাইজ ছবি',
    nameEn: 'Passport Size Photo',
    required: true,
    descBn: 'সাদা ব্যাকগ্রাউন্ডে সাম্প্রতিক তোলা ছবি',
    descEn: 'Recent photo with white background',
  },
  {
    type: 'tin_certificate',
    nameBn: 'ই-টিআইএন (e-TIN) সনদ',
    nameEn: 'e-TIN Certificate',
    required: false,
    descBn: 'জাতীয় রাজস্ব বোর্ডের ১২ ডিজিটের কর সনদ',
    descEn: 'NBR 12-digit tax identification certificate',
  },
  {
    type: 'trade_license',
    nameBn: 'ই-ট্রেড লাইসেন্স',
    nameEn: 'e-Trade License',
    required: false,
    descBn: 'ইউনিয়ন/পৌরসভা হতে প্রাপ্ত হালনাগাদ ব্যবসা সনদ',
    descEn: 'Up-to-date business license from Union/Municipality',
  },
  {
    type: 'citizenship_certificate',
    nameBn: 'নাগরিকত্ব / ওয়ারিশান সনদ',
    nameEn: 'Citizenship / Heir Certificate',
    required: false,
    descBn: 'ইউপি চেয়ারম্যান বা ওয়ার্ড কাউন্সিলর কর্তৃক স্বাক্ষরিত',
    descEn: 'Signed by UP Chairman or Ward Councillor',
  },
]

const FIELD_LABELS: Record<string, { bn: string; en: string }> = {
  doc_title: { bn: 'নথির ধরন', en: 'Document Type' },
  full_name_bn: { bn: 'নাম (বাংলা)', en: 'Name (Bengali)' },
  full_name_en: { bn: 'নাম (ইংরেজি)', en: 'Name (English)' },
  candidate_name: { bn: 'শিক্ষার্থীর নাম', en: 'Candidate Name' },
  id_number: { bn: 'পরিচয়পত্র / নিবন্ধন নং', en: 'ID / Registry Number' },
  nid_number: { bn: 'এনআইডি নম্বর', en: 'NID Number' },
  br_number: { bn: 'জন্ম নিবন্ধন নম্বর', en: 'Birth Reg Number' },
  tin_number: { bn: 'টিআইএন নম্বর', en: 'e-TIN Number' },
  roll: { bn: 'রোল নম্বর', en: 'Roll Number' },
  reg_no: { bn: 'রেজিস্ট্রেশন নম্বর', en: 'Registration No' },
  board: { bn: 'শিক্ষা বোর্ড', en: 'Education Board' },
  exam_name: { bn: 'পরীক্ষার নাম', en: 'Examination Name' },
  dob: { bn: 'জন্মতারিখ', en: 'Date of Birth' },
  blood_group: { bn: 'রক্তের গ্রুপ', en: 'Blood Group' },
  father_name: { bn: 'পিতার নাম', en: "Father's Name" },
  mother_name: { bn: 'মাতার নাম', en: "Mother's Name" },
  address: { bn: 'ঠিকানা', en: 'Address' },
  business_name: { bn: 'প্রতিষ্ঠানের নাম', en: 'Business Name' },
  owner_name: { bn: 'স্বত্বাধিকারীর নাম', en: 'Owner Name' },
  issue_date: { bn: 'ইস্যু তারিখ', en: 'Issue Date' },
  valid_till: { bn: 'মেয়াদ', en: 'Valid Till' },
  status: { bn: 'স্থিতি', en: 'Status' },
  verified_source: { bn: 'যাচাই উৎস', en: 'Verification Source' },
}

export default function DocumentLocker({ documents, onRefresh, lang }: DocumentLockerProps) {
  const isBn = lang === 'bn'
  const [selectedType, setSelectedType] = useState<DocType>('nid_front')
  const [isScanning, setIsScanning] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<CitizenDocument | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Staged OCR upload state
  const [stagedFile, setStagedFile] = useState<{ file: File; fileData: string } | null>(null)
  const [scannedMeta, setScannedMeta] = useState<Record<string, any> | null>(null)
  const [ocrSource, setOcrSource] = useState<string | null>(null)

  // Calculate vault completeness
  const completenessPercent = Math.min(100, Math.round((documents.length / 5) * 100))

  const resetUploadState = () => {
    setStagedFile(null)
    setScannedMeta(null)
    setOcrSource(null)
    setIsScanning(false)
    setIsSaving(false)
    setUploadError(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setIsScanning(true)

    const reader = new FileReader()
    reader.onload = async () => {
      const fileData = reader.result as string
      setStagedFile({ file, fileData })

      try {
        const ocrRes = await scanDocumentOCR({
          imageBase64: fileData,
          mimeType: file.type || 'image/jpeg',
          docType: selectedType,
          fileName: file.name,
        })

        if (ocrRes.success && ocrRes.document) {
          setScannedMeta(ocrRes.document)
          setOcrSource(ocrRes.source || 'ai_ocr')
        } else {
          setUploadError(isBn ? 'ওসিআর স্ক্যানে তথ্য পাওয়া যায়নি, ম্যানুয়াল যাচাই করুন।' : 'OCR scan returned partial data, please review.')
          setScannedMeta({})
        }
      } catch (err: any) {
        setUploadError(isBn ? 'স্ক্যান সম্পন্ন করতে ত্রুটি হয়েছে' : 'Failed to scan document')
        setScannedMeta({})
      } finally {
        setIsScanning(false)
      }
    }

    reader.onerror = () => {
      setIsScanning(false)
      setUploadError(isBn ? 'ফাইলটি পড়তে সমস্যা হয়েছে' : 'Failed to read file')
    }

    reader.readAsDataURL(file)
  }

  const handleFieldChange = (key: string, val: string) => {
    setScannedMeta((prev) => ({ ...(prev || {}), [key]: val }))
  }

  const handleConfirmSave = async () => {
    if (!stagedFile) return
    setIsSaving(true)
    setUploadError(null)

    try {
      const res = await uploadDocument({
        docType: selectedType,
        fileName: stagedFile.file.name,
        fileSize: stagedFile.file.size,
        mimeType: stagedFile.file.type || 'application/octet-stream',
        fileData: stagedFile.fileData,
        extractedMeta: scannedMeta || {},
      })

      if (res.success) {
        setShowUploadModal(false)
        resetUploadState()
        onRefresh()
      } else {
        setUploadError(res.error || (isBn ? 'নথি সংরক্ষণে ত্রুটি হয়েছে' : 'Failed to save document'))
      }
    } catch {
      setUploadError(isBn ? 'নথি আপলোড সম্পন্ন হয়নি' : 'Upload failed')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(isBn ? 'আপনি কি নিশ্চিতভাবে এই নথিটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this document?')) {
      return
    }
    await deleteDocument(id)
    onRefresh()
  }

  const handleCopy = (text: string, keyName: string) => {
    if (!text) return
    navigator.clipboard.writeText(String(text))
    setCopiedKey(keyName)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-7">
      {/* ─── Vault Readiness Card (Windows 10 Flat Tile) ───────────────────── */}
      <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider block">
                {isBn ? 'নিরাপদ নাগরিক ভল্ট' : 'Secure Citizen Vault'}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-[#006A4E] border border-emerald-200 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00E599]" />
                <span>AI OCR Powered</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
              {isBn ? 'ডিজিটাল নাগরিক লকার ও স্মার্ট স্ক্যানার' : 'Digital Citizen Locker & Smart OCR'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl leading-relaxed">
              {isBn
                ? 'NID কার্ড, প্রবেশপত্র বা জন্ম সনদের ছবি আপলোড করুন। দিশারী AI স্বয়ংক্রিয়ভাবে তথ্য স্ক্যান করে আপনার লকারে জমা রাখবে।'
                : 'Upload photo of your NID, admit card, or birth certificate. Dishari AI scans and indexes your records into your vault.'}
            </p>
          </div>

          <button
            onClick={() => {
              resetUploadState()
              setShowUploadModal(true)
            }}
            className="shrink-0 min-h-[42px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer win-btn"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন নথি স্ক্যান ও যোগ' : 'Scan & Add Document'}</span>
          </button>
        </div>

        {/* Readiness Meter */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between text-xs font-mono font-semibold mb-1.5">
            <span className="text-neutral-700">
              {isBn ? 'লকার প্রস্তুতি মাত্রা:' : 'Vault Readiness Score:'} {completenessPercent}%
            </span>
            <span className="text-[#006A4E] font-bold">
              {documents.length} {isBn ? 'টি নথি সংরক্ষিত' : 'documents stored'}
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-200 overflow-hidden rounded-none">
            <div
              className="h-full bg-[#006A4E] transition-all duration-500 rounded-none"
              style={{ width: `${completenessPercent}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-neutral-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
              <span>{isBn ? '২৫৬-বিট এনক্রিপ্টেড ভল্ট' : '256-bit Encrypted Vault'}</span>
            </div>
            <span className="text-neutral-300">•</span>
            <span>{isBn ? 'স্বয়ংক্রিয় এআই তথ্য নিষ্কাশন' : 'Automated Gemini OCR Extraction'}</span>
            <span className="text-neutral-300">•</span>
            <span>{isBn ? 'যেকোনো আবেদন ফর্মে ১-ক্লিকে অটোফিল' : '1-Click Autofill in Applications'}</span>
          </div>
        </div>
      </div>

      {/* ─── Stored Documents Grid ────────────────────────────────────────── */}
      <div>
        <h3 className="font-bold text-base text-neutral-900 mb-3.5 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#006A4E]" />
          <span>{isBn ? 'সংরক্ষিত নথিপত্রের তালিকা' : 'Saved Documents Archive'}</span>
        </h3>

        {documents.length === 0 ? (
          <div className="border border-dashed border-neutral-300 bg-white p-8 sm:p-12 text-center rounded-none shadow-xs">
            <div className="w-12 h-12 mx-auto border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-3 rounded-none">
              <Scan className="w-6 h-6 text-[#006A4E]" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">
              {isBn ? 'লকারে এখনো কোনো নথি যোগ করা হয়নি' : 'No documents saved in your vault yet'}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-1 mb-5 leading-relaxed">
              {isBn
                ? 'আপনার জাতীয় পরিচয়পত্র, প্রবেশপত্র বা জন্ম সনদের ছবি আপলোড করে এআই স্ক্যান সক্রিয় করুন।'
                : 'Upload photo of your National ID, Admit Card, or Birth Certificate to activate automated OCR.'}
            </p>
            <button
              onClick={() => {
                resetUploadState()
                setShowUploadModal(true)
              }}
              className="min-h-[42px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider rounded-none cursor-pointer win-btn inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isBn ? 'প্রথম নথি স্ক্যান করুন' : 'Scan First Document'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => {
              const typeMeta = DOC_TYPES.find((t) => t.type === doc.doc_type)
              const name = isBn ? typeMeta?.nameBn || doc.doc_type : typeMeta?.nameEn || doc.doc_type
              const kb = Math.round(doc.file_size / 1024)
              const meta = doc.extracted_meta || {}

              return (
                <div
                  key={doc.id}
                  className="win-tile p-4.5 rounded-none shadow-xs flex flex-col justify-between border-t-2 border-t-[#006A4E]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-9 h-9 border border-neutral-200 bg-emerald-50 flex items-center justify-center shrink-0 rounded-none">
                        <FileText className="w-4 h-4 text-[#006A4E]" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#006A4E] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-none inline-flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#006A4E]" />
                        <span>{isBn ? 'এআই যাচাইকৃত' : 'AI Verified'}</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-neutral-900 leading-snug">{name}</h4>
                    <p className="font-mono text-xs text-neutral-500 mt-0.5 truncate" title={doc.file_name}>
                      {doc.file_name}
                    </p>

                    {/* Auto-extracted OCR metadata chips */}
                    {Object.keys(meta).length > 0 && (
                      <div className="mt-3 p-2.5 bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-700 space-y-1.5 rounded-none">
                        {(meta.id_number || meta.nid_number || meta.br_number) && (
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-500 font-semibold">{isBn ? 'নম্বর:' : 'ID No:'}</span>
                            <span className="font-bold text-neutral-900">
                              {meta.id_number || meta.nid_number || meta.br_number}
                            </span>
                          </div>
                        )}
                        {(meta.full_name_bn || meta.full_name_en || meta.candidate_name) && (
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-500">{isBn ? 'নাম:' : 'Name:'}</span>
                            <span className="font-medium text-neutral-800 truncate max-w-[170px]">
                              {meta.full_name_bn || meta.full_name_en || meta.candidate_name}
                            </span>
                          </div>
                        )}
                        {meta.roll && (
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-500">{isBn ? 'রোল নং:' : 'Roll:'}</span>
                            <span className="font-bold text-[#006A4E]">{meta.roll}</span>
                          </div>
                        )}
                        {meta.blood_group && (
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-500">{isBn ? 'রক্তের গ্রুপ:' : 'Blood Group:'}</span>
                            <span className="font-bold text-[#C8102E]">{meta.blood_group}</span>
                          </div>
                        )}
                        {meta.dob && (
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-500">{isBn ? 'জন্মতারিখ:' : 'DOB:'}</span>
                            <span className="text-neutral-800">{meta.dob}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-3.5 mt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-500">{kb} KB</span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="px-2.5 py-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 transition-colors rounded-none win-press inline-flex items-center gap-1 font-semibold text-xs"
                        title={isBn ? 'প্রিভিউ ও তথ্য দেখুন' : 'View Preview & Data'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isBn ? 'বিস্তারিত' : 'View'}</span>
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 border border-neutral-200 hover:border-red-300 text-neutral-500 hover:text-[#C8102E] transition-colors rounded-none win-press"
                        title={isBn ? 'মুছে ফেলুন' : 'Delete Document'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ─── Upload & AI Scan Modal (Windows 10 ContentDialog) ─────────────────── */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={win10DialogBackdropMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
              onClick={() => {
                if (!isScanning && !isSaving) setShowUploadModal(false)
              }}
            />

            <motion.div
              variants={win10DialogMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 border border-neutral-300 bg-white max-w-xl w-full p-6 shadow-2xl rounded-none max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <Scan className="w-3.5 h-3.5 text-[#006A4E]" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900">
                    {isBn ? 'স্মার্ট নথি স্ক্যানার ও লকার' : 'Smart Document OCR Scanner'}
                  </h3>
                </div>
                <button
                  disabled={isScanning || isSaving}
                  onClick={() => setShowUploadModal(false)}
                  className="p-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-600 rounded-none win-press disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {uploadError && (
                <div className="mb-4 p-3 border border-red-300 bg-red-50 text-[#C8102E] text-xs font-semibold flex items-center gap-2 rounded-none">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* ── STEP 1: SELECT TYPE & FILE (Default View) ── */}
              {!stagedFile && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                      {isBn ? 'নথির ধরন নির্বাচন করুন:' : 'Select Document Type:'}
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as DocType)}
                      className="w-full h-10 px-3 border border-neutral-300 bg-white font-semibold text-xs sm:text-sm text-neutral-900 focus:outline-none rounded-none"
                    >
                      {DOC_TYPES.map((t) => (
                        <option key={t.type} value={t.type}>
                          {isBn ? t.nameBn : t.nameEn} {t.required ? '*' : ''}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-neutral-500 mt-1">
                      {isBn
                        ? DOC_TYPES.find((t) => t.type === selectedType)?.descBn
                        : DOC_TYPES.find((t) => t.type === selectedType)?.descEn}
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                      {isBn ? 'নথির স্পষ্ট ছবি বা স্ক্যান কপি আপলোড করুন:' : 'Upload Clear Photo or Scanned Copy:'}
                    </label>
                    <label className="border-2 border-dashed border-neutral-300 hover:border-[#006A4E] hover:bg-neutral-50/70 p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center rounded-none win-press">
                      <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-[#006A4E]" />
                      </div>
                      <span className="font-bold text-sm text-neutral-900">
                        {isBn ? 'ছবি নির্বাচন করতে ক্লিক করুন বা টেনে আনুন' : 'Click to Browse or Drag Photo Here'}
                      </span>
                      <span className="text-xs text-neutral-500 mt-1">
                        {isBn ? 'NID কার্ড, প্রবেশপত্র, জন্ম নিবন্ধন (JPG, PNG, PDF)' : 'Supports NID, Admit Card, Birth Certificate'}
                      </span>
                      <span className="text-[11px] font-mono text-[#006A4E] mt-2 font-semibold">
                        ⚡ {isBn ? 'AI মডেল স্বয়ংক্রিয়ভাবে টেক্সট স্ক্যান করবে' : 'Gemini Vision AI extracts text automatically'}
                      </span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* ── STEP 2: ACTIVE SCANNING ANIMATION (HUD) ── */}
              {stagedFile && isScanning && (
                <div className="py-8 text-center space-y-4">
                  <div className="relative mx-auto w-64 h-40 border-2 border-[#006A4E] bg-neutral-900 overflow-hidden shadow-lg">
                    {stagedFile.fileData.startsWith('data:image') && (
                      <img
                        src={stagedFile.fileData}
                        alt="Scanning Preview"
                        className="w-full h-full object-cover opacity-60 filter contrast-125"
                      />
                    )}
                    {/* Animated Emerald Laser Beam */}
                    <motion.div
                      animate={{ top: ['0%', '95%', '0%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-1 bg-[#00E599] shadow-[0_0_16px_#00E599]"
                    />
                    <div className="absolute inset-0 bg-emerald-950/20 pointer-events-none" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#006A4E] border border-emerald-200 text-xs font-mono font-bold mb-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{isBn ? 'এআই ওসিআর বিশ্লেষণ চলছে...' : 'AI Vision OCR In Progress...'}</span>
                    </div>
                    <h4 className="font-bold text-neutral-900 text-sm">
                      {isBn ? 'নথি থেকে নাগরিক তথ্য সংগ্রহ করা হচ্ছে' : 'Extracting Citizen Record Fields'}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5 font-mono">
                      {stagedFile.file.name}
                    </p>
                  </div>
                </div>
              )}

              {/* ── STEP 3: OCR REVIEW & CONFIRMATION PANEL ── */}
              {stagedFile && !isScanning && scannedMeta && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 text-xs text-[#006A4E] font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#006A4E] shrink-0" />
                      <span className="font-semibold">
                        {isBn ? 'এআই সফলভাবে নথির তথ্য সনাক্ত করেছে' : 'AI Successfully Scanned Document'}
                      </span>
                    </div>
                    {ocrSource && (
                      <span className="font-mono text-[10px] uppercase bg-white px-2 py-0.5 border border-emerald-200 font-bold">
                        {ocrSource}
                      </span>
                    )}
                  </div>

                  <div className="max-h-60 overflow-y-auto border border-neutral-200 p-3 bg-neutral-50 space-y-2.5">
                    <p className="text-xs font-bold text-neutral-800 uppercase font-mono tracking-wider mb-2">
                      {isBn ? 'এক্সট্র্যাক্ট করা তথ্যাবলী (প্রয়োজনে সম্পাদনা করুন):' : 'Extracted Fields (Edit if needed):'}
                    </p>

                    {Object.entries(scannedMeta).map(([k, v]) => {
                      const label = FIELD_LABELS[k]
                        ? isBn
                          ? FIELD_LABELS[k].bn
                          : FIELD_LABELS[k].en
                        : k

                      return (
                        <div key={k} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                          <span className="font-mono font-semibold text-neutral-600 sm:w-1/3">
                            {label}:
                          </span>
                          <input
                            type="text"
                            value={String(v ?? '')}
                            onChange={(e) => handleFieldChange(k, e.target.value)}
                            className="sm:w-2/3 h-8 px-2.5 border border-neutral-300 bg-white font-mono text-xs text-neutral-900 focus:outline-none focus:border-[#006A4E] rounded-none"
                          />
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={resetUploadState}
                      className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline win-press"
                    >
                      {isBn ? '← অন্য ছবি বেছে নিন' : '← Choose Different File'}
                    </button>

                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleConfirmSave}
                      className="min-h-[40px] px-6 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 rounded-none cursor-pointer win-btn disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{isBn ? 'লকারে নিশ্চিতভাবে সংরক্ষণ করুন' : 'Confirm & Save to Vault'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Cancel Button for initial step */}
              {!stagedFile && (
                <div className="mt-5 pt-3.5 border-t border-neutral-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="min-h-[40px] px-5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs uppercase rounded-none win-press"
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Preview Modal (Windows 10 ContentDialog with OCR Side Drawer) ─────── */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={win10DialogBackdropMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
              onClick={() => setPreviewDoc(null)}
            />

            <motion.div
              variants={win10DialogMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 border border-neutral-300 bg-white max-w-4xl w-full p-6 shadow-2xl rounded-none max-h-[90vh] flex flex-col"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 pt-1">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                    <span>{previewDoc.file_name}</span>
                    <span className="font-mono text-[10px] text-[#006A4E] bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-bold">
                      {isBn ? 'যাচাইকৃত নথি' : 'Verified Vault Record'}
                    </span>
                  </h3>
                  <span className="text-xs font-mono text-neutral-500">
                    {isBn ? 'আপলোড তারিখ:' : 'Uploaded:'} {new Date(previewDoc.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-600 rounded-none win-press"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Two Column Layout: Document on Left, Extracted OCR Data on Right */}
              <div className="py-4 flex-1 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Image / Preview */}
                <div className="flex items-center justify-center bg-neutral-100 border border-neutral-200 p-3 rounded-none min-h-[260px]">
                  {previewDoc.file_data?.startsWith('data:image') ? (
                    <img
                      src={previewDoc.file_data}
                      alt={previewDoc.file_name}
                      className="max-h-[45vh] max-w-full object-contain shadow-xs"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                      <p className="font-bold text-neutral-800 text-sm">{previewDoc.file_name}</p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {isBn ? 'নথিটি সুরক্ষিত লকারে এনক্রিপ্ট করে সংরক্ষিত।' : 'Document encrypted and saved in personal vault.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Extracted OCR Metadata Panel */}
                <div className="border border-neutral-200 bg-neutral-50 p-4 flex flex-col justify-between rounded-none overflow-y-auto max-h-[45vh]">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-200">
                      <span className="text-xs font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#006A4E]" />
                        <span>{isBn ? 'স্বয়ংক্রিয় এআই এক্সট্র্যাক্ট করা তথ্য' : 'AI Extracted Citizen Records'}</span>
                      </span>
                    </div>

                    {previewDoc.extracted_meta && Object.keys(previewDoc.extracted_meta).length > 0 ? (
                      <div className="space-y-2 text-xs">
                        {Object.entries(previewDoc.extracted_meta).map(([key, val]) => {
                          const label = FIELD_LABELS[key]
                            ? isBn
                              ? FIELD_LABELS[key].bn
                              : FIELD_LABELS[key].en
                            : key
                          const isCopied = copiedKey === key

                          return (
                            <div
                              key={key}
                              className="p-2 bg-white border border-neutral-200 flex items-center justify-between gap-2"
                            >
                              <div className="overflow-hidden">
                                <span className="text-[11px] font-mono text-neutral-500 block">
                                  {label}
                                </span>
                                <span className="font-mono font-semibold text-neutral-900 block truncate" title={String(val)}>
                                  {String(val)}
                                </span>
                              </div>
                              <button
                                onClick={() => handleCopy(String(val), key)}
                                className="p-1 text-neutral-400 hover:text-[#006A4E] transition-colors shrink-0 win-press"
                                title={isBn ? 'কপি করুন' : 'Copy value'}
                              >
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-[#006A4E]" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-neutral-400 text-xs">
                        {isBn ? 'কোনো মেটাডাটা সংরক্ষিত নেই' : 'No OCR metadata extracted'}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>{isBn ? 'স্থিতি: সক্রিয় ও এনক্রিপ্টেড' : 'Status: Active & Encrypted'}</span>
                    <span className="text-[#006A4E] font-bold">256-Bit SSL</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
                <span className="font-mono text-xs text-[#006A4E] font-bold inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006A4E]" />
                  <span>{isBn ? 'নাগরিক সেবা ফর্মের জন্য অনুমোদিত' : 'Authorized for citizen service forms'}</span>
                </span>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="min-h-[38px] px-5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs uppercase rounded-none win-press"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
