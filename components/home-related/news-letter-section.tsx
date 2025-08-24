import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const NewsLetterSection = () => {
    return (
      <section className="py-20 bg-[#100d28] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Stay Updated with Latest Courses</h2>
            <p className="text-xl text-slate-300 mb-8">
              Get notified about new courses, special offers, and learning tips delivered straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email address"
                className="flex-1 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8">Subscribe</Button>
            </div>

            <p className="text-sm text-slate-400 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
          </div>
        </div>
      </section> 
            
    
    );
};

export default NewsLetterSection;