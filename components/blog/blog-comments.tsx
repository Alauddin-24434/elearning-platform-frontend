import type { BlogPost } from "@/lib/data"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function BlogComments({ post }: { post: BlogPost }) {
  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{post.blogComments.length} Comments</h2>
      <div className="space-y-8">
        {post.blogComments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt={comment.author}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                <span className="text-gray-500 text-sm">{comment.date}</span>
              </div>
              <p className="text-gray-700 text-sm">{comment.comment}</p>
              <Button variant="link" className="text-primary-green text-sm p-0 h-auto">
                Reply
              </Button>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <Image
                        src="/placeholder.svg?height=50&width=50"
                        alt={reply.author}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">{reply.author}</h4>
                          <span className="text-gray-500 text-sm">{reply.date}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{reply.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Write a comment</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input type="text" placeholder="Your Name *" className="rounded-full px-4 py-2" />
            <Input type="email" placeholder="Your Email *" className="rounded-full px-4 py-2" />
          </div>
          <Textarea placeholder="Your Comment *" rows={5} className="rounded-lg px-4 py-2" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" id="save-info" className="form-checkbox text-primary-green rounded" />
            <label htmlFor="save-info">
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>
          <Button
            type="submit"
            className="bg-primary-green text-white hover:bg-primary-green/90 px-8 py-3 rounded-full text-lg font-semibold"
          >
            Submit Comment
          </Button>
        </form>
      </div>
    </div>
  )
}
