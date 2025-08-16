"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useEnrollCourseMutation } from "@/redux/features/enrollment/enrollmentApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import CourseDetailsHero from "@/components/courses-related/course-details/details-heroSection"
import { Course } from "@/types"
import CourseDetailsMainSection from "@/components/courses-related/course-details/details-mainSection"

export default function CourseDetails() {
  // ✅ Extract course slug from dynamic route
  const { slug } = useParams()

  // ✅ Local state management
  const [course, setCourse] = useState<Course | null>(null) // Store course details
  const [enrolled, setEnrolled] = useState(false) // Track enrollment status
  const [loading, setLoading] = useState(false) // Loading state for UI feedback
  const [error, setError] = useState("") // Error message state

  // ✅ Get logged-in user from Redux store
  const user = useSelector(selectCurrentUser)
  const userId = user?.id

  // ✅ Router instance for navigation
  const router = useRouter()

  // ✅ Enrollment mutation hook
  const [enrollCourse] = useEnrollCourseMutation()

  // ==============================
  // 🔹 Fetch course details on mount or when slug/user changes
  // ==============================
  useEffect(() => {
    if (!slug) return

    const fetchCourse = async () => {
      try {
        setLoading(true)

        // 🔹 Fetch course details from API
        const res = await fetch(
          `http://localhost:5000/api/courses/${slug}`
        )
        if (!res.ok) throw new Error("Failed to fetch course details")

        const data = await res.json()
        setCourse(data?.data)

        // 🔹 Check if current user is already enrolled
        const isUserEnrolled = data?.data?.enrollments?.some(
          (enrollment: any) => enrollment.userId === user?.id
        )
        setEnrolled(isUserEnrolled)
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [slug, user?.id])

  // ==============================
  // 🔹 Handle Course Enrollment
  // ==============================
  const handleEnroll = async () => {
    if (!user) {
      // If user not logged in → redirect to login page
      return router.push("/login")
    }

    if (course?.isFree) {
      // 🔹 Direct enrollment for free courses
      const body = { userId, courseId: course.id }
      try {
        await enrollCourse(body).unwrap()
        alert("Enrolled successfully!")
        setEnrolled(true)
      } catch (error) {
        alert("Enrollment failed, please try again.")
      }
    } else {
      // 🔹 Redirect to checkout page for paid courses
      router.push(`/checkout/${slug}`)
    }
  }

  // ==============================
  // 🔹 Continue to Lessons if Enrolled
  // ==============================
  const handleContinue = () => {
    router.push(`/lesson/${slug}`)
  }

  // ==============================
  // 🔹 UI Rendering Logic
  // ==============================
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Spinner Loader */}
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading amazing content...</p>
        </div>
      </div>
    )

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>
  if (!course) return <p className="text-center py-10">Course not found.</p>

  return (
    <div className="min-h-screen container mx-auto">
      {/* ✅ Hero Section with Enroll/Continue actions */}
      <CourseDetailsHero
        course={course}
        enrolled={enrolled}
        onEnroll={handleEnroll}
        onContinue={handleContinue}
      />

      {/* ✅ Main Course Content Section */}
      <CourseDetailsMainSection course={course} />
    </div>
  )
}
