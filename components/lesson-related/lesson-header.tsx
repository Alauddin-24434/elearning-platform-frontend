"use client"
import { ChevronLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface LessonHeaderProps {
  currentLessonTitle: string
  currentIndex: number
  totalLessons: number
}

export default function LessonHeader({ currentLessonTitle, currentIndex, totalLessons }: LessonHeaderProps) {
  const router = useRouter()
  return (
    <header className="container mx-auto  py-4 flex-shrink-0">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#d2a111]" />
            <h1 className="text-lg font-semibold">{currentLessonTitle || "Lesson"}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-[#d2a111] text-[#100D28] py-2">
            Running Module • Started
          </Badge>
          <span className="text-sm text-gray-400">
            {currentIndex}/{totalLessons}
          </span>
        </div>
      </div>
    </header>
  )
}
