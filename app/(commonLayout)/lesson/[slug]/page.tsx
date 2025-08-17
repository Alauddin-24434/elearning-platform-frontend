"use client"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Search, CheckCircle, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import dynamic from "next/dynamic"
import { Lesson } from "@/types"
import { Card } from "@/components/ui/card"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

import LessonHeader from "@/components/lesson-related/lesson-header"
import LessonPlayer from "@/components/lesson-related/lesson-player"
import LessonControls from "@/components/lesson-related/lesson-controlls"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

export default function LearnPage() {
  const { slug } = useParams()
  const router = useRouter()

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  const token = useSelector((state: RootState) => state.learningAuth.token)

  useEffect(() => {
    if (!slug) return

    const fetchLessons = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://learning-platform-backend-production-839d.up.railway.app/api/lessons/${slug}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch course lessons")
        const data = await res.json()

        setLessons(data?.data || [])
        if (data?.data?.length > 0) {
          setCurrentLesson(data.data[0])
        }
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [slug, token])

  if (!lessons.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        {loading ? "Loading lessons..." : error || "No lessons found"}
      </div>
    )
  }

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

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ✅ Update lesson progress when video ends
  const updateProgress = async () => {
    if (!currentLesson) return
    try {
      await fetch("https://learning-platform-backend-production-839d.up.railway.app/api/lessons/progress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({
          lessonId: currentLesson.id,
          courseId: currentLesson.courseId,
        }),
      })

      setLessons((prev) =>
        prev.map((l) =>
          l.id === currentLesson.id ? { ...l, isProgressCompleted: true } : l
        )
      )
    } catch (err) {
      console.log("Failed to update progress", err)
    }
  }

  return (
    <div className="min-h-screen container mx-auto bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <LessonHeader
        currentLessonTitle={currentLesson?.title || ""}
        currentIndex={currentLessonIndex + 1}
        totalLessons={totalLessons}
      />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Main Content */}
        <div className="flex-1 flex flex-col order-2 md:order-1">
          <LessonPlayer
            video={currentLesson?.video || ""}
            onEnded={updateProgress}
          />

          <Card className="bg-gray-900 p-4 mt-4 border-none">
            {/* Controls */}
            <LessonControls
              onPrev={goToPreviousLesson}
              onNext={goToNextLesson}
              disablePrev={currentLessonIndex === 0}
              disableNext={currentLessonIndex === totalLessons - 1}
            />

            {/* Progress Card */}
            <div className="bg-gray-800 border-t border-gray-700 p-6 mt-2 md:mt-4 rounded-xl">
              <h3 className="text-lg font-semibold text-green-500 mb-4">Course Progress</h3>

              <div className="flex items-center justify-center">
                <div className="w-32 h-32">
                  <CircularProgressbar
                    value={progressPercentage}
                    text={`${progressPercentage.toFixed(0)}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#16a34a",
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
        <div className="w-full md:w-80 bg-gray-900 border-t border-gray-900 md:border-t-0 md:border-l md:flex-shrink-0 order-1 md:order-2">
          {/* Search */}
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search Lesson"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto">
            {filteredLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson)
                  setIsPlaying(false)
                }}
                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                  currentLesson?.id === lesson.id
                    ? "bg-purple-900/30 border-l-4 border-l-purple-500"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-700 text-xs">
                    {lesson.isProgressCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
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
