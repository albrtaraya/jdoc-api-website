import Link from "next/link"
import { headerConfig } from "@/config/header"
import { Github, Linkedin } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.webp" className="w-40" />
          </Link>
          <nav className="hidden md:flex space-x-6">
            {headerConfig.options.map((option) => (
              <Link
                key={option.label}
                href={option.url}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {option.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href={headerConfig.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={headerConfig.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </header>
  )
}
