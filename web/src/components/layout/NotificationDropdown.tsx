'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { BellRing, Calendar, ArrowRight, Check, X, ShieldAlert } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export interface CitizenNotification {
  id: string
  titleBn: string
  titleEn: string
  descBn: string
  descEn: string
  deadline: string
  urgency: 'high' | 'normal'
  href: string
}

const DEFAULT_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: 'tax-2026',
    titleBn: 'আয়কর রিটার্ন দাখিল সময়সীমা ঘনিয়ে আসছে',
    titleEn: 'Annual Income Tax Return Filing Approaching',
    descBn: 'ব্যক্তিশ্রেণীর সকল করদাতাদের জন্য আয়কর রিটার্ন জমা দেওয়ার জাতীয় শেষ সময় ৩০ নভেম্বর ২০২৬।',
    descEn: 'National deadline for individual taxpayers to file annual returns is November 30, 2026.',
    deadline: '2026-11-30',
    urgency: 'high',
    href: '/services/tax-return',
  },
  {
    id: 'pmet-scholarship',
    titleBn: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট উপবৃত্তি আবেদন',
    titleEn: 'PM Education Assistance Trust Scholarship Open',
    descBn: 'মাধ্যমিক ও উচ্চ মাধ্যমিক পর্যায়ের অসচ্ছল শিক্ষার্থীদের আর্থিক সহায়তা আবেদন ১৫ ডিসেম্বর পর্যন্ত।',
    descEn: 'Secondary and higher secondary student financial aid applications open until Dec 15.',
    deadline: '2026-12-15',
    urgency: 'normal',
    href: '/services/scholarship',
  },
  {
    id: 'widow-renewal',
    titleBn: 'বিধবা ও বয়স্ক ভাতা তালিকা হালনাগাদ কার্যক্রম',
    titleEn: 'Widow & Old Age Allowance Beneficiary Renewal',
    descBn: 'ইউনিয়ন পরিষদ ও সমাজসেবা কার্যালয়ের মাধ্যমে সুবিধাবোধীদের বাৎসরিক তালিকা যাচাই-বাছাই চলছে।',
    descEn: 'Annual verification cycle ongoing through Union Councils and Department of Social Services.',
    deadline: '2026-12-31',
    urgency: 'normal',
    href: '/services/widow-allowance',
  },
]

export default function NotificationDropdown() {
  const { lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [readIds, setReadIds] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dishari_read_notifs')
      if (stored) {
        setReadIds(JSON.parse(stored))
      }
    } catch {}
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = DEFAULT_NOTIFICATIONS.filter((n) => !readIds.includes(n.id)).length

  const markAllRead = () => {
    const allIds = DEFAULT_NOTIFICATIONS.map((n) => n.id)
    setReadIds(allIds)
    try {
      localStorage.setItem('dishari_read_notifs', JSON.stringify(allIds))
    } catch {}
  }

  const markSingleRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id]
      setReadIds(updated)
      try {
        localStorage.setItem('dishari_read_notifs', JSON.stringify(updated))
      } catch {}
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button (Windows 10 flat tile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative min-w-[38px] min-h-[38px] border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-800 rounded-none transition-colors cursor-pointer"
        aria-label="Citizen notifications and alerts"
        aria-expanded={isOpen}
      >
        <BellRing className="w-4 h-4 text-neutral-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-[#C8102E] text-white font-mono font-bold text-[10px] flex items-center justify-center px-1 rounded-none shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel — Flat Boxy Windows 10 Action Center style */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-neutral-300 shadow-xl z-50 overflow-hidden animate-in fade-in-50 duration-150 rounded-none">
          {/* Top 2px Bangladesh Green Accent Strip */}
          <div className="h-0.5 bg-[#006A4E] w-full" />

          {/* Header */}
          <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">
                {lang === 'bn' ? 'নাগরিক নোটিফিকেশন ও অ্যালার্ট' : 'Citizen Alerts & Deadlines'}
              </h3>
              <span className="text-[11px] font-mono text-neutral-500">
                {unreadCount > 0
                  ? lang === 'bn'
                    ? `${unreadCount}টি নতুন নোটিফিকেশন`
                    : `${unreadCount} new alerts`
                  : lang === 'bn'
                  ? 'সকল নোটিফিকেশন পঠিত'
                  : 'All notifications caught up'}
              </span>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-[#006A4E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সব পঠিত' : 'Mark read'}</span>
              </button>
            )}
          </div>

          {/* Alert List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
            {DEFAULT_NOTIFICATIONS.map((item) => {
              const isRead = readIds.includes(item.id)
              const title = lang === 'bn' ? item.titleBn : item.titleEn
              const desc = lang === 'bn' ? item.descBn : item.descEn

              return (
                <div
                  key={item.id}
                  onClick={() => markSingleRead(item.id)}
                  className={`p-3.5 hover:bg-neutral-50 transition-colors border-l-3 ${
                    item.urgency === 'high' ? 'border-l-[#C8102E]' : 'border-l-[#006A4E]'
                  } ${isRead ? 'opacity-70 bg-white' : 'bg-neutral-50/50'}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border rounded-none ${
                        item.urgency === 'high'
                          ? 'bg-red-50 text-[#C8102E] border-red-200'
                          : 'bg-emerald-50 text-[#006A4E] border-emerald-200'
                      }`}
                    >
                      {item.urgency === 'high'
                        ? lang === 'bn'
                          ? 'জরুরি ডেডলাইন'
                          : 'High Priority'
                        : lang === 'bn'
                        ? 'সময়সীমা'
                        : 'Notice'}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      <span>{item.deadline}</span>
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
                      className="text-xs font-semibold text-[#006A4E] hover:text-[#004D38] inline-flex items-center gap-1"
                    >
                      <span>{lang === 'bn' ? 'সেবা ও নিয়মাবলী দেখুন' : 'View Service Guide'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-neutral-100 border-t border-neutral-200 text-center">
            <Link
              href="/dashboard?tab=deadlines"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-neutral-800 hover:text-[#006A4E]"
            >
              {lang === 'bn' ? 'সব ডেডলাইন ও সুযোগ রাডার দেখুন →' : 'View Full Deadlines Radar →'}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
