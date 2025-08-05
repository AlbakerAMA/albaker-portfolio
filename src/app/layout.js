import './globals.css'
import ChatAssistant from '@/components/ChatAssistant';
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Albaker Ahmed | Portfolio',
  description: 'Software Developer | Machine Learning | Full Stack | Flutter | Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-white via-gray-50 to-gray-200 text-gray-900 dark:from-black dark:via-gray-900 dark:to-gray-950 dark:text-white transition-colors duration-500`}>
        <Navbar />
        <main className="min-h-screen container mx-auto px-4 py-10">{children}</main>
        <ChatAssistant />
        
        <Footer />
      </body>
    </html>
  )
}