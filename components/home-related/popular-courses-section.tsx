"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi"
import CourseCard from "../courses-related/course-card"
import { Course } from "@/types"
import { CourseCardSkeleton } from "../courses-related/course-card-skeleton"

export default function PopularCoursesSection() {
  const { data, error, isLoading } = useGetAllCoursesQuery(undefined)

  const courses = data?.data?.courses || []

  // Skeleton Card Array (to show while loading)
  const skeletons = Array(6).fill(0)

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-left gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Explore Popular Courses
          </h2>
          <Button asChild variant="link" className="hover:underline text-lg sm:text-xl font-semibold">
            <Link href="/courses">View All Courses →</Link>
          </Button>
        </div>

        {/* Courses Carousel / Grid */}
        <div className="relative">
          <div className="flex overflow-x-auto space-x-6 md:space-x-8 pb-4 snap-x snap-mandatory">
            {isLoading
              ? skeletons.map((_, idx) => <CourseCardSkeleton key={idx} />)
              : courses.map((course: Course) => <CourseCard key={course.id} course={course} />)}

          </div>
        </div>
      </div>
    </section>
  )
}
