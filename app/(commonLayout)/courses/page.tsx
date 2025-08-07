import Image from "next/image"
import CourseList from "@/components/courses/course-list"
import Link from "next/link"

export default function CoursesPage() {
  return (
    <>
   
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/courses" className="hover:underline">
          All Courses
        </Link>
      </div>
      <CourseList />
    </>
  )
}
