"use client";

import { useState, useEffect, Suspense } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { getActivosFijosByGestion, formatNumber } from './data/dataProcessor'
import dynamic from 'next/dynamic'

// Dynamic imports para componentes con gráficos
const VerticalBarChartAFGrande = dynamic(() => import('./components/VerticalBarChartAFGrande'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const DataFilters = dynamic(() => import('./components/DataFilters'), {
  ssr: false,
  loading: () => <div className="flex justify-center p-4">Cargando filtros...</div>
});

// Obtener animaciones específicas para el capítulo 4
const animation = getAnimationByChapter(4)

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

export default function Capitulo4() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  // Obtener datos filtrados por gestión
  const activosFijos = getActivosFijosByGestion(gestion)
  
  // Calcular totales para KPIs
  const totalActivosFijos = activosFijos.reduce((sum, item) => sum + item.valorContable, 0)

  // Calcular crecimiento vs gestión anterior
  const getCrecimientoActivos = () => {
    if (gestion === '2022') return 0
    const gestionAnterior = gestion === '2023' ? '2022' : '2023'
    const datosAnteriores = getActivosFijosByGestion(gestionAnterior)
    const totalAnterior = datosAnteriores.reduce((sum, item) => sum + item.valorContable, 0)
    return ((totalActivosFijos - totalAnterior) / totalAnterior) * 100
  }

  const crecimientoActivos = getCrecimientoActivos()
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
    <motion.div
      variants={animation.container}
      initial="hidden"
      animate="visible"
      className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 space-y-6"
    >
      
      {/* Encabezado con animación */}
      <motion.div
        variants={animation.item}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Activos Fijos
        </h1>
        <h2 className="text-xl text-blue-600 dark:text-blue-400 mt-2">
          ACTIVOS FIJOS - GRANDES EMPRESAS
        </h2>
      </motion.div>

      {/* Filtros */}
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              🏢 Total Activos Fijos {gestion}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              Bs. {formatNumber(totalActivosFijos)}
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Valor contable total
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              📈 Crecimiento Activos
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              crecimientoActivos > 0 ? 'text-green-600' : crecimientoActivos < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {crecimientoActivos > 0 ? '+' : ''}{crecimientoActivos.toFixed(1)}%
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Vs gestión anterior
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Gráfico Principal: Activos Fijos por Tipo Societario */}
      <Suspense fallback={<LoadingSpinner />}>
        <motion.div
          variants={animation.item}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            VALOR CONTABLE DE ACTIVOS FIJOS EN GRANDES EMPRESAS DEL SECTOR MANUFACTURERO POR TIPO SOCIETARIO <br />
            (En Millones de Bolivianos)
          </h3>
          <VerticalBarChartAFGrande 
            data={activosFijos}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>
      </Suspense>

      {/* Información adicional */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Análisis de Activos Fijos - Grandes Empresas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">
              Distribución por Tipo Societario
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Sociedades Anónimas</span> concentran la mayor parte de activos</li>
              <li>• <span className="font-medium">Sociedades de Responsabilidad Limitada</span> en segundo lugar</li>
              <li>• <span className="font-medium">Empresas Unipersonales</span> con menor participación</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400">
              Tendencias de Inversión
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Crecimiento significativo</span> en el valor contable</li>
              <li>• <span className="font-medium">Inversión en infraestructura</span> y maquinaria</li>
              <li>• <span className="font-medium">Fortaleza patrimonial</span> del sector manufacturero</li>
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
    </motion.div>
  )
}