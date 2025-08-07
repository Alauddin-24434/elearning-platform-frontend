import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/shared/header"
import ReduxProvider from "./reduxProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Learning Platform",
  description: "Best online platform for education.",
  generator: "v0.dev",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
    
          {children}
      
        </ReduxProvider>
      </body>
    </html>
  )
}
