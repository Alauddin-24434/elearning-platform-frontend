"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"

export default function CheckoutPage() {
  const { slug } = useParams()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [createPayment, { isLoading }] = useCreatePaymentMutation()

  const user = useSelector(selectCurrentUser)
  console.log(user)
  const userId = user?.id
  console.log(userId)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:5000/api/courses/${slug}`)
        if (!res.ok) throw new Error("Failed to fetch course details")
        const data = await res.json()
        setCourse(data?.data)
      } catch (err: any) {
        setError(err.message || "Something went wrong.")
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchCourse()
  }, [slug])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

  const handlePayment = async () => {
    if (!userId) {
      alert("You must be logged in to make a payment.")
      return
    }

    const payload = {
      userId,
      courseId: slug,
      amount: course?.price,
      phone: "01871155040", // Replace with dynamic phone if you have user phone stored
      currency: "BDT",
      provider: "AamarPay",
    }

    try {
      const response = await createPayment(payload).unwrap()

      // Assuming response.url is the payment redirect URL
      if (response?.url) {
        window.location.href = response.url // redirect user to payment page
      } else {
        alert("Payment URL not received.")
      }
    } catch (err: any) {
      alert(err?.data?.message || "Payment initiation failed.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Checkout</h1>

      {course && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Course Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <Image
                src={course.thumbnail || "/placeholder.png"}
                alt={course.title}
                width={1200}
                height={600}
                className="w-full h-64 object-cover"
              />
            </div>

            <h2 className="text-3xl font-semibold text-gray-900">{course.title}</h2>
          </div>

          {/* Summary Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h3>

            <div className="space-y-4 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>Course Price</span>
                <span className="font-medium">৳{course.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">৳0</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>৳{course.price}</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full mt-6 text-lg py-6"
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
