"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search } from "lucide-react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useDeleteCourseMutation, useGetCoursesByAuthorQuery } from "@/redux/features/course/courseApi"
import Pagination from "@/components/shared/pagenation"
import type { Course } from "@/types"
import EmptyState from "@/components/courses-related/dashboard-related/empty-state"
import AddCourseDialog from "@/components/courses-related/dashboard-related/add-course-dialog"
import CourseTable from "@/components/courses-related/dashboard-related/course-table"
import CourseForm from "@/components/courses-related/dashboard-related/create-course-form"
import AddLessonForm from "@/components/courses-related/dashboard-related/add-lesson-form"

// Import our new components

export default function MyCourses() {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const limit = 5
  const user = useSelector(selectCurrentUser)

  const { data: courseData ,isLoading,isError} = useGetCoursesByAuthorQuery(user?.id)
  const [deleteCourseById] = useDeleteCourseMutation()
  const courses = courseData?.data
  console.log("courses", courses)

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourseById(id).unwrap()
    } catch (err) {
      console.error("Failed to delete course", err)
    }
  }

  const handleAddLesson = (courseId: string) => {
    setSelectedCourseId(courseId)
    setIsAddLessonOpen(true)
  }
    if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#EFBD3E] border-t-[#97700C] rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    )

  if (isError) return <p className="text-center py-10 text-red-500">Failed to load lessons</p>


  if (!courses) {
    return <EmptyState isAddDialogOpen={isAddDialogOpen} setIsAddDialogOpen={setIsAddDialogOpen} />
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">Manage and organize your course content</p>
        </div>
        <AddCourseDialog isOpen={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      </div>

      <Card className="border-none bg-white">
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
          </div>

          <CourseTable
            courses={courses}
            onEditCourse={setEditingCourse}
            onDeleteCourse={handleDeleteCourse}
            onAddLesson={handleAddLesson}
          />

          <Pagination page={page} setPage={setPage} length={courses.length} limit={limit} />
        </CardContent>
      </Card>

      {/* Edit Course Dialog */}
      <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" style={{ zIndex: 50 }}>
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold">Edit Course</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update your course information and settings
            </DialogDescription>
          </DialogHeader>
          {editingCourse && <CourseForm course={editingCourse} onClose={() => setEditingCourse(null)} />}
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-none" style={{ zIndex: 50 }}>
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold">Add New Lesson</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Add a new lesson to your course with video content
            </DialogDescription>
          </DialogHeader>
          {selectedCourseId && <AddLessonForm courseId={selectedCourseId} onClose={() => setIsAddLessonOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
