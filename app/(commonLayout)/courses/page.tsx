"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/courses-related/course-card";
import { CourseCardSkeleton } from "@/components/courses-related/course-card-skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
import { useSearchParams } from "next/navigation";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import { Course } from "@/types";

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // 🔹 Debounce search for fast frontend
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400); // 400ms debounce
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // 🔹 Fetch courses
  const { data, error, isLoading } = useGetAllCoursesQuery({
    category,
    searchTerm: debouncedSearch,
    sort: sortBy,
    page: currentPage,
    limit: itemsPerPage,
  });

  const courses = data?.data?.courses || [];
  const totalPages = data?.totalPages || 1;
  const skeletons = Array(itemsPerPage).fill(0);

  // 🔹 Clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setSortBy("");
    setCurrentPage(1);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-10">

        {/* 🔹 Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Sort & Clear Filters */}
          <div className="flex items-center gap-3 md:gap-6">
            <Select onValueChange={(value) => setSortBy(value)} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px] rounded-full border border-gray-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="rounded-full border-gray-300 hover:bg-gray-100"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* 🔹 Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? skeletons.map((_, idx) => <CourseCardSkeleton key={idx} />)
            : courses.length > 0
            ? courses.map((course: Course) => <CourseCard key={course.id} course={course} />)
            : (
              <p className="text-center text-gray-600 col-span-full">
                No courses found matching your criteria.
              </p>
            )}
        </div>

        {/* 🔹 Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-12 flex justify-center">
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
      </div>
    </section>
  );
}
