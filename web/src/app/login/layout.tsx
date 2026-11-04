import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'লগইন করুন | দিশারী',
  description: 'আপনার দিশারী অ্যাকাউন্টে লগইন করে সেভ করা কাগজপত্র ও চলমান আবেদন ট্র্যাক করুন।',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
