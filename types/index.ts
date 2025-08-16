// --- Type Definitions (matching Prisma schema) ---
// These interfaces are shared across components for consistency.

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Optional for client-side display
    avatar?: string;
    coverPhoto?: string;
    isAdmin: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: string;
    name: string;
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  isFree: boolean
  authorId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  couponId: string | null
  features: string[]
  overviews: string[]
  stack: string[]
  overviewVideo: string   // ✅ Added
  author: {
    id: string
    name: string
    email: string
    avatar: string | null
    isAdmin: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  category: {
    id: string
    name: string
  }
  lessons: {
    id: string
    title: string
    duration: string
    video: string
    courseId: string
    createdAt: string
    updatedAt: string
  }[]
  enrollments: {
    id: string
    userId: string
    courseId: string
    enrolledAt: string
  }[]
  
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: Date;
}

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export interface Payment {
    id: string;
    userId: string;
    courseId: string;
    amount: number;
    currency: string;
    phone: string;
    status: PaymentStatus;
    provider: string;
    transactionId: string;
    paidAt: Date;
}



export interface Review {
    id: string;
    courseId: string;
    userId: string;
    score: number;
    comment?: string;
    createdAt: Date;
}
