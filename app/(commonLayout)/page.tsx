import HeroSection from "@/components/home/hero-section"
import { BenefitsSection } from "@/components/home/benifits-section"

import PopularCoursesSection from "@/components/home/popular-courses-section"

import TrustedBySection from "@/components/home/trastedBySection"


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
