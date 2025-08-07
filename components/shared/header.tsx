import Link from "next/link"
import { Phone, Search } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-[#00483d] text-white">
      {/* 🔹 Top Header */}
      <div className="px-4 py-2 flex justify-end items-center text-sm border-b border-white/20">
        <div className="flex container mx-auto items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>1 800 222 000</span>
        </div>
      </div>

      {/* 🔹 Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          learning.
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-accent-yellow transition-colors">
            Home
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Courses
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Development
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Design
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Data Science
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Marketing
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Communications
          </Link>
        </nav>

        {/* Search Box */}
        <div className="relative w-full md:w-60">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full rounded-full py-2 px-4 pl-10 text-sm bg-white text-black"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  )
}
