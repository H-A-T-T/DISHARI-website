import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'নাগরিক ড্যাশবোর্ড | দিশারী',
  description: 'আপনার সংরক্ষিত নথিপত্র, আবেদনসমূহ ও প্রয়োজনীয় সেবা এক নজরে দেখুন।',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
