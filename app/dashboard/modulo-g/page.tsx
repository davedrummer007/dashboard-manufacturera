// app/dashboard/modulo-g/page.tsx (VERSIÓN CORREGIDA)
"use client";

import { useState, useEffect } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { 
  getInfraestructuraByGestion, 
  getPreguntaBinariaData,
  getPreguntaMultipleData,
  formatNumber 
} from './data/dataProcessor'
import ModernPieChart from './components/ModernPieChart'
import DataFilters from './components/DataFilters'
import KpiInfraestructura from './components/KpiInfraestructura'

const animation = getAnimationByChapter(7)

// COLORS ÚNICOS PARA CADA INDICADOR
const tableColors = {
  p1: { 
    bg: 'bg-sky-50 dark:bg-sky-900/20', 
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800'
  },
  p2: { 
    bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800'
  },
  p3: { 
    bg: 'bg-purple-50 dark:bg-purple-900/20', 
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800'
  },
  p4: { 
    bg: 'bg-amber-50 dark:bg-amber-900/20', 
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800'
  },
  p5: { 
    bg: 'bg-rose-50 dark:bg-rose-900/20', 
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800'
  }
}

export default function ModuloG() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  const datosGestion = getInfraestructuraByGestion(gestion)
  
  // ✅ CORREGIDO: Incluir p5 para KpiInfraestructura
  const preguntasData = {
    p1: getPreguntaBinariaData(gestion, 'p1'),
    p2: getPreguntaMultipleData(gestion, 'p4'),
    p3: getPreguntaMultipleData(gestion, 'p5'),
    p4: getPreguntaMultipleData(gestion, 'p6'),
    p5: getPreguntaMultipleData(gestion, 'p5') // ✅ Añadido p5 para KPIs
  }

  // Calcular crecimiento
  const getCrecimientoTotal = () => {
    if (gestion === '2022') return 0
    const gestionAnterior = gestion === '2023' ? '2022' : '2023'
    const datosAnteriores = getInfraestructuraByGestion(gestionAnterior)
    if (!datosAnteriores || !datosGestion) return 0
    return ((datosGestion.total_registros - datosAnteriores.total_registros) / datosAnteriores.total_registros) * 100
  }

  const crecimientoTotal = getCrecimientoTotal()
  const porcentajePrediosPropios = preguntasData.p2.Porcentajes[2]
  const porcentajeParquesIndustriales = preguntasData.p3.Porcentajes[0]
  const promedioInfraestructura = (preguntasData.p1.siPorcentaje + porcentajePrediosPropios + porcentajeParquesIndustriales) / 3
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
      
      {/* Encabezado */}
      <motion.div variants={animation.item} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Infraestructura y Servicios
        </h1>
        <h2 className="text-xl text-blue-600 dark:text-blue-400 mt-2">
          INDICADORES DE INFRAESTRUCTURA EMPRESARIAL Y SERVICIOS BÁSICOS
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
      <motion.div variants={animation.container} className="space-y-6">
        {/* KPIs de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">🏢 Total Empresas</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {datosGestion ? formatNumber(datosGestion.total_registros) : '0'}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Gestión {gestion}</div>
            </div>
          </motion.div>
          
          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">📈 Crecimiento Muestral</h3>
              <p className={`text-2xl font-bold mt-2 ${
                crecimientoTotal > 0 ? 'text-green-600' : crecimientoTotal < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {crecimientoTotal > 0 ? '+' : ''}{crecimientoTotal.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Vs gestión anterior</div>
            </div>
          </motion.div>
          
          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">🎯 Infraestructura Promedio</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {promedioInfraestructura.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indicadores de infraestructura</div>
            </div>
          </motion.div>

          <motion.div variants={animation.item}>
            <div className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">🏠 Predios Propios</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                {porcentajePrediosPropios.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(preguntasData.p2.series[2])} empresas
              </div>
            </div>
          </motion.div>
        </div>

        {/* KPIs de Infraestructura Específicos */}
        <motion.div variants={animation.item}>
          <KpiInfraestructura 
            preguntas={preguntasData}
            darkMode={theme === 'dark'}
          />
        </motion.div>
      </motion.div>

    {/* GRID 2x2 DE GRÁFICAS CON COLORES ELEGANTES */}
    <motion.div variants={animation.container} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pregunta 1 - Múltiples Plantas (COSTA AZUL) */}
      <motion.div variants={animation.item}>
        <ModernPieChart 
          data={preguntasData.p1}
          titulo="UNIDADES ECONÓMICAS QUE CUENTAN CON MAS DE UNA PLANTA"
          //descripcion="Empresas con una o más plantas operativas"
          gestion={gestion}
          darkMode={theme === 'dark'}
          tipo="donut"
          colorPalette={['#40ed3aff', '#FFBE0B', '#3A86FF', '#8338EC', '#FB5607']}
        />
      </motion.div>

      {/* Pregunta 2 - Tipo de Predio (BOSQUE ENCANTADO) */}
      <motion.div variants={animation.item}>
        <ModernPieChart 
          data={preguntasData.p2}
          titulo="CONDICIÓN DE TENENCIA DEL PREDIO EN LAS UNIDADES ECONÓMICAS"
          //descripcion="Distribución según tipo de mobiliario del predio"
          gestion={gestion}
          darkMode={theme === 'dark'}
          tipo="pie"
          colorPalette={['#40ed3aff', '#053896ff', '#F97316', '#06B6D4', '#84CC16']}
        />
      </motion.div>

      {/* Pregunta 3 - Ubicación Estratégica (ATARDECER URBANO) */}
      <motion.div variants={animation.item}>
        <ModernPieChart 
          data={preguntasData.p3}
          titulo="ÚBICACIÓN DEL PREDIO DE LAS UNIDADES ECONÓMICAS"
          //descripcion="Distribución según ubicación geográfica del predio"
          gestion={gestion}
          darkMode={theme === 'dark'}
          tipo="donut"
          colorPalette={['#3bdc26ff', '#0b42f5ff', '#F97316', '#06D6A0', '#3B82F6']}
        />
      </motion.div>

      {/* Pregunta 4 - Servicios Básicos (GALA NOCTURNA) */}
      <motion.div variants={animation.item}>
        <ModernPieChart 
          data={preguntasData.p4}
          titulo="UNIDADES ECONÓMICAS CON ACCESO A SERVICIOS BÁSICOS"
          //descripcion="Cobertura de servicios básicos en las instalaciones"
          gestion={gestion}
          darkMode={theme === 'dark'}
          tipo="pie"
          colorPalette={['#ce7e22ff', '#181bbeff', '#FBBF24', '#0D9488', '#6366F1']}
        />
      </motion.div>
    </motion.div>

      {/* TABLA RESUMEN NUMÉRICO CON COLORES ÚNICOS */}
      <motion.div variants={animation.item} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Resumen Numérico Completo - Gestión {gestion}
        </h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Indicador de Infraestructura</th>
                <th className="px-6 py-4 text-right font-bold">Empresas</th>
                <th className="px-6 py-4 text-right font-bold">% del Total</th>
                <th className="px-6 py-4 text-right font-bold">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {/* Pregunta 1 - Múltiples Plantas (AZUL OCEÁNICO) */}
              <tr className={`${tableColors.p1.bg} border-b ${tableColors.p1.border}`}>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" rowSpan={2}>Múltiples plantas operativas</td>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p1.si)}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p1.text}`}>
                  {preguntasData.p1.siPorcentaje.toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">SÍ</td>
              </tr>
              <tr className={`${tableColors.p1.bg} border-b ${tableColors.p1.border}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p1.no)}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p1.text}`}>
                  {preguntasData.p1.noPorcentaje.toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">NO</td>
              </tr>

              {/* Pregunta 2 - Tipo de Predio (VERDE BOSQUE) */}
              <tr className={`${tableColors.p2.bg} border-b ${tableColors.p2.border}`}>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" rowSpan={3}>Tipo de predio principal</td>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p2.series[0])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p2.text}`}>
                  {preguntasData.p2.Porcentajes[0].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Alquilada</td>
              </tr>
              <tr className={`${tableColors.p2.bg} border-b ${tableColors.p2.border}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p2.series[1])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p2.text}`}>
                  {preguntasData.p2.Porcentajes[1].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Anticrético</td>
              </tr>
              <tr className={`${tableColors.p2.bg} border-b ${tableColors.p2.border}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p2.series[2])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p2.text}`}>
                  {preguntasData.p2.Porcentajes[2].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Propio</td>
              </tr>

              {/* Pregunta 3 - Ubicación (PÚRPURA ROYAL) */}
              <tr className={`${tableColors.p3.bg} border-b ${tableColors.p3.border}`}>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" rowSpan={3}>Ubicación estratégica</td>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p3.series[0])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p3.text}`}>
                  {preguntasData.p3.Porcentajes[0].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Parque Industrial</td>
              </tr>
              <tr className={`${tableColors.p3.bg} border-b ${tableColors.p3.border}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p3.series[1])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p3.text}`}>
                  {preguntasData.p3.Porcentajes[1].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Zona Franca</td>
              </tr>
              <tr className={`${tableColors.p3.bg} border-b ${tableColors.p3.border}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p3.series[2])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p3.text}`}>
                  {preguntasData.p3.Porcentajes[2].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Ninguno</td>
              </tr>

              {/* Pregunta 4 - Servicios (DORADO AMBER) */}
              <tr className={`${tableColors.p4.bg}`}>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" rowSpan={4}>Servicios disponibles</td>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p4.series[0])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p4.text}`}>
                  {preguntasData.p4.Porcentajes[0].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Alcantarillado</td>
              </tr>
              <tr className={`${tableColors.p4.bg}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p4.series[1])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p4.text}`}>
                  {preguntasData.p4.Porcentajes[1].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Agua</td>
              </tr>
              <tr className={`${tableColors.p4.bg}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p4.series[2])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p4.text}`}>
                  {preguntasData.p4.Porcentajes[2].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Electricidad</td>
              </tr>
              <tr className={`${tableColors.p4.bg}`}>
                <td className="px-6 py-4 text-right font-medium">{formatNumber(preguntasData.p4.series[3])}</td>
                <td className={`px-6 py-4 text-right font-bold ${tableColors.p4.text}`}>
                  {preguntasData.p4.Porcentajes[3].toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">Gas</td>
              </tr>
            </tbody>
            <tfoot className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Total General de Empresas</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white" colSpan={3}>
                  {datosGestion ? formatNumber(datosGestion.total_registros) : '0'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* FOOTER INSTITUCIONAL */}
      <motion.div variants={animation.item} className={`mt-12 p-6 rounded-2xl border-l-4 ${
        theme === 'dark' ? 'bg-gray-800 border-blue-500' : 'bg-blue-50 border-blue-500'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
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