import Image from "next/image"

export default function AboutHeroSection() {
  return (
    <section className="relative bg-primary-green text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-[#003d33] opacity-90" />
        <Image
          src="/placeholder.svg?height=500&width=500"
          alt="Background pattern"
          fill
          className="object-cover object-right-top opacity-20"
          style={{ objectFit: "cover", objectPosition: "right top" }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="space-y-6">
          <p className="text-lg font-semibold text-accent-yellow">About our classes</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">We providing the best courses.</h1>
          <p className="text-lg md:text-xl max-w-md">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div className="hidden md:flex justify-end">
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Man smiling"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
