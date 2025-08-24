"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi"
import { Course } from "@/types"
import { CourseCardSkeleton } from "../courses-related/course-card-skeleton"
import { ArrowRight, BookOpen, Users } from "lucide-react"
import { Card, CardContent } from "../ui/card"

export default function PopularCoursesSection() {
  const { data, isLoading } = useGetAllCoursesQuery(undefined)

  const courses: Course[] = data?.data?.courses || []
  console.log(courses)

  // Skeleton placeholders
  const skeletons = Array(3).fill(0)

  return (
    <section className="py-20  bg-[#100d28] border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">Explore Popular Courses</h2>
          <Link href="/courses">
            <Button
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
            >
              View All Courses <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading &&
            skeletons.map((_, idx) => <CourseCardSkeleton key={idx} />)}

          {!isLoading &&
            courses?.map((course) => (
              <Link
                key={course?.id}
                href={`/courses/${course?.id}`} // 👈 dynamic link to course details
              >
                <Card className="bg-[#080613] border-slate-700 overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                  <div className="relative">
                    <img
                      src={course?.thumbnail || "/default-course.png"}
                      alt={course?.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-4 left-4 text-[#d8a111] font-semibold bg-slate-900/80 px-2 py-1 rounded">
                      ${course?.price}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {course?.title}
                    </h3>
                    <p className="text-slate-400 mb-4">By {course?.author?.name}</p>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {course?.lessonsCount || 0} Lessons
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course?.enrollmentsCount || 0} Students
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

          {!isLoading && courses.length === 0 && (
            <p className="text-slate-400 col-span-full text-center">
              No courses available.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
