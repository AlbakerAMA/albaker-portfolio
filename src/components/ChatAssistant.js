'use client'

import { useState, useRef, useEffect } from 'react'
import { FiSend, FiX, FiMessageCircle, FiCode, FiBriefcase, FiMail } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Albaker's AI assistant. Ask me about him!",
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('albaker_chat_history')
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse chat history", e)
      }
    }
  }, [])

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('albaker_chat_history', JSON.stringify(messages))
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    // Add user message
    const userMessage = { role: 'user', content: inputValue }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        let errorMessage = "⚠️ Sorry, I'm having trouble responding. Please try again later.";
        
        if (response.status === 500 && errorData.message) {
          errorMessage = `⚠️ Configuration issue: ${errorData.message}`;
        } else if (response.status === 504) {
          errorMessage = "⚠️ Request timeout. Please try a shorter question.";
        } else if (response.status === 400 && errorData.message) {
          errorMessage = `⚠️ ${errorData.message}`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json()
      
      if (!data.reply) {
        throw new Error("No response received from AI");
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error('Chat Error:', error)
      
      let errorMessage = error.message;
      if (!errorMessage.startsWith('⚠️')) {
        errorMessage = "⚠️ Sorry, I'm having trouble responding. Please try again later.";
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    { text: "What projects has Albaker built?", icon: <FiBriefcase className="mr-1" /> },
    { text: "Show me some code examples", icon: <FiCode className="mr-1" /> },
    { text: "How to contact Albaker?", icon: <FiMail className="mr-1" /> }
  ]

  return (
    <>
      {/* Floating Button (shows when closed) */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-4 sm:right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-xl z-50 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FiMessageCircle size={20} />
          <span className="font-medium">Ask AI</span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 w-full h-full sm:bottom-8 sm:right-8 sm:left-auto sm:w-96 sm:h-[70vh] sm:max-h-[600px] bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl sm:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Albaker's Assistant</h3>
                  <p className="text-xs opacity-90">Ask about projects, skills, or availability</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/20 transition"
                  aria-label="Close chat"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'assistant' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'assistant'
                        ? 'bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-blue-50 dark:bg-gray-800 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              {/* Quick Questions */}
              <div className="flex flex-wrap gap-2 mb-3">
                {quickQuestions.map((q, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setInputValue(q.text)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {q.icon}
                    {q.text}
                  </motion.button>
                ))}
              </div>

              {/* Input Field */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about projects or skills..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}