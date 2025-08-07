import type { LucideIcon } from "lucide-react"
import { BookOpen, GraduationCap, Award, Lightbulb, Trophy, PlayCircle, UserCheck, MessageSquare } from "lucide-react"

export interface Course {
  id: string
  category: string
  title: string
  instructor: string
  price: number
  image: string
  lessons: number
  students: number
  description: string
  whatYouWillLearn: string[]
  certification: string
  curriculum: {
    section: string
    lessons: { title: string; duration: string }[]
  }[]
  reviews: {
    id: string
    author: string
    rating: number
    date: string
    comment: string
  }[]
}

export interface Instructor {
  id: string
  name: string
  role: string
  image: string
}

export interface Testimonial {
  id: string
  author: string
  role: string
  rating: number
  date: string
  comment: string
  image: string
}

export interface BlogPost {
  id: string
  author: string
  title: string
  teaser: string
  image: string
  likes: number
  comments: number
  date: string
  content: string
  relatedPosts: { id: string; title: string; image: string; author: string; likes: number; comments: number }[]
  blogComments: {
    id: string
    author: string
    date: string
    comment: string
    replies?: { id: string; author: string; date: string; comment: string }[]
  }[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Skilled instructors",
    description: "Best online platform for education.",
  },
  {
    icon: Lightbulb,
    title: "Educator helps",
    description: "Best online platform for education.",
  },
  {
    icon: Award,
    title: "Get certificate",
    description: "Best online platform for education.",
  },
  {
    icon: GraduationCap,
    title: "Online classes",
    description: "Best online platform for education.",
  },
]

export const achievements = [
  { year: "2017", title: "Best teaching of the year", icon: Trophy },
  { year: "2019", title: "Downloaded app on play store", icon: PlayCircle },
  { year: "2020", title: "Achievements of instructors", icon: UserCheck },
  { year: "2021", title: "1 million views on youtube", icon: MessageSquare },
]

