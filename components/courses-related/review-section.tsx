"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useAddReviewMutation, useGetReviewsByCourseIdQuery } from "@/redux/features/review/reviewAPi"

export default function ReviewSection({ courseId }: { courseId: string }) {
  const user = useSelector(selectCurrentUser)
  const { data: reviews, isLoading } = useGetReviewsByCourseIdQuery(courseId)
  const [addReview] = useAddReviewMutation()

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("Please login to add a review.")
      return
    }

    try {
      await addReview({
        userId: user.id,
        courseId,
        ratings: rating,
        comment,
      }).unwrap()

      setComment("")
      setRating(5)
    } catch (err) {
      alert("Failed to add review. Try again.")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>

      {/* Reviews List */}
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews?.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review.id} className="border-b pb-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{review.user?.name || "Anonymous"}</span>
                <span className="text-yellow-500">⭐ {review.ratings}</span>
              </div>
              <p className="text-gray-700 mt-1">{review.comment}</p>
              <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first!</p>
      )}

      {/* Add Review Form */}
      {user && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-1 p-2 border rounded w-full"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Write your feedback..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#d8a111] text-white px-4 py-2 rounded hover:bg-[#b5890f] transition"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  )
}
