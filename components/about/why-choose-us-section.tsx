import Image from "next/image"

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Woman with books"
            width={500}
            height={500}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary-green">
            <span className="text-lg font-semibold">Why choose us?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">Teaching makes you productive.</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary-green font-bold text-xl">01</span>
              <div>
                <h4 className="font-semibold text-lg">Learn with Experts instructors</h4>
                <p className="text-sm">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-green font-bold text-xl">02</span>
              <div>
                <h4 className="font-semibold text-lg">Highly flexible learning time</h4>
                <p className="text-sm">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-green font-bold text-xl">03</span>
              <div>
                <h4 className="font-semibold text-lg">Amazing skills for teaching</h4>
                <p className="text-sm">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
