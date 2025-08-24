 import { Award, BookOpen, CheckCircle, Search } from "lucide-react";

export function BenefitsSection() {

  return (

  
      <section className="py-20 bg-slate-100 text-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How to Get More Benefits</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Unlock your full potential with our structured learning path, designed to guide you from enrollment to
              certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Your Perfect Course</h3>
              <p className="text-slate-600">
                Browse our curated selection of paid courses designed by industry experts to match your learning goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment & Enrollment</h3>
              <p className="text-slate-600">
                Complete your payment easily and securely to gain instant access to all course materials and lessons.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Practice & Master Skills</h3>
              <p className="text-slate-600">
                Engage with interactive exercises, projects, and quizzes to reinforce your learning and build practical
                skills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn Your Certificate</h3>
              <p className="text-slate-600">
                Upon successful completion, receive a verifiable certificate to showcase your new expertise and boost
                your career.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
