
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaCode, FaGlobe, FaMobileAlt } from 'react-icons/fa'

const projects = [
  {
    title: 'SOLFA Web App',
    slug: 'solfa-web-app',
    description: 'Official website for SOLFA, empowering marginalized communities through sustainable agriculture.',
    features: [
      'Responsive Next.js frontend',
      'Community engagement hub',
      'Optimized for scalability',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    image: '/images/web-app.jpg', 
    github: null,
    live: 'https://solfaafrica.org/',
    icon: <FaGlobe className="text-2xl text-green-500" />,
    category: 'Web',
  },
  {
    title: 'FixMate',
    slug: 'fixmate',
    description: 'A Flutter app with Firebase and AI chatbot for machine repair technicians.',
    features: [
      'Real-time customer data management',
      'AI chatbot for machine diagnostics',
      'Secure Firebase backend',
    ],
    techStack: ['Flutter', 'Firebase', 'AI Chatbot'],
    image: '/images/mobile-app.jpg', 
    github: 'https://github.com/AlbakerAMA/FixMate.git',
    live: null,
    icon: <FaMobileAlt className="text-2xl text-blue-500" />,
    category: 'Mobile',
  },
  {
    title: 'FootPrints Web App',
    slug: 'footprints-web-app',
    description: 'E-commerce platform for ALA’s student-led merchandise brand.',
    features: [
      'Seamless product browsing and ordering',
      'Modern UI with smooth UX',
      'Scalable architecture',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    image: '/images/web-app.jpg', 
    github: null,
    live: 'https://footprints.alastudents.org/',
    icon: <FaGlobe className="text-2xl text-green-500" />,
    category: 'Web',
  },
  {
    title: 'FootPrints Mobile App',
    slug: 'footprints-mobile-app',
    description: 'Mobile app for ALA’s FootPrints brand to shop merchandise on the go.',
    features: [
      'User-friendly mobile interface',
      'Secure checkout process',
      'Cross-device consistency',
    ],
    techStack: ['Flutter', 'Firebase'],
    image: '/images/mobile-app.jpg', 
    github: 'https://github.com/AlbakerAMA/FootPrintsApp',
    live: null,
    icon: <FaMobileAlt className="text-2xl text-blue-500" />,
    category: 'Mobile',
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Web', 'Mobile', 'ML']
  const filteredProjects = filter === 'All' ? projects : projects.filter(project => project.category === filter)

  return (
    <section className="container mx-auto px-4 py-12 min-w-[300px]">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My <span className="text-blue-500">Projects</span>
      </motion.h1>

      {/* Filter Bar */}
      <motion.div
        className="flex justify-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-pressed={filter === category}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            {/* Project Image or Placeholder */}
            <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  width={600}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  {project.icon}
                  <div className="mt-4 text-gray-500 dark:text-gray-400">
                    <FaCode className="text-5xl mx-auto opacity-30" />
                    <p className="mt-2 text-sm">Project Preview</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                {project.icon}
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm">{project.description}</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm mb-4">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                <strong>Tech Stack:</strong> {project.techStack.join(', ')}
              </p>
              <div className="flex gap-3 flex-wrap">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <FaGithub /> GitHub
                  </Link>
                )}
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </Link>
                )}
                {!project.github && !project.live && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label={`Learn more about ${project.title}`}
                  >
                    <FaCode /> Learn More
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


