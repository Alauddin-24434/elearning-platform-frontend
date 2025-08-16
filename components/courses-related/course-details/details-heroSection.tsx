"use client"

import Image from "next/image"
import { Star, Play, Users, CheckCircle, BookOpen, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import { useState } from "react"
import { Course } from "@/types"
import { Card } from "@/components/ui/card"

// Dynamically import ReactPlayer (SSR disabled)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

type CourseDetailsHeroProps = {
  course: Course
  enrolled: boolean
  onEnroll: () => void
  onContinue: () => void
}

const CourseDetailsHero = ({
  course,
  enrolled,
  onEnroll,
  onContinue,
}: CourseDetailsHeroProps) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <section className="relative overflow-hidden text-white">
      <div className="relative px-4 py-10 md:py-16 lg:py-16 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* =========================
              LEFT CONTENT: Title, Description, Stats, Buttons
          ========================== */}
          <div className="space-y-6 md:space-y-8">
            {/* Rating */}
            <div className="flex flex-wrap items-center gap-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm md:text-base text-white/90 font-medium">
                4.9 (1,247 reviews)
              </span>
            </div>

            {/* Course Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">
                  {course.enrollments?.length?.toLocaleString() ?? 0} students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">
                  {course.lessons?.length ?? 0} lessons
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {!enrolled && (
                <Button
                  onClick={onEnroll}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  Enroll Now - ${course.price}
                </Button>
              )}

              {enrolled && (
                <Button
                  onClick={onContinue}
                  variant="outline"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  Continue Learning
                </Button>
              )}

              <Button
                variant="outline"
                className="px-6 py-3 rounded-lg bg-gray-900 text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-800 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                What You'll Learn
              </Button>
            </div>
          </div>

          {/* =========================
              RIGHT CONTENT: Video / Thumbnail
              Fully responsive with aspect ratio
          ========================== */}
          <div className="w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
            <Card className="bg-gray-900 p-2 sm:p-4 border-none w-full max-w-xl">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                {activeVideo ? (
                  <ReactPlayer
                    src={activeVideo}
                    controls
                    width="100%"
                    height="100%"
                    className="rounded-2xl"
                  />
                ) : (
                  <>
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        size="icon"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-900 hover:bg-green-900 hover:scale-110 transition-all duration-300"
                        onClick={() => setActiveVideo(course.overviewVideo || "")}
                      >
                        <Play className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseDetailsHero
