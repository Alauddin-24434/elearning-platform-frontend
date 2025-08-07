"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, } from "framer-motion"
import { Button } from "../ui/button"

const courses = [
  {
    id: "mern-fullstack",
    imageSrc: "/images/mern.avif",
    category: "Development",
    subCategory: "Full Stack",
    title: "Master MERN Stack Web Development",
    description: "Build scalable full-stack apps using MongoDB, Express, React, and Node.js.",
    price: 199,
    isFree: false,
    duration: "8 weeks",
    lessons: 45,
    author: {
      name: "Alex Smith",
      avatar: "/Estudante PNG Transparente Sem Fundo.jpg",
      bio: "Full Stack Engineer with 10+ years experience building web apps."
    },
    syllabus: [
      "MongoDB Fundamentals",
      "Express API Development",
      "React Components & Hooks",
      "Node.js & Deployment"
    ],
    requirements: ["JavaScript basics", "HTML & CSS knowledge"],
    linkHref: "/courses/mern-fullstack",
    tags: ["MERN", "Full Stack", "Web Development"]
  },
  {
    id: "uiux-design-essentials",
    imageSrc: "/images/ui-ux.jpg",
    category: "Design",
    subCategory: "UI/UX",
    title: "UI/UX Design Essentials",
    description: "Master the fundamentals of user interface and experience design with Figma.",
    price: 0,
    isFree: true,
    duration: "5h 45m",
    lessons: 18,
    author: {
      name: "Emily Clarke",
      avatar: "/Estudante PNG Transparente Sem Fundo.jpg",
      bio: "Senior UI/UX Designer at CreativeCo with 6 years of experience."
    },
    syllabus: [
      "Intro to UI/UX",
      "Design Thinking Process",
      "Wireframing in Figma",
      "Prototyping & Handoff"
    ],
    requirements: ["Figma account", "Creativity mindset"],
    linkHref: "/courses/uiux-design-essentials",
    tags: ["UI Design", "UX", "Figma"]
  },
  {
    id: "data-analytics-bootcamp",
    imageSrc: "/images/data-analetics.png",
    category: "Data Science",
    subCategory: "Analytics",
    title: "Data Analytics Bootcamp",
    description: "Learn how to analyze data, build dashboards, and gain business insights using Excel and Power BI.",
    price: 0,
    isFree: true,
    duration: "6 weeks",
    lessons: 30,
    author: {
      name: "Michael Chan",
      avatar: "/Estudante PNG Transparente Sem Fundo.jpg",
      bio: "Data analyst and Microsoft-certified Power BI expert."
    },
    syllabus: [
      "Data Cleaning & Transformation",
      "Pivot Tables & Charts",
      "Power BI Basics",
      "Dashboard Design"
    ],
    requirements: ["Excel installed", "Logical thinking"],
    linkHref: "/courses/data-analytics-bootcamp",
    tags: ["Data", "Analytics", "Excel", "Power BI"]
  },
  {
    id: "graphic-design-beginners",
    imageSrc: "/images/grapic.png",
    category: "Design",
    subCategory: "Graphic Design",
    title: "Graphic Design for Beginners",
    description: "Learn Photoshop, color theory, and design principles to create stunning visuals.",
    price: 0,
    isFree: true,
    duration: "3h 50m",
    lessons: 14,
    author: {
      name: "Sarah Kim",
      avatar: "/Estudante PNG Transparente Sem Fundo.jpg",
      bio: "Freelance graphic designer working with startups and brands worldwide."
    },
    syllabus: [
      "Intro to Photoshop",
      "Typography & Layout",
      "Color & Composition",
      "Designing for Web & Print"
    ],
    requirements: ["Adobe Photoshop", "Creativity"],
    linkHref: "/courses/graphic-design-beginners",
    tags: ["Design", "Photoshop", "Creativity"]
  },
  {
    id: "seo-masterclass",
    imageSrc: "/images/images.jpg",
    category: "Marketing",
    subCategory: "SEO",
    title: "SEO Masterclass: Rank #1 on Google",
    description: "Learn keyword research, on-page and off-page SEO to grow your organic traffic.",
    price: 59,
    isFree: false,
    duration: "5h 20m",
    lessons: 16,
    author: {
      name: "Nina Patel",
      avatar: "/Estudante PNG Transparente Sem Fundo.jpg",
      bio: "SEO consultant helping e-commerce sites increase traffic organically."
    },
    syllabus: [
      "Keyword Research Tools",
      "On-Page Optimization",
      "Backlink Strategies",
      "Google Search Console"
    ],
    requirements: ["Website access", "Basic internet skills"],
    linkHref: "/courses/seo-masterclass",
    tags: ["SEO", "Google", "Traffic"]
  },
  {
    id: "freelance-career",
    imageSrc: "/images/kikstart.png",
    category: "Career",
    subCategory: "Freelancing",
    title: "Kickstart Your Freelance Career",
    description: "Learn how to set up profiles, find clients, and scale your income as a freelancer.",
    price: 0,
    isFree: true,
    duration: "2h 40m",
    lessons: 9,
    author: {
      name: "Ravi Das",
      avatar: "/Estudante PNG Transparente Sem Fundo.jpg",
      bio: "6-figure freelancer mentoring new remote workers worldwide."
    },
    syllabus: [
      "Choosing a Niche",
      "Creating Profiles on Upwork & Fiverr",
      "Pitching Clients",
      "Managing Payments"
    ],
    requirements: ["Reliable internet", "Communication skills"],
    linkHref: "/courses/freelance-career",
    tags: ["Freelancing", "Remote Work", "Upwork"]
  }
];



export default function PopularCoursesSection() {
  return (
    <section className="bg-gray-50 py-20" >
      <div className="container mx-auto ">
    

    
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold text-[#313e3b] "
              >
                Discover Our Popular Courses
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button asChild variant="link" className="hover:underline text-[#313e3b]  text-2xl font-semibold">
                  <Link href="/courses">View All Courses →</Link>
                </Button>
              </motion.div>
            </div>



        
      
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src={course.imageSrc}
                alt={course.title}
                width={500}
                height={300}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{course.category} • {course.subCategory}</div>
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{course.description}</p>

                <div className="flex items-center mt-4 gap-2">
                  <Image
                    src={course.author.avatar}
                    alt={course.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm text-gray-700">{course.author.name}</span>
                </div>

                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>{course.duration}</span>
                  <span>{course.lessons} lessons</span>
                  <span>{course.price}</span>
                </div>

                <Link href={course.linkHref}
                  className="inline-block mt-4 text-blue-600 hover:underline font-medium"
                >
                  View Course →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}








