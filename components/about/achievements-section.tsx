import { achievements } from "@/lib/data"

export default function AchievementsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Great achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <item.icon className="w-12 h-12 text-primary-green mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.year}</h3>
              <p className="text-gray-600 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
