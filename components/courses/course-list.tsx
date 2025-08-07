"use client"

import { useEffect, useState } from "react"
import CourseCard from "@/components/courses/course-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, List, Grid2X2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Course {
  id: string
  title: string
  description: string
  thumbnail?: string
  price: number
  isFree: boolean
  createdAt: string
  updatedAt: string
  couponId?: string | null
  author: {
    id: string
    name?: string
  }
  category: {
    id: string
    name?: string
  }
}

export default function CourseList() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("published")
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses")
        if (!res.ok) throw new Error("Failed to fetch courses")
        const data = await res.json()
        setCourses(data?.data)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || "An error occurred")
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  console.log(courses)

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.author?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCourses = filteredCourses.sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price
    if (sortBy === "price-desc") return b.price - a.price
    return 0
  })

  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentCourses = sortedCourses.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-4">
            <Select onValueChange={(value) => setSortBy(value)} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Newly published</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-full overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-none ${viewMode === "list" ? "bg-gray-200" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-none ${viewMode === "grid" ? "bg-gray-200" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Courses */}
        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-8"
              }
            >
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  No courses found matching your criteria.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  )
}
