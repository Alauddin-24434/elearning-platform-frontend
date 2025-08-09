"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star, Check, Play, Users, Clock, Award, BarChart, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useEnrollCourseMutation } from "@/redux/features/enrollment/enrollmentApi"

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  isFree: boolean
  authorId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  couponId: string | null
  features?: string[]
  overviews?: string[]
  stack?: string[]
  author: {
    id: string
    name: string
    email: string
    avatar: string | null
    isAdmin: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  category: {
    id: string
    name: string
  }
  lessons: {
    id: string
    title: string
    duration: string
    videoUrl: string
    courseId: string
    createdAt: string
    updatedAt: string
  }[]
  enrollments: {
    id: string
    userId: string
    courseId: string
    enrolledAt: string
  }[]
}

export default function CourseDetails() {
  const { slug } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [enrolled, setEnrolled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const user = useSelector(selectCurrentUser)
  const router = useRouter()
  const [enrollCourse, { isLoading: enrolling }] = useEnrollCourseMutation()

  useEffect(() => {
    if (!slug) return

    const fetchCourse = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:5000/api/courses/${slug}`)
        if (!res.ok) throw new Error("Failed to fetch course details")
        const data = await res.json()
        setCourse(data?.data)

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

  const handleEnroll = async () => {
    if (!user) {
      alert("Please login to enroll")
      return
    }

    if (course?.isFree) {
      const body={ userId: user.id, courseId: course.id }
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

  if (loading) return <p className="text-center py-10">Loading course details...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>
  if (!course) return <p className="text-center py-10">Course not found.</p>

  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-gray-600 text-sm font-medium">5.0 (976 reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-gray-700 max-w-xl">
              {course.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-gray-800 font-medium">
              {course.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleEnroll}
                disabled={enrolling || enrolled}
                className={`px-8 py-3 rounded-md text-lg font-semibold ${
                  enrolled
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {enrolled ? "Continue Course" : enrolling ? "Enrolling..." : "Enroll Now"}
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 px-8 py-3 rounded-md text-lg font-semibold"
              >
                See Curriculum
              </Button>
            </div>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={course.thumbnail}
              alt={`${course.title} Thumbnail`}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <Button
                variant="ghost"
                size="icon"
                className="w-20 h-20 rounded-full bg-white/80 hover:bg-white flex items-center justify-center"
              >
                <Play className="w-10 h-10 text-orange-500 fill-orange-500" />
                <span className="sr-only">Play video</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md px-4 text-base font-medium"
            >
              Overview
            </TabsTrigger>

            <TabsTrigger
              value="testimonials"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md px-4 text-base font-medium"
            >
              Testimonials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Course Overview</h2>
                <ul className="space-y-3 text-gray-700">
                  {course.overviews?.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-500 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {course.stack?.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="sr-only">Course Statistics</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span>{course.enrollments?.length ?? 0} Total Enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span>Full-Time: 12 weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-orange-500" />
                    <span>All levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span>Completion Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">14/150</span>
                    <span>Seats Free</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <p className="py-10 text-center text-gray-500">Testimonials content coming soon...</p>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
