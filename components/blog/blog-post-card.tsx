import Image from "next/image"
import Link from "next/link"
import { Heart, MessageSquare } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { BlogPost } from "@/lib/data"

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${post.id}`}>
        <div className="relative w-full h-48">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-6 space-y-3">
          <p className="text-gray-600 text-sm">By {post.author}</p>
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{post.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{post.teaser}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-end p-6 border-t text-gray-600 text-sm gap-4">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{post.comments}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
