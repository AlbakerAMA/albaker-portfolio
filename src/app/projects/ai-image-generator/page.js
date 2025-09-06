'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'

export default function ProjectDetailsPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/projects" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Projects</Link>
        <h1 className="text-4xl font-bold mb-2">AI Image Generator</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">A web app that generates images from text prompts using AI.</p>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Image
          src="/images/ML.jpg"
          alt="AI Image Generator Screenshot"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="md:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">About the Project</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This project is a web application that allows users to generate images from textual descriptions using a state-of-the-art AI model. It provides an intuitive interface for users to enter their prompts and see the generated images in real-time.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            The goal of this project was to explore the capabilities of modern AI image generation models and build a practical application that showcases their power. The application is built with a focus on user experience, performance, and scalability.
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS</li>
            <li><strong>Backend:</strong> Next.js API Routes</li>
            <li><strong>AI Model:</strong> DALL-E 2 (via API)</li>
            <li><strong>Deployment:</strong> Vercel</li>
          </ul>
          <div className="mt-6 flex gap-4">
            <Link
              href="https://github.com/AlbakerAMA/ai-image-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaGithub /> GitHub
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
