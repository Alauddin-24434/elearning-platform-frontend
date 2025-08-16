"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/courses-related/course-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, List, Grid2X2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import { Course } from "@/types";

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const searchParams = useSearchParams();
  const category = searchParams.get("category")

  // 🔹 Debounce search term (500ms delay)
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // 🔹 Fetch from backend using RTK Query
  const { data, error, isLoading } = useGetAllCoursesQuery({
    category :category ,
    searchTerm: debouncedSearch,
    sort: sortBy,
    page: currentPage,
    limit: itemsPerPage,
  });

  console.log(data?.data)
  const courses = data?.data?.courses || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="py-16 md:py-24 ">
    

      <div className="container mx-auto px-6 md:px-10">
        {/* 🔹 Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Search */}
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select onValueChange={(value) => setSortBy(value)} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>

                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* View mode */}
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

        {/* 🔹 Course List */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load courses.</p>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-8"
              }
            >
              {courses.length > 0 ? (
                courses.map((course: Course) => <CourseCard key={course.id} course={course} />)
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  No courses found matching your criteria.
                </p>
              )}
            </div>

            {/* 🔹 Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
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
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1)
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  );
}
