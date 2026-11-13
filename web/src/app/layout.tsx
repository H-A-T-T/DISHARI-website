import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import JonobondhuChat from '@/components/shared/JonobondhuChat'

export const metadata: Metadata = {
  title: 'দিশারী — সরকারি সেবা সহজ ভাষায়',
  description:
    'বাংলাদেশের সরকারি সেবা সম্পর্কে সহজ ভাষায় তথ্য পান। কোন কাগজ লাগবে, কোথায় যেতে হবে, কত খরচ — সব এক জায়গায়।',
  icons: {
    icon: '/icons/dishari_mark.svg',
    shortcut: '/icons/dishari_mark.svg',
    apple: '/icons/dishari_mark.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/kalpurush.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link href="https://fonts.maateen.me/kalpurush/font.css" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <Suspense>
            <Navbar />
          </Suspense>
          <main className="pb-20 lg:pb-0">{children}</main>
          <Footer />
          <Suspense>
            <MobileNav />
          </Suspense>
          {/* Floating Movable Jonobondhu AI Bubble & Popup Window */}
          <Suspense>
            <JonobondhuChat />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
