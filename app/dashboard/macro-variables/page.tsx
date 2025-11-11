// app/dashboard/macro-variables/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/providers/ThemeProvider'
import { getMacroDataByGestionAndType, getTotalByGestionAndType, getDepartamentoLiderByGestionAndType } from './data/macroDataProcessor'
import dynamic from 'next/dynamic'

// Dynamic imports para componentes con gráficos
const MacroHorizontalBarChart = dynamic(() => import('./components/MacroHorizontalBarChart'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const MacroCIHorizontalBarChart = dynamic(() => import('./components/MacroCIHorizontalBarChart'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const MacroKPIs = dynamic(() => import('./components/MacroKPIs'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const DataFilters = dynamic(() => import('./components/DataFilters'), {
  ssr: false,
  loading: () => <div className="flex justify-center p-4">Cargando filtros...</div>
});

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
  const [activeTab, setActiveTab] = useState<'VBP' | 'CI'>('VBP')

  // Obtener datos para la gestión seleccionada y tipo activo
  const currentData = getMacroDataByGestionAndType(selectedGestion, activeTab)
  const total = getTotalByGestionAndType(selectedGestion, activeTab)
  const departamentoLider = getDepartamentoLiderByGestionAndType(selectedGestion, activeTab)
  const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      // Simular carga de datos
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
      return (
        <div className="w-full">
          <LoadingSpinner />
        </div>
      )
    }
    
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
              MACRO VARIABLES - INDICADORES ECONÓMICOS
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

        {/* TABS PARA VBP Y CI */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className={`p-1 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('VBP')}
                className={`flex-1 py-3 px-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                  activeTab === 'VBP'
                    ? darkMode
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                📊 VALOR BRUTO DE PRODUCCIÓN
              </button>
              <button
                onClick={() => setActiveTab('CI')}
                className={`flex-1 py-3 px-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                  activeTab === 'CI'
                    ? darkMode
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-green-600 text-white shadow-lg'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
                }`}
              >
                🔥 CONSUMO INTERMEDIO
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPIs PRINCIPALES */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div variants={itemVariants}>
            <MacroKPIs 
              selectedGestion={selectedGestion}
              activeTab={activeTab}
              darkMode={darkMode}
            />
          </motion.div>
        </Suspense>

        {/* INFORMACIÓN DE FÓRMULAS */}
        <motion.div variants={itemVariants} className="mb-8">
          {activeTab === 'VBP' ? (
            <div className={`p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 text-center">
                VALOR BRUTO DE LA PRODUCCIÓN (VBP)
              </h3>
              <div className="text-center mb-4">
                <div className="text-xl font-mono font-bold text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-800 p-3 rounded-lg inline-block">
                  VBP = VPF + VMST + OI + IFPF - IIPF + IFPP - IIPP
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Descripción:</h4>
                  <p className="text-blue-700 dark:text-blue-400">
                    El VBP representa el valor total de los bienes y servicios producidos por las unidades económicas durante un período determinado.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Componentes:</h4>
                  <ul className="text-blue-700 dark:text-blue-400 space-y-1 text-xs">
                    <li><strong>VPF</strong> = Venta de Productos Fabricados</li>
                    <li><strong>VMST</strong> = Venta de Mercancías sin Transformación</li>
                    <li><strong>OI</strong> = Otros Ingresos</li>
                    <li><strong>IFPF</strong> = Inventario Final de Productos Fabricados</li>
                    <li><strong>IIPF</strong> = Inventario Inicial de Productos Fabricados</li>
                    <li><strong>IFPP</strong> = Inventario Final de Productos en Proceso</li>
                    <li><strong>IIPP</strong> = Inventario Inicial de Productos en Proceso</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4 text-center">
                CONSUMO INTERMEDIO (CI)
              </h3>
              <div className="text-center mb-4">
                <div className="text-xl font-mono font-bold text-green-700 dark:text-green-400 bg-white dark:bg-gray-800 p-3 rounded-lg inline-block">
                  CI = CMM + CEC + GSE + IQ
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Descripción:</h4>
                  <p className="text-green-700 dark:text-green-400">
                    El CI representa el valor de todos los bienes y servicios que fueron consumidos o transformados durante el proceso productivo.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Componentes:</h4>
                  <ul className="text-green-700 dark:text-green-400 space-y-1 text-xs">
                    <li><strong>CMM</strong> = Consumo de Materiales y Mercancías</li>
                    <li><strong>CEC</strong> = Consumo de Energía y Combustible</li>
                    <li><strong>GSE</strong> = Gastos en Servicios Externos</li>
                    <li><strong>IQ</strong> = Insumos Químicos</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* GRÁFICA PRINCIPAL */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div variants={itemVariants} className="space-y-8">
            <div className={`p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {activeTab === 'VBP' 
                  ? `VALOR BRUTO DE PRODUCCIÓN DEL SECTOR MANUFACTURERO POR DEPARTAMENTO - ${selectedGestion}`
                  : `CONSUMO INTERMEDIO DEL SECTOR MANUFACTURERO POR DEPARTAMENTO - ${selectedGestion}`
                }<br />
                <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                  (En Millones de Bolivianos)
                </span>
              </h3>
              {activeTab === 'VBP' ? (
                <MacroHorizontalBarChart 
                  data={currentData}
                  gestion={selectedGestion}
                  darkMode={darkMode}
                />
              ) : (
                <MacroCIHorizontalBarChart 
                  data={currentData}
                  gestion={selectedGestion}
                  darkMode={darkMode}
                />
              )}
            </div>
          </motion.div>
        </Suspense>

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

            {/* FOOTER INSTITUCIONAL */}
            <motion.div
              variants={itemVariants}
              className={`mt-12 p-6 rounded-2xl border-l-4 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-blue-500' 
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <p className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    FUENTE - Encuesta Anual de Unidades Económicas
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Viceministerio de Políticas de Industrialización • Dirección General de Análisis Productiva Industrial
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Resolución Ministerial MDPyEP/DESPACHO/Nº 056/2023
                  </p>
                </div>
              </div>
            </motion.div>
      </main>
    </div>
  )
}