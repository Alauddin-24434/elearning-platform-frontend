"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { useCreateCourseMutation, useUpdateCourseMutation } from "@/redux/features/course/courseApi"
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import type { Course } from "@/types"

interface CourseFormProps {
  course?: Course
  onClose: () => void
}

type CourseFormValues = {
  title: string
  price: number
  isFree: boolean
  categoryId: string
  description: string
  authorId: string
  features?: string
  overviews?: string
  stack?: string

  // 👇 file inputs
  thumbnail?: FileList
  overviewVideo?: FileList
}


export default function CourseForm({ course, onClose }: CourseFormProps) {
  const user = useSelector(selectCurrentUser)
  const [createCourse] = useCreateCourseMutation()
  const [updateCourse] = useUpdateCourseMutation()

  // Preview states
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(
    course?.thumbnail || null
  )
  const [previewVideo, setPreviewVideo] = useState<string | null>(
    course?.overviewVideo || null
  )

  const { register, reset, handleSubmit } = useForm<CourseFormValues>({
    defaultValues: course
      ? {
        title: course.title,
        price: course.price,
        isFree: course.isFree,
        categoryId: course.categoryId,
        description: course.description,
        authorId: course.authorId,
        features: course.features?.join(", "),
        overviews: course.overviews?.join(", "),
        stack: course.stack?.join(", "),
      }
      : {}, // ✅ new course → no defaults
  })

  const { data: categoryData } = useGetAllCategoriesQuery(undefined)

  // Handlers for preview
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreviewThumbnail(URL.createObjectURL(file))
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreviewVideo(URL.createObjectURL(file))
  }

  const onSubmit = async (data: any) => {
    try {
      // Prepare arrays from comma-separated strings
      const payload = {
        title: data.title,
        price: data.price,
        isFree: data.isFree,
        categoryId: data.categoryId,
        description: data.description,
        authorId: user?.id || "",
        features: data.features?.split(",").map((item: string) => item.trim()) || [],
        overviews: data.overviews?.split(",").map((item: string) => item.trim()) || [],
        stack: data.stack?.split(",").map((item: string) => item.trim()) || [],
      }

      if (course) {
        // JSON update (no FormData)
        await updateCourse({ id: course.id, data: payload }).unwrap()
      } else {
        // If creating, use FormData for files
        const formData = new FormData()
        Object.entries(payload).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${key}[]`, v))
          } else {
            formData.append(key, value as any)
          }
        })
        if (data.thumbnail && data.thumbnail[0]) formData.append("thumbnail", data.thumbnail[0])
        if (data.overviewVideo && data.overviewVideo[0]) formData.append("overviewVideo", data.overviewVideo[0])
        await createCourse(formData).unwrap()
      }

      reset()
      onClose()
    } catch (err) {
      console.error("Error submitting course:", err)
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* hidden authorId */}
      <input type="hidden" value={user?.id} {...register("authorId")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            placeholder="Enter course title"
            {...register("title", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("price", {
              setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              required: true,
            })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="isFree">Course Type</Label>
          <select
            id="isFree"
            {...register("isFree", { setValueAs: (v) => v === "true" })}
            className="w-full h-10 border rounded-md px-3"
          >
            <option value="false">Paid Course</option>
            <option value="true">Free Course</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            {...register("categoryId", { required: true })}
            className="w-full h-10 border rounded-md px-3"
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

      {/* Only show file inputs when creating a new course */}
      {!course && (
        <>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Course Thumbnail</Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              onChange={(e) => {
                handleThumbnailChange(e)
                register("thumbnail").onChange(e)
              }}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail Preview"
                className="w-40 h-28 object-cover mt-2 rounded-md border"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="overviewVideo">Upload Video</Label>
            <Input
              id="overviewVideo"
              type="file"
              accept="video/*"
              {...register("overviewVideo")}
              onChange={(e) => {
                handleVideoChange(e)
                register("overviewVideo").onChange(e)
              }}
            />
            {previewVideo && (
              <video
                src={previewVideo}
                controls
                className="w-60 h-36 mt-2 rounded-md border"
              />
            )}
          </div>
        </>
      )}


      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="w-full min-h-[100px] border rounded-md px-3 py-2"
          placeholder="Describe your course..."
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="features">Course Features</Label>
          <Input id="features" placeholder="e.g., Lifetime access, Certificate" {...register("features")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overviews">Course Overview</Label>
          <Input id="overviews" placeholder="e.g., What students will learn" {...register("overviews")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stack">Technology Stack</Label>
          <Input id="stack" placeholder="e.g., React, Node.js, MongoDB" {...register("stack")} />
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
