"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { ParticlesComponent } from "../particals-components"
import { Counter } from "../counter"

export default function HeroSection() {
  return (
    <section className="relative text-white bg-[#100d28] py-16 sm:py-20 md:py-32 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesComponent />
      </div>

      <div className="relative container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center justify-center z-10 gap-10">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Best Online Platform for Education
          </h1>
          <p className="text-md sm:text-lg md:text-xl max-w-md mx-auto md:mx-0 text-[#4b5563">
            Learn from industry experts, access hundreds of courses, and gain skills to grow your career at your own pace.
          </p>

<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8">
  {/* Primary Button */}
  <Button
    asChild
    className="bg-[#d8a111] hover:bg-[#C18F10] text-[#100d28] py-4 md:py-6 px-8 rounded-full text-lg font-semibold shadow-lg  transition"
  >
    <Link href="/courses">Get Started</Link>
  </Button>

  {/* Secondary Button */}
  <Button
    asChild
    className="border-2  text-white bg-transparent py-4 md:py-6 px-8 rounded-full text-lg font-semibold hover:bg-[#080613] hover:text-white transition"
  >
    <Link href="/about">Learn More</Link>
  </Button>
</div>


          {/* Counters */}
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 justify-center md:justify-start">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">
                <Counter from={0} to={280} suffix="+" />
              </div>
              <div className="text-sm sm:text-base text-[#4b5563]">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">
                <Counter from={0} to={5340} suffix="+" />
              </div>
              <div className="text-sm sm:text-base text-[#4b5563]">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">
                <Counter from={0} to={120} suffix="+" />
              </div>
              <div className="text-sm sm:text-base text-[#4b5563]">Instructors</div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative z-0 w-full max-w-[500px] sm:max-w-[550px] md:max-w-[600px] mx-auto mt-10 md:mt-0 rounded-full bg-[#080613]  overflow-hidden">
          {/* Background Circle */}
          <div className="absolute z-10 w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-[#d8a111]  rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          {/* Foreground Image */}
          <Image
            src="/cd20756b-6228-4285-bda4-5a880336b1d3_removalai_preview.png"
            alt="Student with books"
            width={500}
            height={500}
            className="relative z-20 rounded-full shadow-lg object-cover w-full h-full scale-105"
          />
        </div>
      </div>
    </section>
  )
}
