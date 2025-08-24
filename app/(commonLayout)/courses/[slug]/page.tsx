"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useEnrollCourseMutation } from "@/redux/features/enrollment/enrollmentApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import CourseDetailsHero from "@/components/courses-related/course-details/details-heroSection"
import CourseDetailsMainSection from "@/components/courses-related/course-details/details-mainSection"
import { useGetCourseByIdQuery } from "@/redux/features/course/courseApi"
import ReviewSection from "@/components/courses-related/review-section"

export default function CourseDetails() {
  const { slug } = useParams()

  // ✅ Get logged-in user
  const user = useSelector(selectCurrentUser)
  const userId = user?.id
  const router = useRouter()

  const [enrollCourse] = useEnrollCourseMutation()

  // 🔹 Fetch course data
  const { data: courseResponse, isLoading: courseLoading, error } = useGetCourseByIdQuery(slug)
  const course = courseResponse?.data;


  // ✅ Private route check with redirect memory
  useEffect(() => {
    if (user === null) {
      router.push(`/login?redirect=/courses/${slug}`)
    }
  }, [user, slug, router])
  // ✅ Enrolled state (sync with course data when it arrives)
  const [enrolled, setEnrolled] = useState(false)
  useEffect(() => {
    if (course?.isEnrolled) {
      setEnrolled(true)
    } else {
      setEnrolled(false)
    }
  }, [course?.isEnrolled])

  // =========================
  // 🔹 Handle Course Enrollment
  // =========================
  const handleEnroll = async () => {
    if (!user) return router.push(`/login?redirect=/courses/${slug}`)

    if (course?.isFree) {
      const body = { userId, courseId: course.id }
      try {
        await enrollCourse(body).unwrap()
        alert("Enrolled successfully!")
        setEnrolled(true)
      } catch (error) {
        alert("Enrollment failed, please try again.")
      }
    } else {
      router.push(`/checkout/${slug}`)
    }
  }

  const handleContinue = () => {
    router.push(`/lesson/${slug}`)
  }

  // =========================
  // 🔹 Loading UI
  // =========================
  if (!user || courseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#100d28] text-white">
        <div className="w-16 h-16 border-4 border-[#EFBD3E] border-t-[#97700C] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) return <p className="text-center text-red-500 mt-10">Failed to load course.</p>

  return (
    <div className="min-h-screen bg-[#100d28]">
      <CourseDetailsHero
        course={course}
        enrolled={enrolled}
        onEnroll={handleEnroll}
        onContinue={handleContinue}
      />
      <CourseDetailsMainSection course={course} />

      {/* <ReviewSection courseId={course.id} /> */}
    </div>
  )
}
