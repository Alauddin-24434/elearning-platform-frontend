import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#00483d] text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links section */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
          {/* Column 1 */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-4">Learning</h5>
            <ul className="space-y-3">
              {["Home", "About", "Pricing", "Pro Version"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-4">Products</h5>
            <ul className="space-y-3">
              {[
                "Figma UI System",
                "Icons Assets",
                "Responsive Blocks",
                "Components Library",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-4">Resources</h5>
            <ul className="space-y-3">
              {["FAQs", "Quick Start", "Documentation", "User Guide"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-amber-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-6 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:text-amber-400">
              Learning
            </a>
            . All rights reserved.
          </p>
          <p className="mt-4 sm:mt-0">
            Have a question?{" "}
            <a href="mailto:support@pagedone.io" className="hover:text-amber-400">
              Talk to us
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
