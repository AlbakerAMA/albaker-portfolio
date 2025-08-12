'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const socialIcons = [
  {
    href: 'https://github.com/AlbakerAMA',
    icon: <FaGithub />,
    color: 'text-black dark:text-white',
  },
  {
    href: 'https://linkedin.com/in/albaker',
    icon: <FaLinkedin />,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    href: 'https://instagram.com',
    icon: <FaInstagram />,
    color: 'text-pink-500',
  },
  {
    href: 'https://facebook.com',
    icon: <FaFacebook />,
    color: 'text-blue-700',
  },
]

// Generate random positions near the photo
function getRandomPositions(count) {
  
  return Array.from({ length: count }, () => ({
    top: `${30 + Math.random() * 40}%`,
    left: `${20 + Math.random() * 60}%`,
    right: `${20 + Math.random() * 60}%`,
  }))
}

export default function HomePage() {
  const [typedText, setTypedText] = useState('')
  const fullText = "Hi, I'm Albaker Ahmed"
  const [iconPositions, setIconPositions] = useState(getRandomPositions(socialIcons.length))

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 300) // Adjust typing speed here
    
    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 animate-fade-in min-h-[80vh]">
      <div className="flex-1">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl mb-6 max-w-xl"
        >
          Full Stack Developer | ML Engineer | Flutter & Next.js Specialist. Passionate about tech that solves real-world problems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-4"
        >
          <Link href="/projects" className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold hover:scale-105 transition-transform">View Projects</Link>
          <Link href="/Albaker_Ahmed_CV.pdf" target="_blank" className="px-6 py-3 border border-black dark:border-white rounded-xl font-semibold hover:scale-105 transition-transform">Download CV</Link>
        </motion.div>
      </div>
      <div className="flex-1 relative w-[300px] h-[450px] md:w-[400px] md:h-[550px] mx-auto">
        <motion.div
          className="relative w-full h-full pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/albaker-profile.jpg"
            alt="Albaker Ahmed portrait"
            fill
            className="rounded-full shadow-lg object-cover"
            priority
          />
        </motion.div>
        {/* Orbiting social icons */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <a
            href="https://github.com/AlbakerAMA"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute text-4xl text-black dark:text-white hover:scale-125 transition-transform pointer-events-auto"
            style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <FaGithub />
          </a>
        </motion.div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <a
            href="https://linkedin.com/in/albaker"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute text-4xl text-blue-600 dark:text-blue-400 hover:scale-125 transition-transform pointer-events-auto"
            style={{ top: '50%', left: '0%', transform: 'translate(-50%, -50%)' }}
          >
            <FaLinkedin />
          </a>
        </motion.div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute text-4xl text-pink-500 hover:scale-125 transition-transform pointer-events-auto"
            style={{ top: '100%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <FaInstagram />
          </a>
        </motion.div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute text-4xl text-blue-700 hover:scale-125 transition-transform pointer-events-auto"
            style={{ top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }}
          >
            <FaFacebook />
          </a>
        </motion.div>
      </div>
    </section>
  )
}