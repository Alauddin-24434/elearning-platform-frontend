"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Course } from "@/lib/data"
import { BookOpen, Clock } from "lucide-react"

export default function CourseDetailTabs({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        <TabsTrigger value="instructor">Instructor</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="py-6">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Course Description</h3>
          <p className="text-gray-700">{course.description}</p>

          <h3 className="text-2xl font-bold text-gray-800">What you'll learn from this course</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.whatYouWillLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">Certification</h3>
          <p className="text-gray-700">{course.certification}</p>
        </div>
      </TabsContent>
      <TabsContent value="curriculum" className="py-6">
        <div className="space-y-8">
          {course.curriculum.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <div className="flex items-center justify-between text-lg font-bold text-gray-800">
                <span>{section.section}</span>
                <span className="text-primary-green">{section.lessons[0]?.duration}</span>
              </div>
              <div className="space-y-3">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary-green" />
                      <span className="text-gray-700">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="instructor" className="py-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">About the Instructor</h3>
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt={course.instructor}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-semibold text-gray-800">{course.instructor}</h4>
              <p className="text-gray-600">Lead Instructor, Web Design</p>
            </div>
          </div>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="faqs" className="py-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800">What are the prerequisites for this course?</h4>
              <p className="text-gray-700 text-sm">
                No prior experience is required. This course is designed for beginners.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800">Will I receive a certificate upon completion?</h4>
              <p className="text-gray-700 text-sm">
                Yes, a certificate of completion will be issued after successfully finishing all modules.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800">How long do I have access to the course materials?</h4>
              <p className="text-gray-700 text-sm">
                You will have lifetime access to all course materials, including future updates.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
