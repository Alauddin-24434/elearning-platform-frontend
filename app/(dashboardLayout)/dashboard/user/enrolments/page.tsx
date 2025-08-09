"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import Pagination from "@/components/shared/pagenation"

import { Course } from "@/types"
import { useGetMyCoursesQuery } from "@/redux/features/course/courseApi"

export default function MyEnrollments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const limit = 5
  const router = useRouter()

  const { data: courseData } = useGetMyCoursesQuery({ searchTerm, page, limit })
  const courses = courseData?.data

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Enrollments</h1>
          <p className="text-gray-600">Boost your knowledge. Keep learning!</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search enrolled courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course: Course) => (
          <Card key={course.id} className="flex flex-col h-full">
            <img
              src={course.thumbnail || "/placeholder.jpg"}
              alt={course.title}
              className="w-full h-40 object-cover rounded-t-md"
            />
            <CardHeader className="flex-1">
              <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description || "No description available."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => router.push(`/course/${course.slug}`)}
              >
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} length={courses?.length} limit={limit} />
    </div>
  )
}
