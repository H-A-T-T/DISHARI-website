import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedServices } from '@/components/home/FeaturedServices'
import { HowItWorks } from '@/components/home/HowItWorks'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedServices />
      <HowItWorks />
    </>
  )
}
