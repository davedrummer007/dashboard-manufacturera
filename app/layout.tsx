"use client";

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './providers/ThemeProvider'
import Sidebar from './components/Sidebar'
import './globals.css'
import { usePathname } from 'next/navigation'

// SOLO dynamic, sin revalidate
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const pathname = usePathname()

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  }

  const pageTransition = {
    duration: 0.2
  }

  return (
    <html lang="es">
      <body className="bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <div className="fixed left-0 top-0 h-screen z-50">
              <Sidebar 
                expanded={sidebarExpanded} 
                setExpanded={setSidebarExpanded} 
              />
            </div>

            <div 
              className={`flex-shrink-0 transition-all duration-300 ${
                sidebarExpanded ? 'w-64' : 'w-20'
              }`}
            />
            
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={pathname}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="w-full h-full"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
