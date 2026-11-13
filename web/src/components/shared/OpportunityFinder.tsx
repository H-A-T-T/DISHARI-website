'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Sprout,
  Plane,
  Building,
  CheckCircle,
  Clock,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  RotateCcw,
  AlertCircle
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

export interface OpportunityItem {
  id: string
  titleBn: string
  titleEn: string
  authorityBn: string
  authorityEn: string
  category: 'education' | 'youth' | 'welfare' | 'agri' | 'overseas' | 'sme' | 'ethnic'
  benefitBn: string
  benefitEn: string
  deadlineBn: string
  deadlineEn: string
  ageRange: string
  minEducation: string // 'none' | 'ssc' | 'hsc' | 'degree'
  targetOccupations: string[] // 'unemployed' | 'student' | 'farmer' | 'sme' | 'returnee' | 'widow' | 'ethnic'
  divisions: string[] // 'all' or specific divisions
  descBn: string
  descEn: string
  docsBn: string[]
  applySlug?: string
  officialLink?: string
}

export const OFFICIAL_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: 'pm-scholarship',
    titleBn: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট সমন্বিত উপবৃত্তি',
    titleEn: 'PM Education Assistance Trust Integrated Stipend',
    authorityBn: 'শিক্ষা মন্ত্রণালয়',
    authorityEn: 'Ministry of Education',
    category: 'education',
    benefitBn: 'বার্ষিক ৫,০০০ - ১০,০০০ টাকা এককালীন অনুদান + মাসিক ফি সহায়তা',
    benefitEn: 'Annual ৳5,000 - ৳10,000 grant + monthly tuition aid',
    deadlineBn: '১৫ ডিসেম্বর ২০২৬',
    deadlineEn: 'December 15, 2026',
    ageRange: '১২-২৫',
    minEducation: 'ssc',
    targetOccupations: ['student'],
    divisions: ['all'],
    descBn: 'মাধ্যমিক, উচ্চ মাধ্যমিক ও স্নাতক পর্যায়ের অসচ্ছল ও মেধাবী শিক্ষার্থীদের পড়াশোনা অব্যাহত রাখার জন্য সরকারি আর্থিক সহায়তা।',
    descEn: 'Government financial assistance for underprivileged meritorious students at secondary and higher secondary levels.',
    docsBn: ['শিক্ষাপ্রতিষ্ঠানের প্রত্যয়নপত্র', 'অভিভাবকের আয়ের সনদ', 'শিক্ষার্থীর জন্মনিবন্ধন / NID', 'নগদ/বিকাশ একাউন্ট নম্বর'],
    applySlug: 'scholarship',
    officialLink: 'https://pmeat.gov.bd'
  },
  {
    id: 'youth-training-loan',
    titleBn: 'যুব উন্নয়ন অধিদপ্তর কারিগরি প্রশিক্ষণ ও আত্মকর্মসংস্থান ঋণ',
    titleEn: 'Dept of Youth Development Skills Training & Self-Employment Loan',
    authorityBn: 'যুব ও ক্রীড়া মন্ত্রণালয়',
    authorityEn: 'Ministry of Youth and Sports',
    category: 'youth',
    benefitBn: 'বিনামূল্যে ৩-৬ মাসের প্রশিক্ষণ + ৫০,০০০ থেকে ২,০০,০০০ টাকা সহজ শর্তে ঋণ',
    benefitEn: 'Free 3-6 months skill training + ৳50,000 to ৳2,00,000 soft loan',
    deadlineBn: 'প্রতি ত্রৈমাসিকে উন্মুক্ত (চলমান)',
    deadlineEn: 'Open quarterly (Ongoing)',
    ageRange: '১৮-৩৫',
    minEducation: 'none',
    targetOccupations: ['unemployed', 'sme'],
    divisions: ['all'],
    descBn: 'ডিগ্রী পাস বা ড্রপআউট বেকার যুবক ও যুবতীদের জন্য আইটি, গবাদিপশু পালন, ইলেকট্রিক্যাল ও মৎস্য চাষে বাস্তবমুখী প্রশিক্ষণ ও ঋণ সুবিধা।',
    descEn: 'Hands-on technical training and seed capital loans for unemployed youth, degree holders, and fresh entrepreneurs.',
    docsBn: ['NID কার্ডের মূল ও ফটোকপি', 'শিক্ষাগত যোগ্যতার সনদ', 'চেয়ারম্যানের নাগরিকত্ব সনদ', '৩ কপি পাসপোর্ট ছবি'],
    applySlug: 'trade-license',
    officialLink: 'https://dyd.gov.bd'
  },
  {
    id: 'widow-allowance-gov',
    titleBn: 'বিধবা ও স্বামী নিগৃহীতা মহিলা সরকারি ভাতা',
    titleEn: 'National Widow & Deserted Women Allowance',
    authorityBn: 'সমাজসেবা অধিদপ্তর, সমাজকল্যাণ মন্ত্রণালয়',
    authorityEn: 'Department of Social Services, Ministry of Social Welfare',
    category: 'welfare',
    benefitBn: 'মাসিক ৮৫০ টাকা সরাসরি মোবাইল ব্যাংকিং একাউন্টে (G2P)',
    benefitEn: 'Monthly ৳850 sent directly to mobile banking (G2P)',
    deadlineBn: 'ইউনিয়ন পরিষদ সময়সূচি অনুযায়ী (প্রতি বছর সেপ্টেম্বর-ডিসেম্বর)',
    deadlineEn: 'Per Union Parishad cycle (Annual Sep-Dec renewal)',
    ageRange: '১৮+',
    minEducation: 'none',
    targetOccupations: ['widow'],
    divisions: ['all'],
    descBn: 'হতদরিদ্র বিধবা ও স্বামী পরিত্যক্ত নারীদের জন্য সামাজিক নিরাপত্তা বেষ্টনীর আওতায় স্থায়ী মাসিক অর্থ সহায়তা। কোনো দালাল ছাড়াই অনলাইনে তালিকাভুক্তি।',
    descEn: 'Direct social security monthly cash allowance for underprivileged widows and deserted women without intermediaries.',
    docsBn: ['আবেদনকারীর ডিজিটাল NID', 'স্বামীর মৃত্যু সনদ / বিবাহবিচ্ছেদ প্রত্যয়ন', 'ইউনিয়ন পরিষদ চেয়ারম্যানের ওয়ারিশান ও নাগরিক সনদ', 'সক্রিয় মোবাইল ব্যাংকিং হিসাব'],
    applySlug: 'widow-allowance',
    officialLink: 'https://dss.gov.bd'
  },
  {
    id: 'probashi-rehab-loan',
    titleBn: 'প্রবাসী কল্যাণ ব্যাংক পুনর্বাসন ও অভিবাসী উদ্যোক্তা ঋণ',
    titleEn: 'Probashi Kallyan Bank Returnee Rehabilitation Loan',
    authorityBn: 'প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়',
    authorityEn: 'Ministry of Expatriates Welfare and Overseas Employment',
    category: 'overseas',
    benefitBn: '২,০০,০০০ থেকে ২০,০০,০০০ টাকা স্বল্প সুদে জামানতবিহীন/সহজ শর্তে ঋণ',
    benefitEn: '৳2,00,000 to ৳20,00,000 low-interest rehabilitation loan',
    deadlineBn: 'সারা বছর আবেদনযোগ্য',
    deadlineEn: 'Open year-round',
    ageRange: '২১-৬৫',
    minEducation: 'none',
    targetOccupations: ['returnee', 'sme'],
    divisions: ['all'],
    descBn: 'বিদেশ ফেরত কর্মীদের দেশে পুনর্বাসন, নতুন ব্যবসা প্রতিষ্ঠা এবং নিরাপদ অভিবাসনের খরচ মেটাতে বিশেষ সরকারি আর্থিক স্কিম।',
    descEn: 'Dedicated financing scheme to help returnee migrant workers re-integrate, start local businesses, or migrate safely.',
    docsBn: ['পাসপোর্টের ভিসা ও আগমন সিল কপি', 'প্রবাসী কল্যাণ কার্ড / BMET স্মার্টকার্ড', 'ব্যবসা বা খামার প্রকল্পের বিবরণী', 'ট্রেড লাইসেন্স ও NID'],
    applySlug: 'overseas-welfare-card',
    officialLink: 'https://pkb.gov.bd'
  },
  {
    id: 'agri-stimulus-input',
    titleBn: 'ক্ষুদ্র ও প্রান্তিক কৃষক কৃষি প্রণোদনা (বিনামূল্যে বীজ ও সার)',
    titleEn: 'Smallholder Farmer Agricultural Incentive (Free Seeds & Fertilizer)',
    authorityBn: 'কৃষি মন্ত্রণালয় (কৃষি সম্প্রসারণ অধিদপ্তর)',
    authorityEn: 'Ministry of Agriculture (DAE)',
    category: 'agri',
    benefitBn: 'বিনামূল্যে উচ্চফলনশীল বোরো/রবি বীজ ও ডিএপি/এমওপি সার প্যাকেজ',
    benefitEn: 'Free high-yielding seed kit + DAP/MOP fertilizer bag',
    deadlineBn: 'মৌসুম শুরুর আগে (উপজেলা কৃষি অফিস অনুযায়ী)',
    deadlineEn: 'Prior to planting season (Upazila Agri Office)',
    ageRange: '১৮+',
    minEducation: 'none',
    targetOccupations: ['farmer'],
    divisions: ['all'],
    descBn: 'বন্যা, খরা বা হাওর এলাকায় ক্ষতিগ্রস্ত এবং প্রান্তিক কৃষকদের জন্য কৃষি পুনর্বাসন সহায়তা। কৃষক কার্ডের মাধ্যমে বিতরণ।',
    descEn: 'Agri rehabilitation support for marginal farmers affected by floods, climate hazards, and haor waterlogging.',
    docsBn: ['কৃষি উপকরণ সহায়তা কার্ড (কৃষক কার্ড)', 'NID কার্ডের ফটোকপি', 'উপসহকারী কৃষি কর্মকর্তার সুপারিশ স্লিপ'],
    applySlug: 'land-mutation',
    officialLink: 'https://dae.gov.bd'
  },
  {
    id: 'cht-ethnic-grant',
    titleBn: 'পার্বত্য চট্টগ্রাম ও সমতল ক্ষুদ্র নৃগোষ্ঠী বিশেষ উন্নয়ন অনুদান',
    titleEn: 'CHT & Plainland Ethnic Minority Special Development Grant',
    authorityBn: 'পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় / প্রধানমন্ত্রীর কার্যালয়',
    authorityEn: 'Ministry of CHT Affairs / Prime Minister Office',
    category: 'ethnic',
    benefitBn: 'এককালীন ২৫,০০০ - ৫০,০০০ টাকা শিক্ষা ও ক্ষুদ্র উদ্যোক্তা অনুদান',
    benefitEn: 'One-time ৳25,000 - ৳50,000 education & micro-enterprise grant',
    deadlineBn: '২৮ ফেব্রুয়ারি ২০২৭',
    deadlineEn: 'February 28, 2027',
    ageRange: '১৫-৪০',
    minEducation: 'none',
    targetOccupations: ['ethnic', 'student', 'sme'],
    divisions: ['chattogram', 'sylhet', 'rangpur', 'mymensingh'],
    descBn: 'মারমা, চাকমা, ত্রিপুরা, গারো, সাঁওতালসহ সকল ক্ষুদ্র নৃগোষ্ঠীর তরুণ-তরুণীদের শিক্ষা এবং আত্মকর্মসংস্থানে সরকারি বিশেষ কোটা ও অনুদান।',
    descEn: 'Targeted government grant and education quota support for Marma, Chakma, Garo, Santal and other indigenous ethnic youth.',
    docsBn: ['সার্কেল চিফ / উপজেলা নির্বাহী কর্মকর্তার ক্ষুদ্র নৃগোষ্ঠী সনদ', 'NID বা জন্মনিবন্ধন', 'শিক্ষাগত বা প্রকল্পের প্রত্যয়ন'],
    applySlug: 'scholarship',
    officialLink: 'https://mochta.gov.bd'
  },
  {
    id: 'sme-cottage-credit',
    titleBn: 'এসএমই ফাউন্ডেশন ও বিসিক কুটির শিল্প প্রণোদনা তহবিল',
    titleEn: 'SME Foundation & BSCIC Cottage Industry Stimulus Fund',
    authorityBn: 'শিল্প মন্ত্রণালয়',
    authorityEn: 'Ministry of Industries',
    category: 'sme',
    benefitBn: '৪% হ্রাসকৃত সুদে ১,০০,০০০ থেকে ৫,০০,০০০ টাকা জামানতবিহীন ঋণ',
    benefitEn: '৳1,00,000 - ৳5,00,000 collateral-free loan at 4% concessional rate',
    deadlineBn: 'চলমান কোটা ভিত্তিক',
    deadlineEn: 'Ongoing quota-based',
    ageRange: '১৮-৫০',
    minEducation: 'none',
    targetOccupations: ['sme', 'unemployed'],
    divisions: ['all'],
    descBn: 'স্থানীয় হস্তশিল্প, খাদ্য প্রক্রিয়াকরণ ও ছোট ব্যবসায়ীদের জন্য দালালমুক্ত সরকারি ঋণ সহায়তা ও পণ্য বিপণন মেলায় অংশ নেওয়ার সুযোগ।',
    descEn: 'Collateral-free low-interest microcredit for cottage artisans, food processors, and small business owners.',
    docsBn: ['ইউনিয়ন বা পৌরসভা ট্রেড লাইসেন্স', 'TIN সার্টিফিকেট ও NID', 'দোকান বা কারখানার অবস্থান প্রমাণ', 'ব্যাংক হিসাব বিবরণী'],
    applySlug: 'trade-license',
    officialLink: 'https://smef.gov.bd'
  }
]

