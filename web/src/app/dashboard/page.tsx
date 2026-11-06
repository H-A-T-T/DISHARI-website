'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Home,
  FileText,
  ClipboardList,
  BellRing,
  Settings,
  ShieldCheck,
  FolderLock,
  Lock,
  ArrowRight,
  LogOut,
  UserCheck
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { cn } from '@/lib/utils'
import type { CitizenDocument, CitizenApplication, CitizenDeadline } from '@/types'
import {
  fetchDocuments,
  fetchApplications,
  fetchDeadlines,
  type UserProfile
} from '@/lib/api'
import DocumentLocker from '@/components/dashboard/DocumentLocker'
import ApplicationsList from '@/components/dashboard/ApplicationsList'
import DeadlinesView from '@/components/dashboard/DeadlinesView'
import ProfileSettings from '@/components/dashboard/ProfileSettings'

type DashboardTab = 'home' | 'locker' | 'applications' | 'deadlines' | 'settings'

function DashboardInner() {
  const { lang, setLang } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<DashboardTab>(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['home', 'locker', 'applications', 'deadlines', 'settings'].includes(tabParam)) {
      return tabParam as DashboardTab
    }
    return 'home'
  })
  const [user, setUser] = useState<UserProfile | null>(null)
  const [citizenId, setCitizenId] = useState<string>('BD-USER-782')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [checkedAuth, setCheckedAuth] = useState<boolean>(false)

  // Data states
  const [documents, setDocuments] = useState<CitizenDocument[]>([])
  const [applications, setApplications] = useState<CitizenApplication[]>([])
  const [deadlines, setDeadlines] = useState<CitizenDeadline[]>([])
  const [loadingData, setLoadingData] = useState<boolean>(true)

  // Sync tab from URL query param if present
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['home', 'locker', 'applications', 'deadlines', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam as DashboardTab)
    }
  }, [searchParams])

  // Check auth
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dishari_user')
      const loggedFlag = localStorage.getItem('dishari_logged_in')
      if (raw && loggedFlag === 'true') {
        const u = JSON.parse(raw)
        setUser(u)
        setIsLoggedIn(true)
        if (u.citizen_id) setCitizenId(u.citizen_id)
      } else {
        setIsLoggedIn(false)
      }
    } catch {
      setIsLoggedIn(false)
    } finally {
      setCheckedAuth(true)
    }
  }, [])

  // Load backend data
  const loadDashboardData = async () => {
    setLoadingData(true)
    try {
      const [docs, apps, dls] = await Promise.all([
        fetchDocuments(user?.id),
        fetchApplications(user?.id),
        fetchDeadlines(),
      ])
      setDocuments(docs)
      setApplications(apps)
      setDeadlines(dls)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardData()
    }
  }, [isLoggedIn, user?.id])

  const handleLogout = () => {
    try {
      localStorage.removeItem('dishari_user')
      localStorage.removeItem('dishari_logged_in')
    } catch {}
    setIsLoggedIn(false)
    setUser(null)
    router.push('/')
  }

  const handleDemoLogin = () => {
    const demoUser: UserProfile = {
      id: 1,
      full_name: 'আহমেদ জামিল',
      phone: '+8801712345678',
      email: 'jamil.citizen@dishari.bd',
      citizen_id: 'BD-USER-782',
    }
    localStorage.setItem('dishari_user', JSON.stringify(demoUser))
    localStorage.setItem('dishari_logged_in', 'true')
    setUser(demoUser)
    setIsLoggedIn(true)
    loadDashboardData()
  }

  // ─── AUTH GATE (Flat Windows 10 style) ──────────────────────────────────
  if (checkedAuth && !isLoggedIn) {
    return (
      <div className="min-h-[80vh] bg-[#F5F6F8] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full border border-neutral-200 bg-white p-7 sm:p-8 rounded-none shadow-sm text-center border-t-3 border-t-[#006A4E]">
          <div className="w-12 h-12 mx-auto border border-amber-300 bg-amber-50 flex items-center justify-center mb-3 rounded-none">
            <Lock className="w-6 h-6 text-amber-700" />
          </div>

          <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'সুরক্ষিত নাগরিক ড্যাশবোর্ড' : 'Protected Citizen Workspace'}
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
            {lang === 'bn' ? 'লগইন প্রয়োজন' : 'Authentication Required'}
          </h2>

          <p className="text-neutral-600 text-xs sm:text-sm mt-2 leading-relaxed">
            {lang === 'bn'
              ? 'ব্যক্তিগত নথিপত্র, ডিজিটাল লকার এবং সরকারি আবেদন ডকেট সংরক্ষণের জন্য অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।'
              : 'Please log in to access your secure document locker, citizen dockets, and saved credentials.'}
          </p>

          <div className="mt-6 space-y-2.5">
            <Link
              href="/login"
              className="w-full min-h-[44px] border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors"
            >
              <span>{lang === 'bn' ? 'লগইন করুন' : 'Log In to Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              className="w-full min-h-[44px] border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center rounded-none transition-colors"
            >
              {lang === 'bn' ? 'নতুন অ্যাকাউন্ট নিবন্ধন করুন' : 'Create Free Account'}
            </Link>

            {/* Instant Demo Sandbox Access */}
            <div className="pt-3 border-t border-neutral-200">
              <button
                onClick={handleDemoLogin}
                className="w-full min-h-[40px] border border-dashed border-neutral-400 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-semibold text-xs inline-flex items-center justify-center gap-1.5 rounded-none cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#006A4E]" />
                <span>{lang === 'bn' ? 'ডেমো নাগরিক হিসেবে প্রবেশ করুন (১-ক্লিক)' : 'Enter as Demo Citizen (1-Click)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Sidebar navigation items
  const navItems = [
    {
      id: 'home' as DashboardTab,
      labelBn: 'সারসংক্ষেপ (হোম)',
      labelEn: 'Overview (Home)',
      icon: Home,
    },
    {
      id: 'locker' as DashboardTab,
      labelBn: 'আমার নথিপত্র (লকার)',
      labelEn: 'My Documents (Locker)',
      icon: FolderLock,
      badge: documents.length > 0 ? documents.length : undefined,
    },
    {
      id: 'applications' as DashboardTab,
      labelBn: 'আমার আবেদনসমূহ',
      labelEn: 'My Applications',
      icon: ClipboardList,
      badge: applications.length > 0 ? applications.length : undefined,
    },
    {
      id: 'deadlines' as DashboardTab,
      labelBn: 'নোটিফিকেশন ও ডেডলাইন',
      labelEn: 'Alerts & Deadlines',
      icon: BellRing,
      badge: deadlines.filter((d) => d.urgency === 'high').length > 0 ? '!' : undefined,
    },
    {
      id: 'settings' as DashboardTab,
      labelBn: 'সেটিংস ও প্রোফাইল',
      labelEn: 'Settings & Profile',
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-neutral-900 font-sans pb-24 lg:pb-12">
      {/* ─── Top Docket Header ─────────────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white pt-5 pb-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-mono text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                {lang === 'bn' ? 'নাগরিক ড্যাশবোর্ড' : 'CITIZEN DASHBOARD'}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
                {lang === 'bn' ? 'আমার ওয়ার্কস্পেস' : 'My Workspace'}
              </h1>
            </div>
            <div className="hidden sm:block border-l border-neutral-200 h-7 mx-2" />
            <div className="hidden sm:block font-mono text-xs text-neutral-600 font-medium">
              <span>{lang === 'bn' ? 'সক্রিয় ডিজিটাল সিটিজেন সেশন' : 'Active Citizen Session'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-800 font-semibold bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-none self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
            <span>
              {lang === 'bn' ? 'কার্যপত্র আইডি:' : 'Docket ID:'} {citizenId}
            </span>
          </div>
        </div>
      </section>

      {/* ─── Main Workstation Layout ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">
          {/* Desktop Left Sidebar (Windows 10 Settings style) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5">
            <div className="border border-neutral-200 bg-white p-4.5 rounded-none shadow-xs">
              <div className="pb-3.5 mb-3.5 border-b border-neutral-100">
                <span className="font-mono text-[10px] text-[#006A4E] font-bold uppercase tracking-wider block">
                  {lang === 'bn' ? 'নাগরিক ড্যাশবোর্ড' : 'Citizen Dashboard'}
                </span>
                <h3 className="font-bold text-base text-neutral-900 truncate mt-0.5">
                  {user?.full_name || (lang === 'bn' ? 'নাগরিক' : 'Citizen')}
                </h3>
                <p className="font-mono text-xs text-neutral-500 truncate">{user?.phone}</p>
              </div>

              {/* Sidebar Navigation Links (Windows 10 flat list) */}
              <nav className="space-y-1" aria-label="Dashboard Sidebar">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold transition-all text-left min-h-[40px] rounded-none cursor-pointer',
                        isActive
                          ? 'border-l-4 border-l-[#006A4E] bg-neutral-100 text-[#006A4E] font-bold'
                          : 'border-l-4 border-l-transparent hover:bg-neutral-50 text-neutral-700 hover:text-neutral-950'
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-[#006A4E]' : 'text-neutral-400')} />
                        <span className="truncate">{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            'text-[10px] font-mono px-1.5 py-0.2 font-bold shrink-0 rounded-none',
                            isActive ? 'bg-[#006A4E] text-white' : 'bg-neutral-200 text-neutral-700'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>

              <div className="pt-3.5 mt-3.5 border-t border-neutral-100">
                <button
                  onClick={handleLogout}
                  className="w-full min-h-[36px] px-3 border border-neutral-200 hover:border-red-300 bg-white hover:bg-red-50 text-neutral-600 hover:text-[#C8102E] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors rounded-none cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'লগআউট' : 'Log Out'}</span>
                </button>
              </div>
            </div>

            {/* Helpline quick widget */}
            <div className="border border-[#006A4E] bg-[#004D38] text-white p-4 text-xs font-mono rounded-none shadow-xs">
              <span className="text-emerald-300 font-bold block mb-1.5 uppercase text-[11px]">
                {lang === 'bn' ? 'জরুরি হেল্পলাইন:' : 'Helpline:'}
              </span>
              <div className="space-y-1 text-emerald-100 text-[11px]">
                <div>৩৩৩ — সরকারি তথ্য সেবা</div>
                <div>৯৯৯ — জাতীয় জরুরি সেবা</div>
                <div>১০৬ — দুর্নীতি দমন কমিশন</div>
              </div>
            </div>
          </aside>

          {/* Mobile Tab Scroller */}
          <div className="lg:hidden col-span-1 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'shrink-0 flex items-center gap-2 px-3.5 py-2 text-xs font-semibold min-h-[44px] rounded-none border',
                    isActive
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                </button>
              )
            })}
          </div>

          {/* Right Main Content Stage */}
          <main className="lg:col-span-3">
            {/* 1. OVERVIEW / HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-5">
                {/* Civic Greeting Banner — Windows 10 Flat Card */}
                <div className="border border-neutral-200 bg-white p-6 sm:p-7 rounded-none shadow-xs border-l-4 border-l-[#006A4E]">
                  <span className="font-mono text-xs text-[#006A4E] font-bold uppercase tracking-wider block mb-1">
                    {t('dashboard', 'badge', lang)}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                    {lang === 'bn' ? 'সুপ্রভাত' : 'Welcome'}, {user?.full_name || t('dashboard', 'citizen', lang)}
                  </h1>
                  <p className="text-neutral-600 mt-1.5 text-xs sm:text-sm leading-relaxed">
                    {t('dashboard', 'subtitle', lang)}
                  </p>
                </div>

                {/* 2 Big Action Cards (Document Locker + Active Applications) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Document Locker Quick Card */}
                  <div className="border border-neutral-200 bg-white p-5 rounded-none shadow-xs flex flex-col justify-between hover:border-[#006A4E] transition-colors">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 border border-neutral-200 bg-emerald-50 flex items-center justify-center rounded-none">
                            <FolderLock className="w-4 h-4 text-[#006A4E]" />
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                            {lang === 'bn' ? 'আমার নথিপত্র' : 'My Documents'}
                          </h3>
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#006A4E] bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-none">
                          {documents.length} {lang === 'bn' ? 'টি ফাইল' : 'files'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {lang === 'bn'
                          ? 'পাসপোর্ট, এনআইডি ও জন্ম সনদ আপনার সুরক্ষিত ডিজিটাল লকারে সংরক্ষণ করে রাখুন।'
                          : 'Store your National ID, Birth Certificate, and Passport photos in your encrypted locker.'}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('locker')}
                      className="mt-5 w-full min-h-[42px] border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer"
                    >
                      <FolderLock className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'লকার খুলুন ও নথি দেখুন' : 'Open Document Locker'}</span>
                    </button>
                  </div>

                  {/* Applications Quick Card */}
                  <div className="border border-neutral-200 bg-white p-5 rounded-none shadow-xs flex flex-col justify-between hover:border-[#006A4E] transition-colors">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 border border-neutral-200 bg-purple-50 flex items-center justify-center rounded-none">
                            <ClipboardList className="w-4 h-4 text-purple-700" />
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                            {lang === 'bn' ? 'চলমান আবেদনসমূহ' : 'Active Applications'}
                          </h3>
                        </div>
                        <span className="font-mono text-xs font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-neutral-200 rounded-none">
                          {applications.length} {lang === 'bn' ? 'টি আবেদন' : 'dockets'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {lang === 'bn'
                          ? 'সরকারি সেবার জন্য প্রস্তুতকৃত সকল কার্যপত্র ও পোর্টাল ট্র্যাকিং তথ্য এখানে প্রদর্শিত হয়।'
                          : 'Track your government application dockets and direct portal submissions.'}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('applications')}
                      className="mt-5 w-full min-h-[42px] border border-neutral-800 bg-neutral-900 hover:bg-[#006A4E] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer"
                    >
                      <ClipboardList className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'আবেদন তালিকা দেখুন' : 'View Applications'}</span>
                    </button>
                  </div>
                </div>

                {/* Deadlines Alert Strip */}
                <div className="border border-amber-300 bg-amber-50/60 p-5 rounded-none shadow-xs border-l-4 border-l-amber-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <BellRing className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-neutral-900">
                          {lang === 'bn' ? 'আসন্ন আয়কর ও সরকারি সময়সীমা' : 'Upcoming Tax & Government Deadlines'}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-0.5">
                          {lang === 'bn'
                            ? 'ব্যক্তিশ্রেণীর আয়কর রিটার্ন জমা দেওয়ার জাতীয় সময়সীমা: ৩০ নভেম্বর ২০২৬।'
                            : 'Annual Individual Income Tax filing deadline: November 30, 2026.'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('deadlines')}
                      className="shrink-0 min-h-[38px] px-4 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs uppercase rounded-none transition-colors cursor-pointer"
                    >
                      {lang === 'bn' ? 'সব সময়সীমা দেখুন' : 'View All Deadlines'}
                    </button>
                  </div>
                </div>

                {/* Browse Services CTA */}
                <div className="border border-neutral-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-none shadow-xs">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-neutral-900">
                      {lang === 'bn' ? 'কোন সরকারি সেবাটি আপনার প্রয়োজন?' : 'Which government service do you need?'}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {lang === 'bn'
                        ? 'পাসপোর্ট, এনআইডি সংশোধন, ভূমি নামজারি ও ভাতাসহ সকল সেবার সঠিক নিয়ম ও ফি জেনে নিন।'
                        : 'Explore gazette requirements, official fees, and step-by-step procedures for 15+ citizen services.'}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="shrink-0 min-h-[42px] px-5 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-none transition-colors"
                  >
                    <span>{lang === 'bn' ? 'সকল সেবা ডিরেক্টরি' : 'All Services'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* 2. DOCUMENT LOCKER TAB */}
            {activeTab === 'locker' && (
              <DocumentLocker
                documents={documents}
                onRefresh={loadDashboardData}
                lang={lang}
              />
            )}

            {/* 3. APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              <ApplicationsList
                applications={applications}
                lang={lang}
              />
            )}

            {/* 4. DEADLINES TAB */}
            {activeTab === 'deadlines' && (
              <DeadlinesView
                deadlines={deadlines}
                lang={lang}
              />
            )}

            {/* 5. SETTINGS TAB */}
            {activeTab === 'settings' && user && (
              <ProfileSettings
                user={user}
                citizenId={citizenId}
                lang={lang}
                setLang={setLang}
                onLogout={handleLogout}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
          <div className="font-mono text-xs font-semibold text-neutral-600">ড্যাশবোর্ড লোড হচ্ছে...</div>
        </div>
      }
    >
      <DashboardInner />
    </Suspense>
  )
}
