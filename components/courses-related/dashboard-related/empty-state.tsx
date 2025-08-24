"use client"

import { BookPlus } from "lucide-react"
import AddCourseDialog from "./add-course-dialog"

interface EmptyStateProps {
  isAddDialogOpen: boolean
  setIsAddDialogOpen: (open: boolean) => void
}

export default function EmptyState({ isAddDialogOpen, setIsAddDialogOpen }: EmptyStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
          <BookPlus className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">No courses yet</h2>
          <p className="text-muted-foreground">Start building your course library by creating your first course</p>
        </div>
        <AddCourseDialog isOpen={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      </div>
    </div>
  )
}
