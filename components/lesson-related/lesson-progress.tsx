"use client"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

interface LessonProgressProps {
  completedLessons: number
  totalLessons: number
  progressPercentage: number
  totalDuration: number
}

export default function LessonProgress({ completedLessons, totalLessons, progressPercentage, totalDuration }: LessonProgressProps) {
  return (
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
          <span className="text-sm font-medium text-white">{totalDuration} mins</span>
        </div>
      </div>
    </div>
  )
}
