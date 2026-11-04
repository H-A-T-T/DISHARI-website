import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'সকল সরকারি সেবা | দিশারী',
  description:
    'পাসপোর্ট, এনআইডি সংশোধন, জন্ম নিবন্ধন, উপবৃত্তি, ভাতা, ট্রেড লাইসেন্স ও ভূমিসেবা সহ সকল সরকারি সেবার নির্ভুল তালিকা ও নির্দেশিকা।',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
