'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Home, Search, FolderLock, BellRing, UserCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

export default function MobileNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { lang } = useLanguage()

  const currentTab = searchParams.get('tab')

  const tabs = [
    {
      key: 'home',
      labelBn: 'হোম',
      labelEn: 'Home',
      icon: Home,
      href: '/',
      active: pathname === '/',
    },
    {
      key: 'services',
      labelBn: 'সেবা সমূহ',
      labelEn: 'Services',
      icon: Search,
      href: '/services',
      active: pathname.startsWith('/services'),
    },
    {
      key: 'locker',
      labelBn: 'নাগরিক লকার',
      labelEn: 'Doc Locker',
      icon: FolderLock,
      href: '/dashboard?tab=locker',
      active: pathname === '/dashboard' && currentTab === 'locker',
    },
    {
      key: 'deadlines',
      labelBn: 'ডেডলাইন',
      labelEn: 'Deadlines',
      icon: BellRing,
      href: '/dashboard?tab=deadlines',
      active: pathname === '/dashboard' && currentTab === 'deadlines',
    },
    {
      key: 'profile',
      labelBn: 'ড্যাশবোর্ড',
      labelEn: 'Account',
      icon: UserCheck,
      href: '/dashboard',
      active: pathname === '/dashboard' && !currentTab,
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 lg:hidden shadow-sm pb-safe rounded-none"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center h-15 divide-x divide-neutral-100">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 min-h-[48px] py-1 transition-colors border-t-2',
                tab.active
                  ? 'text-[#006A4E] bg-neutral-50/80 font-bold border-t-[#006A4E]'
                  : 'text-neutral-600 hover:text-neutral-900 font-medium border-t-transparent'
              )}
            >
              <div className="relative">
                <Icon className={cn('w-4.5 h-4.5 shrink-0', tab.active ? 'text-[#006A4E] stroke-[2.5]' : 'text-neutral-400')} />
              </div>
              <span className="text-[11px] leading-tight truncate px-0.5">
                {lang === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
