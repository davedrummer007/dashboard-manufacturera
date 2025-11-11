// app/dashboard/modulo-b/capitulo-2/page.tsx
"use client";

import { useState, useEffect } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { 
  getGestionAmbientalByGestion, 
  getPreguntaChartData, 
  getPreguntaTitulo, 
  getPreguntaDescripcion,
  getPreguntaAmbientalData,
  formatNumber 
} from './data/dataProcessor'
import dynamic from 'next/dynamic'

// Dynamic imports para componentes que usan APIs del navegador
const SistemaAmbientalPieChart = dynamic(() => import('./components/SistemaAmbientalPieChart'), {
  ssr: false,
  loading: () => <div className="p-8 text-center">Cargando gráfico...</div>
})

const DataFilters = dynamic(() => import('./components/DataFilters'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Cargando filtros...</div>
})

// Usar animación existente por número
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

// El resto del código permanece igual...
export default function Capitulo2() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  // Obtener datos filtrados por gestión
  const datosGestion = getGestionAmbientalByGestion(gestion)
  
  // Obtener datos para cada pregunta
  const preguntasData = {
    preg_1: getPreguntaAmbientalData(gestion, 'preg_1'),
    preg_8: getPreguntaAmbientalData(gestion, 'preg_8')
  }

  // Obtener datos para gráficas
  const chartDataPreg1 = getPreguntaChartData(gestion, 'preg_1')
  const chartDataPreg8 = getPreguntaChartData(gestion, 'preg_8')

  // Calcular crecimiento vs gestión anterior
  const getCrecimientoTotal = () => {
    if (gestion === '2022') return 0
    const gestionAnterior = gestion === '2023' ? '2022' : '2023'
    const datosAnteriores = getGestionAmbientalByGestion(gestionAnterior)
    if (!datosAnteriores || !datosGestion) return 0
    return ((datosGestion.total_registros - datosAnteriores.total_registros) / datosAnteriores.total_registros) * 100
  }

  const crecimientoTotal = getCrecimientoTotal()
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
          Gestión Ambiental
        </h1>
        <h2 className="text-xl text-green-600 dark:text-green-400 mt-2">
          SISTEMA DE GESTIÓN AMBIENTAL
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

      {/* KPIs Principales */}
      <motion.div
        variants={animation.container}
        className="space-y-6"
      >
        {/* KPIs de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                🌿 Total Empresas Encuestadas
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {datosGestion ? formatNumber(datosGestion.total_registros) : '0'}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Gestión {gestion}
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                📊 Crecimiento Muestral
              </h3>
              <p className={`text-2xl font-bold mt-2 ${
                crecimientoTotal > 0 ? 'text-green-600' : crecimientoTotal < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {crecimientoTotal > 0 ? '+' : ''}{crecimientoTotal.toFixed(1)}%
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
                🎯 Tasa Gestión Ambiental
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                {preguntasData.preg_1.siPorcentaje.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Empresas con sistema ambiental
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Grid de 2 Gráficas - Preguntas 1 y 8 */}
      <motion.div
        variants={animation.container}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Pregunta 1 */}
        <motion.div variants={animation.item}>
          <SistemaAmbientalPieChart 
            data={chartDataPreg1}
            titulo={getPreguntaTitulo('preg_1')}
            descripcion={getPreguntaDescripcion('preg_1')}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>

        {/* Pregunta 8 */}
        <motion.div variants={animation.item}>
          <SistemaAmbientalPieChart 
            data={chartDataPreg8}
            titulo={getPreguntaTitulo('preg_8')}
            descripcion={getPreguntaDescripcion('preg_8')}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>
      </motion.div>

      {/* Información adicional y análisis */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Análisis de Gestión Ambiental Empresarial
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-green-600 dark:text-green-400">
              Tendencias Ambientales
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Crecimiento en conciencia ambiental</span> empresarial</li>
              <li>• <span className="font-medium">Implementación de ISO 14001</span> en grandes empresas</li>
              <li>• <span className="font-medium">Gestión de residuos</span> como prioridad operativa</li>
              <li>• <span className="font-medium">Cumplimiento normativo</span> ambiental nacional</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">
              Impacto Operativo
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Reducción de impactos ambientales</span> significativos</li>
              <li>• <span className="font-medium">Optimización de recursos</span> naturales y energéticos</li>
              <li>• <span className="font-medium">Mejora de imagen corporativa</span> y reputación</li>
              <li>• <span className="font-medium">Acceso a mercados</span> internacionales exigentes</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Tabla resumen de datos */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Resumen Numérico - Gestión {gestion}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Indicador Ambiental</th>
                <th className="px-4 py-3 text-right">Empresas SÍ</th>
                <th className="px-4 py-3 text-right">Empresas NO</th>
                <th className="px-4 py-3 text-right">% SÍ</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-3 font-medium">{getPreguntaTitulo('preg_1')}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_1.si)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_1.no)}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">{preguntasData.preg_1.siPorcentaje.toFixed(1)}%</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_1.total)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">{getPreguntaTitulo('preg_8')}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_8.si)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_8.no)}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">{preguntasData.preg_8.siPorcentaje.toFixed(1)}%</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_8.total)}</td>
              </tr>
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <td className="px-4 py-3 font-bold">Total General</td>
                <td className="px-4 py-3 text-right font-bold">
                  {formatNumber(preguntasData.preg_1.si + preguntasData.preg_8.si)}
                </td>
                <td className="px-4 py-3 text-right font-bold">
                  {formatNumber(preguntasData.preg_1.no + preguntasData.preg_8.no)}
                </td>
                <td className="px-4 py-3 text-right font-bold text-green-600">
                  {(((preguntasData.preg_1.si + preguntasData.preg_8.si) / (preguntasData.preg_1.total + preguntasData.preg_8.total)) * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right font-bold">
                  {datosGestion ? formatNumber(datosGestion.total_registros) : '0'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* FOOTER INSTITUCIONAL */}
      <motion.div
        variants={itemVariants}
        className={`mt-12 p-6 rounded-2xl border-l-4 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-green-500' 
            : 'bg-green-50 border-green-500'
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