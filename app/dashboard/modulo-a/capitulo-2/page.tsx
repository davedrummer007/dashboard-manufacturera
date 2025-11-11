"use client";

import { useState, useEffect, Suspense } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { getDataByGestion, formatNumber } from './data/dataProcessor'
import dynamic from 'next/dynamic'

// Dynamic imports para componentes con gráficos
const HorizontalBarChartInventory = dynamic(() => import('./components/HorizontalBarChartInventory'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const VerticalBarChartInventory = dynamic(() => import('./components/VerticalBarChartInventory'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const DoubleVerticalBarChart = dynamic(() => import('./components/DoubleVerticalBarChart'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const DataFilters = dynamic(() => import('./components/DataFilters'), {
  ssr: false,
  loading: () => <div className="flex justify-center p-4">Cargando filtros...</div>
});

// Obtener animaciones específicas para el capítulo 2
const animation = getAnimationByChapter(2)

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

export default function Capitulo2() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  // Obtener datos filtrados por gestión
  const { departamentos, patrimonioPorcentaje, inventarioIF } = getDataByGestion(gestion)
  
  // Calcular totales para KPIs
  const totalPatrimonio = departamentos.reduce((sum, item) => sum + item.patrimonio, 0)
  const crecimientoPatrimonio = gestion === '2024' ? -30.4 : gestion === '2023' ? 18.5 : 0
  const totalInventarioFinal = inventarioIF.reduce((sum, item) => sum + item.invFinal, 0)
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
          Información Financiera
        </h1>
        <h2 className="text-xl text-green-600 dark:text-green-400 mt-2">
          INVENTARIO Y PATRIMONIO
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Total Patrimonio {gestion}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              Bs {formatNumber(totalPatrimonio)}
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Valor total del patrimonio
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Crecimiento Patrimonio
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              crecimientoPatrimonio > 0 ? 'text-green-600' : crecimientoPatrimonio < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {crecimientoPatrimonio > 0 ? '+' : ''}{crecimientoPatrimonio}%
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Vs gestión anterior
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Inventario Final {gestion}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              Bs {formatNumber(totalInventarioFinal)}
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Valor total inventario
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Gráfico 1: Patrimonio por Departamento */}
      <Suspense fallback={<LoadingSpinner />}>
        <motion.div
          variants={animation.item}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            DISTRIBUCIÓN DEL PATRIMONIO DEL SECTOR MANUFACTURERO POR DEPARTAMENTO <br />
            (En Millones de Bolivianos)
          </h3>
          <HorizontalBarChartInventory 
            data={departamentos}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>
      </Suspense>

      {/* Gráficos 2 y 3 en grid */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico 2: Patrimonio por Tipo Societario */}
          <motion.div
            variants={animation.item}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-justify">
              PATRIMONIO DEL SECTOR MANUFACTURERO POR TIPO SOCIETARIO <br />
              (En Porcentajes)
            </h3>
            <VerticalBarChartInventory 
              data={patrimonioPorcentaje}
              gestion={gestion}
              darkMode={theme === 'dark'}
            />
          </motion.div>

          {/* Gráfico 3: Inventario Inicial vs Final */}
          <motion.div
            variants={animation.item}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-justify">
              VARIACIÓN DEL INVENTARIO INICIAL Y FINAL DEL SECTOR MANUFACTURERO POR TIPO SOCIETARIO <br />
              (En Millones de Bolivianos)
            </h3>
            <DoubleVerticalBarChart 
              data={inventarioIF}
              gestion={gestion}
              darkMode={theme === 'dark'}
            />
          </motion.div>
        </div>
      </Suspense>

      {/* Información adicional */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Análisis de Inventarios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-green-600 dark:text-green-400">
              Composición del Patrimonio
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Santa Cruz</span> concentra el mayor patrimonio</li>
              <li>• <span className="font-medium">Sociedades Anónimas</span> representan la mayor parte</li>
              <li>• <span className="font-medium">Inventario final</span> muestra la posición al cierre</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">
              Tendencias Observadas
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Crecimiento 2022-2023:</span> +18.5% en patrimonio</li>
              <li>• <span className="font-medium">Ajuste 2024:</span> -30.4% por reestructuración</li>
              <li>• <span className="font-medium">Estabilidad:</span> Inventarios se mantienen consistentes</li>
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