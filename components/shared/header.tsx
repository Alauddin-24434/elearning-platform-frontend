"use client"

import Link from "next/link"
import { Phone, Search, User, LogOut, LayoutDashboard, Menu, ChevronDown } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

export default function Header() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#080613] text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}

        <Link href="/" className="flex items-center gap-2">
  <Image
  src="/logo.png"
  alt="Learning Hub Logo"
  width={60}   
  height={60} 
  className="rounded-md"
/>



        </Link>


        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link href="/" className="hover:text-accent-yellow transition-colors">
            Home
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Courses
          </Link>

          {/* 🔹 Categories Dropdown */}
          {/* 🔹 Categories Dropdown */}
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 px-3 py-2 cursor-pointer">
                Categories
                <ChevronDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-4 bg-gray-50 rounded-md shadow-lg">
              <DropdownMenuItem asChild className="hover:bg-gray-700">
                <Link href="/courses?category=development">Development</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gray-700">
                <Link href="/courses?category=design">Design</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gray-700">
                <Link href="/courses?category=data-science">Data Science</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gray-700">
                <Link href="/courses?category=marketing">Marketing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gray-700">
                <Link href="/courses?category=communications">Communications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </nav>

        {/* Search & User Section */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="hidden md:block relative w-60">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full rounded-full py-2 px-4 pl-10 text-sm bg-white text-black"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>

          {/* Auth/Avatar */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.split(" ").map((n) => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 mt-5 bg-gray-50">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => dispatch(logout())}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#00483d]">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#d8a111] text-[#100d28]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* 🔹 Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 px-4 py-3 space-y-2">
          <Link href="/" className="block">Home</Link>
          <Link href="/courses" className="block">Courses</Link>
          {/* Categories inside dropdown */}
          <details className="text-sm">
            <summary className="cursor-pointer">Categories</summary>
            <div className="ml-4 mt-1 space-y-1">
              <Link href="/courses?category=development" className="block">Development</Link>
              <Link href="/courses?category=design" className="block">Design</Link>
              <Link href="/courses?category=data-science" className="block">Data Science</Link>
              <Link href="/courses?category=marketing" className="block">Marketing</Link>
              <Link href="/courses?category=communications" className="block">Communications</Link>
            </div>
          </details>

          {/* Auth Buttons on mobile */}
          {!user && (
            <div className="flex gap-2 pt-2">
              <Link href="/login">
                <Button variant="outline" className="w-full text-white border-white">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full bg-[#d5d52b] text-black hover:bg-[#caca23]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
