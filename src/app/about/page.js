'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const sectionData = [
    {
      title: "My Story",
      content: (
        <div className="space-y-4 flex flex-col items-center max-w-2xl mx-auto">
          <div className="relative w-72 h-72 mb-4"> {/* Modified size here */}
            <Image
              src="/images/albaker-profile.jpg"
              alt="My Story"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {[
            "I started my journey in tech at a young age, fascinated by how things work behind the scenes. My passion led me to explore various fields, from web development to machine learning. I believe in continuous learning and adapting to new challenges, which has shaped my career as a full stack developer and ML engineer."
          ].map((cert, index) => (
            <motion.p 
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="text-gray-600 dark:text-gray-300 text-center" // Added text-center
            >
              {cert}
            </motion.p>
          ))}
        </div>
      )
    },
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

      {sectionData.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">{section.title}</h2>
          <div>
            {section.content}
          </div>
        </motion.div>
      ))}
    </section>
  )
}
