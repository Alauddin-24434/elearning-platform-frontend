import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-primary-green text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-[#003d33] opacity-90" />
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Background pattern"
            fill
            className="object-cover object-right-top opacity-20"
            style={{ objectFit: "cover", objectPosition: "right top" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 space-y-6">
          <p className="text-lg font-semibold text-accent-yellow">Get in touch</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-md">We'd love to hear from you! Reach out to us for any inquiries.</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Send us a message</h2>
            <form className="space-y-6">
              <Input type="text" placeholder="Your Name *" className="rounded-full px-4 py-2" />
              <Input type="email" placeholder="Your Email *" className="rounded-full px-4 py-2" />
              <Input type="text" placeholder="Subject" className="rounded-full px-4 py-2" />
              <Textarea placeholder="Your Message *" rows={6} className="rounded-lg px-4 py-2" />
              <Button
                type="submit"
                className="bg-primary-green text-white hover:bg-primary-green/90 px-8 py-3 rounded-full text-lg font-semibold"
              >
                Send Message
              </Button>
            </form>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary-green" />
                <div>
                  <p className="font-semibold">Phone Number</p>
                  <p>+1 234 567 8910</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary-green" />
                <div>
                  <p className="font-semibold">Email Address</p>
                  <p>info@learning.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-primary-green" />
                <div>
                  <p className="font-semibold">Our Location</p>
                  <p>123 Learning Lane, Education City, 12345</p>
                </div>
              </div>
            </div>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              {/* Placeholder for a map */}
              Map Placeholder
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
