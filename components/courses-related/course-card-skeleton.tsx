export function CourseCardSkeleton() {
  return (
    <div className="max-w-[300px] flex-shrink-0 bg-white shadow-xl rounded-xl overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-300" />

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 bg-gray-100 h-12">
        <div className="h-4 w-12 bg-gray-300 rounded" />
        <div className="h-4 w-12 bg-gray-300 rounded" />
      </div>
    </div>
  )
}
