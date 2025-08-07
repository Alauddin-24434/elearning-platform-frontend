export default function InstructorStatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            We've amazing skills for teaching.
          </h2>
          <p className="text-lg text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-8 lg:col-span-2">
          <div className="text-center space-y-2">
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
                  strokeDashoffset="25.12" // 90% of 251.2 (2 * PI * 40)
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                90%
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-700">Value for results</p>
          </div>
          <div className="text-center space-y-2">
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
                  strokeDashoffset="12.56" // 95% of 251.2
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                95%
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-700">Global experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}
