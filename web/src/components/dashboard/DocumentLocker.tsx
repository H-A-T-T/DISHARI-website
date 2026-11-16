'use client'

import { useState, useEffect, useMemo } from 'react'
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
  Edit3,
  Folder,
  FolderOpen,
  LayoutGrid,
  List,
  Search,
  Download,
  CheckSquare,
  Square,
  HardDrive,
  Filter,
  ArrowUpDown,
  FileSpreadsheet
} from 'lucide-react'
import type { CitizenDocument, DocType } from '@/types'
import { uploadDocument, deleteDocument, scanDocumentOCR, type UserProfile } from '@/lib/api'
import { win10DialogBackdropMotion, win10DialogMotion } from '@/lib/motion'

interface DocumentLockerProps {
  documents: CitizenDocument[]
  onRefresh: () => void
  lang: 'bn' | 'en'
  user?: UserProfile | null
}

export type FolderCategory = 'all' | 'identity' | 'vital' | 'education' | 'business' | 'tax' | 'other'

const DOC_TYPES: { type: DocType; nameBn: string; nameEn: string; required: boolean; descBn: string; descEn: string; category: FolderCategory }[] = [
  {
    type: 'nid_front',
    nameBn: 'জাতীয় পরিচয়পত্র (সামনের অংশ)',
    nameEn: 'National ID (Front)',
    required: true,
    descBn: '১০ বা ১৭ ডিজিটের স্মার্ট/লেমিনেটেড NID কার্ড',
    descEn: '10 or 17 digit Smart / Laminated NID card',
    category: 'identity',
  },
  {
    type: 'nid_back',
    nameBn: 'জাতীয় পরিচয়পত্র (পেছনের অংশ)',
    nameEn: 'National ID (Back)',
    required: true,
    descBn: 'ঠিকানা ও রক্তের গ্রুপ সংবলিত পেছনের পাতা',
    descEn: 'Back side showing address and blood group',
    category: 'identity',
  },
  {
    type: 'birth_certificate',
    nameBn: 'ডিজিটাল জন্ম নিবন্ধন সনদ',
    nameEn: 'Digital Birth Certificate',
    required: true,
    descBn: '১৭ ডিজিটের অনলাইন ভেরিফাইড জন্ম সনদ (BDRIS)',
    descEn: '17-digit online verified birth certificate',
    category: 'vital',
  },
  {
    type: 'educational_transcript',
    nameBn: 'এডমিট কার্ড / শিক্ষাগত সনদ',
    nameEn: 'Admit Card / Educational Certificate',
    required: false,
    descBn: 'এসএসসি / এইচএসসি প্রবেশপত্র বা নম্বরপত্র',
    descEn: 'SSC / HSC admit card, transcript or marksheet',
    category: 'education',
  },
  {
    type: 'photo',
    nameBn: 'পাসপোর্ট সাইজ ছবি',
    nameEn: 'Passport Size Photo',
    required: true,
    descBn: 'সাদা ব্যাকগ্রাউন্ডে সাম্প্রতিক তোলা ছবি',
    descEn: 'Recent photo with white background',
    category: 'identity',
  },
  {
    type: 'tin_certificate',
    nameBn: 'ই-টিআইএন (e-TIN) সনদ',
    nameEn: 'e-TIN Certificate',
    required: false,
    descBn: 'জাতীয় রাজস্ব বোর্ডের ১২ ডিজিটের কর সনদ',
    descEn: 'NBR 12-digit tax identification certificate',
    category: 'tax',
  },
  {
    type: 'trade_license',
    nameBn: 'ই-ট্রেড লাইসেন্স',
    nameEn: 'e-Trade License',
    required: false,
    descBn: 'ইউনিয়ন/পৌরসভা হতে প্রাপ্ত হালনাগাদ ব্যবসা সনদ',
    descEn: 'Up-to-date business license from Union/Municipality',
    category: 'business',
  },
  {
    type: 'citizenship_certificate',
    nameBn: 'নাগরিকত্ব / ওয়ারিশান সনদ',
    nameEn: 'Citizenship / Heir Certificate',
    required: false,
    descBn: 'ইউপি চেয়ারম্যান বা ওয়ার্ড কাউন্সিলর কর্তৃক স্বাক্ষরিত',
    descEn: 'Signed by UP Chairman or Ward Councillor',
    category: 'identity',
  },
  {
    type: 'other',
    nameBn: 'অন্যান্য প্রত্যয়নপত্র / নথি',
    nameEn: 'Other Certificates / Files',
    required: false,
    descBn: 'সরকারি অন্যান্য প্রত্যয়ন বা প্রত্যয়িত কপি',
    descEn: 'Other official clearance or attested papers',
    category: 'other',
  },
]

