"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { ParticlesComponent } from "../particals-components"
import { Counter } from "../counter"

export default function HeroSection() {
  return (
    <section className="relative  text-white py-20 md:py-32 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesComponent />
      </div>
       

      <div className="relative container mx-auto px-4  grid grid-cols-1 md:grid-cols-2 items-center justify-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Best online platform for education.</h1>
          <p className="text-lg md:text-xl max-w-md">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="flex gap-4">
            <Button
              asChild
              className="bg-green-600 text-white p-7 rounded-full text-lg font-semibold"
            >
              <Link href="/courses">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-[#d5d52b] text-[#313e3b] p-7 rounded-full text-lg font-semibold hover:bg-[#e0e030]"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="flex items-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-4xl font-bold">
                <Counter from={0} to={280} suffix="+" />
              </div>
              <div className="text-sm text-gray-300">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">
                <Counter from={0} to={5340} suffix="+" />
              </div>
              <div className="text-sm text-gray-300">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">
                <Counter from={0} to={280} suffix="+" />
              </div>
              <div className="text-sm text-gray-300">Instructors</div>
            </div>
          </div>
        </div>
        {/* Parent Image Container */}
        <div className="relative z-0 rounded-full bg-gray-900 w-[600px] h-[600px] overflow-hidden mx-auto mt-10 md:mt-0">
          {/* First Child - background layer centered */}
          <div className="absolute z-10 w-[350px] h-[350px] bg-gray-800  rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          {/* Second Child - image on top */}
          <Image
            src="/cd20756b-6228-4285-bda4-5a880336b1d3_removalai_preview.png"
            alt="Student with books"
            width={500}
            height={500}
            className="absolute z-20 inset-0 rounded-full shadow-lg h-full w-full object-cover scale-115"
          />
        
        </div>
      </div>
    </section>
  )
}
