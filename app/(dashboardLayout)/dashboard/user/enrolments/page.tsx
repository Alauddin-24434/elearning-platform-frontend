"use client";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { BookOpen, Users } from "lucide-react";

import { Course } from "@/types";

import { useGetMeByIdQuery } from "@/redux/features/auth/authApi";

import Link from "next/link";
import Image from "next/image";

export default function MyEnrollments() {
  const { data: userData, isLoading, isError } = useGetMeByIdQuery(undefined);

  const courses = userData?.data?.courses;

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500">Loading your enrollments...</p>;
  }

  if (isError) {
    return <p className="text-center py-10 text-red-500">Failed to load your enrollments. Please try again later.</p>;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">You have no enrolled courses!</h2>
    <p className="mb-6 text-gray-600">Browse new courses and start learning now.</p>
        <Link
          href="/courses"
          className="inline-block bg-[#00362f] text-white  px-6 py-3 rounded-full font-semibold  transition"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Enrollments</h1>
          <p className="text-gray-600">Boost your knowledge. Keep learning!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course: Course) => (
          <Card
            key={course.id}
            className="overflow-hidden rounded-none p-0 bg-white shadow-xl border-none hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 max-w-[400px]"
          >
            <Link href={`/courses/${course.id}`}>
              {/* Thumbnail */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px"
                />
                <div className="absolute top-5 right-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-base font-bold shadow-md">
                  {course.isFree ? "Free" : `$${course.price?.toFixed(2)}`}
                </div>
              </div>

              {/* Course Info */}
              <CardContent className="p-4 space-y-2">
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                  {course.category?.name || "Uncategorized"}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 leading-snug line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-base">
                  By {course.author?.name || "Unknown Instructor"}
                </p>
              </CardContent>

              {/* Footer */}
              <CardFooter className="flex items-center justify-between p-8 border-t border-gray-100 text-gray-600 text-base bg-gray-50">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span>
                    {course.lessions?.length}{" "}
                    {course.lessions?.length === 1 ? "Lesson" : "Lessons"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>
                    {course.enrollments?.length}{" "}
                    {course.enrollments?.length === 1 ? "Student" : "Students"}
                  </span>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
