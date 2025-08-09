import HeroSection from "@/components/home-related/hero-section"
import { BenefitsSection } from "@/components/home-related/benifits-section"

import PopularCoursesSection from "@/components/home-related/popular-courses-section"

import TrustedBySection from "@/components/home-related/trastedBySection"


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection/>
      <PopularCoursesSection />
      <BenefitsSection/>

   
    </>
  )
}
