// --- Type Definitions (matching Prisma schema) ---
interface User {
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

interface Category {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  isFree: boolean;
  authorId: string;
  categoryId: string;
  features: string[];
  overviews: string[];
  stack: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
}

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

interface Payment {
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

interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
}

interface Review {
  id: string;
  courseId: string;
  userId: string;
  score: number;
  comment?: string;
  createdAt: Date;
}