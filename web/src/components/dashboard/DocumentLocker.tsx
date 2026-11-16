'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
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
  FileSpreadsheet,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Printer,
  Info,
  ChevronRight,
  ArrowLeft,
  ExternalLink
} from 'lucide-react'
import type { CitizenDocument, DocType } from '@/types'
import { uploadDocument, deleteDocument, scanDocumentOCR, type UserProfile } from '@/lib/api'
import { win10DialogBackdropMotion, win10DialogMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface DocumentLockerProps {
  documents: CitizenDocument[]
  onRefresh: () => void
  lang: 'bn' | 'en'
  user?: UserProfile | null
  externalUploadTrigger?: number
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
  institution: { bn: 'প্রতিষ্ঠান / নিবন্ধন কার্যালয়', en: 'Institution / Office' },
  dob: { bn: 'জন্মতারিখ', en: 'Date of Birth' },
  blood_group: { bn: 'রক্তের গ্রুপ', en: 'Blood Group' },
  gender: { bn: 'লিঙ্গ', en: 'Gender / Sex' },
  father_name: { bn: 'পিতার নাম', en: "Father's Name" },
  mother_name: { bn: 'মাতার নাম', en: "Mother's Name" },
  address: { bn: 'ঠিকানা / জন্মস্থান', en: 'Address / Birth Place' },
  business_name: { bn: 'প্রতিষ্ঠানের নাম', en: 'Business Name' },
  owner_name: { bn: 'স্বত্বাধিকারীর নাম', en: 'Owner Name' },
  issue_date: { bn: 'ইস্যু তারিখ', en: 'Issue Date' },
  registration_date: { bn: 'নিবন্ধন তারিখ', en: 'Registration Date' },
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

export default function DocumentLocker({ documents, onRefresh, lang, user, externalUploadTrigger }: DocumentLockerProps) {
  const isBn = lang === 'bn'

  // Persistent optimistic local documents state
  const [localDocs, setLocalDocs] = useState<CitizenDocument[]>(() => {
    if (documents && documents.length > 0) return documents
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('dishari_cached_docs')
        if (cached) {
          const parsed = JSON.parse(cached)
          if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
      } catch {}
    }
    return []
  })

  useEffect(() => {
    if (documents && documents.length > 0) {
      setLocalDocs(documents)
    } else if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('dishari_cached_docs')
        if (cached) {
          const parsed = JSON.parse(cached)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLocalDocs(parsed)
          }
        }
      } catch {}
    }
  }, [documents])

  // Google Drive Style Controls
  const [activeFolder, setActiveFolder] = useState<FolderCategory>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'details'>('details')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'name_asc' | 'size_desc'>('date_desc')
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [inspectedDoc, setInspectedDoc] = useState<CitizenDocument | null>(null)
  
  // Google Drive Collapsible Details/Activity Panel (Toggleable ⓘ)
  const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(true)

  // Google Drive Fullscreen Lightbox File Viewer
  const [lightboxDoc, setLightboxDoc] = useState<CitizenDocument | null>(null)
  const [lightboxZoom, setLightboxZoom] = useState<number>(100)
  const [lightboxRotate, setLightboxRotate] = useState<number>(0)
  const [showLightboxOcr, setShowLightboxOcr] = useState<boolean>(true)

  // Notification & Feedback States
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Upload & OCR Modal States
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedType, setSelectedType] = useState<DocType>('birth_certificate')
  const [isScanning, setIsScanning] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [stagedFile, setStagedFile] = useState<{ file: File; fileData: string } | null>(null)
  const [scannedMeta, setScannedMeta] = useState<Record<string, any> | null>(null)
  const [ocrSource, setOcrSource] = useState<string | null>(null)

  // External trigger for + New Document button in sidebar
  useEffect(() => {
    if (externalUploadTrigger && externalUploadTrigger > 0) {
      resetUploadState()
      setShowUploadModal(true)
    }
  }, [externalUploadTrigger])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Keyboard shortcut for closing Lightbox (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxDoc) {
          setLightboxDoc(null)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxDoc])

  // Auto-select inspected doc
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
        return (Number(b.file_size) || 0) - (Number(a.file_size) || 0)
      }
      return 0
    })

    return list
  }, [localDocs, activeFolder, searchQuery, sortBy])

  // Total storage in bytes & formatted text
  const totalSizeBytes = useMemo(() => {
    return localDocs.reduce((acc, d) => acc + (Number(d.file_size) || 0), 0)
  }, [localDocs])

  const storageDisplayText = useMemo(() => {
    if (totalSizeBytes === 0) return '0.00 MB / 100 MB'
    const mb = totalSizeBytes / (1024 * 1024)
    if (mb < 0.05) {
      const kb = (totalSizeBytes / 1024).toFixed(1)
      return `${kb} KB / 100 MB`
    }
    return `${mb.toFixed(2)} MB / 100 MB`
  }, [totalSizeBytes])

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
      } catch {
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

      // Auto-switch to folder containing this document
      const targetCategory = DOC_TYPES.find((t) => t.type === targetDocType)?.category || 'vital'
      if (activeFolder !== 'all' && activeFolder !== targetCategory) {
        setActiveFolder(targetCategory)
      }

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
    setLocalDocs((prev) => prev.filter((d) => d.id !== id))
    if (inspectedDoc?.id === id) {
      setInspectedDoc(null)
    }
    if (lightboxDoc?.id === id) {
      setLightboxDoc(null)
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
    navigator.clipboard.writeText(text)
    setCopiedKey(keyName)
    showToast(isBn ? 'ক্লিপবোর্ডে কপি করা হয়েছে' : 'Copied to clipboard')
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const openLightbox = (doc: CitizenDocument) => {
    setLightboxDoc(doc)
    setLightboxZoom(100)
    setLightboxRotate(0)
    setInspectedDoc(doc)
  }

  const handlePrint = (doc: CitizenDocument) => {
    if (!doc.file_data) return
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`
      <html>
        <head>
          <title>${doc.file_name} — Dishari Citizen Vault</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
            img { max-width: 100%; max-height: 100vh; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${doc.file_data}" onload="window.print(); window.close();" />
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="space-y-4">
      {/* ─── Toast Notification Strip ─────────────────────────────────────── */}
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
            <button onClick={() => setToastMsg(null)} className="text-neutral-500 hover:text-neutral-900 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Google Drive Style Top Command & Breadcrumb Bar ───────────────── */}
      <div className="border border-neutral-200 bg-white p-3.5 sm:p-4 rounded-none shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Breadcrumbs & Active Title */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <span className="hover:text-neutral-900 cursor-pointer" onClick={() => setActiveFolder('all')}>
                {isBn ? 'আমার লকার' : 'My Vault'}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-bold text-[#006A4E]">
                {isBn
                  ? FOLDERS.find((f) => f.id === activeFolder)?.nameBn
                  : FOLDERS.find((f) => f.id === activeFolder)?.nameEn}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5 flex items-center gap-2">
              <span>{isBn ? 'ডিজিটাল সিটিজেন ফাইল ম্যানেজার' : 'Citizen Document Vault'}</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-[#006A4E] border border-emerald-200 hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00E599]" />
                <span>AI Vision OCR</span>
              </span>
            </h2>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Search Input Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={isBn ? 'নথিপত্র বা আইডি নম্বর খুঁজুন...' : 'Search files or ID numbers...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-neutral-300 bg-neutral-50/70 focus:bg-white text-xs font-medium rounded-none focus:outline-none focus:border-[#006A4E] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Bulk Selection Actions */}
            {selectedIds.size > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-[#006A4E] bg-emerald-50 px-2 py-1 border border-emerald-200">
                  {selectedIds.size} {isBn ? 'নির্বাচিত' : 'Selected'}
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="min-h-[34px] px-2.5 border border-red-300 bg-red-50 hover:bg-red-100 text-[#C8102E] text-xs font-bold uppercase inline-flex items-center gap-1 rounded-none win-press cursor-pointer"
                  title={isBn ? 'নির্বাচিত মুছুন' : 'Delete selected'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isBn ? 'মুছুন' : 'Delete'}</span>
                </button>
              </div>
            )}

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="min-h-[34px] px-2.5 border border-neutral-300 bg-white text-neutral-700 text-xs font-medium rounded-none focus:outline-none focus:border-[#006A4E] cursor-pointer"
            >
              <option value="date_desc">{isBn ? 'তারিখ (নতুন)' : 'Date (Newest)'}</option>
              <option value="date_asc">{isBn ? 'তারিখ (পুরাতন)' : 'Date (Oldest)'}</option>
              <option value="name_asc">{isBn ? 'ফাইলের নাম (A-Z)' : 'File Name (A-Z)'}</option>
              <option value="size_desc">{isBn ? 'ফাইলের আকার (বৃহৎ)' : 'File Size (Largest)'}</option>
            </select>

            {/* View Mode Toggle (Google Drive List vs Grid) */}
            <div className="flex items-center border border-neutral-300 bg-neutral-100 p-0.5 rounded-none">
              <button
                onClick={() => setViewMode('details')}
                className={cn(
                  'p-1.5 rounded-none transition-colors cursor-pointer',
                  viewMode === 'details' ? 'bg-white text-[#006A4E] shadow-2xs font-bold' : 'text-neutral-500 hover:text-neutral-900'
                )}
                title={isBn ? 'তালিকা ভিউ (List)' : 'List view'}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded-none transition-colors cursor-pointer',
                  viewMode === 'grid' ? 'bg-white text-[#006A4E] shadow-2xs font-bold' : 'text-neutral-500 hover:text-neutral-900'
                )}
                title={isBn ? 'টাইল ভিউ (Grid)' : 'Grid view'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Export JSON Button */}
            <button
              onClick={handleExportSelected}
              className="min-h-[34px] px-2.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-medium inline-flex items-center gap-1.5 rounded-none win-press cursor-pointer"
              title={isBn ? 'মেটাডাটা JSON ডাউনলোড' : 'Export metadata JSON'}
            >
              <Download className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden sm:inline">{isBn ? 'এক্সপোর্ট' : 'Export'}</span>
            </button>

            {/* Google Drive Info / Details Panel Toggle Button (ⓘ) */}
            <button
              onClick={() => setShowDetailsPanel(!showDetailsPanel)}
              className={cn(
                'min-h-[34px] px-2.5 border text-xs font-semibold inline-flex items-center gap-1.5 rounded-none transition-colors win-press cursor-pointer',
                showDetailsPanel
                  ? 'border-[#006A4E] bg-emerald-50 text-[#006A4E] font-bold'
                  : 'border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700'
              )}
              title={isBn ? 'নথির বিবরণ প্যানেল (Info)' : 'Toggle Details Panel (Info)'}
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isBn ? 'বিবরণ' : 'Details'}</span>
            </button>

            {/* New Document Upload Button */}
            <button
              onClick={() => {
                resetUploadState()
                setShowUploadModal(true)
              }}
              className="min-h-[34px] px-3.5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 rounded-none transition-colors cursor-pointer win-btn"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? 'নথি স্ক্যান' : 'New File'}</span>
            </button>
          </div>
        </div>

        {/* ─── Google Drive Horizontal Folder Filter Chips ───────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 -mx-1 px-1 scrollbar-none border-t border-neutral-100">
          {FOLDERS.map((folder) => {
            const isActive = activeFolder === folder.id
            const count = folderCounts[folder.id] || 0
            return (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={cn(
                  'shrink-0 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer win-press select-none',
                  isActive
                    ? 'border-[#006A4E] bg-[#006A4E] text-white font-bold shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900'
                )}
              >
                {isActive ? (
                  <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <Folder className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                )}
                <span>{isBn ? folder.nameBn : folder.nameEn}</span>
                <span
                  className={cn(
                    'text-[10px] font-mono px-1.5 py-0.2 rounded-none font-bold',
                    isActive ? 'bg-emerald-900 text-emerald-100' : 'bg-neutral-200 text-neutral-700'
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Main Workspace Canvas: Expansive File List + Collapsible Inspector ─── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left / Center: Full Width File List or Grid Canvas */}
        <div className="flex-1 min-w-0 w-full border border-neutral-300 bg-white rounded-none shadow-xs overflow-hidden">
          {filteredDocs.length === 0 ? (
            /* Empty State */
            <div className="p-16 text-center">
              <div className="w-16 h-16 mx-auto border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-3 text-neutral-400">
                <Folder className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-neutral-800">
                {isBn ? 'এই ফোল্ডারে কোনো নথি নেই' : 'No documents in this folder'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto leading-relaxed">
                {isBn
                  ? 'নতুন জন্ম নিবন্ধন সনদ, জাতীয় পরিচয়পত্র বা প্রবেশপত্র আপলোড করতে "নথি স্ক্যান" বাটনে ক্লিক করুন।'
                  : 'Click "New File" above to scan and save your government certificates or admit cards.'}
              </p>
              <button
                onClick={() => {
                  resetUploadState()
                  setShowUploadModal(true)
                }}
                className="mt-4 px-4 py-2 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase inline-flex items-center gap-1.5 rounded-none cursor-pointer win-btn"
              >
                <Plus className="w-4 h-4" />
                <span>{isBn ? 'নতুন নথি আপলোড করুন' : 'Upload First Document'}</span>
              </button>
            </div>
          ) : viewMode === 'details' ? (
            /* ─── Google Drive Style High-Density Table View ────────────── */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100/90 text-neutral-600 font-mono text-[11px] uppercase tracking-wider select-none">
                    <th className="p-3 w-10 text-center">
                      <button onClick={handleSelectAll} className="cursor-pointer text-neutral-600 hover:text-neutral-900">
                        {selectedIds.size === filteredDocs.length && filteredDocs.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-[#006A4E]" />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                    </th>
                    <th className="p-3 font-semibold">{isBn ? 'ফাইলের নাম' : 'File Name'}</th>
                    <th className="p-3 font-semibold hidden md:table-cell">{isBn ? 'ক্যাটাগরি' : 'Category'}</th>
                    <th className="p-3 font-semibold hidden sm:table-cell">{isBn ? 'সনদ / রোল নম্বর' : 'ID / Roll No'}</th>
                    <th className="p-3 font-semibold hidden lg:table-cell">{isBn ? 'ফাইলের আকার' : 'Size'}</th>
                    <th className="p-3 font-semibold hidden xl:table-cell">{isBn ? 'আপলোডের তারিখ' : 'Date Uploaded'}</th>
                    <th className="p-3 text-right font-semibold">{isBn ? 'অ্যাকশন' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredDocs.map((doc) => {
                    const isSelected = selectedIds.has(doc.id)
                    const isInspected = inspectedDoc?.id === doc.id
                    const meta = doc.extracted_meta || {}
                    const identifier = meta.id_number || meta.nid_number || meta.roll || meta.tin_number || meta.br_number || '—'
                    const sizeKb = Math.round((Number(doc.file_size) || 0) / 1024)
                    const typeDef = DOC_TYPES.find((t) => t.type === doc.doc_type)

                    return (
                      <tr
                        key={doc.id}
                        onClick={() => setInspectedDoc(doc)}
                        onDoubleClick={() => openLightbox(doc)}
                        className={cn(
                          'transition-colors cursor-pointer select-none group',
                          isInspected
                            ? 'bg-emerald-50/80 border-l-3 border-l-[#006A4E]'
                            : 'hover:bg-neutral-50/90'
                        )}
                      >
                        {/* Selection Checkbox */}
                        <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleToggleSelect(doc.id)}
                            className="cursor-pointer text-neutral-400 hover:text-neutral-900"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#006A4E]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>

                        {/* File Name & Document Type Icon */}
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 shrink-0 border border-neutral-200 bg-neutral-100 flex items-center justify-center text-[#006A4E] rounded-none overflow-hidden">
                              {doc.file_data && doc.mime_type.startsWith('image/') ? (
                                <img src={doc.file_data} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <FileText className="w-4 h-4 text-[#006A4E]" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-neutral-900 truncate max-w-xs sm:max-w-md group-hover:text-[#006A4E] transition-colors">
                                {doc.file_name}
                              </div>
                              <div className="text-[11px] text-neutral-500 font-mono flex items-center gap-2">
                                <span>{isBn ? typeDef?.nameBn : typeDef?.nameEn}</span>
                                {doc.verified && (
                                  <span className="text-[10px] text-[#006A4E] font-bold bg-emerald-50 px-1 border border-emerald-200 inline-flex items-center gap-0.5">
                                    <Check className="w-2.5 h-2.5 text-[#006A4E]" />
                                    <span>Verified</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-3 text-neutral-600 font-mono text-[11px] hidden md:table-cell">
                          <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200">
                            {typeDef?.category || 'other'}
                          </span>
                        </td>

                        {/* Identifier (ID / Roll) */}
                        <td className="p-3 font-mono text-neutral-800 font-semibold text-[11px] hidden sm:table-cell">
                          <span className="bg-neutral-50 px-1.5 py-0.5 border border-neutral-200">
                            {identifier}
                          </span>
                        </td>

                        {/* File Size */}
                        <td className="p-3 font-mono text-neutral-500 text-[11px] hidden lg:table-cell">
                          {sizeKb} KB
                        </td>

                        {/* Date Uploaded */}
                        <td className="p-3 font-mono text-neutral-500 text-[11px] hidden xl:table-cell">
                          {new Date(doc.uploaded_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>

                        {/* Action Buttons */}
                        <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Fullscreen Lightbox Button */}
                            <button
                              onClick={() => openLightbox(doc)}
                              className="p-1.5 border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors win-press cursor-pointer"
                              title={isBn ? 'পূর্ণাঙ্গ ভিউয়ার ওপেন করুন (Lightbox)' : 'Open Full Lightbox Viewer'}
                            >
                              <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                            </button>

                            {/* Copy Identifier */}
                            {identifier !== '—' && (
                              <button
                                onClick={() => handleCopy(identifier, `row-${doc.id}`)}
                                className="p-1.5 border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors win-press cursor-pointer"
                                title={isBn ? 'আইডি কপি করুন' : 'Copy ID number'}
                              >
                                {copiedKey === `row-${doc.id}` ? (
                                  <Check className="w-3.5 h-3.5 text-[#006A4E]" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className="p-1.5 border border-neutral-200 hover:border-red-300 hover:bg-red-50 text-neutral-500 hover:text-[#C8102E] transition-colors win-press cursor-pointer"
                              title={isBn ? 'নথি মুছুন' : 'Delete file'}
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
            /* ─── Google Drive Style Spacious Grid View ─────────────────── */
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDocs.map((doc) => {
                  const isSelected = selectedIds.has(doc.id)
                  const isInspected = inspectedDoc?.id === doc.id
                  const meta = doc.extracted_meta || {}
                  const sizeKb = Math.round((Number(doc.file_size) || 0) / 1024)
                  const typeDef = DOC_TYPES.find((t) => t.type === doc.doc_type)

                  return (
                    <div
                      key={doc.id}
                      onClick={() => setInspectedDoc(doc)}
                      onDoubleClick={() => openLightbox(doc)}
                      className={cn(
                        'border transition-all cursor-pointer relative group rounded-none flex flex-col justify-between overflow-hidden',
                        isInspected
                          ? 'border-[#006A4E] shadow-sm ring-1 ring-[#006A4E]'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      )}
                    >
                      {/* Top Thumbnail Preview Container */}
                      <div className="h-36 bg-neutral-900/95 relative overflow-hidden flex items-center justify-center p-2">
                        {doc.file_data && doc.mime_type.startsWith('image/') ? (
                          <img
                            src={doc.file_data}
                            alt={doc.file_name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="text-center text-neutral-400 font-mono text-xs">
                            <FileText className="w-10 h-10 mx-auto mb-1 text-[#00E599]" />
                            <span className="truncate block max-w-[150px]">{doc.file_name}</span>
                          </div>
                        )}

                        {/* Hover Overlay Action Bar */}
                        <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openLightbox(doc)
                            }}
                            className="p-2 bg-white hover:bg-neutral-100 text-neutral-900 rounded-none shadow-md transition-transform hover:scale-110 cursor-pointer"
                            title={isBn ? 'পূর্ণাঙ্গ লাইটবক্স প্রিভিউ' : 'Open Full Lightbox'}
                          >
                            <Eye className="w-4 h-4 text-[#006A4E]" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(doc.id)
                            }}
                            className="p-2 bg-white hover:bg-red-50 text-red-600 rounded-none shadow-md transition-transform hover:scale-110 cursor-pointer"
                            title={isBn ? 'মুছুন' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Top-Right Selection Checkbox */}
                        <div
                          className="absolute top-2 left-2 z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleSelect(doc.id)
                          }}
                        >
                          <button className="cursor-pointer text-white drop-shadow">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#00E599]" />
                            ) : (
                              <Square className="w-4 h-4 opacity-70 hover:opacity-100" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Bottom Metadata Info Card */}
                      <div className="p-3 bg-white space-y-1">
                        <div className="font-bold text-xs text-neutral-900 truncate" title={doc.file_name}>
                          {doc.file_name}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-500 truncate">
                          {isBn ? typeDef?.nameBn : typeDef?.nameEn}
                        </div>
                        {meta.id_number && (
                          <div className="font-mono text-[10px] text-neutral-700 font-semibold bg-neutral-100 px-1 py-0.5 border border-neutral-200 truncate">
                            ID: {meta.id_number}
                          </div>
                        )}
                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                          <span>{sizeKb} KB</span>
                          <span>
                            {new Date(doc.uploaded_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* ─── Right Collapsible Details / Activity Panel (Google Drive ⓘ Panel) ─── */}
        {showDetailsPanel && (
          <aside className="w-full lg:w-84 xl:w-96 shrink-0 border border-neutral-300 bg-white p-4.5 rounded-none shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#006A4E]" />
                <h3 className="font-bold text-sm text-neutral-900">
                  {isBn ? 'নথি বিবরণ ও এআই রেকর্ড' : 'Document Details & Metadata'}
                </h3>
              </div>
              <button
                onClick={() => setShowDetailsPanel(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                title={isBn ? 'বিবরণ প্যানেল বন্ধ করুন' : 'Close Details Pane'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inspectedDoc ? (
              <div className="space-y-4">
                {/* Visual Thumbnail & One-Click Lightbox Trigger */}
                <div className="border border-neutral-200 bg-neutral-900 p-2 flex flex-col items-center justify-center relative group min-h-[160px]">
                  {inspectedDoc.file_data && inspectedDoc.mime_type.startsWith('image/') ? (
                    <img
                      src={inspectedDoc.file_data}
                      alt={inspectedDoc.file_name}
                      className="max-h-40 max-w-full object-contain cursor-pointer"
                      onClick={() => openLightbox(inspectedDoc)}
                    />
                  ) : (
                    <div className="text-center text-neutral-400 font-mono text-xs p-4">
                      <FileText className="w-10 h-10 mx-auto mb-1 text-[#006A4E]" />
                      <span>{inspectedDoc.file_name}</span>
                    </div>
                  )}

                  <button
                    onClick={() => openLightbox(inspectedDoc)}
                    className="mt-2 w-full min-h-[32px] border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-mono text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 win-press cursor-pointer shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                    <span>{isBn ? 'পূর্ণাঙ্গ প্রিভিউ দেখুন' : 'Open Fullscreen Lightbox'}</span>
                  </button>
                </div>

                {/* Technical File Properties */}
                <div className="border border-neutral-200 bg-neutral-50/70 p-3 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{isBn ? 'ফাইলের নাম:' : 'File:'}</span>
                    <strong className="text-neutral-800 truncate max-w-[170px]" title={inspectedDoc.file_name}>
                      {inspectedDoc.file_name}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{isBn ? 'আকার:' : 'Size:'}</span>
                    <span className="text-neutral-800">{Math.round((Number(inspectedDoc.file_size) || 0) / 1024)} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{isBn ? 'আপলোড তারিখ:' : 'Uploaded:'}</span>
                    <span className="text-neutral-800">
                      {new Date(inspectedDoc.uploaded_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
                    </span>
                  </div>
                </div>

                {/* OCR Verified Citizen Fields (Click to Copy) */}
                <div>
                  <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase block mb-2">
                    {isBn ? 'যাচাইকৃত সিটিজেন ফিল্ডস:' : 'Verified Citizen Fields:'}
                  </span>

                  {inspectedDoc.extracted_meta && Object.keys(inspectedDoc.extracted_meta).length > 0 ? (
                    <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                      {Object.entries(inspectedDoc.extracted_meta).map(([key, val]) => {
                        if (key === 'raw_text') return null
                        const label = FIELD_LABELS[key] ? (isBn ? FIELD_LABELS[key].bn : FIELD_LABELS[key].en) : key
                        const isCopied = copiedKey === key

                        return (
                          <div
                            key={key}
                            className="p-2 border border-neutral-200 bg-neutral-50/70 hover:bg-emerald-50/40 transition-colors flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="text-[10px] font-mono text-neutral-500 block">{label}</span>
                              <span className="font-mono text-xs font-bold text-neutral-900 truncate block">
                                {String(val)}
                              </span>
                            </div>
                            <button
                              onClick={() => handleCopy(String(val), key)}
                              className="p-1 border border-neutral-300 hover:border-neutral-900 bg-white text-neutral-600 transition-colors cursor-pointer shrink-0"
                              title={isBn ? 'কপি করুন' : 'Copy field'}
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
                    <div className="p-3 border border-dashed border-neutral-300 text-center text-xs text-neutral-500">
                      {isBn ? 'কোনো ওসিআর ফিল্ড পাওয়া যায়নি' : 'No OCR fields extracted'}
                    </div>
                  )}
                </div>

                {/* Single Document Actions */}
                <div className="pt-2 border-t border-neutral-200 flex items-center gap-2">
                  <button
                    onClick={() => handlePrint(inspectedDoc)}
                    className="flex-1 min-h-[34px] border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-semibold inline-flex items-center justify-center gap-1.5 rounded-none cursor-pointer win-press"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{isBn ? 'প্রিন্ট' : 'Print'}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(inspectedDoc.id)}
                    className="min-h-[34px] px-3 border border-red-300 bg-red-50 hover:bg-red-100 text-[#C8102E] text-xs font-semibold inline-flex items-center justify-center gap-1.5 rounded-none cursor-pointer win-press"
                    title={isBn ? 'মুছুন' : 'Delete'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-400 text-xs font-mono">
                <FileText className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                <span>{isBn ? 'একটি ফাইল নির্বাচন করুন' : 'Select a document to inspect'}</span>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* ─── GOOGLE DRIVE FULLSCREEN LIGHTBOX FILE VIEWER ──────────────────── */}
      <AnimatePresence>
        {lightboxDoc && (
          <div className="fixed inset-0 z-50 bg-[#141414]/96 backdrop-blur-md flex flex-col text-white">
            {/* Top Lightbox Command Ribbon */}
            <div className="h-14 px-4 bg-[#1e1e1e] border-b border-neutral-800 flex items-center justify-between shrink-0">
              {/* Left: Back / Title */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setLightboxDoc(null)}
                  className="p-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-none cursor-pointer transition-colors"
                  title={isBn ? 'ফিরে যান (Esc)' : 'Back (Esc)'}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="truncate min-w-0">
                  <div className="font-bold text-sm text-neutral-100 truncate max-w-sm sm:max-w-md">
                    {lightboxDoc.file_name}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                    <span>{Math.round((Number(lightboxDoc.file_size) || 0) / 1024)} KB</span>
                    <span className="text-[#00E599] font-semibold bg-emerald-950/60 px-1 border border-emerald-800 text-[10px]">
                      Verified Citizen Record
                    </span>
                  </div>
                </div>
              </div>

              {/* Center: Interactive Image Controls */}
              <div className="hidden md:flex items-center gap-1 bg-[#282828] border border-neutral-700 p-1">
                <button
                  onClick={() => setLightboxZoom((prev) => Math.max(50, prev - 25))}
                  className="p-1.5 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
                  title={isBn ? 'জুম আউট' : 'Zoom Out'}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs px-2 text-neutral-300 select-none">
                  {lightboxZoom}%
                </span>
                <button
                  onClick={() => setLightboxZoom((prev) => Math.min(300, prev + 25))}
                  className="p-1.5 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
                  title={isBn ? 'জুম ইন' : 'Zoom In'}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setLightboxZoom(100)
                    setLightboxRotate(0)
                  }}
                  className="p-1.5 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer border-l border-neutral-700"
                  title={isBn ? 'রিসেট' : 'Reset'}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightboxRotate((prev) => (prev + 90) % 360)}
                  className="p-1.5 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
                  title={isBn ? 'ঘোরান (Rotate 90°)' : 'Rotate 90°'}
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLightboxOcr(!showLightboxOcr)}
                  className={cn(
                    'px-3 py-1.5 border text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer',
                    showLightboxOcr
                      ? 'border-[#00E599] bg-emerald-950/70 text-[#00E599]'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white'
                  )}
                  title={isBn ? 'ওসিআর মেটাডাটা প্যানেল' : 'OCR Metadata Panel'}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isBn ? 'মেটাডাটা' : 'Metadata'}</span>
                </button>

                <button
                  onClick={() => handlePrint(lightboxDoc)}
                  className="px-3 py-1.5 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono inline-flex items-center gap-1.5 cursor-pointer"
                  title={isBn ? 'প্রিন্ট করুন' : 'Print Document'}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isBn ? 'প্রিন্ট' : 'Print'}</span>
                </button>

                {lightboxDoc.file_data && (
                  <a
                    href={lightboxDoc.file_data}
                    download={lightboxDoc.file_name}
                    className="px-3 py-1.5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    title={isBn ? 'ডাউনলোড' : 'Download File'}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isBn ? 'ডাউনলোড' : 'Download'}</span>
                  </a>
                )}

                <button
                  onClick={() => setLightboxDoc(null)}
                  className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-none cursor-pointer"
                  title={isBn ? 'বন্ধ করুন (Esc)' : 'Close (Esc)'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Canvas Viewport */}
            <div className="flex-1 min-h-0 flex overflow-hidden relative">
              {/* Image Viewport */}
              <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto select-none">
                {lightboxDoc.file_data && lightboxDoc.mime_type.startsWith('image/') ? (
                  <div
                    className="transition-transform duration-150 ease-out flex items-center justify-center"
                    style={{
                      transform: `scale(${lightboxZoom / 100}) rotate(${lightboxRotate}deg)`,
                    }}
                  >
                    <img
                      src={lightboxDoc.file_data}
                      alt={lightboxDoc.file_name}
                      className="max-h-[82vh] max-w-full object-contain shadow-2xl border border-neutral-800"
                    />
                  </div>
                ) : (
                  <div className="text-center text-neutral-400 font-mono text-sm">
                    <FileText className="w-16 h-16 mx-auto mb-2 text-[#00E599]" />
                    <p>{lightboxDoc.file_name}</p>
                    <p className="text-xs text-neutral-500 mt-1">Non-image government document docket</p>
                  </div>
                )}
              </div>

              {/* Lightbox Side OCR Drawer */}
              {showLightboxOcr && (
                <div className="w-80 sm:w-96 bg-[#1b1b1b] border-l border-neutral-800 p-5 overflow-y-auto shrink-0 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div>
                        <span className="text-[10px] font-mono text-[#00E599] uppercase tracking-wider block">
                          Verified Document Data
                        </span>
                        <h4 className="font-bold text-sm text-neutral-100">
                          {isBn ? 'ওসিআর এক্সট্র্যাক্ট রেকর্ড' : 'OCR Extracted Records'}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">
                        {lightboxDoc.extracted_meta?.confidence ? `${lightboxDoc.extracted_meta.confidence}% acc.` : '100%'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {lightboxDoc.extracted_meta &&
                        Object.entries(lightboxDoc.extracted_meta).map(([key, val]) => {
                          if (key === 'raw_text') return null
                          const label = FIELD_LABELS[key] ? (isBn ? FIELD_LABELS[key].bn : FIELD_LABELS[key].en) : key
                          const isCopied = copiedKey === `lb-${key}`

                          return (
                            <div
                              key={key}
                              className="p-2.5 border border-neutral-800 bg-[#242424] hover:border-neutral-700 transition-colors flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <span className="text-[10px] font-mono text-neutral-400 block">{label}</span>
                                <span className="font-mono text-xs font-bold text-neutral-100 truncate block">
                                  {String(val)}
                                </span>
                              </div>
                              <button
                                onClick={() => handleCopy(String(val), `lb-${key}`)}
                                className="p-1.5 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer shrink-0"
                                title={isBn ? 'কপি করুন' : 'Copy'}
                              >
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-[#00E599]" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-800">
                    <button
                      onClick={() => {
                        const json = JSON.stringify(lightboxDoc.extracted_meta || {}, null, 2)
                        handleCopy(json, 'lb-all-json')
                      }}
                      className="w-full py-2 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-xs font-bold uppercase inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedKey === 'lb-all-json' ? (isBn ? 'কপি সম্পন্ন!' : 'Copied!') : (isBn ? 'সকল মেটাডাটা কপি (JSON)' : 'Copy All Meta (JSON)')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── SCAN / UPLOAD DOCUMENT MODAL ──────────────────────────────────── */}
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
              className="relative z-10 border border-neutral-300 bg-white max-w-2xl w-full p-6 shadow-2xl rounded-none max-h-[92vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

              <div className="flex items-start justify-between pb-3 mb-4 border-b border-neutral-200">
                <div>
                  <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider flex items-center gap-1.5">
                    <Scan className="w-4 h-4 text-[#006A4E]" />
                    <span>{isBn ? 'নাগরিক ভল্ট আপলোড ও এআই স্ক্যান' : 'Citizen Vault OCR Scanner'}</span>
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 mt-1">
                    {isBn ? 'নতুন নথি লকারে সংরক্ষণ করুন' : 'Add New Document to Locker'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowUploadModal(false)
                    resetUploadState()
                  }}
                  disabled={isSaving || isScanning}
                  className="p-1.5 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-100 text-neutral-600 rounded-none transition-colors win-press cursor-pointer disabled:opacity-50"
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

              {/* Step 1: Select Type & Upload */}
              {!stagedFile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                      {isBn ? 'নথির ধরন নির্বাচন করুন:' : 'Select Document Type:'}
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as DocType)}
                      className="w-full p-2.5 border border-neutral-300 bg-white text-xs font-semibold text-neutral-900 rounded-none focus:outline-none focus:border-[#006A4E]"
                    >
                      {DOC_TYPES.map((t) => (
                        <option key={t.type} value={t.type}>
                          {isBn ? t.nameBn : t.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="border-2 border-dashed border-neutral-300 hover:border-[#006A4E] bg-neutral-50/70 p-8 text-center transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleFileSelect}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-12 h-12 mx-auto border border-neutral-200 bg-white flex items-center justify-center mb-3 text-[#006A4E]">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-sm text-neutral-900 block">
                      {isBn ? 'নথির ছবি টেনে আনুন অথবা ক্লিক করে আপলোড করুন' : 'Drop document image here or click to browse'}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono mt-1 block">
                      PNG, JPG, JPEG (Max 25MB)
                    </span>
                  </div>
                </div>
              ) : isScanning ? (
                /* OCR Scanning Animation */
                <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto border-2 border-[#006A4E] bg-emerald-50 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-[#00E599]"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <Loader2 className="w-8 h-8 text-[#006A4E] animate-spin" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-neutral-900">
                      {isBn ? 'ওসিআর স্ক্যান চলছে...' : 'Scanning Document...'}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      {isBn
                        ? 'জাভাস্ক্রিপ্ট ভিশন ইঞ্জিন দ্বারা ১৭-ডিজিটের সনদ ও নাম এক্সট্র্যাক্ট করা হচ্ছে।'
                        : 'JavaScript Vision OCR is recognizing citizen credentials.'}
                    </p>
                  </div>
                </div>
              ) : (
                /* Step 2: Edit & Review Extracted Records */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#006A4E]" />
                      <span className="font-bold text-xs text-neutral-900">
                        {isBn ? 'এক্সট্র্যাক্ট করা তথ্যাবলী (প্রয়োজনে সম্পাদনা করুন):' : 'Extracted Fields (Edit if needed):'}
                      </span>
                    </div>
                    {ocrSource && (
                      <span className="text-[10px] font-mono text-[#006A4E] bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                        {ocrSource === 'gemini_vision_api' ? 'Gemini 3.5 Flash' : 'JavaScript Vision (Tesseract)'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto p-1">
                    {scannedMeta && Object.entries(scannedMeta).map(([key, val]) => {
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
                      onClick={() => resetUploadState()}
                      className="min-h-[38px] px-4 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase rounded-none win-press cursor-pointer"
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
    </div>
  )
}
