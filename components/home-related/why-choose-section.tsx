import { Award, BookOpen, CheckCircle, Target, TrendingUp, Users } from 'lucide-react';
import React from 'react';

const WhyChooseSection = () => {
  return (
    <section className="bg-slate-100 text-slate-900 py-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform</h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            We provide the most comprehensive and effective learning experience with industry-leading features.
          </p>
        </div>

        {/* First Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
            <p className="text-slate-600">
              Learn from industry professionals with years of real-world experience and proven track records.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Comprehensive Curriculum</h3>
            <p className="text-slate-600">
              Access structured courses covering everything from basics to advanced topics in your field.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Industry Recognition</h3>
            <p className="text-slate-600">
              Earn certificates that are recognized and valued by top companies worldwide.
            </p>
          </div>
        </div>

        {/* Second Row (Paths) */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Beginner Path</h3>
            <p className="text-slate-600 mb-6">
              Start your journey with foundational courses designed for complete beginners.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Basic concepts</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Hands-on projects</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Mentorship support</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Intermediate Path</h3>
            <p className="text-slate-600 mb-6">
              Build upon your existing knowledge with advanced techniques and real-world applications.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Advanced techniques</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Industry projects</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Portfolio building</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Expert Path</h3>
            <p className="text-slate-600 mb-6">
              Master advanced concepts and become an industry expert with specialized training.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Expert-level content</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Leadership training</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Career advancement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
