import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Course } from '@/types'
import { Badge, Check } from 'lucide-react'
import React from 'react'

type CourseDetailsMainProps = {
    course: Course
}

const CourseDetailsMainSection = ({ course }: CourseDetailsMainProps) => {
    console.log(course)
    return (
        <section className="flex flex-col container mx-auto">
            {/* ======================
          COURSE FEATURES SECTION
          Shows all the key features of the course
          Responsive grid (1 col on mobile, 2 cols on md+)
      ======================= */}
            <Card className="border-0 ">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">
                        Course Features
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.features?.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg bg-[#080613]"
                            >
                                {/* ✅ Green check icon for each feature */}
                                <Check className="w-5 h-5 text-[#d8a111]" />
                                <span className="font-medium text-white">{feature}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* ======================
          TECHNOLOGIES SECTION
          Shows course tech stack in badges
          Fully responsive with wrap
      ======================= */}
            <Card className="border-0 ">
                <CardHeader>
                    <CardTitle className="text-xl text-white">Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {course.stack?.map(tech => (
                            <Badge
                                key={tech} // unique key
                                className="bg-[#d8a111] !text-white px-3 py-1 rounded-md text-sm md:text-base hover:bg-green-700 transition-colors"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>

                </CardContent>
            </Card>
        </section>
    )
}

export default CourseDetailsMainSection
