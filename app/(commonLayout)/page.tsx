import HeroSection from "@/components/home-related/hero-section"
import { BenefitsSection } from "@/components/home-related/benifits-section"

import PopularCoursesSection from "@/components/home-related/popular-courses-section"
import TestimonialSection from "@/components/home-related/testemonials-section"
import PricingSection from "@/components/home-related/pricing-section"
import NewsLetterSection from "@/components/home-related/news-letter-section"
import WhyChooseSection from "@/components/home-related/why-choose-section"



export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection/>
      {/* <BenefitsSection /> */}

      <PopularCoursesSection />
       <TestimonialSection />
       <PricingSection/>

     
      <NewsLetterSection/>
     

    </>
  )
}
