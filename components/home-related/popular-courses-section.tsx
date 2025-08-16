"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi"
import CourseCard from "../courses-related/course-card"
import { Course } from "@/types"

export default function PopularCoursesSection() {
  const { data, error, isLoading } = useGetAllCoursesQuery(undefined)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading courses</p>

 
  const courses = data?.data?.courses|| []
  return (
    <section className=" py-20 text-white">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            Discover Our Popular Courses
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button asChild variant="link" className="hover:underline text-2xl font-semibold">
              <Link href="/courses">View All Courses →</Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course:Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
