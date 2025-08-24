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
  const { data: overview, isLoading } = useGetOverViewsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

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
  console.log(data)

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





  // ----------------- User Charts -----------------

  // Revenue Comparison Data
  const revenueComparisonData = {
    labels: ["Weekly", "Monthly", "Yearly", "Total"],
    datasets: [
      {
        
        data: [
          data?.weeklyRevenue || 0,
          data?.monthlyRevenue || 0,
          data?.yearlyRevenue || 0,
          data?.totalRevenue || 0,
        ],
        backgroundColor: [
          "rgba(59,130,246,0.6)", // blue
          "rgba(34,197,94,0.6)",  // green
          "rgba(234,179,8,0.6)",  // yellow
          "rgba(239,68,68,0.6)",  // red
        ],
      },
    ],
  }


 

  return (
    <div>
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

</div>












  
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* ----------------- USER VIEW ----------------- */}
      {!user?.isAdmin && (
        <>
          {/* Key Cards */}
          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} /> My Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{data?.enrolledCoursesCount}</CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} /> My Created Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{data?.createdCoursesCount}</CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} /> My Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">${data?.totalSpent}</CardContent>
          </Card>
          <Card className="shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} /> My Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">${data?.totalRevenue}</CardContent>
          </Card>

          {/* Revenue Comparison Chart */}
          <Card className="col-span-2 shadow-md rounded-xl border border-gray-100">
            <CardHeader>
              <CardTitle>Revenue Comparison</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Bar
                data={revenueComparisonData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display:false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
                className="w-full lg:w-4/5 h-80"
              />

              {/* Show exact revenue outside chart */}
              <div className="flex justify-around w-full mt-4 text-gray-700 font-semibold">
                <span>Weekly: ${data?.weeklyRevenue || 0}</span>
                <span>Monthly: ${data?.monthlyRevenue || 0}</span>
                <span>Yearly: ${data?.yearlyRevenue || 0}</span>
                <span>Total: ${data?.totalRevenue || 0}</span>
              </div>
            </CardContent>
          </Card>

          {/* Enrollments & Revenue per Course Table */}
          {data?.enrollmentsPerCourse?.length > 0 && (
            <Card className="col-span-2 shadow-md rounded-xl border border-gray-100">
              <CardHeader>
                <CardTitle>Enrollments & Revenue per Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-gray-700">Course</th>
                        <th className="px-4 py-2 text-gray-700">Enrollments</th>
                        <th className="px-4 py-2 text-gray-700">Revenue ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.enrollmentsPerCourse.map((c: any) => (
                        <tr key={c.courseId} className="hover:bg-gray-100">
                          <td className="px-4 py-2">{c.title}</td>
                          <td className="px-4 py-2">{c.enrollments}</td>
                          <td className="px-4 py-2">{c.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
    </div>

  )
}
