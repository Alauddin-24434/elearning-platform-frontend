import { blogPosts } from "@/lib/data"
import BlogPostCard from "@/components/blog/blog-post-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LatestArticlesSection() {
  const latestPosts = blogPosts.slice(0, 3) // Display first 3 as latest

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Latest articles</h2>
          <Button asChild variant="link" className="text-primary-green hover:underline">
            <Link href="/blog">Explore all articles</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
