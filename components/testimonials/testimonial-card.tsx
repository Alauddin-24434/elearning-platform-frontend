import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Testimonial } from "@/lib/data"

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md text-center p-6">
      <CardContent className="space-y-4">
        <Image
          src={testimonial.image || "/placeholder.svg"}
          alt={testimonial.author}
          width={80}
          height={80}
          className="rounded-full object-cover mx-auto border-2 border-primary-green"
        />
        <h3 className="text-xl font-bold text-gray-800">{testimonial.author}</h3>
        <p className="text-primary-green text-sm">{testimonial.role}</p>
        <div className="flex items-center justify-center gap-1 text-accent-yellow">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? "fill-accent-yellow" : "fill-gray-300"}`} />
          ))}
        </div>
        <p className="text-gray-700 text-sm">{testimonial.comment}</p>
        <p className="text-gray-500 text-xs">{testimonial.date}</p>
      </CardContent>
    </Card>
  )
}
