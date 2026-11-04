import type { Metadata } from 'next'
import { Suspense } from 'react'
import ServiceDetailContent from './ServiceDetailContent'
import { fetchAllServices } from '@/lib/api'

export const metadata: Metadata = {
  title: 'সরকারি সেবা বিস্তারিত | দিশারী',
  description:
    'প্রয়োজনীয় কাগজপত্র, নির্ধারিত সরকারি ফি, আবেদন প্রক্রিয়া ও অফিসিয়াল তথ্যাবলী।',
}

export async function generateStaticParams() {
  const services = await fetchAllServices()
  return services.map((s) => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <Suspense>
      <ServiceDetailContent slug={slug} />
    </Suspense>
  )
}
