import TestimonialHeroSection from "@/components/testimonials/hero-section"
import TestimonialGrid from "@/components/testimonials/testimonial-grid"
import StudentFeedbackSection from "@/components/testimonials/student-feedback-section"
import Link from "next/link"

export default function TestimonialPage() {
  return (
    <>
      <TestimonialHeroSection />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/testimonial" className="hover:underline">
          Testimonial
        </Link>
      </div>
      <TestimonialGrid />
      <StudentFeedbackSection />
    </>
  )
}
