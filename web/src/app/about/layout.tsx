import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে ও জাতীয় ভিশন | দিশারী',
  description:
    'সরকারি সেবা সহজ ভাষায় দেশের প্রতিটি নাগরিকের কাছে পৌঁছে দেওয়াই দিশারীর একমাত্র লক্ষ্য ও অঙ্গীকার।',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
