'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BellRing,
  Calendar,
  ArrowRight,
  Check,
  ShieldAlert,
  FolderLock,
  FileText,
  UserCheck,
  LogIn,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { win10FlyoutMotion } from '@/lib/motion'
import { fetchApplications, fetchDocuments, fetchDeadlines, type UserProfile } from '@/lib/api'
import type { CitizenApplication, CitizenDocument, CitizenDeadline } from '@/types'

export interface CitizenNotification {
  id: string
  titleBn: string
  titleEn: string
  descBn: string
  descEn: string
  deadline: string
  urgency: 'high' | 'normal'
  category: 'application' | 'locker' | 'deadline' | 'account'
  href: string
}

export default function NotificationDropdown() {
  const { lang } = useLanguage()
  const isBn = lang === 'bn'

  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [notifications, setNotifications] = useState<CitizenNotification[]>([])
  const [readIds, setReadIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ─── 1. Load User Session ───
  const checkUserSession = useCallback(() => {
    try {
      const raw = localStorage.getItem('dishari_user')
      const logged = localStorage.getItem('dishari_logged_in')
      if (raw && logged === 'true') {
        const u = JSON.parse(raw)
        setUser(u)
      } else {
        setUser(null)
        setNotifications([])
        setReadIds([])
      }
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    checkUserSession()
    window.addEventListener('storage', checkUserSession)
    return () => window.removeEventListener('storage', checkUserSession)
  }, [checkUserSession])

  // ─── 2. Build Personalized Notifications for Signed-In User ───
  useEffect(() => {
    if (!user) {
      setNotifications([])
      setReadIds([])
      return
    }

    let active = true
    setLoading(true)

    // Read user-specific read notification IDs
    const storageKey = `dishari_read_notifs_${user.id || user.phone}`
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        setReadIds(JSON.parse(stored))
      }
    } catch {}

    Promise.all([
      fetchApplications(user.id),
      fetchDocuments(user.id),
      fetchDeadlines(),
    ])
      .then(([apps, docs, deadlines]) => {
        if (!active) return

        const personalized: CitizenNotification[] = []

        // A. Notifications from Submitted Applications
        if (apps && apps.length > 0) {
          apps.forEach((app: CitizenApplication) => {
            const statusLabelBn =
              app.status === 'ready'
                ? 'আবেদন প্রস্তুত ও ডকেটভুক্ত'
                : app.status === 'submitted'
                ? 'আবেদন জমা হয়েছে'
                : 'আবেদন পর্যালোচনায়'
            const statusLabelEn =
              app.status === 'ready'
                ? 'Application Prepared'
                : app.status === 'submitted'
                ? 'Application Submitted'
                : 'Under Review'

            personalized.push({
              id: `app-${app.id || app.docket_id}`,
              titleBn: `${app.service_name_bn} — ${statusLabelBn}`,
              titleEn: `${app.service_name_en || app.service_name_bn} — ${statusLabelEn}`,
              descBn: `আপনার ডকেট আইডি ${app.docket_id} সফলভাবে নথিভুক্ত হয়েছে। অগ্রগতি দেখতে ক্লিক করুন।`,
              descEn: `Your docket ID ${app.docket_id} is on file. Click to view progress.`,
              deadline: new Date(app.submitted_at || Date.now()).toLocaleDateString(isBn ? 'bn-BD' : 'en-US'),
              urgency: 'normal',
              category: 'application',
              href: '/dashboard?tab=applications',
            })
          })
        }

        // B. Personalized Document Locker Alerts (Missing essential papers)
        const hasNid = docs?.some(
          (d: CitizenDocument) => d.doc_type === 'nid_front' || d.doc_type === 'nid_back'
        )
        const hasPhoto = docs?.some((d: CitizenDocument) => d.doc_type === 'photo')

        if (!hasNid) {
          personalized.push({
            id: `locker-missing-nid-${user.id || 'u'}`,
            titleBn: 'নাগরিক লকারে NID আপলোড বাকি রয়েছে',
            titleEn: 'National ID (NID) Not Yet in Locker',
            descBn: 'সরকারি সেবা ও স্বয়ংক্রিয় ফর্ম পূরণের সুবিধা পেতে আপনার ডিজিটাল লকারে NID কপি যুক্ত করুন।',
            descEn: 'Upload your National ID to unlock 1-click government form auto-filling.',
            deadline: isBn ? 'জরুরি প্রয়োজন' : 'High Priority',
            urgency: 'high',
            category: 'locker',
            href: '/dashboard?tab=locker',
          })
        }

        if (!hasPhoto) {
          personalized.push({
            id: `locker-missing-photo-${user.id || 'u'}`,
            titleBn: 'পাসপোর্ট সাইজ ছবি সংরক্ষণ করুন',
            titleEn: 'Add Passport Photo to Vault',
            descBn: 'পাসপোর্ট ও অন্যান্য নাগরিক আবেদনের জন্য ডিজিটাল লকারে পাসপোর্ট সাইজ রঙিন ছবি রাখুন।',
            descEn: 'Keep a certified passport photo in your vault for rapid citizen service filings.',
            deadline: isBn ? 'পরামর্শ' : 'Recommended',
            urgency: 'normal',
            category: 'locker',
            href: '/dashboard?tab=locker',
          })
        }

        // C. Citizen Deadlines Radar
        if (deadlines && deadlines.length > 0) {
          deadlines.slice(0, 2).forEach((dl: CitizenDeadline) => {
            personalized.push({
              id: `deadline-${dl.id}`,
              titleBn: dl.title_bn,
              titleEn: dl.title_en,
              descBn: dl.description_bn,
              descEn: dl.description_en,
              deadline: dl.deadline,
              urgency: dl.urgency === 'high' ? 'high' : 'normal',
              category: 'deadline',
              href: dl.official_link || '/dashboard?tab=deadlines',
            })
          })
        }

        // D. Welcome & Profile Verification
        personalized.push({
          id: `account-welcome-${user.citizen_id || 'usr'}`,
          titleBn: `স্বাগতম, ${user.full_name}!`,
          titleEn: `Welcome, ${user.full_name}!`,
          descBn: `আপনার নাগরিক আইডি (${user.citizen_id}) সক্রিয় রয়েছে। ড্যাশবোর্ড থেকে সকল সেবা পরিচালনা করুন।`,
          descEn: `Your citizen account (${user.citizen_id}) is active and secured.`,
          deadline: isBn ? 'সক্রিয়' : 'Active',
          urgency: 'normal',
          category: 'account',
          href: '/dashboard',
        })

        setNotifications(personalized)
        setLoading(false)
      })
      .catch(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [user, isBn])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Calculate unread count ONLY if user is logged in
  const unreadCount = user ? notifications.filter((n) => !readIds.includes(n.id)).length : 0

  const markAllRead = () => {
    if (!user) return
    const allIds = notifications.map((n) => n.id)
    setReadIds(allIds)
    const storageKey = `dishari_read_notifs_${user.id || user.phone}`
    try {
      localStorage.setItem(storageKey, JSON.stringify(allIds))
    } catch {}
  }

  const markSingleRead = (id: string) => {
    if (!user) return
    if (!readIds.includes(id)) {
      const updated = [...readIds, id]
      setReadIds(updated)
      const storageKey = `dishari_read_notifs_${user.id || user.phone}`
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated))
      } catch {}
    }
  }

  const getCategoryIcon = (category: CitizenNotification['category']) => {
    switch (category) {
      case 'application':
        return <FileText className="w-3.5 h-3.5 text-[#006A4E]" />
      case 'locker':
        return <FolderLock className="w-3.5 h-3.5 text-amber-600" />
      case 'deadline':
        return <Calendar className="w-3.5 h-3.5 text-red-600" />
      case 'account':
      default:
        return <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button (Windows 10 flat tile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative min-w-[38px] min-h-[38px] border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-800 rounded-none transition-colors cursor-pointer win-press"
        aria-label={isBn ? 'নাগরিক নোটিফিকেশন ও অ্যালার্ট' : 'Citizen notifications and alerts'}
        aria-expanded={isOpen}
      >
        <BellRing className="w-4 h-4 text-neutral-700" />
        {/* Only show badge if user is signed in AND has unread items */}
        {user && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-[#C8102E] text-white font-mono font-bold text-[10px] flex items-center justify-center px-1 rounded-none shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel — Windows 10 Flyout Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={win10FlyoutMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-neutral-300 shadow-xl z-50 overflow-hidden rounded-none origin-top-right"
          >
            {/* Top 2px Bangladesh Green Accent Strip */}
            <div className="h-0.5 bg-[#006A4E] w-full" />

            {/* Header */}
            <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-1.5">
                  <span>{isBn ? 'নাগরিক নোটিফিকেশন' : 'Citizen Notifications'}</span>
                  {user && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-50 text-[#006A4E] border border-emerald-200 font-semibold">
                      {isBn ? 'ব্যক্তিগত' : 'Personal'}
                    </span>
                  )}
                </h3>
                <span className="text-[11px] font-mono text-neutral-500 block mt-0.5">
                  {user ? (
                    unreadCount > 0 ? (
                      isBn ? `${unreadCount}টি নতুন নোটিফিকেশন` : `${unreadCount} unread alerts`
                    ) : (
                      isBn ? 'সকল নোটিফিকেশন পঠিত' : 'All caught up'
                    )
                  ) : (
                    isBn ? 'লগইন প্রয়োজন' : 'Sign in required'
                  )}
                </span>
              </div>

              {user && unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-[#006A4E] hover:underline flex items-center gap-1 cursor-pointer win-press"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সব পঠিত' : 'Mark all read'}</span>
                </button>
              )}
            </div>

            {/* Content Area */}
            {!user ? (
              // ─── LOGGED-OUT STATE: Polite Sign-In Prompt (Zero Fake Alerts) ───
              <div className="p-5 text-center bg-white space-y-3">
                <div className="w-11 h-11 mx-auto bg-neutral-100 border border-neutral-200 flex items-center justify-center rounded-none text-neutral-600">
                  <ShieldAlert className="w-6 h-6 text-[#006A4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">
                    {isBn ? 'ব্যক্তিগত নোটিফিকেশন পেতে লগইন করুন' : 'Sign In for Personalized Alerts'}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {isBn
                      ? 'আপনার জমা দেওয়া আবেদন ট্র্যাকিং, ডিজিটাল লকারে প্রয়োজনীয় কাগজের ঘাটতি এবং আপনার সাথে সম্পর্কিত সরকারি ডেডলাইন নোটিফিকেশন পেতে সাইন-ইন করুন।'
                      : 'Sign in to receive real-time updates for your submitted applications, locker document status, and personalized deadlines.'}
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white py-2 text-xs font-bold uppercase tracking-wider rounded-none win-press transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{isBn ? 'লগইন করুন' : 'Sign In'}</span>
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 py-1.5 text-xs font-semibold rounded-none win-press transition-colors"
                  >
                    <span>{isBn ? 'নতুন নাগরিক অ্যাকাউন্ট তৈরি করুন' : 'Create Citizen Account'}</span>
                  </Link>
                </div>
              </div>
            ) : loading ? (
              // Loading State
              <div className="p-6 text-center text-xs text-neutral-500 font-mono">
                {isBn ? 'ব্যক্তিগত নোটিফিকেশন লোড হচ্ছে...' : 'Loading personalized alerts...'}
              </div>
            ) : notifications.length === 0 ? (
              // Empty State for logged-in user
              <div className="p-6 text-center text-xs text-neutral-500">
                <Check className="w-5 h-5 text-[#006A4E] mx-auto mb-1.5" />
                <p className="font-semibold text-neutral-700">
                  {isBn ? 'কোনো নতুন নোটিফিকেশন নেই' : 'No new notifications'}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {isBn ? 'আপনার সমস্ত নাগরিক কাগজপত্র ও আবেদন হালনাগাদ রয়েছে।' : 'All your citizen records and files are up to date.'}
                </p>
              </div>
            ) : (
              // ─── LOGGED-IN STATE: Real Personalized Citizen Alerts ───
              <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                {notifications.map((item) => {
                  const isRead = readIds.includes(item.id)
                  const title = isBn ? item.titleBn : item.titleEn
                  const desc = isBn ? item.descBn : item.descEn

                  return (
                    <div
                      key={item.id}
                      onClick={() => markSingleRead(item.id)}
                      className={`p-3.5 hover:bg-neutral-50 transition-colors border-l-3 cursor-pointer win-press ${
                        item.urgency === 'high' ? 'border-l-[#C8102E]' : 'border-l-[#006A4E]'
                      } ${isRead ? 'opacity-65 bg-white' : 'bg-neutral-50/60'}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          {getCategoryIcon(item.category)}
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border rounded-none ${
                              item.urgency === 'high'
                                ? 'bg-red-50 text-[#C8102E] border-red-200'
                                : 'bg-emerald-50 text-[#006A4E] border-emerald-200'
                            }`}
                          >
                            {item.urgency === 'high'
                              ? isBn ? 'জরুরি প্রয়োজন' : 'High Priority'
                              : isBn ? 'নোটিশ' : 'Notice'}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500 font-medium">
                          {item.deadline}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900 mt-1 leading-snug">
                        {title}
                      </h4>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{desc}</p>

                      <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={() => {
                            markSingleRead(item.id)
                            setIsOpen(false)
                          }}
                          className="text-xs font-semibold text-[#006A4E] hover:text-[#004D38] inline-flex items-center gap-1 win-press"
                        >
                          <span>{isBn ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Footer */}
            {user && (
              <div className="p-2.5 bg-neutral-100 border-t border-neutral-200 text-center">
                <Link
                  href="/dashboard?tab=deadlines"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-neutral-800 hover:text-[#006A4E] win-press inline-block"
                >
                  {isBn ? 'সব ডেডলাইন ও সুযোগ রাডার দেখুন →' : 'View Full Deadlines Radar →'}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
