"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DollarSign,
  Users,
  Calendar,
  Car,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  Plus,
  Eye,
  BarChart3,
  Activity,
} from "lucide-react"
// import { useGetAdminDashboardQuery } from "@/redux/features/dashboard/dashbordApi"

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
import { useGetOverViewsQuery } from "@/redux/features/dashboard/dashboardApi"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "scheduled":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}



export default function DashboardOverview() {
  const [user] = useState({ role: "admin" }) // mock user

  const { data: overviews, isLoading } = useGetOverViewsQuery({})
  if (isLoading) return <p>Loading...</p>

  // ডাটা আনপ্যাক
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
    bookingStats,
    serviceStats,
    slotStats,
    userStats,
  } = overviews?.data || {}

  // 1. Slot Status Pie Chart Data
  type SlotStatusItem = { status: string; count: number }
  const slotStatusLabels = slotStats?.slotStatsByStatus?.map((item: SlotStatusItem) => item.status) || []
  const slotStatusCounts = slotStats?.slotStatsByStatus?.map((item: SlotStatusItem) => item.count) || []

  const slotStatusData = {
    labels: slotStatusLabels,
    datasets: [
      {
        label: "Slot Status",
        data: slotStatusCounts,
        backgroundColor: [
          "#4ade80", // green
          "#60a5fa", // blue
          "#facc15", // yellow
          "#f87171", // red
          "#a78bfa", // purple
          "#fbbf24", // orange
        ],
        hoverOffset: 30,
      },
    ],
  }

  // 2. Services Booking Bar Chart Data
  type Service = { name: string; totalBookings: number }
  const serviceNames = serviceStats?.services?.map((service: Service) => service.name) || []
  const serviceBookings = serviceStats?.services?.map((service: Service) => service.totalBookings) || []

  const servicesBookingData = {
    labels: serviceNames,
    datasets: [
      {
        label: "Total Bookings",
        data: serviceBookings,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // blue-500
      },
    ],
  }

  // 3. Daily Bookings Bar Chart Data
  const dailyLabels = analytics?.dailyBookings?.map((item: { date: string; count: number }) => item.date) || []
  const dailyData = analytics?.dailyBookings?.map((item: { date: string; count: number }) => item.count) || []

  const dailyBookingsData = {
    labels: dailyLabels,
    datasets: [
      {
        label: "Daily Bookings",
        data: dailyData,
        backgroundColor: "rgba(16, 185, 129, 0.7)", // green-500
      },
    ],
  }

  // 4. Weekly Bookings Bar Chart Data
  const weeklyLabels = analytics?.weeklyBookings?.map((item: { week: string; count: number }) => item.week) || []
  const weeklyData = analytics?.weeklyBookings?.map((item: { week: string; count: number }) => item.count) || []

  const weeklyBookingsData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: "Weekly Bookings",
        data: weeklyData,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // blue-500
      },
    ],
  }

  if (user.role === "admin") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue ?? 0}</div>
              <div className="flex items-center text-xs opacity-90">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{revenueChange ?? 0}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Users</CardTitle>
              <Users className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers ?? 0}</div>
              <div className="flex items-center text-xs opacity-90">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{usersChange ?? 0}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Enrollments</CardTitle>
              <Calendar className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings ?? 0}</div>
              <div className="flex items-center text-xs opacity-90">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{bookingsChange ?? 0}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Courses</CardTitle>
              <Car className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalServices ?? 0}</div>
              <div className="flex items-center text-xs opacity-90">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{servicesChange ?? 0}% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Slot Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Slot Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {slotStatusLabels.length > 0 ? (
                <Pie data={slotStatusData} />
              ) : (
                <p className="text-center text-gray-500">No slot status data available.</p>
              )}
            </CardContent>
          </Card>

          {/* Services Booking Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings Per Service</CardTitle>
            </CardHeader>
            <CardContent>
              {serviceNames.length > 0 ? (
                <Bar data={servicesBookingData} options={{ responsive: true }} />
              ) : (
                <p className="text-center text-gray-500">No service booking data available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Daily and Weekly Bookings Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Daily Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {dailyLabels.length > 0 ? (
                <Bar data={dailyBookingsData} options={{ responsive: true }} />
              ) : (
                <p className="text-center text-gray-500">No daily bookings data available.</p>
              )}
            </CardContent>
          </Card>

          {/* Weekly Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {weeklyLabels.length > 0 ? (
                <Bar data={weeklyBookingsData} options={{ responsive: true }} />
              ) : (
                <p className="text-center text-gray-500">No weekly bookings data available.</p>
              )}
            </CardContent>
          </Card>
        </div>

       

    
      </div>
    )
  }

  return <p>Unauthorized or user dashboard not implemented here.</p>
}
