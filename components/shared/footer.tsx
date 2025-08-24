import React from "react";

export default function Footer() {
  return (
     <footer className="bg-[#100d28] border-t border-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Learning</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Pro Version
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Products</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Figma UI System
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Icons Assets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Responsive Blocks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Components Library
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Quick Start
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    User Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className=" mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2025 Learning. All rights reserved.</p>
            <p className="text-slate-400 text-sm mt-4 md:mt-0">
              Have a question?{" "}
              <a href="#" className="text-yellow-400 hover:underline">
                Talk to us
              </a>
            </p>
          </div>
        </div>
      </footer>
  );
}
