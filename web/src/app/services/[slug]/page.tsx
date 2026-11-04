import { Suspense } from 'react'
import ServiceDetailContent from './ServiceDetailContent'

const KNOWN_SLUGS = [
  'passport', 'passport-renewal', 'nid-correction', 'birth-registration',
  'birth-registration-correction', 'death-registration', 'widow-allowance',
  'old-age-allowance', 'disability-allowance', 'scholarship', 'trade-license',
  'land-mutation', 'tin-certificate', 'tax-return', 'overseas-welfare-card',
]

export function generateStaticParams() {
  return KNOWN_SLUGS.map((slug) => ({ slug }))
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
