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
    <header className="bg-gray-800 border-b border-gray-700 text-white">
     

      {/* 🔹 Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-green-600">
       Learning Hub
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
