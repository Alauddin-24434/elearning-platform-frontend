"use client"

import type React from "react"

import Image from "next/image"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

// Duplicate logos to ensure seamless infinite scroll
const baseCompanyLogos = [
    { name: "Google", src: "/images/google.webp?height=40&width=120" },
    { name: "Microsoft", src: "/images/microsoft.png?height=40&width=120" },
    { name: "Amazon", src: "/images/amazon.png?height?height=40&width=120" },
    { name: "IBM", src: "/images/ibm.png?height=40&width=120" },
    { name: "Stanford University", src: "/images/satnd.png?height=40&width=120" },

    { name: "MIT", src: "/images/mit.png?height=40&width=120" },
    { name: "Oxford University", src: "/images/oxford.png?height=40&width=120" },
    { name: "Coursera", src: "/images/coursera.png?height=40&width=120" },
    { name: "Programming Hero", src: "/images/programing.png?height=40&width=120" },
    { name: "edX", src: "/images/edx.png?height=40&width=120" },
    { name: "Udemy", src: "/images/udemy.png?height=40&width=120" },
    { name: "Codecademy", src: "/images/code-academy.avif?height=40&width=120" },



]

// Duplicate logos multiple times for infinite scroll effect
const companyLogos = Array(3).fill(baseCompanyLogos).flat()

const Marquee = ({
    children,
    duration,
    reverse = false,
    className = "",
}: { children: React.ReactNode; duration: number; reverse?: boolean; className?: string }) => {
    return (
        <div className={`relative flex overflow-hidden ${className}`}>
            <motion.div
                className="flex flex-nowrap will-change-transform"
                animate={{
                    x: reverse ? ["-100%", "0%"] : ["0%", "-100%"],
                }}
                transition={{
                    x: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: duration,
                        ease: "linear",
                    },
                }}
            >
                {children}
                {children} {/* Duplicate children for seamless loop */}
            </motion.div>
        </div>
    )
}

export default function TrustedBySection() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background gradient overlay for subtle movement */}
            {/* <motion.div
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, rgba(30, 144, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      /> */}

            <div className="container mx-auto px-6 md:px-10 relative z-10">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#313e3b]  mb-4">Our Global Network of Trust</h2>
                    <p className=" max-w-xl mx-auto  text-gray-600">
                        Join the thousands of educators and institutions worldwide who trust our platform for exceptional learning
                        experiences.
                    </p>
                </motion.div>

                {/* Infinite Scrolling Logos */}
                <div className="relative h-[300px] flex flex-col justify-around overflow-hidden">
                    {/* Top Lane - Faster, smaller, slightly transparent */}
                    <Marquee duration={30} className="h-1/3">
                        {companyLogos.map((logo, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 mx-8  flex items-center justify-center"
                            // whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                            // style={{ opacity: 0.7 }}
                            >
                                <Image
                                    src={logo.src || "/placeholder.svg"}
                                    alt={`${logo.name} logo`}
                                    width={100}
                                    height={30}
                                    className="object-contain "
                                />
                            </motion.div>
                        ))}
                    </Marquee>

                    {/* Middle Lane - Slower, larger, more opaque */}
                    <Marquee duration={45} reverse className="h-1/3">
                        {companyLogos.map((logo, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 mx-10 flex items-center justify-center"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                                style={{ opacity: 0.9 }}
                            >
                                <Image
                                    src={logo.src || "/placeholder.svg"}
                                    alt={`${logo.name} logo`}
                                    width={140}
                                    height={45}
                                    className="object-contain "
                                />
                            </motion.div>
                        ))}
                    </Marquee>

                    {/* Bottom Lane - Fastest, smallest, most transparent */}
                    <Marquee duration={25} className="h-1/3">
                        {companyLogos.map((logo, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 mx-6  flex items-center justify-center"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                style={{ opacity: 0.5 }}
                            >
                                <Image
                                    src={logo.src || "/placeholder.svg"}
                                    alt={`${logo.name} logo`}
                                    width={80}
                                    height={25}
                                    className="object-contain "
                                />
                            </motion.div>
                        ))}
                    </Marquee>


                </div>
            </div>
        </section>
    )
}
