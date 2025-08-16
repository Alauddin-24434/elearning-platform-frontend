"use client"
import { Button } from "@/components/ui/button"

interface LessonControlsProps {
  onPrev: () => void
  onNext: () => void
  disablePrev: boolean
  disableNext: boolean
}

export default function LessonControls({ onPrev, onNext, disablePrev, disableNext }: LessonControlsProps) {
  return (
    <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 flex justify-between flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={disablePrev}
        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 flex-1"
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={disableNext}
        className="bg-green-600 hover:bg-green-700 text-white flex-1"
      >
        Next
      </Button>
    </div>
  )
}
