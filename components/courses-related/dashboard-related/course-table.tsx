"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, BookPlus } from "lucide-react"
import type { Course } from "@/types"

interface CourseTableProps {
  courses: Course[]
  onEditCourse: (course: Course) => void
  onDeleteCourse: (id: string) => void
  onAddLesson: (courseId: string) => void
}

export default function CourseTable({ courses, onEditCourse, onDeleteCourse, onAddLesson }: CourseTableProps) {
  return (
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
          {courses.map((course: Course) => (
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
                    <Button variant="outline" className="h-8 w-8 px-2 hover:bg-muted bg-transparent">
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
                    <DropdownMenuItem onClick={() => onEditCourse(course)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onAddLesson(course.id)}
                      className="text-blue-600 focus:text-blue-600"
                    >
                      <BookPlus className="mr-2 h-4 w-4" /> Add Lesson
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteCourse(course.id)}
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
  )
}
