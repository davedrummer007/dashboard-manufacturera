'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/providers/ThemeProvider'
import { getMacroDataByGestion } from './data/macroDataProcessor'
import MacroHorizontalBarChart from './components/MacroHorizontalBarChart'
import MacroKPIs from './components/MacroKPIs'
import DataFilters from './components/DataFilters'

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function MacroVariables() {
  const { theme } = useTheme()
  const darkMode = theme === 'dark'
  const [selectedGestion, setSelectedGestion] = useState('2022')

  // Obtener datos para la gestión seleccionada
  const currentData = getMacroDataByGestion(selectedGestion)

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        
        {/* HERO SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <motion.div
            variants={itemVariants}
            className={`bg-gradient-to-r ${
              darkMode 
                ? 'from-blue-900 via-blue-800 to-purple-900' 
                : 'from-blue-600 via-blue-500 to-purple-600'
            } text-white p-12 rounded-2xl shadow-2xl mb-8 relative overflow-hidden`}
          >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
            
            <h1 className="text-4xl font-bold mb-4 relative z-10">
              MACRO VARIABLES - VALOR BRUTO DE PRODUCCIÓN
            </h1>
            <p className="text-xl text-blue-100 mb-6 relative z-10">
              Análisis del Desempeño Productivo por Departamento
            </p>
            <div className="relative z-10">
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                Sector Manufacturero Boliviano
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* FILTROS */}
        <motion.div variants={itemVariants}>
          <DataFilters 
            selectedGestion={selectedGestion}
            onGestionChange={setSelectedGestion}
          />
        </motion.div>

        {/* KPIs PRINCIPALES */}
        <motion.div variants={itemVariants}>
          <MacroKPIs 
            selectedGestion={selectedGestion}
            darkMode={darkMode}
          />
        </motion.div>

        {/* GRÁFICA PRINCIPAL */}
        <motion.div
          variants={itemVariants}
          className="space-y-8"
        >
          <div className={`p-6 rounded-2xl shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              VALOR BRUTO POR DEPARTAMENTO DEPRODUCCIÓN DEL SECTOR MANUFACTURERO {selectedGestion} <br />
              (En miles de bolivianos)
            </h3>
            <MacroHorizontalBarChart 
              data={currentData}
              gestion={selectedGestion}
              darkMode={darkMode}
            />
          </div>
        </motion.div>

        {/* INFORMACIÓN ADICIONAL */}
        <motion.div
          variants={itemVariants}
          className={`mt-12 p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ANÁLISIS MACROECONÓMICO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-amber-600 dark:text-amber-400 text-lg">
                Tendencias Observadas
              </h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• <strong>La Paz, Cochabamba y Santa Cruz</strong> concentran el mayor valor bruto de producción</li>
                <li>• <strong>Crecimiento significativo 2022-2023</strong> en la mayoría de departamentos</li>
                <li>• <strong>Estabilización en 2024</strong> con ajustes post-pandemia</li>
                <li>• <strong>Distribución territorial equilibrada</strong> del potencial productivo</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 text-lg">
                Impacto Económico
              </h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• <strong>Motor del desarrollo regional</strong> a través de la industria manufacturera</li>
                <li>• <strong>Generación de empleo</strong> directo e indirecto</li>
                <li>• <strong>Diversificación productiva</strong> por departamento</li>
                <li>• <strong>Base para políticas industriales</strong> focalizadas</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  )
}