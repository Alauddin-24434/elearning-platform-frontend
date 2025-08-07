import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-dark-background text-gray-300 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="text-3xl font-bold text-white">
            learning.
          </Link>
          <p className="text-sm">We are providing high-quality online courses for about ten years.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Popular courses</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Business finance
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Advanced design
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Web development
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Data visualization
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Need help?</h3>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            <span>+1 234 567 8910</span>
            <span className="bg-accent-yellow text-dark-background px-2 py-0.5 rounded-full text-xs font-semibold">
              FREE
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            <span>help@domain.com</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Subscribe our newsletter</h3>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email..."
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-accent-yellow"
            />
            <Button type="submit" className="bg-accent-yellow text-dark-background hover:bg-accent-yellow/90">
              Submit
            </Button>
          </form>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <input type="checkbox" id="privacy" className="form-checkbox text-accent-yellow rounded" />
            <label htmlFor="privacy">Protecting your privacy</label>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © 2023 Crafto is Proudly Powered by{" "}
        <Link href="#" className="text-white hover:underline">
          ThemeZaa
        </Link>
      </div>
    </footer>
  )
}
