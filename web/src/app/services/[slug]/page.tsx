import { Suspense } from 'react'
import ServiceDetailContent from './ServiceDetailContent'
import { fetchAllServices } from '@/lib/api'

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
