'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') document.documentElement.classList.add('dark')
    setDarkMode(stored === 'dark')

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDark = () => {
    const newDark = !darkMode
    setDarkMode(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-2 shadow-sm' : 'py-4'} border-b border-gray-200 dark:border-gray-700`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left side - Logo */}
        <Link href="/" className="text-xl font-bold hover:text-blue-500 transition-colors">
          Albaker
        </Link>

        {/* Center - Navigation links (desktop) */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/about" className="hover:text-blue-500 transition-colors">About</Link>
          <Link href="/projects" className="hover:text-blue-500 transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
        </div>

        {/* Right side - Social + Dark mode (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="https://github.com/albaker" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/albaker" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <button 
            onClick={toggleDark} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu button and toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleDark} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setOpen(!open)} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              href="/about" 
              onClick={() => setOpen(false)}
              className="py-2 hover:text-blue-500 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/projects" 
              onClick={() => setOpen(false)}
              className="py-2 hover:text-blue-500 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setOpen(false)}
              className="py-2 hover:text-blue-500 transition-colors"
            >
              Contact
            </Link>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://github.com/albaker" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/albaker" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}