const FOLDERS: { id: FolderCategory; nameBn: string; nameEn: string; docTypes: DocType[] }[] = [
  { id: 'all', nameBn: 'সকল নথি', nameEn: 'All Documents', docTypes: [] },
  { id: 'identity', nameBn: 'জাতীয় পরিচয় ও নাগরিকত্ব', nameEn: 'Identity & Photos', docTypes: ['nid_front', 'nid_back', 'photo', 'citizenship_certificate'] },
  { id: 'vital', nameBn: 'জন্ম নিবন্ধন সনদপত্র', nameEn: 'Birth & Vital Records', docTypes: ['birth_certificate'] },
  { id: 'education', nameBn: 'শিক্ষা ও প্রবেশপত্র', nameEn: 'Education & Transcripts', docTypes: ['educational_transcript'] },
  { id: 'business', nameBn: 'ব্যবসা ও ট্রেড লাইসেন্স', nameEn: 'Business & Trade', docTypes: ['trade_license'] },
  { id: 'tax', nameBn: 'কর ও রাজস্ব', nameEn: 'Tax & e-TIN', docTypes: ['tin_certificate'] },
  { id: 'other', nameBn: 'অন্যান্য নথি', nameEn: 'Other Files', docTypes: ['other'] },
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
  address: { bn: 'ঠিকানা / জন্মস্থান', en: 'Address / Birth Place' },
  business_name: { bn: 'প্রতিষ্ঠানের নাম', en: 'Business Name' },
  owner_name: { bn: 'স্বত্বাধিকারীর নাম', en: 'Owner Name' },
  issue_date: { bn: 'ইস্যু তারিখ', en: 'Issue Date' },
  valid_till: { bn: 'মেয়াদ', en: 'Valid Till' },
  status: { bn: 'স্থিতি', en: 'Status' },
  verified_source: { bn: 'যাচাই উৎস', en: 'Verification Source' },
}

function autoDetectDocType(meta?: Record<string, any> | null): DocType | null {
  if (!meta) return null
  const title = (meta.doc_title || '').toLowerCase()
  const raw = (meta.raw_text || '').toLowerCase()
  if (title.includes('জন্ম') || title.includes('birth') || raw.includes('birth registration') || raw.includes('bdris')) {
    return 'birth_certificate'
  }
  if (title.includes('প্রবেশপত্র') || title.includes('admit') || raw.includes('intermediate and secondary') || meta.roll) {
    return 'educational_transcript'
  }
  if (title.includes('জাতীয় পরিচয়পত্র') || title.includes('national id') || raw.includes('election commission')) {
    return 'nid_front'
  }
  if (title.includes('টিআইএন') || title.includes('tin') || raw.includes('taxes zone')) {
    return 'tin_certificate'
  }
  if (title.includes('ট্রেড লাইসেন্স') || title.includes('trade license')) {
    return 'trade_license'
  }
  return null
}

