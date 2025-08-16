"use client"

import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useGetOverViewsQuery } from "@/redux/features/dashboard/dashboardApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Calendar, BookOpen, TrendingUp } from "lucide-react"
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
  const { data: overviews, isLoading } = useGetOverViewsQuery({})

  if (isLoading) return <p>Loading...</p>

  const {
    totalRevenue,
    revenueChange,
    totalUsers,
    usersChange,
    totalBookings,
    bookingsChange,
    totalServices,
    servicesChange,
    analytics,
    slotStats,
    myCoursesCount,
    myEnrollmentsCount,
    myEarnings,
    myCourseStats,
  } = overviews?.data || {}

  // Paid vs Free Chart (example for admin)
  const paidFreeLabels = ["Paid", "Free"]
  const paidFreeCounts = [
    slotStats?.paidCourses || 0,
    slotStats?.freeCourses || 0,
  ]
  const paidFreeData = {
    labels: paidFreeLabels,
    datasets: [
      {
        label: "Courses",
        data: paidFreeCounts,
        backgroundColor: ["#4ade80", "#60a5fa"],
      },
    ],
  }

  // Enrollments Trend (Bar Chart)
  const enrollLabels = analytics?.weeklyBookings?.map((d: any) => d.week) || []
  const enrollData = analytics?.weeklyBookings?.map((d: any) => d.count) || []
  const enrollmentsTrendData = {
    labels: enrollLabels,
    datasets: [
      {
        label: "Enrollments",
        data: enrollData,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  }

  // Admin Dashboard
  if (user?.isAdmin) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Manage platform data and performance.</p>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Total Earnings"
            value={`$${totalRevenue ?? 0}`}
            change={revenueChange}
            icon={<DollarSign />}
            color="from-green-500 to-green-600"
          />
          <SummaryCard
            title="Total Users"
            value={totalUsers ?? 0}
            change={usersChange}
            icon={<Users />}
            color="from-blue-500 to-blue-600"
          />
          <SummaryCard
            title="Total Enrollments"
            value={totalBookings ?? 0}
            change={bookingsChange}
            icon={<Calendar />}
            color="from-purple-500 to-purple-600"
          />
          <SummaryCard
            title="Total Courses"
            value={totalServices ?? 0}
            change={servicesChange}
            icon={<BookOpen />}
            color="from-orange-500 to-red-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Paid vs Free Courses</CardTitle></CardHeader>
            <CardContent>
              {paidFreeCounts.some(c => c > 0) ? <Pie data={paidFreeData} /> : <p>No data</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Enrollments Trend</CardTitle></CardHeader>
            <CardContent>
              {enrollLabels.length ? <Bar data={enrollmentsTrendData} /> : <p>No data</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // User Dashboard
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <p className="text-gray-600">Your courses and earnings overview.</p>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="My Courses"
          value={myCoursesCount ?? 0}
          color="from-green-500 to-green-600"
        />
        <SummaryCard
          title="My Enrollments"
          value={myEnrollmentsCount ?? 0}
          color="from-blue-500 to-blue-600"
        />
        <SummaryCard
          title="My Earnings"
          value={`$${myEarnings ?? 0}`}
          color="from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>My Course Enrollments Trend</CardTitle></CardHeader>
          <CardContent>
            {myCourseStats?.labels?.length ? (
              <Bar data={{
                labels: myCourseStats.labels,
                datasets: [
                  {
                    label: "Enrollments",
                    data: myCourseStats.data,
                    backgroundColor: "rgba(16, 185, 129, 0.7)",
                  },
                ],
              }} />
            ) : <p>No data</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SummaryCard({ title, value, change, icon, color }: any) {
  return (
    <Card className={`bg-gradient-to-br ${color} text-white`}>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium opacity-90">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center text-xs opacity-90">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{change}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  )
}
