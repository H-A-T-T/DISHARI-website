import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'সরকারি সুযোগ ও সহায়তা অনুসন্ধান | দিশারী',
  description: 'আপনার বয়স, শিক্ষা ও পেশা অনুযায়ী সরকারি উপবৃত্তি, প্রশিক্ষণ, ভাতা ও উদ্যোক্তা ঋণ সুবিধা খুঁজুন।',
}

export default function OpportunitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}