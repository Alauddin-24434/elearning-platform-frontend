import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { BlogPost } from "@/lib/data"
import { Heart, MessageSquare } from "lucide-react"
import Link from "next/link"
import BlogPostCard from "@/components/blog/blog-post-card"

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <article className="lg:col-span-2 prose prose-gray max-w-none dark:prose-invert">
        <div className="space-y-2 not-prose mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">{post.title}</h1>
          <p className="text-muted-foreground">
            Posted on {post.date} by {post.author}
          </p>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost as BlogPost} />
              ))}
            </div>
          </div>
        )}
      </article>
      <aside className="lg:col-span-1 space-y-8">
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About the Author</h3>
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt={post.author}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{post.author}</h4>
              <p className="text-gray-600 text-sm">Content Creator</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </Card>
        {/* Placeholder for popular posts or categories */}
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Categories</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Web Design
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Development
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Marketing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Business
              </Link>
            </li>
          </ul>
        </Card>
      </aside>
    </div>
  )
}
