"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { CheckCircle, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Lesson } from "@/types"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

import LessonHeader from "@/components/lesson-related/lesson-header"
import LessonPlayer from "@/components/lesson-related/lesson-player"
import LessonControls from "@/components/lesson-related/lesson-controlls"
import { useGetLessonsBySlugQuery, useUpdateLessonProgressMutation } from "@/redux/features/lession/lessonApi"


const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

export default function LearnPage() {
  const { slug } = useParams()
 
  const { data, isLoading, isError } = useGetLessonsBySlugQuery(slug)
  const [updateProgress] = useUpdateLessonProgressMutation()

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (data?.data) {
      setLessons(data.data)
      setCurrentLesson((prev) => prev || data.data[0])
    }
  }, [data])

  const currentLessonIndex = currentLesson
    ? lessons.findIndex((lesson) => lesson.id === currentLesson.id)
    : 0

  const totalLessons = lessons.length
  const completedLessons = lessons.filter((lesson) => lesson.isProgressCompleted).length
  const progressPercentage = (completedLessons / totalLessons) * 100

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLesson(lessons[currentLessonIndex - 1])
      setIsPlaying(false)
    }
  }

  const goToNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLesson(lessons[currentLessonIndex + 1])
      setIsPlaying(false)
    }
  }

  const handleVideoEnd = async () => {
    if (!currentLesson) return
    try {
      await updateProgress({ lessonId: currentLesson.id, courseId: currentLesson.courseId }).unwrap()

      setLessons((prev) =>
        prev.map((l) =>
          l.id === currentLesson.id ? { ...l, isProgressCompleted: true } : l
        )
      )
    } catch (err) {
      console.log("Failed to update progress", err)
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#100D28]">
        <div className="w-16 h-16 border-4 border-[#EFBD3E] border-t-[#97700C] rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    )

  if (isError) return <p className="text-center py-10 text-red-500">Failed to load lessons</p>

  return (
    <div className="min-h-screen bg-[#100d28] text-white flex flex-col pb-4">
      <LessonHeader
        currentLessonTitle={currentLesson?.title || ""}
        currentIndex={currentLessonIndex + 1}
        totalLessons={totalLessons}
      />

      <div className="container mx-auto flex flex-1 flex-col md:flex-row gap-4">
        {/* Main Content */}
        <div className="flex-1 flex flex-col order-2 md:order-1">
          <LessonPlayer
            video={currentLesson?.video || ""}
            onEnded={handleVideoEnd}
          />

          <Card className="bg-[#080613] p-4 mt-4 border-none">
            <LessonControls
              onPrev={goToPreviousLesson}
              onNext={goToNextLesson}
              disablePrev={currentLessonIndex === 0}
              disableNext={currentLessonIndex === totalLessons - 1}
            />

            <div className="bg-transparent border border-[#241D59] p-6 mt-2 md:mt-4 rounded-xl">
              <h3 className="text-lg font-semibold text-[#d8a111] mb-4">Course Progress</h3>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32">
                  <CircularProgressbar
                    value={progressPercentage}
                    text={`${progressPercentage.toFixed(0)}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#d2a111",
                      trailColor: "#374151",
                    })}
                  />
                </div>
              </div>

              <div className="mt-4 text-center space-y-1">
                <div>
                  <span className="text-sm text-gray-400">Lessons Completed: </span>
                  <span className="text-sm font-medium text-white">
                    {completedLessons}/{totalLessons}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Total Duration: </span>
                  <span className="text-sm font-medium text-white">
                    {lessons.reduce((sum, l) => sum + Number(l.duration || 0), 0)} mins
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 bg-[#080613] border-t border-gray-900 md:border-t-0 md:border-l md:flex-shrink-0 order-1 md:order-2">
          <div className="flex-1 overflow-y-auto">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson)
                  setIsPlaying(false)
                }}
                className={`p-4 border-b border-[#32287B] cursor-pointer hover:bg-[#32287B] transition-colors ${
                  currentLesson?.id === lesson.id ? "bg-[#241D59] border-l-4 border-l-[#d2a111]" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-700 text-xs">
                    {lesson.isProgressCompleted ? (
                      <CheckCircle className="w-4 h-4 text-[#d8a111]" />
                    ) : (
                      <span className="text-gray-400">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white mb-1">{lesson.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration} mins</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
