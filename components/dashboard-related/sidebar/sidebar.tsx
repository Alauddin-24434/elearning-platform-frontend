"use client"

import type * as React from "react"
import {
  BarChart3,
  Users,
  Car,
  Calendar,
  Settings,
  User,
  BookOpen,
  DollarSign,
  Shield,
  Home,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"

// Admin navigation items
const adminNavItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "User Management", url: "/dashboard/admin/users", icon: Users },
  { title: "Category Management", url: "/dashboard/admin/category", icon: Car },
  { title: "Payments Management", url: "/dashboard/admin/payments", icon: DollarSign },
]

// User navigation items
const userNavItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "My Courses", url: "/dashboard/user/courses", icon: BookOpen },
  { title: "Enrolments", url: "/dashboard/user/enrolments", icon: Calendar },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector(selectCurrentUser)
  const pathname = usePathname()

  if (!user) return null

  const navItems = user.isAdmin ? adminNavItems : userNavItems

  return (
    <Sidebar collapsible="icon" {...props} className="bg-[#00362f] text-white">
      <SidebarHeader className="text-center h-16">
        <Link href="/">
          <span className="truncate font-semibold uppercase">Elearning</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url)
            return (
              <SidebarMenuItem
                key={item.title}
                className={`hover:bg-[#006d5d] ${
                  isActive ? "bg-[#006d5d]" : ""
                }`}
              >
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.isAdmin ? (
                      <div className="flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Administrator
                      </div>
                    ) : (
                      user?.email
                    )}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
