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
    <div className=" px-6 py-4 flex justify-between flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={disablePrev}
        className="bg-transparent text-white flex-1"
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={disableNext}
        className="bg-[#d8a111] hover:bg-[#C18F10] text-[#100d28] flex-1"
      >
        Next
      </Button>
    </div>
  )
}
