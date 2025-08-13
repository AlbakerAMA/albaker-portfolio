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
          <div className="relative w-72 h-72 mb-4"> 
            <Image
              src="/images/my-story.jpg"
              alt="My Story"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {[
            "In Aswan, where I was born, the internet moved slower than the Nile on a still day. Sometimes, it didn’t move at all. For most people, that was just life. For me, it was a barrier to the world I desperately wanted to reach. School wasn’t much better. Classrooms were packed, the materials were outdated, and the education system focused on memorization rather than curiosity. Learning felt like climbing a mountain with no map. Instead of giving up, I started looking for ways to improve it for myself and others. I taught myself coding through unreliable connections, gathering knowledge from any resources I could find. I imagined classrooms where learning wasn’t restricted by location, time, or the teacher’s chalkboard. Joining the African Leadership Academy changed everything for me. Surrounded by innovators and dreamers, I began to explore how AI could transform education. I wanted to create tools that personalize learning, and adjust to each student’s needs. I envisioned a future where every student, no matter where they lived, could access quality education tailored to their unique learning style. I started building projects that used AI to adapt lessons to individual students, making learning more engaging and effective. My journey has been about turning frustration into innovation, and I’m committed to making education accessible for everyone."
          ].map((cert, index) => (
            <motion.p
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="text-gray-600 dark:text-gray-300 text-center" 
            >
              {cert}
            </motion.p>
          ))}
        </div>
      )
    },
    {
      title: "My Mission",
      content: (
        <div className="space-y-4 flex flex-col items-center max-w-2xl mx-auto">
          {[
            "What started as frustration in a border city became my mission: to use technology to make education not just a privilege, but a right for anyone, anywhere."
          ].map((cert, index) => (
            <motion.p
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="text-gray-600 dark:text-gray-300 text-center"
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
