import { instructors } from "@/lib/data"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function InstructorGrid() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <Card key={instructor.id} className="overflow-hidden rounded-lg shadow-md text-center">
              <CardContent className="p-0">
                <Image
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{instructor.name}</h3>
                  <p className="text-primary-green text-sm">{instructor.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
