import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { WeatherAdvisory } from '@/components/home/WeatherAdvisory'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedServices } from '@/components/home/FeaturedServices'
import { AITeaser } from '@/components/home/AITeaser'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WeatherAdvisory />
      <CategoryGrid />
      <HowItWorks />
      <FeaturedServices />
      <AITeaser />
    </>
  )
}
