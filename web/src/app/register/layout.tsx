import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'নতুন অ্যাকাউন্ট তৈরি করুন | দিশারী',
  description: 'দিশারীতে নিবন্ধন করে স্মার্ট ডকুমেন্ট লকার ও স্বয়ংক্রিয় ফর্ম পূরণ সেবা গ্রহণ করুন।',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
