"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Search, ChevronLeft, Play, CheckCircle, Clock, BookOpen, FileText, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

// Mock course data
const mockCourse = {
  id: "1",
  title: "Getting Started With GraphQL",
  lessons: [
    {
      id: "1",
      title: "Getting Started with GraphQL",
      duration: "8 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      completed: true,
    },
    {
      id: "2",
      title: "Setting Up a GraphQL Project",
      duration: "15 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      completed: false,
    },
    {
      id: "3",
      title: "Defining Schema and Resolvers",
      duration: "20 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      completed: false,
    },
    {
      id: "4",
      title: "Retrieving Single Products by ID",
      duration: "12 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      completed: false,
    },
    {
      id: "5",
      title: "Structuring Your Project Files",
      duration: "18 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      completed: false,
    },
    {
      id: "6",
      title: "Querying Category Data",
      duration: "14 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      completed: false,
    },
    {
      id: "7",
      title: "Establishing a One-to-One Relationship - Product and Category",
      duration: "11 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      completed: false,
    },
    {
      id: "8",
      title: "Establishing a One-to-Many Relationship - Category and Products",
      duration: "16 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      completed: false,
    },
    {
      id: "9",
      title: "Creating a One-to-Many Relationship - Product and Reviews",
      duration: "13 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      completed: false,
    },
    {
      id: "10",
      title: "Wrapping Up",
      duration: "8 min",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      completed: false,
    },
  ],
}

export default function LearnPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [course] = useState(mockCourse)
  const [currentLesson, setCurrentLesson] = useState(mockCourse.lessons[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [notes, setNotes] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredLessons = course.lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const currentLessonIndex = course.lessons.findIndex((lesson) => lesson.id === currentLesson.id)
  const totalLessons = course.lessons.length
  const completedLessons = course.lessons.filter((lesson) => lesson.completed).length
  const progressPercentage = (completedLessons / totalLessons) * 100

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLesson(course.lessons[currentLessonIndex - 1])
    }
  }

  const goToNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLesson(course.lessons[currentLessonIndex + 1])
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-gray-300 hover:text-white">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h1 className="text-lg font-semibold">{course.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-600 text-white">
              Running Module • Started
            </Badge>
            <span className="text-sm text-gray-400">
              {currentLessonIndex + 1}/{totalLessons}
            </span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="flex-1 bg-black relative">
            {isClient && currentLesson?.video ? (
              <ReactPlayer
                url={currentLesson.video}
                width="100%"
                height="100%"
                controls
                playing
                className="absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Loading video...</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousLesson}
                disabled={currentLessonIndex === 0}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                Previous
              </Button>
              <Button
                onClick={goToNextLesson}
                disabled={currentLessonIndex === totalLessons - 1}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-800 border-t border-gray-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">Notes</span>
              <span className="text-sm text-gray-500">Copyright Warning</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Note Title

Write Something Awesome..."
                className="w-full bg-transparent text-gray-300 placeholder-gray-500 resize-none border-none outline-none min-h-[100px]"
              />
              <div className="flex justify-end mt-4">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
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

          {/* Progress */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-400 font-medium">BONUS: Be A GraphQL Guru</span>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-400 mb-3">
              {completedLessons} of {totalLessons}
            </div>
            <Progress value={progressPercentage} className="mb-4" />
          </div>

          {/* Current Lesson */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">{currentLesson?.title}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Play className="w-3 h-3" />
              <span>{currentLesson?.duration}</span>
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto">
            {filteredLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                  currentLesson?.id === lesson.id ? "bg-purple-900/30 border-l-4 border-l-purple-500" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-700 text-xs">
                    {lesson.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-gray-400">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white mb-1">{lesson.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
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
