import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star } from "lucide-react"
import { testimonials } from "@/lib/data"

export default function StudentTestimonialSection() {
  const featuredTestimonial = testimonials[0] // Using the first testimonial as the main one

  return (
    <section className="py-16 md:py-24 ">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Student with books"
            width={500}
            height={500}
            className="rounded-lg shadow-lg mx-auto"
          />
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md text-sm">
            <p className="font-semibold">{featuredTestimonial.author}</p>
            <p className="text-gray-600">has liked this classes!</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary-green">
            <Star className="w-6 h-6 fill-primary-green" />
            <span className="text-lg font-semibold">Students feedback</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Providing amazing online education.
          </h2>
          <p className="text-lg text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the
            industry's standard dummy.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary-green font-bold text-xl">01</span>
              <div>
                <h4 className="font-semibold text-lg">Learn with Experts instructors</h4>
                <p className="text-sm">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-green font-bold text-xl">02</span>
              <div>
                <h4 className="font-semibold text-lg">Highly flexible learning time</h4>
                <p className="text-sm">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-green font-bold text-xl">03</span>
              <div>
                <h4 className="font-semibold text-lg">Amazing skills for teaching</h4>
                <p className="text-sm">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </li>
          </ul>
          <Button
            asChild
            className="bg-primary-green text-white hover:bg-primary-green/90 px-8 py-3 rounded-full text-lg font-semibold"
          >
            <Link href="/testimonial">Explore more</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
