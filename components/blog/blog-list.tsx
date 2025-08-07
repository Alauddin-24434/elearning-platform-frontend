"use client"

import { useState } from "react"
import { blogPosts } from "@/lib/data"
import BlogPostCard from "@/components/blog/blog-post-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function BlogList() {
  // Pagination logic (simplified for demo)
  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPosts = blogPosts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => <BlogPostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-gray-600 col-span-full">No blog posts found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  )
}
