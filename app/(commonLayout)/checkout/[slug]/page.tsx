"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi"
import { useGetCourseByIdQuery } from "@/redux/features/course/courseApi"
import { useParams } from "next/navigation"

export default function CheckoutPage() {
  const { slug } = useParams()
  const user = useSelector(selectCurrentUser)
  const userId = user?.id

  const { data: courseResponse, isLoading, error } = useGetCourseByIdQuery(slug)
  const course = courseResponse?.data

  const [createPayment, { isLoading: isPaying }] = useCreatePaymentMutation()

  const handleAamarPayPayment = async () => {
    if (!userId) return alert("You must be logged in to pay.")

    const payload = {
      userId,
      courseId: slug,
      amount: course?.price,
      phone: user?.phone || "01871155040",
      currency: "BDT",
      provider: "AamarPay",
    }

    try {
      const response = await createPayment(payload).unwrap()
      if (response?.url) window.location.href = response.url
      else alert("Payment URL not received.")
    } catch (err: any) {
      alert(err?.data?.message || "Payment initiation failed")
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#100D28]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#EFBD3E] border-t-[#97700C] rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    )

  if (error) return <p className="text-center text-red-500 mt-10">Failed to load course.</p>

  return (
    <div className="px-4 py-16 bg-[#100D28] text-white ">
      <div className="container mx-auto">
        {course && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
         {/* Left Column */}
<div className="flex-1 space-y-4 bg-[#080613] rounded-2xl p-4 lg:p-6">
  <div className="relative overflow-hidden rounded-2xl shadow-lg">
    <Image
      src={course.thumbnail || "/placeholder.png"}
      alt={course.title}
      width={1200}
      height={600}
      className="w-full h-60 object-cover"
      unoptimized
    />

    {/* Title on image */}
    <h2 className="absolute top-3 right-2 text-lg lg:text-xl font-bold text-white bg-black/60 px-3 py-2 rounded-md">
      {course.title}
    </h2>
  </div>
</div>


            {/* Right Column */}
            <div className="w-full lg:w-96 bg-[#080613] rounded-2xl p-4 lg:p-5 flex flex-col">
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Order Summary</h3>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Course Price</span>
                  <span className="font-medium">Tk {course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium">Tk 0</span>
                </div>
              </div>

              <hr className="border-gray-600 my-2" />

              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>Tk {course.price}</span>
              </div>

              {/* Button always bottom */}
              <Button
                onClick={handleAamarPayPayment}
                disabled={isPaying}
                className="w-full py-3 text-lg bg-[#d8a111] hover:bg-[#C18F10] text-[#100d28] mt-auto cursor-pointer"
              >
                {isPaying ? "Processing..." : "Pay with AamarPay"}
              </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