export const courses: Course[] = [
  {
    id: "1",
    category: "DESIGN",
    title: "Introduction to web design and visualization",
    instructor: "Colene Landin",
    price: 70.0,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 4,
    students: 0,
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    whatYouWillLearn: [
      "Ready to begin working on real-world data modeling projects.",
      "Expand your capabilities as part of an existing team.",
      "Manage your time so you'll get more done in less time.",
      "Hone sharp leadership skills to manage your team.",
      "Learn to work without sacrificing quality.",
    ],
    certification:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    curriculum: [
      {
        section: "The first steps accounting course",
        lessons: [
          {
            title:
              "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s when an unknown.",
            duration: "10 Weeks",
          },
          { title: "Lesson 17", duration: "25 Minutes" },
          { title: "Lesson 18", duration: "18 Minutes" },
        ],
      },
      {
        section: "Introduction to application design and development",
        lessons: [
          {
            title:
              "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s when an unknown.",
            duration: "10 Weeks",
          },
          { title: "Lesson 19", duration: "20 Minutes" },
          { title: "Lesson 20", duration: "22 Minutes" },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "John Doe",
        rating: 5,
        date: "2023-01-15",
        comment: "Excellent content and assignments that build on your knowledge, understanding and application.",
      },
      {
        id: "r2",
        author: "Jane Smith",
        rating: 4,
        date: "2023-02-20",
        comment: "Very informative, but some parts were a bit rushed.",
      },
    ],
  },
  {
    id: "2",
    category: "FINANCE",
    title: "Finance fundamentals of management and planning",
    instructor: "Colene Landin",
    price: 65.0,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 7,
    students: 1,
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    whatYouWillLearn: [],
    certification: "",
    curriculum: [],
    reviews: [],
  },
  {
    id: "3",
    category: "BUSINESS",
    title: "Business accounting and taxation fundamental",
    instructor: "Colene Landin",
    price: 55.0,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 5,
    students: 1,
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    whatYouWillLearn: [],
    certification: "",
    curriculum: [],
    reviews: [],
  },
  {
    id: "4",
    category: "MEDICINE",
    title: "Genetic testing and sequencing technique",
    instructor: "Colene Landin",
    price: 60.0,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 5,
    students: 1,
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    whatYouWillLearn: [],
    certification: "",
    curriculum: [],
    reviews: [],
  },
  {
    id: "5",
    category: "BUSINESS",
    title: "Improve your english vocabulary and language",
    instructor: "Colene Landin",
    price: 45.0,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 4,
    students: 1,
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    whatYouWillLearn: [],
    certification: "",
    curriculum: [],
    reviews: [],
  },
]

export const instructors: Instructor[] = [
  { id: "i1", name: "Jessica driver", role: "Director", image: "/placeholder.svg?height=200&width=200" },
  { id: "i2", name: "Jeremy dupont", role: "Researcher", image: "/placeholder.svg?height=200&width=200" },
  { id: "i3", name: "Johncy parker", role: "English teacher", image: "/placeholder.svg?height=200&width=200" },
  { id: "i4", name: "Matthew taylor", role: "Design teacher", image: "/placeholder.svg?height=200&width=200" },
  { id: "i5", name: "Michal ruheen", role: "Assistant teacher", image: "/placeholder.svg?height=200&width=200" },
  { id: "i6", name: "Jeremy smith", role: "Spanish teacher", image: "/placeholder.svg?height=200&width=200" },
  { id: "i7", name: "Herman miller", role: "Financial expert", image: "/placeholder.svg?height=200&width=200" },
  { id: "i8", name: "Bryan jonhson", role: "Personal consultant", image: "/placeholder.svg?height=200&width=200" },
]

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Alex sanchez",
    role: "Student",
    rating: 4.5,
    date: "28 NOV",
    comment: "Excellent content and assignments that build on your knowledge, understanding and application.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t2",
    author: "Matthew taylor",
    role: "Student",
    rating: 5,
    date: "28 NOV",
    comment: "I liked that the course included step-by-step exercises and practical examples.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t3",
    author: "Leonel mooney",
    role: "Student",
    rating: 5,
    date: "28 NOV",
    comment: "I have taken many online courses. None have offered teleconference support like this.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t4",
    author: "Jacob kalling",
    role: "Student",
    rating: 4.5,
    date: "28 NOV",
    comment: "Got almost immediate responses when I turned in assignments and had questions about the material.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t5",
    author: "Jeremy dupont",
    role: "Student",
    rating: 4.5,
    date: "28 NOV",
    comment: "Well designed, gives a great and useful opening to user-centered design and development.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t6",
    author: "Daniel mark",
    role: "Student",
    rating: 5,
    date: "28 NOV",
    comment: "Excellent content and assignments that build on your knowledge, understanding and application.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    author: "Colene Landin",
    title: "How to evaluate the effective of training programs",
    teaser: "Lorem ipsum has been industry standard dummy text ever",
    image: "/placeholder.svg?height=200&width=300",
    likes: 15,
    comments: 0,
    date: "August 24, 2023",
    content: `
    <p>Fashion is what you're offered four times a year by designers. And style is what you choose. The key to style is learning who you are which takes years.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <figure>
      <img src="/placeholder.svg?height=400&width=600" alt="VR headset" />
      <figcaption>Experience the future of learning.</figcaption>
    </figure>
    <p>Fashion you can buy, but style you possess. The key to style is learning who you are which takes years.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <img src="/placeholder.svg?height=300&width=400" alt="Learning together" class="rounded-lg object-cover" />
      <img src="/placeholder.svg?height=300&width=400" alt="Student smiling" class="rounded-lg object-cover" />
    </div>
    <h3>We finished our first sensor sweep of the neutral zone</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h3>You considered all your options you tried every alternative</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  `,
    relatedPosts: [
      {
        id: "b2",
        title: "Some people just try to complicate the joy of life.",
        image: "/placeholder.svg?height=150&width=250",
        author: "Colene Landin",
        likes: 12,
        comments: 0,
      },
      {
        id: "b3",
        title: "No matter what you're feeling no experience",
        image: "/placeholder.svg?height=150&width=250",
        author: "Colene Landin",
        likes: 12,
        comments: 0,
      },
      {
        id: "b4",
        title: "Teamwork is essential for small teams to achieve",
        image: "/placeholder.svg?height=150&width=250",
        author: "Colene Landin",
        likes: 17,
        comments: 0,
      },
    ],
    blogComments: [
      {
        id: "c1",
        author: "Herman Miller",
        date: "28 NOV",
        comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "c2",
        author: "Shinus Hattori",
        date: "28 NOV",
        comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
        replies: [
          {
            id: "r1",
            author: "Colene Landin",
            date: "28 NOV",
            comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
          },
        ],
      },
      {
        id: "c3",
        author: "Jennifer Freeman",
        date: "28 NOV",
        comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ],
  },
  {
    id: "b2",
    author: "Colene Landin",
    title: "Experience the breathtaking beauty of the mountains",
    teaser: "Lorem ipsum has been industry standard dummy text ever",
    image: "/placeholder.svg?height=200&width=300",
    likes: 16,
    comments: 0,
    date: "August 20, 2023",
    content: "<p>Content for blog post 2</p>",
    relatedPosts: [],
    blogComments: [],
  },
  {
    id: "b3",
    author: "Colene Landin",
    title: "Build up healthy habits and strong mindset",
    teaser: "Lorem ipsum has been industry standard dummy text ever",
    image: "/placeholder.svg?height=200&width=300",
    likes: 16,
    comments: 0,
    date: "August 18, 2023",
    content: "<p>Content for blog post 3</p>",
    relatedPosts: [],
    blogComments: [],
  },
  {
    id: "b4",
    author: "Colene Landin",
    title: "Some people just try to complicate the joy of life.",
    teaser: "Lorem ipsum has been industry standard dummy text ever",
    image: "/placeholder.svg?height=200&width=300",
    likes: 12,
    comments: 0,
    date: "August 15, 2023",
    content: "<p>Content for blog post 4</p>",
    relatedPosts: [],
    blogComments: [],
  },
  {
    id: "b5",
    author: "Colene Landin",
    title: "No matter what you're feeling no experience",
    teaser: "Lorem ipsum has been industry standard dummy text ever",
    image: "/placeholder.svg?height=200&width=300",
    likes: 12,
    comments: 0,
    date: "August 12, 2023",
    content: "<p>Content for blog post 5</p>",
    relatedPosts: [],
    blogComments: [],
  },
  {
    id: "b6",
    author: "Colene Landin",
    title: "Teamwork is essential for small teams to achieve",
    teaser: "Lorem ipsum has been industry standard dummy text ever",
    image: "/placeholder.svg?height=200&width=300",
    likes: 17,
    comments: 0,
    date: "August 10, 2023",
    content: "<p>Content for blog post 6</p>",
    relatedPosts: [],
    blogComments: [],
  },
]
