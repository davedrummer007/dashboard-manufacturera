'use client'

import { useTheme } from '@/app/providers/ThemeProvider'
import { WrenchScrewdriverIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function Capitulo3() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <WrenchScrewdriverIcon className="h-20 w-20 text-blue-500 dark:text-blue-400" />
              <ClockIcon className="h-8 w-8 text-orange-500 absolute -top-2 -right-2" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Capítulo 3 - RESPONSABILIDAD SOCIAL EMPRESARIAL
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Próximamente disponible
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`
            rounded-2xl p-8 text-center
            ${theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200 shadow-xl'
            }
          `}
        >
          <RocketLaunchIcon className="h-16 w-16 mx-auto text-purple-500 dark:text-purple-400 mb-6" />
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 En Desarrollo
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Estamos trabajando arduamente para traerte las mejores visualizaciones 
            de datos sobre personal ocupado, sueldos y salarios.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Diseño de Gráficas</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 dark:text-green-400 font-bold">2</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Procesamiento de Datos</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Implementación</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Progreso</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              ¡Vuelve pronto para descubrir las nuevas funcionalidades!
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Sistema de Dashboard - Encuesta Manufacturera
          </p>
        </motion.div>
      </div>
    </div>
  )
}