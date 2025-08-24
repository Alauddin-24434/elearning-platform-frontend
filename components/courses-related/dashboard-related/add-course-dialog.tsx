"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import CourseForm from "./create-course-form"

interface AddCourseDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddCourseDialog({ isOpen, onOpenChange }: AddCourseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#32287B] text-white hover:bg-[#241D59] font-medium shadow-sm cursor-pointer">
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-none" style={{ zIndex: 50 }}>
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">Create New Course</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill out the details below to add a new course to your collection
          </DialogDescription>
        </DialogHeader>
        <CourseForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
