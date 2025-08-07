import Image from "next/image"
import { Star } from "lucide-react"

export default function StudentFeedbackSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Student with backpack"
            width={500}
            height={500}
            className="rounded-lg shadow-lg mx-auto"
          />
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md text-sm">
            <p className="font-semibold">Rachel has liked this classes!</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary-green">
            <Star className="w-6 h-6 fill-primary-green" />
            <span className="text-lg font-semibold">Students feedback</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Genius people to say positive words.
          </h2>
          <p className="text-lg text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the
            industry's standard dummy.
          </p>
          <div className="text-center mt-8">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary-green"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset="7.536" // 97% of 251.2
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                99%
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-700">Student's complete course successfully.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