export function OpportunityFinder() {
  const { lang } = useLanguage()
  const isBn = lang === 'bn'

  // User Filter State
  const [selectedAge, setSelectedAge] = useState<string>('all')
  const [selectedEdu, setSelectedEdu] = useState<string>('all')
  const [selectedOccupation, setSelectedOccupation] = useState<string>('all')
  const [selectedDivision, setSelectedDivision] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Reset filters
  const handleReset = () => {
    setSelectedAge('all')
    setSelectedEdu('all')
    setSelectedOccupation('all')
    setSelectedDivision('all')
    setSearchQuery('')
  }

  // Filter logic
  const filtered = useMemo(() => {
    return OFFICIAL_OPPORTUNITIES.filter(item => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchTitle = item.titleBn.toLowerCase().includes(q) || item.titleEn.toLowerCase().includes(q)
        const matchAuth = item.authorityBn.toLowerCase().includes(q) || item.authorityEn.toLowerCase().includes(q)
        const matchDesc = item.descBn.toLowerCase().includes(q) || item.descEn.toLowerCase().includes(q)
        if (!matchTitle && !matchAuth && !matchDesc) return false
      }

      // Occupation filter
      if (selectedOccupation !== 'all') {
        if (!item.targetOccupations.includes(selectedOccupation)) return false
      }

      // Division filter
      if (selectedDivision !== 'all') {
        if (!item.divisions.includes('all') && !item.divisions.includes(selectedDivision)) return false
      }

      // Education filter
      if (selectedEdu !== 'all') {
        const eduRanks: Record<string, number> = { none: 0, ssc: 1, hsc: 2, degree: 3 }
        const userRank = eduRanks[selectedEdu] || 0
        const reqRank = eduRanks[item.minEducation] || 0
        if (userRank < reqRank) return false
      }

      return true
    })
  }, [searchQuery, selectedOccupation, selectedDivision, selectedEdu])

  return (
    <div className="space-y-6">
      {/* ─── FILTER CONTROL PANEL (Windows 10 Flat Tile) ─── */}
      <div className="bg-white border-2 border-neutral-300 p-5 rounded-none shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-100 border border-emerald-300 text-[#006A4E] flex items-center justify-center font-bold">
              <Filter className="w-4 h-4 text-[#006A4E]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {isBn ? 'আপনার প্রোফাইল অনুযায়ী সরকারি সুযোগ খুঁজুন' : 'Match Government Opportunities to Your Profile'}
              </h3>
              <p className="text-xs text-neutral-500">
                {isBn
                  ? 'বয়স, পেশা ও এলাকা নির্বাচন করুন — আমরা আপনার জন্য উপযুক্ত ভাতা, ঋণ ও বৃত্তি খুঁজে দেব'
                  : 'Select your status, location, and education to discover applicable government schemes'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="self-start sm:self-auto win-press inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 border border-neutral-300 bg-neutral-50 px-3 py-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
            <span>{isBn ? 'সব রিসেট' : 'Reset All'}</span>
          </button>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Status / Occupation */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              {isBn ? 'পেশা / সামাজিক শ্রেণী' : 'Status / Occupation'}
            </label>
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 p-2.5 rounded-none focus:outline-none focus:border-[#006A4E]"
            >
              <option value="all">{isBn ? 'সকল শ্রেণী' : 'All Categories'}</option>
              <option value="unemployed">{isBn ? 'বেকার যুবসমাজ (কর্মসংস্থান প্রার্থী)' : 'Unemployed Youth'}</option>
              <option value="student">{isBn ? 'শিক্ষার্থী (স্কুল/কলেজ/বিশ্ববিদ্যালয়)' : 'Student'}</option>
              <option value="widow">{isBn ? 'বিধবা / স্বামী পরিত্যক্তা নারী' : 'Widow / Deserted Woman'}</option>
              <option value="farmer">{isBn ? 'কৃষক / ক্ষুদ্র চাষী' : 'Farmer / Smallholder'}</option>
              <option value="sme">{isBn ? 'স্বল্প / ক্ষুদ্র উদ্যোক্তা' : 'Micro Entrepreneur'}</option>
              <option value="returnee">{isBn ? 'প্রবাসী / বিদেশ ফেরত কর্মী' : 'Overseas Migrant / Returnee'}</option>
              <option value="ethnic">{isBn ? 'ক্ষুদ্র নৃগোষ্ঠী (মারমা, চাকমা ইত্যাদি)' : 'Ethnic Minority'}</option>
            </select>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              {isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education Level'}
            </label>
            <select
              value={selectedEdu}
              onChange={(e) => setSelectedEdu(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 p-2.5 rounded-none focus:outline-none focus:border-[#006A4E]"
            >
              <option value="all">{isBn ? 'যেকোনো যোগ্যতা' : 'Any Education'}</option>
              <option value="degree">{isBn ? 'স্নাতক / ডিগ্রী পাস' : 'Degree / Graduate'}</option>
              <option value="hsc">{isBn ? 'উচ্চ মাধ্যমিক (HSC)' : 'Higher Secondary (HSC)'}</option>
              <option value="ssc">{isBn ? 'মাধ্যমিক (SSC)' : 'Secondary (SSC)'}</option>
              <option value="none">{isBn ? 'প্রাতিষ্ঠানিক সনদ নেই' : 'No Formal Certificate'}</option>
            </select>
          </div>

          {/* Division / Location */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              {isBn ? 'বিভাগ ও অঞ্চল' : 'Division / Region'}
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 p-2.5 rounded-none focus:outline-none focus:border-[#006A4E]"
            >
              <option value="all">{isBn ? 'সমগ্র বাংলাদেশ (সকল বিভাগ)' : 'All Divisions'}</option>
              <option value="dhaka">{isBn ? 'ঢাকা বিভাগ' : 'Dhaka'}</option>
              <option value="chattogram">{isBn ? 'চট্টগ্রাম ও পার্বত্য অঞ্চল' : 'Chattogram & CHT'}</option>
              <option value="rajshahi">{isBn ? 'রাজশাহী বিভাগ' : 'Rajshahi'}</option>
              <option value="khulna">{isBn ? 'খুলনা বিভাগ' : 'Khulna'}</option>
              <option value="barishal">{isBn ? 'বরিশাল বিভাগ' : 'Barishal'}</option>
              <option value="sylhet">{isBn ? 'সিলেট বিভাগ' : 'Sylhet'}</option>
              <option value="rangpur">{isBn ? 'রংপুর বিভাগ' : 'Rangpur'}</option>
              <option value="mymensingh">{isBn ? 'ময়মনসিংহ ও হাওড়াঞ্চল' : 'Mymensingh & Haor'}</option>
            </select>
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              {isBn ? 'সুযোগ অনুসন্ধান' : 'Keyword Search'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'যেমন: উপবৃত্তি, ঋণ, ভাতা...' : 'e.g. stipend, loan, grant...'}
                className="w-full bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 p-2.5 pl-8 rounded-none focus:outline-none focus:border-[#006A4E]"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600 font-mono">
          <span>
            {isBn
              ? `মোট ${filtered.length}টি সরকারি সুযোগ ও ভাতা তালিকাভুক্ত রয়েছে`
              : `Found ${filtered.length} matching government opportunity schemes`}
          </span>
          <span className="text-emerald-700 font-bold">
            {isBn ? '১০০% দালালমুক্ত তথ্য' : 'Verified Official Schemes'}
          </span>
        </div>
      </div>

      {/* ─── MATCHED OPPORTUNITIES CARDS ─── */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-neutral-300 p-10 text-center">
            <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-neutral-800">
              {isBn ? 'এই ফিল্টারে কোনো সরকারি সুযোগ পাওয়া যায়নি' : 'No schemes match your current filter'}
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              {isBn ? 'ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।' : 'Try resetting or broadening your criteria.'}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 px-4 py-2 bg-[#006A4E] text-white text-xs font-bold win-btn"
            >
              {isBn ? 'সকল সুযোগ দেখুন' : 'Show All Schemes'}
            </button>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="border-2 border-neutral-200 hover:border-[#006A4E] bg-white p-5 rounded-none shadow-xs transition-all win-tile"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-[#006A4E] border border-emerald-300">
                      {isBn ? item.authorityBn : item.authorityEn}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isBn ? `শেষ তারিখ: ${item.deadlineBn}` : `Deadline: ${item.deadlineEn}`}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-neutral-900 tracking-tight">
                    {isBn ? item.titleBn : item.titleEn}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {isBn ? item.descBn : item.descEn}
                  </p>

                  {/* Benefit Callout Pill */}
                  <div className="bg-emerald-50/80 border border-emerald-200 p-3 flex items-start gap-2.5 rounded-none">
                    <Sparkles className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-[#006A4E] uppercase tracking-wide font-mono block">
                        {isBn ? 'সরকারি সহায়তা / সুবিধা:' : 'Official Benefit Support:'}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-neutral-900">
                        {isBn ? item.benefitBn : item.benefitEn}
                      </span>
                    </div>
                  </div>

                  {/* Required Documents Tag List */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-neutral-600 uppercase font-mono block mb-1">
                      {isBn ? 'প্রয়োজনীয় কাগজপত্র:' : 'Required Papers:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.docsBn.map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-[11px] bg-neutral-100 border border-neutral-200 text-neutral-700 px-2 py-0.5 rounded-none flex items-center gap-1 font-medium"
                        >
                          <CheckCircle className="w-3 h-3 text-[#006A4E]" />
                          <span>{d}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="lg:w-56 shrink-0 flex flex-col gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                  {item.applySlug && (
                    <Link
                      href={`/services/${item.applySlug}`}
                      className="win-press h-11 px-4 bg-[#006A4E] hover:bg-[#004D38] text-white text-xs font-bold flex items-center justify-center gap-2 rounded-none transition-colors"
                    >
                      <span>{isBn ? 'পূর্ণাঙ্গ নির্দেশিকা দেখুন' : 'View Full Guide'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {item.officialLink && (
                    <a
                      href={item.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win-press h-10 px-4 bg-white border border-neutral-300 hover:border-[#006A4E] text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 rounded-none transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{isBn ? 'অফিসিয়াল পোর্টাল' : 'Govt Portal'}</span>
                    </a>
                  )}

                  <div className="text-[10px] text-neutral-400 font-mono text-center">
                    {isBn ? 'গেজেট ও মন্ত্রণালয় কর্তৃক অনুমোদিত' : 'Ministry Approved Scheme'}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OpportunityFinder