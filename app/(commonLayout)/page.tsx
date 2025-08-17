import HeroSection from "@/components/home-related/hero-section"
import { BenefitsSection } from "@/components/home-related/benifits-section"

import PopularCoursesSection from "@/components/home-related/popular-courses-section"



export default function HomePage() {
  return (
    <>
      <HeroSection />

      <PopularCoursesSection />
      <BenefitsSection />


    </>
  )
}
