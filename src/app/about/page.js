'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaCode, FaLanguage, FaCertificate } from 'react-icons/fa'

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const sectionData = [
    {
      icon: <FaGraduationCap className="text-blue-500 text-2xl" />,
      title: "Education",
      content: (
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 dark:text-white">African Leadership Academy</h3>
          <p className="text-gray-600 dark:text-gray-300">2023 – 2025</p>
          <p className="text-gray-600 dark:text-gray-300">Leadership, Entrepreneurship, and A-Level Curriculum (Math, CS, Physics)</p>
        </div>
      )
    },
    {
      icon: <FaBriefcase className="text-green-500 text-2xl" />,
      title: "Experience",
      content: (
        <ul className="space-y-4">
          {[
            "Team Lead @ SOLFA – ML model delivery & project coordination (2025–Present)",
            "CS Tutor @ ALA – 15+ students, 40% grade boost",
            "Software Developer @ FootPrints – Flutter AI app + full-stack store",
            "Founder @ HTA – Built e-learning tools for accessibility",
            "Self Projects – Automations via Node-RED, n8n, WhatsApp + GSheets"
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </motion.li>
          ))}
        </ul>
      )
    },
    {
      icon: <FaCode className="text-purple-500 text-2xl" />,
      title: "Technical Skills",
      content: (
        <div className="flex flex-wrap gap-2">
          {["HTML", "JavaScript", "React", "Next.js", "Flutter", "MySQL", "Firebase", "Python"].map((skill, index) => (
            <motion.span
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.05 }}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      )
    },
    {
      icon: <FaCertificate className="text-orange-500 text-2xl" />,
      title: "Certifications",
      content: (
        <div className="space-y-2">
          {[
            "Kaspersky Network Security",
            "ITI Cloud",
            "Google Python Automation"
          ].map((cert, index) => (
            <motion.p 
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              {cert}
            </motion.p>
          ))}
        </div>
      )
    },
    {
      icon: <FaLanguage className="text-red-500 text-2xl" />,
      title: "Languages",
      content: (
        <div className="flex gap-4">
          {["Arabic (Native)", "English"].map((lang, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-gray-600 dark:text-gray-300">{lang}</span>
            </motion.div>
          ))}
        </div>
      )
    }
  ]

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <motion.h1 
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About <span className="text-blue-500">Me</span>
      </motion.h1>

      <div className="space-y-12">
        {sectionData.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-4 mb-4">
              {section.icon}
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{section.title}</h2>
            </div>
            <div className="ml-10">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}