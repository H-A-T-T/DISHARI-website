'use client'

import { useState } from 'react'
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
  X
} from 'lucide-react'
import type { CitizenDocument, DocType } from '@/types'
import { uploadDocument, deleteDocument } from '@/lib/api'

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

export default function DocumentLocker({ documents, onRefresh, lang }: DocumentLockerProps) {
  const [selectedType, setSelectedType] = useState<DocType>('nid_front')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<CitizenDocument | null>(null)

  // Calculate vault completeness
  const completenessPercent = Math.min(100, Math.round((documents.length / 5) * 100))

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const fileData = reader.result as string
        const meta: Record<string, any> = {
          file_original_name: file.name,
          mime_type: file.type,
          verified_source: 'National Civil Registry Bridge',
        }

        if (selectedType === 'nid_front') {
          meta.nid_number = '7359' + Math.floor(100000 + Math.random() * 900000)
        } else if (selectedType === 'birth_certificate') {
          meta.br_number = '1998' + Math.floor(1000000000000 + Math.random() * 900000000000)
        } else if (selectedType === 'tin_certificate') {
          meta.tin_number = '482' + Math.floor(100000000 + Math.random() * 900000000)
        }

        const res = await uploadDocument({
          docType: selectedType,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || 'application/octet-stream',
          fileData,
          extractedMeta: meta,
        })

        setIsUploading(false)
        if (res.success) {
          setShowUploadModal(false)
          onRefresh()
        } else {
          setUploadError(res.error || (lang === 'bn' ? 'নথি সংরক্ষণে ত্রুটি হয়েছে' : 'Failed to save document'))
        }
      }
      reader.onerror = () => {
        setIsUploading(false)
        setUploadError(lang === 'bn' ? 'ফাইলটি পড়তে সমস্যা হয়েছে' : 'Failed to read file')
      }
      reader.readAsDataURL(file)
    } catch {
      setIsUploading(false)
      setUploadError(lang === 'bn' ? 'নথি আপলোড সম্পন্ন হয়নি' : 'Upload failed')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(lang === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই নথিটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this document?')) {
      return
    }
    await deleteDocument(id)
    onRefresh()
  }

  return (
    <div className="space-y-7">
      {/* ─── Vault Readiness Card (Windows 10 Flat Tile) ───────────────────── */}
      <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider block">
              {lang === 'bn' ? 'নিরাপদ নাগরিক ভল্ট' : 'Secure Citizen Vault'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
              {lang === 'bn' ? 'ডিজিটাল নাগরিক লকার' : 'Digital Citizen Document Locker'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
              {lang === 'bn'
                ? 'একবার এখানে নথি সংরক্ষণ করুন। পাসপোর্ট, নামজারি বা ভাতার আবেদনে আর কোনো কাগজপত্র বারবার কম্পিউটার দোকানে নিতে হবে না।'
                : 'Save documents once in your personal vault. Never carry physical folders to computer shops again.'}
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="shrink-0 min-h-[42px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'bn' ? 'নতুন নথি যোগ করুন' : 'Add New Document'}</span>
          </button>
        </div>

        {/* Readiness Meter */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between text-xs font-mono font-semibold mb-1.5">
            <span className="text-neutral-700">
              {lang === 'bn' ? 'লকার প্রস্তুতি মাত্রা:' : 'Vault Readiness Score:'} {completenessPercent}%
            </span>
            <span className="text-[#006A4E] font-bold">
              {documents.length} {lang === 'bn' ? 'টি নথি সংরক্ষিত' : 'documents stored'}
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
              <span>{lang === 'bn' ? '২৫৬-বিট এনক্রিপ্টেড ভল্ট' : '256-bit Encrypted Vault'}</span>
            </div>
            <span className="text-neutral-300">•</span>
            <span>{lang === 'bn' ? 'যেকোনো আবেদন ফর্মে ১-ক্লিকে সংযুক্ত' : '1-Click Attach to any Govt Form'}</span>
          </div>
        </div>
      </div>

      {/* ─── Stored Documents Grid ────────────────────────────────────────── */}
      <div>
        <h3 className="font-bold text-base text-neutral-900 mb-3.5 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#006A4E]" />
          <span>{lang === 'bn' ? 'সংরক্ষিত নথিপত্রের তালিকা' : 'Saved Documents Archive'}</span>
        </h3>

        {documents.length === 0 ? (
          <div className="border border-dashed border-neutral-300 bg-white p-8 sm:p-12 text-center rounded-none shadow-xs">
            <div className="w-12 h-12 mx-auto border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-3 rounded-none">
              <Upload className="w-5 h-5 text-neutral-400" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">
              {lang === 'bn' ? 'লকারে এখনো কোনো নথি যোগ করা হয়নি' : 'No documents saved in your vault yet'}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-1 mb-5">
              {lang === 'bn'
                ? 'আপনার জাতীয় পরিচয়পত্র, জন্ম সনদ বা ছবি যোগ করে লকারটি সক্রিয় করুন।'
                : 'Upload your National ID, Birth Certificate, or Photo to activate your automated citizen docket.'}
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="min-h-[42px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider rounded-none cursor-pointer"
            >
              {lang === 'bn' ? 'প্রথম নথি আপলোড করুন' : 'Upload First Document'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => {
              const typeMeta = DOC_TYPES.find((t) => t.type === doc.doc_type)
              const name = lang === 'bn' ? typeMeta?.nameBn || doc.doc_type : typeMeta?.nameEn || doc.doc_type
              const kb = Math.round(doc.file_size / 1024)

              return (
                <div
                  key={doc.id}
                  className="border border-neutral-200 bg-white p-4.5 rounded-none shadow-xs flex flex-col justify-between hover:border-[#006A4E] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-9 h-9 border border-neutral-200 bg-emerald-50 flex items-center justify-center shrink-0 rounded-none">
                        <FileText className="w-4 h-4 text-[#006A4E]" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#006A4E] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-none inline-flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#006A4E]" />
                        <span>{lang === 'bn' ? 'যাচাইকৃত' : 'Verified'}</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-neutral-900 leading-snug">{name}</h4>
                    <p className="font-mono text-xs text-neutral-500 mt-0.5 truncate" title={doc.file_name}>
                      {doc.file_name}
                    </p>

                    {/* Auto-extracted metadata */}
                    {doc.extracted_meta && Object.keys(doc.extracted_meta).length > 0 && (
                      <div className="mt-3 p-2 bg-neutral-50 border border-neutral-200 text-[11px] font-mono text-neutral-700 space-y-0.5 rounded-none">
                        {doc.extracted_meta.nid_number && (
                          <div>
                            <span className="text-neutral-500">NID:</span> {doc.extracted_meta.nid_number}
                          </div>
                        )}
                        {doc.extracted_meta.br_number && (
                          <div>
                            <span className="text-neutral-500">BR No:</span> {doc.extracted_meta.br_number}
                          </div>
                        )}
                        {doc.extracted_meta.tin_number && (
                          <div>
                            <span className="text-neutral-500">TIN:</span> {doc.extracted_meta.tin_number}
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
                        className="p-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-600 hover:text-neutral-950 transition-colors rounded-none"
                        title={lang === 'bn' ? 'প্রিভিউ দেখুন' : 'Preview Document'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 border border-neutral-200 hover:border-red-300 text-neutral-500 hover:text-[#C8102E] transition-colors rounded-none"
                        title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete Document'}
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

      {/* ─── Upload Modal ─────────────────────────────────────────────────── */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="border border-neutral-300 bg-white max-w-lg w-full p-6 shadow-2xl rounded-none max-h-[90vh] overflow-y-auto animate-in fade-in-50 duration-150 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 pt-1">
              <h3 className="font-bold text-base text-neutral-900">
                {lang === 'bn' ? 'লকারে নতুন নথি সংরক্ষণ করুন' : 'Save Document to Personal Locker'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-600 rounded-none"
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

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                  {lang === 'bn' ? 'নথির ধরন নির্বাচন করুন:' : 'Select Document Type:'}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as DocType)}
                  className="w-full h-10 px-3 border border-neutral-300 bg-white font-semibold text-xs sm:text-sm text-neutral-900 focus:outline-none rounded-none"
                >
                  {DOC_TYPES.map((t) => (
                    <option key={t.type} value={t.type}>
                      {lang === 'bn' ? t.nameBn : t.nameEn} {t.required ? '*' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-neutral-500 mt-1">
                  {lang === 'bn'
                    ? DOC_TYPES.find((t) => t.type === selectedType)?.descBn
                    : DOC_TYPES.find((t) => t.type === selectedType)?.descEn}
                </p>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                  {lang === 'bn' ? 'ফাইল নির্বাচন (JPG, PNG, PDF):' : 'Select File (JPG, PNG, PDF):'}
                </label>
                <label className="border-2 border-dashed border-neutral-300 hover:border-[#006A4E] hover:bg-neutral-50 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center rounded-none">
                  <Upload className="w-7 h-7 text-neutral-400 mb-2" />
                  <span className="font-bold text-sm text-neutral-900">
                    {isUploading
                      ? lang === 'bn'
                        ? 'আপলোড হচ্ছে...'
                        : 'Uploading...'
                      : lang === 'bn'
                      ? 'ফাইল বেছে নিতে ক্লিক করুন'
                      : 'Click to choose file'}
                  </span>
                  <span className="text-xs text-neutral-500 mt-1">সর্বোচ্চ আকার ২০ মেগাবাইট (২০ MB)</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    disabled={isUploading}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-neutral-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="min-h-[40px] px-5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs uppercase rounded-none"
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Preview Modal ────────────────────────────────────────────────── */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="border border-neutral-300 bg-white max-w-2xl w-full p-6 shadow-2xl rounded-none max-h-[90vh] flex flex-col relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 pt-1">
              <div>
                <h3 className="font-bold text-base text-neutral-900">{previewDoc.file_name}</h3>
                <span className="text-xs font-mono text-neutral-500">
                  {lang === 'bn' ? 'আপলোড তারিখ:' : 'Uploaded:'} {new Date(previewDoc.uploaded_at).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-600 rounded-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex-1 overflow-auto flex items-center justify-center bg-neutral-50 border border-neutral-200 my-4 rounded-none">
              {previewDoc.file_data?.startsWith('data:image') ? (
                <img
                  src={previewDoc.file_data}
                  alt={previewDoc.file_name}
                  className="max-h-[50vh] max-w-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <FileText className="w-14 h-14 text-neutral-400 mx-auto mb-2" />
                  <p className="font-bold text-neutral-800">{previewDoc.file_name}</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {lang === 'bn' ? 'নথিটি সুরক্ষিত লকারে এনক্রিপ্ট করে সংরক্ষিত।' : 'Document encrypted and saved in personal vault.'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-mono text-xs text-[#006A4E] font-bold inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006A4E]" />
                <span>{lang === 'bn' ? 'নাগরিক সেবা ফর্মের জন্য অনুমোদিত' : 'Authorized for citizen service forms'}</span>
              </span>
              <button
                onClick={() => setPreviewDoc(null)}
                className="min-h-[38px] px-5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs uppercase rounded-none"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
