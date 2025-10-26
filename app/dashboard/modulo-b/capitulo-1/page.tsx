// app/dashboard/modulo-b/page.tsx
'use client'

import { useState } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { 
  getSistemasGestionByGestion, 
  getPreguntaChartData, 
  getPreguntaTitulo, 
  getPreguntaDescripcion,
  getPreguntaData,
  formatNumber 
} from './data/dataProcessor'
import SistemaGestionPieChart from './components/SistemaGestionPieChart'
import DataFilters from './components/DataFilters'
import KpiSistemasGestion from './components/KpiSistemasGestion'

// Obtener animaciones específicas para el módulo B
const animation = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
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

export default function ModuloB() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  // Obtener datos filtrados por gestión
  const datosGestion = getSistemasGestionByGestion(gestion)
  
  // Obtener datos para cada pregunta
  const preguntasData = {
    preg_1: getPreguntaData(gestion, 'preg_1'),
    preg_4: getPreguntaData(gestion, 'preg_4'),
    preg_6: getPreguntaData(gestion, 'preg_6'),
    preg_7: getPreguntaData(gestion, 'preg_7')
  }

  // Obtener datos para gráficas
  const chartDataPreg1 = getPreguntaChartData(gestion, 'preg_1')
  const chartDataPreg4 = getPreguntaChartData(gestion, 'preg_4')
  const chartDataPreg6 = getPreguntaChartData(gestion, 'preg_6')
  const chartDataPreg7 = getPreguntaChartData(gestion, 'preg_7')

  // Calcular crecimiento vs gestión anterior
  const getCrecimientoTotal = () => {
    if (gestion === '2022') return 0
    const gestionAnterior = gestion === '2023' ? '2022' : '2023'
    const datosAnteriores = getSistemasGestionByGestion(gestionAnterior)
    if (!datosAnteriores || !datosGestion) return 0
    return ((datosGestion.total_registros - datosAnteriores.total_registros) / datosAnteriores.total_registros) * 100
  }

  const crecimientoTotal = getCrecimientoTotal()

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
          Sistemas de Gestión
        </h1>
        <h2 className="text-xl text-purple-600 dark:text-purple-400 mt-2">
          SISTEMAS DE GESTIÓN CERTIFICADOS
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
                📈 Total Empresas Encuestadas
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
                📉 Tasa Respuesta SÍ
              </h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {preguntasData.preg_1.Porcentajesi.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Sistemas certificados
              </div>
            </div>
          </motion.div>
        </div>

        {/* KPIs de Preguntas Específicas */}
        <motion.div variants={animation.item}>
          <KpiSistemasGestion 
            preguntas={preguntasData}
            darkMode={theme === 'dark'}
          />
        </motion.div>
      </motion.div>

      {/* Grid de 4 Gráficas - Preguntas 1, 4, 6, 7 */}
      <motion.div
        variants={animation.container}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Pregunta 1 */}
        <motion.div variants={animation.item}>
          <SistemaGestionPieChart 
            data={chartDataPreg1}
            titulo={getPreguntaTitulo('preg_1')}
            descripcion={getPreguntaDescripcion('preg_1')}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>

        {/* Pregunta 4 */}
        <motion.div variants={animation.item}>
          <SistemaGestionPieChart 
            data={chartDataPreg4}
            titulo={getPreguntaTitulo('preg_4')}
            descripcion={getPreguntaDescripcion('preg_4')}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>

        {/* Pregunta 6 */}
        <motion.div variants={animation.item}>
          <SistemaGestionPieChart 
            data={chartDataPreg6}
            titulo={getPreguntaTitulo('preg_6')}
            descripcion={getPreguntaDescripcion('preg_6')}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>

        {/* Pregunta 7 */}
        <motion.div variants={animation.item}>
          <SistemaGestionPieChart 
            data={chartDataPreg7}
            titulo={getPreguntaTitulo('preg_7')}
            descripcion={getPreguntaDescripcion('preg_7')}
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
          Análisis de Sistemas de Gestión Certificados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400">
              Tendencias de Certificación
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">ISO 9001</span> es el sistema de gestión más comúnmente certificado</li>
              <li>• <span className="font-medium">Crecimiento sostenido</span> en implementación de nuevos sistemas</li>
              <li>• <span className="font-medium">Renovación constante</span> de certificaciones existentes</li>
              <li>• <span className="font-medium">Procesos productivos</span> en foco de mejora continua</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-green-600 dark:text-green-400">
              Impacto en la Competitividad
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Mejora de procesos</span> mediante sistemas estandarizados</li>
              <li>• <span className="font-medium">Incremento de eficiencia</span> y reducción de costos</li>
              <li>• <span className="font-medium">Acceso a mercados</span> internacionales exigentes</li>
              <li>• <span className="font-medium">Fortalecimiento institucional</span> y reputación corporativa</li>
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
                <th className="px-4 py-3">Pregunta</th>
                <th className="px-4 py-3 text-right">SÍ</th>
                <th className="px-4 py-3 text-right">NO</th>
                <th className="px-4 py-3 text-right">Sin Respuesta</th>
                <th className="px-4 py-3 text-right">% SÍ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-3 font-medium">{getPreguntaTitulo('preg_1')}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_1.si)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_1.no)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_1.sinRespuesta)}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">{preguntasData.preg_1.Porcentajesi.toFixed(1)}%</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-3 font-medium">{getPreguntaTitulo('preg_4')}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_4.si)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_4.no)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_4.sinRespuesta)}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">{preguntasData.preg_4.Porcentajesi.toFixed(1)}%</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-3 font-medium">{getPreguntaTitulo('preg_6')}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_6.si)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_6.no)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_6.sinRespuesta)}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">{preguntasData.preg_6.Porcentajesi.toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">{getPreguntaTitulo('preg_7')}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_7.si)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_7.no)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(preguntasData.preg_7.sinRespuesta)}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">{preguntasData.preg_7.Porcentajesi.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* FOOTER INSTITUCIONAL */}
      <motion.div
        variants={itemVariants}
        className={`mt-12 p-6 rounded-2xl border-l-4 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-purple-500' 
            : 'bg-purple-50 border-purple-500'
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