"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Search,  Eye, Edit, Trash2, Plus, BookPlus} from "lucide-react"
import { useForm } from "react-hook-form"
import Pagination from "@/components/shared/pagenation"

import type { Course } from "@/types"
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetMyCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/features/course/courseApi"
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import Link from "next/link"

export default function MyCourses() {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const limit = 5
  const user = useSelector(selectCurrentUser)

  const { data: courseData } = useGetMyCoursesQuery({
    searchTerm,
    page,
    limit,
  })
  const [deleteCourseById] = useDeleteCourseMutation()
  const courses = courseData?.data?.courses || []

  const [createCourse] = useCreateCourseMutation()
  const [updateCourse] = useUpdateCourseMutation()

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourseById(id).unwrap()
    } catch (err) {
      console.error("Failed to delete course", err)
    }
  }

  const CourseForm = ({
    course,
    onClose,
  }: {
    course?: Course
    onClose: () => void
  }) => {
    const { register, reset, handleSubmit } = useForm({
      defaultValues: {
        isFree: course?.isFree ?? false,
        price: course?.price ?? 0,
        title: course?.title ?? "",
        categoryId: course?.categoryId ?? "",
        description: course?.description ?? "",
        features: course?.features?.join(", ") ?? "",
        overviews: course?.overviews?.join(", ") ?? "",
        stack: course?.stack?.join(", ") ?? "",
        thumbnail: undefined as FileList | undefined,
        overviewVideo: undefined as FileList | undefined,
        authorId: user?.id,
      },
    })

    const { data: categoryData } = useGetAllCategoriesQuery(undefined)

    const onSubmit = async (data: any) => {
      try {
        const formData = new FormData()
        formData.append("price", String(data.price))
        formData.append("isFree", data.isFree ? "true" : "false")
        formData.append("title", data.title)
        formData.append("categoryId", data.categoryId)
        formData.append("description", data.description)
        formData.append("authorId", data.authorId)

        if (data.thumbnail && data.thumbnail[0]) {
          formData.append("thumbnail", data.thumbnail[0])
        }
        if (data.overviewVideo && data.overviewVideo[0]) {
          formData.append("overviewVideo", data.overviewVideo[0])

        }

        data.features?.split(",").forEach((item: string) => formData.append("features[]", item.trim()))
        data.overviews?.split(",").forEach((item: string) => formData.append("overviews[]", item.trim()))
        data.stack?.split(",").forEach((item: string) => formData.append("stack[]", item.trim()))

        if (course) {
          await updateCourse({ id: course.id, body: formData }).unwrap()
        } else {
          await createCourse(formData).unwrap()
        }
        reset()
        onClose()
      } catch (err) {
        console.error("Error submitting course:", err)
      }
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Course Title
            </Label>
            <Input
              id="title"
              placeholder="Enter course title"
              {...register("title", { required: true })}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true, required: true })}
              className="h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="isFree" className="text-sm font-medium">
              Course Type
            </Label>
            <select
              id="isFree"
              {...register("isFree", { setValueAs: (v) => v === "true" })}
              className="w-full h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="false">Paid Course</option>
              <option value="true">Free Course</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId" className="text-sm font-medium">
              Category
            </Label>
            <select
              id="categoryId"
              {...register("categoryId", { required: true })}
              className="w-full h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select Category</option>
              {categoryData?.data?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail" className="text-sm font-medium">
            Course Thumbnail
          </Label>
          <Input
            id="thumbnail"
            type="file"
            {...register("thumbnail")}
            accept="image/*"
            className="h-10 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoFile">Upload Video</Label>
          <Input id="overviewVideo" type="file" accept="video/*" {...register("overviewVideo", { required: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="w-full min-h-[100px] border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            placeholder="Describe your course..."
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="features" className="text-sm font-medium">
              Course Features
            </Label>
            <Input
              id="features"
              placeholder="e.g., Lifetime access, Certificate, 24/7 Support"
              {...register("features")}
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">Separate multiple features with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overviews" className="text-sm font-medium">
              Course Overview
            </Label>
            <Input
              id="overviews"
              placeholder="e.g., What students will learn, Prerequisites"
              {...register("overviews")}
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">Separate multiple points with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stack" className="text-sm font-medium">
              Technology Stack
            </Label>
            <Input
              id="stack"
              placeholder="e.g., React, Node.js, MongoDB, TypeScript"
              {...register("stack")}
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
          </div>
        </div>

        <DialogFooter className="gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#d5d52b] hover:bg-[#c4c428] text-[#313e3b] font-medium">
            {course ? "Update" : "Create"} Course
          </Button>
        </DialogFooter>
      </form>
    )
  }



  function AddLessonForm({ courseId, onClose }: { courseId: string; onClose: () => void }) {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: any) => {
      try {
        setLoading(true)

        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("duration", data.duration)
        formData.append("courseId", courseId)
        formData.append("video", data.video[0]) // multer will pick this

        const res = await fetch("https://learning-platform-backend-production-839d.up.railway.app/api/lessons", {
          method: "POST",
          body: formData,
        })

        if (!res.ok) throw new Error("Upload failed")

        const result = await res.json()
        console.log("Lesson created:", result)
        // onClose()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input id="title" {...register("title", { required: true })} placeholder="Introduction to React" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register("duration")} placeholder="e.g., 10:25" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Upload Video</Label>
            <Input id="video" type="file" accept="video/*" {...register("video", { required: true })} />
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
              <BookPlus className="w-4 h-4 mr-2" />
              {loading ? "Uploading..." : "Add Lesson"}
            </Button>
          </DialogFooter>
        </form>
      </div>
    )
  }


  const AddCourseDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#00362f] hover:bg-[#004d42] text-white font-medium shadow-sm">
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
        <CourseForm onClose={() => setIsAddDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  )

  if (!courses.length) {
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
          <AddCourseDialog />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">Manage and organize your course content</p>
        </div>
        <AddCourseDialog />
      </div>

      <Card className=" border-none bg-white">

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

          <div className="rounded-lg overflow-hidden">
            <Table className="border-none">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Course Title</TableHead>
                  <TableHead className="font-semibold">Enrollments</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Total Earnings</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course:Course) => (
                  <TableRow key={course.id} className="hover:bg-muted/25">
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.enrollments?.length || 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      {course.isFree ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Free
                        </span>
                      ) : (
                        <span className="font-medium">${course.price}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">${course.totalEarn || "0.00"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="h-8 w-8 px-2 hover:bg-muted">
                            View
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white border-none" style={{ zIndex: 60 }}>
                          <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/courses/${course.id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingCourse(course)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Course
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedCourseId(course.id)
                              setIsAddLessonOpen(true)
                            }}
                            className="text-blue-600 focus:text-blue-600"
                          >
                            <BookPlus className="mr-2 h-4 w-4" /> Add Lesson
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

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
