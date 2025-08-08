'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaGithub, FaExternalLinkAlt, FaCode, FaRobot, FaMobileAlt, FaGraduationCap, FaCogs } from 'react-icons/fa'

const projects = [
  {
    title: 'FixMate',
    description: 'A Flutter Project Integrated with Firebase & AI Chatbot Support. I developed this mobile application using Flutter to support my brother in his work as a machine repair technician. The app allows him to efficiently manage and store customer data using Firebase for secure and real-time cloud storage. To further assist him on the job, I integrated a chatbot feature that helps identify machine issues by entering the machine code, the chatbot responds with detailed information about the machine, possible issues, and solutions. This project demonstrates my ability to build practical, user-focused applications that solve real-world problems through smart integration of technologies like Firebase and AI.',
    image: '/images/mobile-app.jpg',
    github: 'https://github.com/AlbakerAMA/FixMate.git',
    live: null,
    icon: <FaMobileAlt className="text-2xl text-blue-500" />
  },
  {
    title: 'FootPrints web app',
    description: 'Footprints web application is a part of the Student Enterprise Program at the African Leadership Academy (ALA). Footprints is an e-commerce platform designed to showcase and sell merchandise created by the student-led brand. The platform allows users to browse products, view details, and place orders seamlessly. The project aimed to give students real-world experience in managing a business while offering a functional, modern digital storefront. I focused on creating a clean user interface, smooth shopping experience, and scalable architecture to support the enterprise’s growth.',
    image: '/images/web-app.jpg',
    github: null, // No GitHub available
    live: 'https://footprints.alastudents.org/',
    icon: <FaWeb className="text-2xl text-green-500" />
  },
  {
    title: 'HTA e-Learning Platform',
    description: 'Built an accessible platform for students with disabilities.',
    image: "/images/web-app.jpg", // No image available
    github: 'https://github.com/albaker/hta-elearning',
    live: null, // No live site
    icon: <FaGraduationCap className="text-2xl text-purple-500" />
  },
  {
    title: 'Workflow Automation',
    description: 'Automated alerts and system flows with Node-RED, n8n, WhatsApp + Sheets.',
    image: '/images/ML.jpg', // No image available
    github: null, // No GitHub available
    live: null, // No live site
    icon: <FaRobot className="text-2xl text-orange-500" />     // FaCogs
  }
]

export default function ProjectsPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My <span className="text-blue-500">Projects</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            {/* Project Image or Placeholder */}
            <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={300}
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
              <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
              
              <div className="flex gap-3">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
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
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </Link>
                )}
                {!project.github && !project.live && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <FaCode /> Code Private
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}