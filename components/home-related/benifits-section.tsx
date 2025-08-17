import { CheckCircle, DollarSign, Award, BookOpenCheck, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BenefitsSection() {
  const benefits = [
    {
      number: 1,
      icon: <Search className="h-8 w-8 text-v0-green" />,
      title: "Find Your Perfect Course",
      description: "Browse our curated selection of paid courses designed by industry experts to match your learning goals.",
    },
    {
      number: 2,
      icon: <CheckCircle className="h-8 w-8 text-v0-green" />,
      title: "Secure Payment & Enrollment",
      description: "Complete your payment easily and securely to gain instant access to all course materials and lessons.",
    },
    {
      number: 3,
      icon: <BookOpenCheck className="h-8 w-8 text-v0-green" />,
      title: "Practice & Master Skills",
      description: "Engage with interactive exercises, projects, and quizzes to reinforce your learning and build practical skills.",
    },
    {
      number: 4,
      icon: <Award className="h-8 w-8 text-v0-green" />,
      title: "Earn Your Certificate",
      description: "Upon successful completion, receive a verifiable certificate to showcase your new expertise and boost your career.",
    },
  ]

  return (
    <section className=" py-16 text-white">
      <div className="container mx-auto px-4">
        {/* Header Section (Not card styled) */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            How to Get More Benefits
          </h2>
          <p className="text-lg  max-w-2xl mx-auto">
            Unlock your full potential with our structured learning path, designed to guide you from enrollment to certification.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <Card
              key={benefit.number}
              className=" border-none shadow-none"
            >
              <CardHeader className=" flex flex-col items-center ">
                {/* <div className="text-4xl font-bold text-v0-yellow mb-4">{benefit.number}</div> */}
                <div className="p-3 rounded-full   mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="text-center text-xl font-semibold mb-2">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center  text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