export default function DocumentLocker({ documents, onRefresh, lang, user }: DocumentLockerProps) {
  const isBn = lang === 'bn'

  // Local optimistic state synced with props
  const [localDocs, setLocalDocs] = useState<CitizenDocument[]>(documents)
  useEffect(() => {
    setLocalDocs(documents)
  }, [documents])

  // File explorer controls
  const [activeFolder, setActiveFolder] = useState<FolderCategory>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'details'>('details')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'name_asc' | 'size_desc'>('date_desc')
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [inspectedDoc, setInspectedDoc] = useState<CitizenDocument | null>(null)
  const [previewDoc, setPreviewDoc] = useState<CitizenDocument | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Upload Modal States
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedType, setSelectedType] = useState<DocType>('birth_certificate')
  const [isScanning, setIsScanning] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [stagedFile, setStagedFile] = useState<{ file: File; fileData: string } | null>(null)
  const [scannedMeta, setScannedMeta] = useState<Record<string, any> | null>(null)
  const [ocrSource, setOcrSource] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  // Auto-select first document as inspected doc when list changes
  useEffect(() => {
    if (localDocs.length > 0 && !inspectedDoc) {
      setInspectedDoc(localDocs[0])
    }
  }, [localDocs, inspectedDoc])

  // Compute folder counts
  const folderCounts = useMemo(() => {
    const counts: Record<FolderCategory, number> = {
      all: localDocs.length,
      identity: 0,
      vital: 0,
      education: 0,
      business: 0,
      tax: 0,
      other: 0,
    }
    localDocs.forEach((doc) => {
      const typeDef = DOC_TYPES.find((t) => t.type === doc.doc_type)
      const cat = typeDef?.category || 'other'
      counts[cat] = (counts[cat] || 0) + 1
    })
    return counts
  }, [localDocs])

  // Filtered & sorted documents
  const filteredDocs = useMemo(() => {
    let list = [...localDocs]

    // Category folder filter
    if (activeFolder !== 'all') {
      const folderDef = FOLDERS.find((f) => f.id === activeFolder)
      if (folderDef) {
        list = list.filter((doc) => folderDef.docTypes.includes(doc.doc_type))
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((doc) => {
        const name = (doc.file_name || '').toLowerCase()
        const typeMatch = (doc.doc_type || '').toLowerCase()
        const metaValues = Object.values(doc.extracted_meta || {})
          .map((v) => String(v).toLowerCase())
          .join(' ')
        return name.includes(q) || typeMatch.includes(q) || metaValues.includes(q)
      })
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
      }
      if (sortBy === 'date_asc') {
        return new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
      }
      if (sortBy === 'name_asc') {
        return a.file_name.localeCompare(b.file_name)
      }
      if (sortBy === 'size_desc') {
        return (b.file_size || 0) - (a.file_size || 0)
      }
      return 0
    })

    return list
  }, [localDocs, activeFolder, searchQuery, sortBy])

  // Total storage in bytes
  const totalSizeBytes = useMemo(() => {
    return localDocs.reduce((acc, d) => acc + (d.file_size || 0), 0)
  }, [localDocs])
  const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2)

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
          setOcrSource(ocrRes.source || 'javascript_ocr')

          // Auto-detect document type from OCR title
          const detected = autoDetectDocType(ocrRes.document)
          if (detected) {
            setSelectedType(detected)
          }
        } else {
          setUploadError(isBn ? 'ওসিআর স্ক্যান সমাপ্ত, তথ্যাবলী পর্যালোচনা করুন।' : 'OCR scan finished, please verify fields.')
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

    const targetDocType = autoDetectDocType(scannedMeta) || selectedType

    try {
      const res = await uploadDocument({
        userId: user?.id || 1,
        docType: targetDocType,
        fileName: stagedFile.file.name,
        fileSize: stagedFile.file.size,
        mimeType: stagedFile.file.type || 'application/octet-stream',
        fileData: stagedFile.fileData,
        extractedMeta: scannedMeta || {},
      })

      // Immediate optimistic update
      const newDoc: CitizenDocument = res.document || {
        id: Date.now(),
        user_id: user?.id || 1,
        doc_type: targetDocType,
        file_name: stagedFile.file.name,
        file_size: stagedFile.file.size,
        mime_type: stagedFile.file.type || 'application/octet-stream',
        verified: true,
        extracted_meta: scannedMeta || {},
        uploaded_at: new Date().toISOString(),
        file_data: stagedFile.fileData,
      }

      setLocalDocs((prev) => [newDoc, ...prev.filter((d) => d.id !== newDoc.id)])
      setInspectedDoc(newDoc)
      setShowUploadModal(false)
      resetUploadState()
      showToast(isBn ? 'নথি সফলভাবে লকারে সংরক্ষিত হয়েছে!' : 'Document successfully saved to vault!')
      onRefresh()
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
    // Optimistic delete
    setLocalDocs((prev) => prev.filter((d) => d.id !== id))
    if (inspectedDoc?.id === id) {
      setInspectedDoc(null)
    }
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    await deleteDocument(id)
    showToast(isBn ? 'নথিটি মুছে ফেলা হয়েছে' : 'Document deleted')
    onRefresh()
  }

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelectAll = () => {
    if (selectedIds.size === filteredDocs.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredDocs.map((d) => d.id)))
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(isBn ? `নির্বাচিত ${selectedIds.size} টি নথি মুছে ফেলতে চান?` : `Delete selected ${selectedIds.size} documents?`)) {
      return
    }
    const idsToDelete = Array.from(selectedIds)
    setLocalDocs((prev) => prev.filter((d) => !selectedIds.has(d.id)))
    setSelectedIds(new Set())
    setInspectedDoc(null)
    for (const id of idsToDelete) {
      await deleteDocument(id)
    }
    showToast(isBn ? 'নির্বাচিত নথিসমূহ মুছে ফেলা হয়েছে' : 'Selected documents removed')
    onRefresh()
  }

  const handleExportSelected = () => {
    const target = localDocs.filter((d) => selectedIds.size === 0 || selectedIds.has(d.id))
    const exportData = target.map((d) => ({
      id: d.id,
      doc_type: d.doc_type,
      file_name: d.file_name,
      file_size: d.file_size,
      uploaded_at: d.uploaded_at,
      metadata: d.extracted_meta,
    }))
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dishari-citizen-vault-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast(isBn ? 'নথি মেটাডাটা এক্সপোর্ট সম্পন্ন হয়েছে' : 'Metadata exported to JSON')
  }

  const handleCopy = (text: string, keyName: string) => {
    if (!text) return
    navigator.clipboard.writeText(String(text))
    setCopiedKey(keyName)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-4">
      {/* ─── Toast Notification Strip ────────────────────────────────────── */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 border border-[#006A4E] bg-emerald-50 text-[#006A4E] text-xs font-mono font-bold flex items-center justify-between shadow-sm rounded-none"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#006A4E]" />
              <span>{toastMsg}</span>
            </span>
            <button onClick={() => setToastMsg(null)} className="text-neutral-500 hover:text-neutral-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Windows 10 File Explorer Top Ribbon / Action Header ─────────── */}
      <div className="border border-neutral-300 bg-white p-4 rounded-none shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-[#006A4E]" />
                <span>{isBn ? 'নাগরিক ডিজিটাল লকার ও ফাইল ম্যানেজার' : 'Citizen Vault & File Explorer'}</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-[#006A4E] border border-emerald-200 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00E599]" />
                <span>JavaScript Vision OCR</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
              {isBn ? 'ফাইল ও নথিপত্র ব্যবস্থাপনা' : 'Document Vault & Archive Manager'}
            </h2>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2 pr-2 border-r border-neutral-300">
                <span className="text-xs font-mono font-bold text-[#006A4E] bg-emerald-50 px-2 py-1 border border-emerald-200">
                  {selectedIds.size} {isBn ? 'টি নির্বাচিত' : 'Selected'}
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="min-h-[36px] px-3 border border-red-300 bg-red-50 hover:bg-red-100 text-[#C8102E] text-xs font-bold uppercase inline-flex items-center gap-1.5 rounded-none win-press"
                  title={isBn ? 'নির্বাচিত মুছুন' : 'Delete selected'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isBn ? 'মুছুন' : 'Delete'}</span>
                </button>
              </div>
            )}

            <button
              onClick={handleExportSelected}
              className="min-h-[38px] px-3.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase inline-flex items-center gap-1.5 rounded-none win-press"
              title={isBn ? 'মেটাডাটা এক্সপোর্ট করুন' : 'Export metadata JSON'}
            >
              <Download className="w-3.5 h-3.5 text-neutral-600" />
              <span>{isBn ? 'এক্সপোর্ট' : 'Export'}</span>
            </button>

            <button
              onClick={() => {
                resetUploadState()
                setShowUploadModal(true)
              }}
              className="min-h-[38px] px-4 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 rounded-none transition-colors cursor-pointer win-btn"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? 'নতুন নথি স্ক্যান ও যোগ' : 'Scan & Add Document'}</span>
            </button>
          </div>
        </div>

        {/* Search, Filter & View Mode Controls Bar */}
        <div className="pt-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'ফাইলের নাম, এনআইডি, রোল বা তথ্য দিয়ে খুঁজুন...' : 'Search by filename, ID, roll, or text...'}
              className="w-full pl-9 pr-8 py-2 border border-neutral-300 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 text-xs focus:bg-white focus:border-[#006A4E] focus:outline-none rounded-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & View Mode Switches */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-1.5 font-mono text-neutral-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-neutral-300 bg-white py-1.5 px-2 text-xs font-mono text-neutral-800 rounded-none focus:outline-none focus:border-[#006A4E]"
              >
                <option value="date_desc">{isBn ? 'সর্বশেষ আপলোড' : 'Newest Added'}</option>
                <option value="date_asc">{isBn ? 'প্রাচীনতম' : 'Oldest Added'}</option>
                <option value="name_asc">{isBn ? 'নাম অনুযায়ী (A-Z)' : 'File Name (A-Z)'}</option>
                <option value="size_desc">{isBn ? 'আকার অনুযায়ী' : 'File Size'}</option>
              </select>
            </div>

            <div className="flex items-center border border-neutral-300 bg-neutral-100 p-0.5 rounded-none">
              <button
                onClick={() => setViewMode('details')}
                className={`p-1.5 rounded-none transition-colors ${
                  viewMode === 'details' ? 'bg-white text-[#006A4E] shadow-2xs font-bold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title={isBn ? 'বিস্তারিত তালিকা ভিউ' : 'Details List View'}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-none transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-[#006A4E] shadow-2xs font-bold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title={isBn ? 'গ্রিড কার্ড ভিউ' : 'Tile Grid View'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main File Explorer Multi-Pane View (Folders Sidebar + File Canvas + Inspector) ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Folder Tree Sidebar (3 columns on desktop) */}
        <div className="lg:col-span-3 border border-neutral-300 bg-white p-3.5 rounded-none shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-2 px-1">
              {isBn ? 'ফাইল ক্যাটাগরি ফোল্ডার' : 'Vault Folders'}
            </span>
            <div className="space-y-1">
              {FOLDERS.map((f) => {
                const count = folderCounts[f.id] || 0
                const isActive = activeFolder === f.id
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFolder(f.id)}
                    className={`w-full px-2.5 py-2 text-xs flex items-center justify-between rounded-none transition-colors text-left cursor-pointer win-press ${
                      isActive
                        ? 'bg-[#006A4E] text-white font-bold'
                        : 'bg-white text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isActive ? (
                        <FolderOpen className="w-4 h-4 text-emerald-200 shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                      <span className="truncate">{isBn ? f.nameBn : f.nameEn}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-none ${
                        isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Vault Storage Quota Meter */}
          <div className="pt-3 border-t border-neutral-200 text-xs">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 mb-1">
              <span>{isBn ? 'ব্যবহৃত স্পেস:' : 'Space Used:'}</span>
              <strong className="text-neutral-900">{totalSizeMB} MB / 100 MB</strong>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-none overflow-hidden">
              <div
                className="h-full bg-[#006A4E] rounded-none"
                style={{ width: `${Math.min(100, Math.max(5, (totalSizeBytes / (100 * 1024 * 1024)) * 100))}%` }}
              />
            </div>
            <div className="mt-2 text-[10px] font-mono text-neutral-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#006A4E]" />
              <span>{isBn ? '২৫৬-বিট এইএস এনক্রিপশন সক্রিয়' : '256-Bit AES Storage Enforced'}</span>
            </div>
          </div>
        </div>

        {/* Center: File List / Grid Canvas (6 columns on desktop if inspector open, or 9 columns) */}
        <div className={`lg:col-span-6 border border-neutral-300 bg-white p-4 rounded-none shadow-xs overflow-hidden flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-800">
                <span>{isBn ? 'ফাইল ব্রাউজার' : 'Directory Contents'}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-[#006A4E]">
                  {filteredDocs.length} {isBn ? 'টি নথি পাওয়া গেছে' : 'items'}
                </span>
              </div>

              {filteredDocs.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className="text-xs font-mono text-neutral-600 hover:text-[#006A4E] flex items-center gap-1"
                >
                  {selectedIds.size === filteredDocs.length ? (
                    <CheckSquare className="w-3.5 h-3.5 text-[#006A4E]" />
                  ) : (
                    <Square className="w-3.5 h-3.5" />
                  )}
                  <span>{selectedIds.size === filteredDocs.length ? (isBn ? 'সব নির্বাচন বাতিল' : 'Deselect All') : (isBn ? 'সব নির্বাচন' : 'Select All')}</span>
                </button>
              )}
            </div>

            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-neutral-200 bg-neutral-50/50 rounded-none my-6">
                <Scan className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-neutral-800">
                  {searchQuery ? (isBn ? 'কোনো নথি মেলেনি' : 'No matching documents found') : (isBn ? 'এই ফোল্ডারে কোনো নথি নেই' : 'No documents in this folder')}
                </h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  {isBn
                    ? 'আপনার এনআইডি, জন্ম সনদ বা শিক্ষাগত নথির ছবি স্ক্যান করে লকারে যুক্ত করুন।'
                    : 'Upload photo of your document to run automated JavaScript OCR.'}
                </p>
                <button
                  onClick={() => {
                    resetUploadState()
                    setShowUploadModal(true)
                  }}
                  className="mt-4 min-h-[36px] px-4 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white text-xs font-bold uppercase rounded-none win-btn inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'নথি স্ক্যান করুন' : 'Scan Document'}</span>
                </button>
              </div>
            ) : viewMode === 'details' ? (
              /* ─── Details List View (Windows 10 Explorer Style Table) ──── */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-mono text-[11px] uppercase">
                      <th className="p-2 w-8 text-center">#</th>
                      <th className="p-2">{isBn ? 'ফাইলের নাম' : 'Name'}</th>
                      <th className="p-2">{isBn ? 'নথির ধরন' : 'Category'}</th>
                      <th className="p-2">{isBn ? 'আইডি / নম্বর' : 'Identifier'}</th>
                      <th className="p-2">{isBn ? 'আকার' : 'Size'}</th>
                      <th className="p-2">{isBn ? 'তারিখ' : 'Date'}</th>
                      <th className="p-2 text-right">{isBn ? 'অ্যাকশন' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc) => {
                      const typeMeta = DOC_TYPES.find((t) => t.type === doc.doc_type)
                      const isSelected = selectedIds.has(doc.id)
                      const isInspected = inspectedDoc?.id === doc.id
                      const meta = doc.extracted_meta || {}
                      const identifier = meta.id_number || meta.nid_number || meta.roll || meta.tin_number || meta.br_number || '—'
                      const sizeKb = Math.round((doc.file_size || 0) / 1024)

                      return (
                        <tr
                          key={doc.id}
                          onClick={() => setInspectedDoc(doc)}
                          className={`border-b border-neutral-100 transition-colors cursor-pointer select-none ${
                            isInspected ? 'bg-emerald-50/70 border-emerald-200' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleToggleSelect(doc.id)}
                              className="text-neutral-400 hover:text-[#006A4E]"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-[#006A4E]" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                          <td className="p-2 font-semibold text-neutral-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#006A4E] shrink-0" />
                            <span className="truncate max-w-[160px]" title={doc.file_name}>
                              {doc.file_name}
                            </span>
                          </td>
                          <td className="p-2 text-neutral-600 font-mono text-[11px]">
                            <span className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200">
                              {isBn ? typeMeta?.nameBn || doc.doc_type : typeMeta?.nameEn || doc.doc_type}
                            </span>
                          </td>
                          <td className="p-2 font-mono font-bold text-neutral-800 text-[11px] truncate max-w-[120px]">
                            {identifier}
                          </td>
                          <td className="p-2 font-mono text-neutral-500 text-[11px]">{sizeKb} KB</td>
                          <td className="p-2 font-mono text-neutral-500 text-[11px]">
                            {new Date(doc.uploaded_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
                          </td>
                          <td className="p-2 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setPreviewDoc(doc)}
                                className="p-1 hover:text-[#006A4E] text-neutral-400 transition-colors"
                                title={isBn ? 'প্রিভিউ দেখুন' : 'Preview document'}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(doc.id)}
                                className="p-1 hover:text-[#C8102E] text-neutral-400 transition-colors"
                                title={isBn ? 'মুছে ফেলুন' : 'Delete document'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* ─── Grid View (Card Tiles) ──── */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredDocs.map((doc) => {
                  const typeMeta = DOC_TYPES.find((t) => t.type === doc.doc_type)
                  const isSelected = selectedIds.has(doc.id)
                  const isInspected = inspectedDoc?.id === doc.id
                  const meta = doc.extracted_meta || {}
                  const sizeKb = Math.round((doc.file_size || 0) / 1024)

                  return (
                    <div
                      key={doc.id}
                      onClick={() => setInspectedDoc(doc)}
                      className={`p-3 border transition-colors cursor-pointer rounded-none relative flex flex-col justify-between ${
                        isInspected ? 'border-[#006A4E] bg-emerald-50/40 shadow-xs' : 'border-neutral-200 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleSelect(doc.id)
                            }}
                            className="text-neutral-400 hover:text-[#006A4E]"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#006A4E]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>

                          <span className="text-[10px] font-mono font-bold text-[#006A4E] bg-emerald-50 border border-emerald-200 px-1.5 py-0.2">
                            {isBn ? 'যাচাইকৃত' : 'OCR Ready'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-1.5">
                          <FileText className="w-4 h-4 text-[#006A4E] shrink-0" />
                          <h4 className="font-bold text-xs text-neutral-900 truncate" title={doc.file_name}>
                            {doc.file_name}
                          </h4>
                        </div>

                        <span className="text-[11px] font-mono text-neutral-500 block truncate">
                          {isBn ? typeMeta?.nameBn : typeMeta?.nameEn}
                        </span>

                        {meta.id_number && (
                          <div className="mt-2 p-1.5 bg-neutral-50 border border-neutral-200 font-mono text-[11px] text-neutral-800 truncate">
                            ID: <strong>{meta.id_number}</strong>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 mt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                        <span>{sizeKb} KB</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setPreviewDoc(doc)
                            }}
                            className="p-1 hover:text-[#006A4E]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(doc.id)
                            }}
                            className="p-1 hover:text-[#C8102E]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>
              {isBn ? 'মোট সংরক্ষিত নথি:' : 'Vault Records:'} {localDocs.length}
            </span>
            <span>{isBn ? 'এনক্রিপ্টেড ক্লাউড স্টোরেজ' : 'SSL Encrypted'}</span>
          </div>
        </div>

        {/* Right Column: File Inspector / Metadata Details Pane (3 columns on desktop) */}
        <div className="lg:col-span-3 border border-neutral-300 bg-white p-4 rounded-none shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <span className="text-xs font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#006A4E]" />
              <span>{isBn ? 'নথি বিবরণ ও এআই রেকর্ড' : 'Document Inspector'}</span>
            </span>
          </div>

          {inspectedDoc ? (
            <div className="space-y-4 text-xs">
              {/* Document Image Thumbnail / Preview Box */}
              <div className="border border-neutral-200 bg-neutral-50 p-2 text-center rounded-none relative">
                {inspectedDoc.file_data && inspectedDoc.mime_type.startsWith('image/') ? (
                  <img
                    src={inspectedDoc.file_data}
                    alt={inspectedDoc.file_name}
                    className="max-h-36 mx-auto object-contain border border-neutral-200 bg-white"
                  />
                ) : (
                  <div className="py-8 text-center text-neutral-400">
                    <FileText className="w-10 h-10 mx-auto mb-1 text-[#006A4E]" />
                    <span className="font-mono text-[10px]">{inspectedDoc.mime_type}</span>
                  </div>
                )}
                <button
                  onClick={() => setPreviewDoc(inspectedDoc)}
                  className="mt-2 w-full min-h-[30px] border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-mono text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 win-press"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পূর্ণাঙ্গ প্রিভিউ' : 'Fullscreen View'}</span>
                </button>
              </div>

              {/* File Specs */}
              <div className="space-y-1 font-mono text-[11px] p-2.5 bg-neutral-50 border border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isBn ? 'নাম:' : 'Name:'}</span>
                  <strong className="text-neutral-900 truncate max-w-[130px]" title={inspectedDoc.file_name}>
                    {inspectedDoc.file_name}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isBn ? 'আকার:' : 'Size:'}</span>
                  <span>{Math.round((inspectedDoc.file_size || 0) / 1024)} KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isBn ? 'আপলোড:' : 'Uploaded:'}</span>
                  <span>{new Date(inspectedDoc.uploaded_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}</span>
                </div>
              </div>

              {/* Extracted OCR Records */}
              <div>
                <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase block mb-1.5">
                  {isBn ? 'এক্সট্র্যাক্ট করা তথ্য (Click to copy):' : 'Extracted Records:'}
                </span>

                {inspectedDoc.extracted_meta && Object.keys(inspectedDoc.extracted_meta).length > 0 ? (
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {Object.entries(inspectedDoc.extracted_meta).map(([key, val]) => {
                      if (!val || key === 'raw_text') return null
                      const label = FIELD_LABELS[key] ? (isBn ? FIELD_LABELS[key].bn : FIELD_LABELS[key].en) : key
                      const isCopied = copiedKey === key

                      return (
                        <div
                          key={key}
                          onClick={() => handleCopy(String(val), key)}
                          className="p-1.5 bg-white border border-neutral-200 hover:border-[#006A4E] flex items-center justify-between gap-1 cursor-pointer transition-colors"
                          title={isBn ? 'কপি করতে ক্লিক করুন' : 'Click to copy'}
                        >
                          <div className="truncate">
                            <span className="text-[10px] font-mono text-neutral-500 block truncate">{label}</span>
                            <span className="font-mono text-[11px] font-bold text-neutral-900 block truncate">
                              {String(val)}
                            </span>
                          </div>
                          {isCopied ? (
                            <Check className="w-3 h-3 text-[#006A4E] shrink-0" />
                          ) : (
                            <Copy className="w-3 h-3 text-neutral-400 shrink-0" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-3 text-center text-neutral-400 text-[11px] border border-dashed border-neutral-200">
                    {isBn ? 'কোনো মেটাডাটা নিষ্কাশিত হয়নি' : 'No OCR metadata extracted'}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleDelete(inspectedDoc.id)}
                  className="w-full min-h-[34px] border border-red-300 bg-white hover:bg-red-50 text-[#C8102E] font-bold text-xs uppercase inline-flex items-center justify-center gap-1.5 win-press"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isBn ? 'নথিটি মুছে ফেলুন' : 'Delete Document'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-neutral-400 text-xs">
              <FileText className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
              <span>{isBn ? 'একটি নথিতে ক্লিক করে বিস্তারিত দেখুন' : 'Select a document to inspect details'}</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── UPLOAD & OCR SCANNING MODAL ────────────────────────────────────── */}
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
                if (!isSaving && !isScanning) {
                  setShowUploadModal(false)
                  resetUploadState()
                }
              }}
            />

            <motion.div
              variants={win10DialogMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 border border-neutral-300 bg-white max-w-xl w-full p-6 shadow-2xl rounded-none max-h-[92vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

              <div className="flex items-start justify-between pb-3 mb-4 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#006A4E] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>{isBn ? 'এআই ভিশন ডকুমেন্ট স্ক্যানার' : 'AI Vision Document Scanner'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
                    {scannedMeta && Object.keys(scannedMeta).length > 0
                      ? isBn
                        ? 'ওসিআর ফলাফল ও তথ্য নিশ্চিতকরণ'
                        : 'Review Extracted OCR Data'
                      : isBn
                      ? 'নতুন নথি আপলোড ও স্ক্যান'
                      : 'Scan & Upload Document'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    if (!isSaving && !isScanning) {
                      setShowUploadModal(false)
                      resetUploadState()
                    }
                  }}
                  className="p-1.5 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-100 text-neutral-600 rounded-none transition-colors win-press"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {uploadError && (
                <div className="mb-4 p-3 border border-red-300 bg-red-50 text-[#C8102E] text-xs font-semibold flex items-center gap-2 rounded-none">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* STEP 1: Select Type & File */}
              {!scannedMeta && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                      {isBn ? 'নথির ধরন নির্বাচন করুন:' : 'Document Category:'}
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as DocType)}
                      className="w-full p-2.5 border border-neutral-300 bg-white font-mono text-xs text-neutral-900 rounded-none focus:outline-none focus:border-[#006A4E]"
                    >
                      {DOC_TYPES.map((t) => (
                        <option key={t.type} value={t.type}>
                          {isBn ? t.nameBn : t.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropzone with Laser Scanning HUD */}
                  <div className="relative border-2 border-dashed border-neutral-300 bg-neutral-50/70 p-6 text-center rounded-none overflow-hidden hover:border-[#006A4E] transition-colors">
                    {isScanning && (
                      <div className="absolute inset-0 bg-neutral-900/85 z-20 flex flex-col items-center justify-center text-white">
                        <motion.div
                          initial={{ top: '0%' }}
                          animate={{ top: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                          className="absolute left-0 right-0 h-1 bg-[#00E599] shadow-[0_0_15px_#00E599]"
                        />
                        <Loader2 className="w-8 h-8 text-[#00E599] animate-spin mb-2" />
                        <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider">
                          {isBn ? 'জাভাস্ক্রিপ্ট ওসিআর স্ক্যান চলছে...' : 'JavaScript Vision OCR Scanning...'}
                        </span>
                        <span className="text-[10px] text-neutral-400 mt-1 font-mono">
                          {isBn ? 'টেক্সট, এনআইডি ও রোল নম্বর শনাক্ত করা হচ্ছে' : 'Extracting text, registration & identifiers'}
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileSelect}
                      disabled={isScanning}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    <div className="w-12 h-12 mx-auto border border-neutral-200 bg-white flex items-center justify-center mb-3 text-[#006A4E]">
                      <Scan className="w-6 h-6 text-[#006A4E]" />
                    </div>

                    <span className="font-bold text-sm text-neutral-900 block">
                      {isBn ? 'নথির স্পষ্ট ছবি বা স্ক্যান কপি আপলোড করুন' : 'Click or drag document photo to scan'}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono block mt-1">
                      PNG, JPG, JPEG (Max 15MB)
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 2: Review & Edit Extracted Fields */}
              {scannedMeta && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-xs font-mono text-[#006A4E]">
                    <span className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00E599]" />
                      <span>{isBn ? 'ওসিআর সফলভাবে তথ্য নিষ্কাশন করেছে' : 'OCR Scan Complete'}</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-white border border-emerald-300">
                      {ocrSource || 'Vision Engine'}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                    {Object.entries(scannedMeta).map(([key, val]) => {
                      if (key === 'raw_text') return null
                      const label = FIELD_LABELS[key] ? (isBn ? FIELD_LABELS[key].bn : FIELD_LABELS[key].en) : key

                      return (
                        <div key={key}>
                          <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                            {label}
                          </label>
                          <input
                            type="text"
                            value={String(val || '')}
                            onChange={(e) => handleFieldChange(key, e.target.value)}
                            className="w-full p-2 border border-neutral-300 bg-white font-mono text-xs text-neutral-900 rounded-none focus:outline-none focus:border-[#006A4E]"
                          />
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={() => {
                        resetUploadState()
                      }}
                      className="min-h-[38px] px-4 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase rounded-none win-press"
                    >
                      {isBn ? 'পুনরায় স্ক্যান' : 'Rescan'}
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmSave}
                      disabled={isSaving}
                      className="min-h-[38px] px-6 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider rounded-none win-btn inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving to Vault...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{isBn ? 'লকারে যুক্ত করুন' : 'Add to Locker'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── FULLSCREEN PREVIEW & COPIER MODAL ──────────────────────────────── */}
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
              className="relative z-10 border border-neutral-300 bg-white max-w-4xl w-full p-6 shadow-2xl rounded-none max-h-[92vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

              <div className="flex items-start justify-between pb-3 mb-4 border-b border-neutral-200">
                <div>
                  <span className="font-mono text-xs font-bold text-[#006A4E] uppercase">
                    {previewDoc.doc_type}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900">{previewDoc.file_name}</h3>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-100 text-neutral-600 rounded-none transition-colors win-press"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {/* Left: Document Image */}
                <div className="border border-neutral-200 bg-neutral-900 flex items-center justify-center p-2 min-h-[300px]">
                  {previewDoc.file_data && previewDoc.mime_type.startsWith('image/') ? (
                    <img
                      src={previewDoc.file_data}
                      alt={previewDoc.file_name}
                      className="max-h-[50vh] max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-neutral-400 font-mono text-xs">
                      <FileText className="w-12 h-12 mx-auto mb-2 text-[#00E599]" />
                      <span>{previewDoc.file_name}</span>
                    </div>
                  )}
                </div>

                {/* Right: Extracted OCR fields */}
                <div className="border border-neutral-200 bg-neutral-50 p-4 space-y-2 overflow-y-auto max-h-[50vh]">
                  <span className="text-xs font-mono font-bold text-neutral-800 uppercase block pb-2 border-b border-neutral-200">
                    {isBn ? 'এক্সট্র্যাক্ট করা নথিপত্র মেটাডাটা' : 'Extracted Metadata Fields'}
                  </span>

                  {previewDoc.extracted_meta && Object.keys(previewDoc.extracted_meta).length > 0 ? (
                    Object.entries(previewDoc.extracted_meta).map(([key, val]) => {
                      if (key === 'raw_text') return null
                      const label = FIELD_LABELS[key] ? (isBn ? FIELD_LABELS[key].bn : FIELD_LABELS[key].en) : key
                      const isCopied = copiedKey === key

                      return (
                        <div
                          key={key}
                          className="p-2 bg-white border border-neutral-200 flex items-center justify-between gap-2"
                        >
                          <div className="truncate">
                            <span className="text-[10px] font-mono text-neutral-500 block">{label}</span>
                            <span className="font-mono text-xs font-bold text-neutral-900 block truncate">
                              {String(val)}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(String(val), key)}
                            className="p-1 hover:text-[#006A4E] text-neutral-400"
                            title={isBn ? 'কপি করুন' : 'Copy'}
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-[#006A4E]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-8 text-neutral-400 text-xs">
                      {isBn ? 'কোনো মেটাডাটা সংরক্ষিত নেই' : 'No OCR metadata'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <span className="text-xs font-mono text-[#006A4E] font-bold">
                  ✓ {isBn ? 'নাগরিক সেবা ফরমের জন্য অনুমোদিত' : 'Authorized for citizen service forms'}
                </span>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="min-h-[36px] px-5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-xs uppercase win-press"
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
