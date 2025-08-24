"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetEnrollmentsByUserIdQuery } from "@/redux/features/enrollment/enrollmentApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function MyEnrollments() {
  const user = useSelector(selectCurrentUser);

  const { data, isLoading, isError } = useGetEnrollmentsByUserIdQuery(user?.id);
  const courses = data?.data;

if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-16 h-16 border-4 border-[#EFBD3E] border-t-[#97700C] rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    )

  if (isError) {
    return <p className="text-center py-10 text-red-500">Failed to load your enrollments.</p>;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">You have no enrolled courses!</h2>
        <p className="mb-6 text-gray-600">Browse new courses and start learning now.</p>
        <Link
          href="/courses"
          className="inline-block px-6 py-3 rounded-full font-semibold transition"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My Enrollments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course: any) => (
          <Card
            key={course.id}
            className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.03] bg-white border-none"
          >
            <Link href={`/lesson/${course.id}`}>
              {/* Thumbnail */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px"
                />
                <div className="absolute top-4 right-4 bg-[#d8a111] text-[#100d28] px-3 py-1 rounded-full font-bold text-sm shadow-md">
                  {course.isFree ? "Free" : `$${course.price ?? 0}`}
                </div>
              </div>

              {/* Course Info */}
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">By {course.authorName || "Unknown"}</p>

                {/* Progress */}
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{course.lessonsCount} Lessons</span>
                    {course.progressPercentage && (
                      <span>{course.progressPercentage}% Completed</span>
                    )}
                  </div>
                  {course.progressPercentage && (
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#d8a111] rounded-full"
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Footer */}
              <CardFooter className="flex justify-between items-center p-4 bg-gray-50 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#d8a111]" />
                  <span>{course.lessonsCount} Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#d8a111]" />
                  <span>{course.enrollmentsCount} Students</span>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
