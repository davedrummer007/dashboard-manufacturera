// app/dashboard/modulo-c/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { 
  getTICByGestion, 
  getPreguntaChartData, 
  getPreguntaTitulo, 
  getPreguntaDescripcion,
  getPreguntaTICData,
  getAllPreguntasData,
  formatNumber 
} from './data/dataProcessor'
import dynamic from 'next/dynamic'

// Dynamic imports para componentes con gráficos
const TICPieChart = dynamic(() => import('./components/TICPieChart'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const DataFilters = dynamic(() => import('./components/DataFilters'), {
  ssr: false,
  loading: () => <div className="flex justify-center p-4">Cargando filtros...</div>
});

const KpiTIC = dynamic(() => import('./components/KpiTIC'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

// Usar animación existente por número
const animation = getAnimationByChapter(3)

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

export default function ModuloC() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  // Obtener datos filtrados por gestión
  const datosGestion = getTICByGestion(gestion)
  
  // Obtener datos para todas las preguntas
  const todasLasPreguntas = getAllPreguntasData(gestion)
  
  // Obtener datos para KPIs principales
  const preguntasData = {
    p1: getPreguntaTICData(gestion, 'p1'),
    p2: getPreguntaTICData(gestion, 'p2'),
    p3: getPreguntaTICData(gestion, 'p3'),
    p4: getPreguntaTICData(gestion, 'p4'),
    p5: getPreguntaTICData(gestion, 'p5'),
    p6: getPreguntaTICData(gestion, 'p6'),
    p7: getPreguntaTICData(gestion, 'p7'),
    p8: getPreguntaTICData(gestion, 'p8'),
    p9: getPreguntaTICData(gestion, 'p9'),
    p10: getPreguntaTICData(gestion, 'p10'),
    p11: getPreguntaTICData(gestion, 'p11')
  }

  // Calcular crecimiento vs gestión anterior
  const getCrecimientoTotal = () => {
    if (gestion === '2022') return 0
    const gestionAnterior = gestion === '2023' ? '2022' : '2023'
    const datosAnteriores = getTICByGestion(gestionAnterior)
    if (!datosAnteriores || !datosGestion) return 0
    return ((datosGestion.total_registros - datosAnteriores.total_registros) / datosAnteriores.total_registros) * 100
  }

  const crecimientoTotal = getCrecimientoTotal()

  // Calcular promedio de adopción TIC
  const promedioAdopcionTIC = todasLasPreguntas.reduce((sum, item) => sum + item.data.siPorcentaje, 0) / todasLasPreguntas.length

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
          Tecnologías de Información
        </h1>
        <h2 className="text-xl text-blue-600 dark:text-blue-400 mt-2">
          TECNOLOGÍAS DE INFORMACIÓN - COMUNICACIÓN (TIC) Y TRANSFORMACIÓN DIGITAL
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                💻 Total Empresas
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
                📈 Crecimiento Muestral
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
                🎯 Adopción TIC Promedio
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {promedioAdopcionTIC.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Promedio de adopción tecnológica
              </div>
            </div>
          </motion.div>

          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                🌐 Acceso a Internet
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                {preguntasData.p1.siPorcentaje.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(preguntasData.p1.si)} empresas
              </div>
            </div>
          </motion.div>
        </div>

        {/* KPIs de Tecnologías Principales */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div variants={animation.item}>
            <KpiTIC 
              preguntas={preguntasData}
              darkMode={theme === 'dark'}
            />
          </motion.div>
        </Suspense>
      </motion.div>

      {/* Grid de Gráficas - Primeras 6 preguntas */}
      <Suspense fallback={<LoadingSpinner />}>
        <motion.div
          variants={animation.container}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {todasLasPreguntas.slice(0, 6).map((item, index) => (
            <motion.div key={item.pregunta} variants={animation.item}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                {/* TÍTULO CON SALTO DE LÍNEA */}
                <h3 className="text-lg font-bold mb-4 text-center whitespace-pre-line leading-relaxed">
                  {getPreguntaTitulo(item.pregunta)}
                </h3>
                {/* DESCRIPCIÓN */}
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  {getPreguntaDescripcion(item.pregunta)}
                </p>
                {/* GRÁFICA SIN TÍTULO PROPIO */}
                <TICPieChart 
                  data={getPreguntaChartData(gestion, item.pregunta)}
                  titulo=""
                  descripcion=""
                  gestion={gestion}
                  darkMode={theme === 'dark'}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Suspense>

      {/* Grid de Gráficas - Últimas 5 preguntas */}
      <Suspense fallback={<LoadingSpinner />}>
        <motion.div
          variants={animation.container}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {todasLasPreguntas.slice(6, 11).map((item, index) => (
            <motion.div key={item.pregunta} variants={animation.item}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                {/* TÍTULO CON SALTO DE LÍNEA */}
                <h3 className="text-lg font-bold mb-4 text-center whitespace-pre-line leading-relaxed">
                  {getPreguntaTitulo(item.pregunta)}
                </h3>
                {/* DESCRIPCIÓN */}
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  {getPreguntaDescripcion(item.pregunta)}
                </p>
                {/* GRÁFICA SIN TÍTULO PROPIO */}
                <TICPieChart 
                  data={getPreguntaChartData(gestion, item.pregunta)}
                  titulo=""
                  descripcion=""
                  gestion={gestion}
                  darkMode={theme === 'dark'}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Suspense>

      {/* Información adicional y análisis */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Análisis de Transformación Digital Empresarial
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">
              Tendencias de Adopción TIC
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Alta Implementación</span> de internet y correo electrónico</li>
              <li>• <span className="font-medium">Crecimiento acelerado</span> en uso de dispositivos móviles</li>
              <li>• <span className="font-medium">Adopción moderada</span> de sistemas ERP y gestión</li>
              <li>• <span className="font-medium">Oportunidad de crecimiento</span> en cloud computing e IA</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-green-600 dark:text-green-400">
              Impacto en Competitividad
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Mejora de eficiencia operativa</span> mediante digitalización</li>
              <li>• <span className="font-medium">Expansión de mercados</span> through comercio electrónico</li>
              <li>• <span className="font-medium">Optimización de procesos</span> con sistemas integrados</li>
              <li>• <span className="font-medium">Innovación continua</span> en modelos de negocio</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Tabla resumen completa de datos */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Resumen Numérico Completo - Gestión {gestion}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3 text-right">Empresas SÍ</th>
                <th className="px-4 py-3 text-right">% SÍ</th>
                <th className="px-4 py-3 text-right">Empresas NO</th>
                <th className="px-4 py-3 text-right">% NO</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {todasLasPreguntas.map((item, index) => (
                <tr key={item.pregunta} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-4 py-3 font-medium text-sm leading-tight">
                    {item.titulo}
                  </td>
                  <td className="px-4 py-3 text-right">{formatNumber(item.data.si)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">{item.data.siPorcentaje.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right">{formatNumber(item.data.no)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-red-600">{item.data.noPorcentaje.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right">{formatNumber(item.data.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <td className="px-4 py-3 font-bold">Totales Generales</td>
                <td className="px-4 py-3 text-right font-bold">
                  {formatNumber(todasLasPreguntas.reduce((sum, item) => sum + item.data.si, 0))}
                </td>
                <td className="px-4 py-3 text-right font-bold text-green-600">
                  {((todasLasPreguntas.reduce((sum, item) => sum + item.data.si, 0) / 
                     todasLasPreguntas.reduce((sum, item) => sum + item.data.total, 0)) * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right font-bold">
                  {formatNumber(todasLasPreguntas.reduce((sum, item) => sum + item.data.no, 0))}
                </td>
                <td className="px-4 py-3 text-right font-bold text-red-600">
                  {((todasLasPreguntas.reduce((sum, item) => sum + item.data.no, 0) / 
                     todasLasPreguntas.reduce((sum, item) => sum + item.data.total, 0)) * 100).toFixed(1)}%
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