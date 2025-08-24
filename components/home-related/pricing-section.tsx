import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const PricingSection = () => {
    return (
      <section className="py-20 bg-slate-100 text-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Flexible pricing options to fit your learning goals and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Basic</h3>
                <div className="text-4xl font-bold mb-2">
                  $29<span className="text-lg text-slate-500">/month</span>
                </div>
                <p className="text-slate-600 mb-6">Perfect for beginners</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Access to 50+ courses
                  </li>

                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Basic support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Course certificates
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#100d28] border-yellow-400 border-2 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-yellow-500 text-slate-900">Most Popular</Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">Pro</h3>
                <div className="text-4xl font-bold mb-2 text-white">
                  $79<span className="text-lg text-slate-400">/month</span>
                </div>
                <p className="text-slate-300 mb-6">For serious learners</p>
                <ul className="text-left space-y-3 mb-8 text-white">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3" />
                    Access to all courses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3" />
                    1-on-1 mentoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3" />
                    Career guidance
                  </li>
                </ul>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-4xl font-bold mb-2">
                  $199<span className="text-lg text-slate-500">/month</span>
                </div>
                <p className="text-slate-600 mb-6">For teams and organizations</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Team management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Custom content
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Analytics dashboard
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
};

export default PricingSection;