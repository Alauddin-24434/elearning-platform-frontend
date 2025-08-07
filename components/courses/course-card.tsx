import Image from "next/image"
import Link from "next/link"
import { BookOpen, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CourseCardProps {
  course: {
    id: string
    title: string
    thumbnail?: string
    price: number
    isFree: boolean
    author?: {
      name?: string
    }
    category?: {
      name?: string
    }
    lessons?: { id: string }[]
    enrollments?: { id: string }[]
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  const lessonCount = course.lessons?.length ?? 0
  const studentCount = course.enrollments?.length ?? 0

  return (
    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/courses/${course.id}`}>
        {/* Thumbnail */}
        <div className="relative w-full h-48">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 bg-primary-green text-white px-3 py-1 rounded-full text-sm font-semibold">
            {course.isFree ? "Free" : `$${course.price.toFixed(2)}`}
          </div>
        </div>

        {/* Course Info */}
        <CardContent className="p-6 space-y-3">
          <div className="text-sm font-semibold text-gray-500 uppercase">
            {course.category?.name || "Uncategorized"}
          </div>
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{course.title}</h3>
          <p className="text-gray-600 text-sm">
            By {course.author?.name || "Unknown Instructor"}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between p-6 border-t text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{lessonCount} {lessonCount === 1 ? "Lesson" : "Lessons"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{studentCount} {studentCount === 1 ? "Student" : "Students"}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
