import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Quote, Star } from 'lucide-react';

const TestimonialSection = () => {
    return (
          <section className="bg-[#100d28] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Hear from thousands of students who have transformed their careers with our courses.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">
                  "The courses have completely changed my career trajectory. The hands-on projects and expert guidance
                  made all the difference."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">AR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Alex Rodriguez</div>
                    <div className="text-white/60 text-sm">Software Engineer at Google</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">
                  "I went from complete beginner to landing my dream job. The structured learning path and mentorship
                  made all the difference."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">MS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Maria Santos</div>
                    <div className="text-white/60 text-sm">Data Scientist at Microsoft</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">
                  "The hands-on projects and real-world applications helped me build a portfolio that impressed
                  employers immediately."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">DK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">David Kim</div>
                    <div className="text-white/60 text-sm">Full Stack Developer at Stripe</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
};

export default TestimonialSection;