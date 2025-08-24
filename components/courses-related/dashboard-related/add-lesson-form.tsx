"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { BookPlus } from "lucide-react"
import { useCreateLessonMutation } from "@/redux/features/lession/lessonApi"

interface AddLessonFormProps {
  courseId: string
  onClose: () => void
}

type LessonFormValues = {
  title: string
  duration: string
  video: FileList
}

export default function AddLessonForm({ courseId, onClose }: AddLessonFormProps) {
  const { register, handleSubmit, reset } = useForm<LessonFormValues>()
  const [loading, setLoading] = useState(false)
  const [createLesson] = useCreateLessonMutation()

  const onSubmit = async (data: LessonFormValues) => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("duration", data.duration)
      formData.append("courseId", courseId)
      if (data.video && data.video[0]) formData.append("video", data.video[0])

      const result = await createLesson(formData).unwrap()
      console.log("Lesson created:", result)
      reset()
      onClose()
    } catch (error) {
      console.error("Error creating lesson:", error)
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
