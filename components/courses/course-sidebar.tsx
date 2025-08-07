import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course } from "@/lib/data"

export default function CourseSidebar({ course }: { course: Course }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-lg">
        <div className="relative w-full h-48">
          <Image src="/placeholder.svg?height=200&width=300" alt="Course image" fill className="object-cover" />
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-3 py-1 rounded-br-lg font-semibold">
            FEATURED
          </div>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="text-3xl font-bold text-gray-800">${course.price.toFixed(2)}</div>
          <Button className="w-full bg-accent-yellow text-dark-background hover:bg-accent-yellow/90 py-3 text-lg font-semibold rounded-full">
            Buy Now
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Featured Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-1 text-accent-yellow">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < course.reviews[0]?.rating ? "fill-accent-yellow" : "fill-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-gray-700 text-sm">{course.reviews[0]?.comment || "No reviews yet."}</p>
        </CardContent>
      </Card>
    </div>
  )
}
