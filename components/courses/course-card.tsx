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
    author?: { name?: string }
    category?: { name?: string }
    lessons?: { id: string }[]
    enrollments?: { id: string }[]
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  const lessonCount = course.lessons?.length ?? 0
  const studentCount = course.enrollments?.length ?? 0

  return (
    <Card className="overflow-hidden rounded-none p-0  bg-white shadow-xl  border-none hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 max-w-[400px]">
      <Link href={`/courses/${course.id}`}>
        
        {/* Thumbnail */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px"
          />
          <div className="absolute top-5 right-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-base font-bold shadow-md">
            {course.isFree ? "Free" : `$${course.price.toFixed(2)}`}
          </div>
        </div>

        {/* Course Info */}
        <CardContent className="p-4 space-y-2">
          <div className="text-sm font-semibold text-green-600 uppercase tracking-wider">
            {course.category?.name || "Uncategorized"}
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 leading-snug line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-500 text-base">
            By {course.author?.name || "Unknown Instructor"}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between p-8 border-t border-gray-100 text-gray-600 text-base bg-gray-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-500" />
            <span>{lessonCount} {lessonCount === 1 ? "Lesson" : "Lessons"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            <span>{studentCount} {studentCount === 1 ? "Student" : "Students"}</span>
          </div>
        </CardFooter>

      </Link>
    </Card>
  )
}
