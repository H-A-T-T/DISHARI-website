'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, FileText, Bell, User } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { cn } from '@/lib/utils'

const tabs = [
  { key: 'home', icon: Home, href: '/' },
  { key: 'search', icon: Search, href: '/services' },
  { key: 'services', icon: FileText, href: '/services' },
  { key: 'notifications', icon: Bell, href: '#' },
  { key: 'account', icon: User, href: '/login' },
] as const

export default function MobileNav() {
  const pathname = usePathname()
  const { lang } = useLanguage()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.05)] lg:hidden pb-safe">
      <div className="flex items-center h-16">
        {tabs.map(({ key, icon: Icon, href }) => {
          const isActive =
            (key === 'home' && pathname === '/') ||
            (key === 'search' && pathname === '/services') ||
            (key === 'services' && pathname.startsWith('/services/')) ||
            (key === 'account' && pathname === '/login')

          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 min-h-[48px]',
                isActive ? 'text-green-600 font-medium' : 'text-stone-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{t('nav', key, lang)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
