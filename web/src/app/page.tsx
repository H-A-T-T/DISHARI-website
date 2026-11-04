import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedServices } from '@/components/home/FeaturedServices'
import { StatsSection } from '@/components/home/StatsSection'
import { AITeaser } from '@/components/home/AITeaser'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <HowItWorks />
      <FeaturedServices />
      <StatsSection />
      <AITeaser />
    </>
  )
}
