"use client"

import Link from "next/link"
import { Phone, Search, User, LogOut, LayoutDashboard, Mail, FacebookIcon, TwitterIcon } from "lucide-react"
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

export default function Header() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  return (
    <header className="bg-[#00483d] text-white">
      {/* 🔹 Top Header */}
      <div className="px-4 py-2 flex justify-between items-center text-sm border-b border-white/20 bg-primary text-white">
        <div className="flex container mx-auto justify-between items-center gap-4">
          {/* 🔸 Left side: Contact Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>1 800 222 000</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@example.com</span>
            </div>
          </div>

          {/* 🔸 Right side: */}
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
              <TwitterIcon className="w-4 h-4" />
            </a>
            <button className="border border-white text-white px-3 py-1 rounded hover:bg-yellow-400 hover:text-black text-xs">
              Contact Us
            </button>
          </div>

        </div>
      </div>

      {/* 🔹 Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-[#d5d52b]">
          learning
        </Link>

        
        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-accent-yellow transition-colors">
            Home
          </Link>
          <Link href="/courses" className="hover:text-accent-yellow transition-colors">
            Courses
          </Link>
          <Link href="/courses?category=development" className="hover:text-accent-yellow transition-colors">
            Development
          </Link>
          <Link href="/courses?category=design" className="hover:text-accent-yellow transition-colors">
            Design
          </Link>
          <Link href="/courses?category=data-science" className="hover:text-accent-yellow transition-colors">
            Data Science
          </Link>
          <Link href="/courses?category=marketing" className="hover:text-accent-yellow transition-colors">
            Marketing
          </Link>
          <Link href="/courses?category=communications" className="hover:text-accent-yellow transition-colors">
            Communications
          </Link>
        </nav>


        {/* Search & User Section */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-60">
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
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.split(" ").map((n) => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
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
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#00483d]">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#d5d52b] text-black hover:bg-[#caca23]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
