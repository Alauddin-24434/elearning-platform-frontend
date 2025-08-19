"use client"

import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useGetOverViewsQuery } from "@/redux/features/dashboard/dashboardApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, BookOpen, TrendingUp } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

export default function DashboardOverview() {
  const user = useSelector(selectCurrentUser)
  const { data: overview, isLoading } = useGetOverViewsQuery({})

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          {/* Spinner Loader */}
          <div className="w-16 h-16 border-4 border-[#EFBD3E] border-t-[#97700C] rounded-full animate-spin mx-auto mb-4"></div>
          
        </div>
      </div>
    )
  if (!overview) return <p>No Data Found</p>

  const { data } = overview

  // ---------- Admin Graph Data ----------
  const monthlyRevenueData = {
    labels: data?.monthlyStats?.map((m: any) => m.month) || [],
    datasets: [
      {
        label: "Revenue",
        data: data?.monthlyStats?.map((m: any) => m.revenue) || [],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
      {
        label: "Payments",
        data: data?.monthlyStats?.map((m: any) => m.payments) || [],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
      },
    ],
  }

  const topCoursesData = {
    labels: data?.topCourses?.map((c: any) => c.title) || [],
    datasets: [
      {
        label: "Enrollments",
        data: data?.topCourses?.map((c: any) => c.enrollmentsCount) || [],
        backgroundColor: [
          "rgba(59,130,246,0.6)",
          "rgba(34,197,94,0.6)",
          "rgba(239,68,68,0.6)",
          "rgba(234,179,8,0.6)",
          "rgba(168,85,247,0.6)",
        ],
      },
    ],
  }

  // ---------- User Graph Data ----------
  const userProgressData = {
    labels: data?.progressPerCourse?.map((c: any) => c.title) || [],
    datasets: [
      {
        label: "Completed Lessons",
        data: data?.progressPerCourse?.map((c: any) => c.completedLessons) || [],
        backgroundColor: "rgba(59,130,246,0.6)",
      },
      {
        label: "Total Lessons",
        data: data?.progressPerCourse?.map((c: any) => c.totalLessons) || [],
        backgroundColor: "rgba(234,179,8,0.6)",
      },
    ],
  }

  const monthlyUserProgress = {
    labels: data?.monthlyProgress?.map((m: any) => m.month) || [],
    datasets: [
      {
        label: "Lessons Completed",
        data: data?.monthlyProgress?.map((m: any) => m.completedLessons) || [],
        backgroundColor: "rgba(34,197,94,0.6)",
      },
    ],
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* ---------- ADMIN OVERVIEW ---------- */}
      {user?.isAdmin && (
        <>
          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} /> Total Users
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{data?.totalUsers}</CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} /> Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{data?.totalCourses}</CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} /> Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">${data?.totalRevenue}</CardContent>
          </Card>

          <Card className="col-span-2 shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle>Monthly Revenue & Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={monthlyRevenueData} />
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle>Top 5 Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={topCoursesData} />
            </CardContent>
          </Card>
        </>
      )}

      {/* ---------- USER OVERVIEW ---------- */}
      {!user?.isAdmin && (
        <>
          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} /> Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{data?.enrolledCoursesCount}</CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} /> Completed Lessons
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{data?.completedLessonsCount}</CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} /> Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">${data?.totalSpent}</CardContent>
          </Card>

          <Card className="col-span-2 shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle>Progress per Course</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={userProgressData} />
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle>Monthly Lesson Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={monthlyUserProgress} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
