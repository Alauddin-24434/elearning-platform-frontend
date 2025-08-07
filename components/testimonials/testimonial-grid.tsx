import { testimonials } from "@/lib/data"
import TestimonialCard from "@/components/testimonials/testimonial-card"

export default function TestimonialGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        <div className="text-center mt-12 text-lg font-semibold text-gray-700">
          10000+ student trusting our eLearning classes.
        </div>
      </div>
    </section>
  )
}
