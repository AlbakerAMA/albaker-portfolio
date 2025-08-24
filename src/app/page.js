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
    href: 'https://instagram.com/albaker.me',
    icon: <FaInstagram />,
    color: 'text-pink-500',
  },
  {
    href: 'https://facebook.com/albaker114',
    icon: <FaFacebook />,
    color: 'text-blue-700',
  },
]

const skillsData = {
  "Languages": [
    { name: "HTML" },
    { name: "JavaScript" },
    { name: "Python" },
    { name: "MySQL" },
  ],
  "Frameworks & Libraries": [
    { name: "Next.js" },
    { name: "React" },
    { name: "Flutter" },
    { name: "Firebase" },
  ],
  "ML & Data Science": [
    { name: "Pandas" },
    { name: "Scikit-learn" },
    { name: "NumPy" },
    { name: "TensorFlow" },
    { name: "Matplotlib" },
    { name: "Jupyter" },
  ]
}

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
    }, 300) 
    
    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div>
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
        <div className="flex-1 relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[400px] mx-auto">
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
          {socialIcons.map((social, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20 + index * 5, ease: "linear" }}
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute text-3xl sm:text-4xl ${social.color} hover:scale-125 transition-transform pointer-events-auto`}
                style={{ top: iconPositions[index].top, left: iconPositions[index].left }}
              >
                {social.icon}
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">My Skills</h2>
        {Object.entries(skillsData).map(([category, skills], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: catIndex * 0.2 }}
            className="mb-10"
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{
                    opacity: 0,
                    rotateY: 10,
                    z: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    rotateY: 0,
                    z: 0,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    z: 50,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black via-gray-600 to-black dark:from-white dark:via-gray-400 dark:to-white animate-pulse"></div>
                      <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-gray-900"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl font-bold text-black dark:text-white">
                          {skill.name.charAt(0)}
                        </span>
                      </div>
                      <h4 className="text-center font-semibold text-black dark:text-white text-sm md:text-base group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {skill.name}
                      </h4>
                      <motion.div
                        className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 rounded-full origin-left"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: Math.random() * 0.3 + 0.7 }}
                          transition={{ duration: 1.5, delay: index * 0.1 + 0.8 }}
                        />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-black dark:bg-white rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                          }}
                          animate={{
                            y: [-5, -15, -5],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-black dark:border-white rounded-full opacity-10">
          <motion.div
            className="w-full h-full border-2 border-black dark:border-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-black dark:border-white rounded-xl opacity-10">
          <motion.div
            className="w-full h-full border-2 border-black dark:border-white rounded-xl"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </section>
    </div>
  )
}