"use client";

import { useState, useEffect, Suspense } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { getDataByGestion, formatNumber } from './data/dataProcessor'
import dynamic from 'next/dynamic'

// Dynamic imports para componentes con gráficos
const VerticalBarChart = dynamic(() => import('./components/VerticalBarChart'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const PieChart3DReal = dynamic(() => import('./components/PieChart3DReal'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const HorizontalBarChart = dynamic(() => import('./components/HorizontalBarChart'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const DataFilters = dynamic(() => import('./components/DataFilters'), {
  ssr: false,
  loading: () => <div className="flex justify-center p-4">Cargando filtros...</div>
});

// Obtener animaciones específicas para el capítulo 1
const animation = getAnimationByChapter(1)

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

export default function Capitulo1() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  // Obtener datos filtrados por gestión
  const { departamentos, actividades, societario } = getDataByGestion(gestion)
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
  // Calcular totales para KPIs
  const totalIngresos = departamentos.reduce((sum, item) => sum + item.total, 0)
  const crecimiento = gestion === '2024' ? -13.2 : gestion === '2023' ? 27.1 : 0

  return (
    <motion.div
      variants={animation.container}
      initial="hidden"
      animate="visible"
      className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 space-y-6" // Reducido space-y-8 a space-y-6
    >
      
      {/* Encabezado con animación */}
      <motion.div
        variants={animation.item}
        className="mb-6" // Reducido mb-8 a mb-6
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Información Financiera
        </h1>
        <h1 className="text-xl text-blue-600 dark:text-blue-400 mt-2">
          INGRESOS
        </h1>
      </motion.div>

      {/* Filtros justo antes de los KPIs */}
      <motion.div variants={animation.item}>
        <DataFilters 
          gestion={gestion}
          onGestionChange={setGestion}
          darkMode={theme === 'dark'}
        />
      </motion.div>

      {/* KPIs con animación escalonada */}
      <motion.div
        variants={animation.container}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Total Ingresos {gestion}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              Bs {formatNumber(totalIngresos)}
            </p>
          </div>
        </motion.div>
        
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Crecimiento Anual
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              crecimiento > 0 ? 'text-green-600' : crecimiento < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {crecimiento > 0 ? '+' : ''}{crecimiento}%
            </p>
          </div>
        </motion.div>
        
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Departamentos
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {departamentos.length}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="space-y-6">    
        {/* Gráfico 1: Ingresos por Departamento */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            variants={animation.item}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              DISTRIBUCION DEPARTAMENTAL DE LOS INGRESOS DEL SECTOR MANUFACTURERO <br />
              (En Millones de Bolivianos)
            </h3>
            <VerticalBarChart 
              data={departamentos}
              gestion={gestion}
              darkMode={theme === 'dark'}
            />
          </motion.div>
        </Suspense>

          {/* Gráfico 2: Distribución por Tipo Societario */}
          <Suspense fallback={<LoadingSpinner />}>
            <motion.div
              variants={animation.item}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-justify">
                INGRESOS POR VENTAS DEL SECTOR MANUFACTURERO POR TIPO SOCIETARIO <br />
                (En Porcentajes)
              </h3>
              <PieChart3DReal 
                data={societario}
                gestion={gestion}
                darkMode={theme === 'dark'}
              />
            </motion.div>
          </Suspense>

          {/* Gráfico 3: Actividades Económicas */}
          <Suspense fallback={<LoadingSpinner />}>
            <motion.div
              variants={animation.item}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full overflow-x-auto"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-justify">
                INGRESOS POR VENTAS DEL SECTOR MANUFACTURERO POR ACTIVIDAD ECONÓMICA <br />
                (En Millones de Bolivianos)
              </h3>
              <div className="min-w-[800px]">
                <HorizontalBarChart
                  data={actividades}
                  gestion={gestion}
                  darkMode={theme === 'dark'}
                />
              </div>
            </motion.div>
          </Suspense>
      </div>
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

    </motion.div>
  )
}