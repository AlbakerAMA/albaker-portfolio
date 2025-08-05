'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'

export default function ContactPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const contactItems = [
    {
      icon: <FaEnvelope className="text-red-500 text-2xl" />,
      label: "Email",
      value: "aali23@alastudents.org",
      link: "mailto:aali23@alastudents.org"
    },
    {
      icon: <FaPhone className="text-green-500 text-2xl" />,
      label: "Phone",
      value: "+20 100 475 9730",
      link: "tel:+201004759730"
    },
    {
      icon: <FaMapMarkerAlt className="text-blue-500 text-2xl" />,
      label: "Location",
      value: "Aswan, Egypt"
    },
    {
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      link: "https://wa.me/201004759730"
    },
    {
      icon: <FaTelegram className="text-blue-400 text-2xl" />,
      label: "Telegram",
      value: "Message on Telegram",
      link: "https://t.me/albaker"
    },
    {
      icon: <SiUpwork className="text-green-600 text-2xl" />,
      label: "Upwork",
      value: "Hire me on Upwork",
      link: "https://upwork.com/freelancers/~01..."
    }
  ]

  const socialLinks = [
    {
      icon: <FaGithub className="text-xl" />,
      label: "GitHub",
      url: "https://github.com/albaker"
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/albaker"
    }
  ]

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Get in <span className="text-blue-500">Touch</span></h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I'd love to hear from you! Whether it's a question, a project, or just to connect, 
          feel free to reach out through any of these channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
            Contact Information
          </h2>
          
          <ul className="space-y-4">
            {contactItems.map((item, index) => (
              <motion.li
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1">{item.icon}</div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                  {item.link ? (
                    <Link 
                      href={item.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 dark:text-gray-200 hover:text-blue-500 transition-colors"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{item.value}</p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
            Social Profiles
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((social, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact Form Placeholder */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <h3 className="text-lg font-medium mb-4">Or send me a message directly</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" 
              />
              <textarea 
                placeholder="Your Message" 
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" 
              ></textarea>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Send Message
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}