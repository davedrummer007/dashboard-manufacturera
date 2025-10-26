'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/providers/ThemeProvider'
import { 
  unidadesPorDepartamento, 
  unidadesPorTipoSocietario, 
  totalesUnidades,
  datosTecnicos,
  formatNumber 
} from './data/dashboardData'
import DashboardPieChart from './components/DashboardPieChart'
import { downloadJustificativoPDF } from '@/app/utils/pdfGenerator';

// Dynamic import para evitar SSR
import dynamic from 'next/dynamic';
const DashboardBarChart = dynamic(
  () => import('./components/DashboardBarChart'),
  { ssr: false }
);
import LoadingSpinner from '@/app/components/LoadingSpinner'

// Animaciones profesionales
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

const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function DashboardHome() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')

  // Calcular métricas importantes
  const crecimientoVsAnterior = gestion === '2022' ? 0 : 
    ((totalesUnidades[gestion as keyof typeof totalesUnidades] - 
      totalesUnidades[gestion === '2023' ? '2022' : '2023' as keyof typeof totalesUnidades]) / 
      totalesUnidades[gestion === '2023' ? '2022' : '2023' as keyof typeof totalesUnidades]) * 100

  const tasaRespuesta = (totalesUnidades[gestion as keyof typeof totalesUnidades] / 
    datosTecnicos.unidadesBaseEmpresarial[gestion as keyof typeof datosTecnicos.unidadesBaseEmpresarial]) * 100

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
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen w-full p-6">
      <main className="container mx-auto px-4 py-8">
        
        {/* HERO SECTION - Título Oficial */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className={`bg-gradient-to-r ${
              theme === 'dark' 
                ? 'from-blue-900 via-blue-800 to-purple-900' 
                : 'from-blue-600 via-blue-500 to-purple-600'
            } text-white p-12 rounded-2xl shadow-2xl mb-8 relative overflow-hidden`}
          >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
            
            <h1 className="text-5xl font-bold mb-4 relative z-10">
              ENCUESTA ANUAL DE UNIDADES ECONÓMICAS
            </h1>
            <p className="text-xl text-blue-100 mb-6 relative z-10">
              Sistema de Análisis Estadístico del Sector Manufacturero
            </p>
            <div className="relative z-10">
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                Viceministerio de Políticas de Industrialización
              </span>
            </div>
          </motion.div>

          {/* Selector de Gestión */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center space-x-4 mb-8"
          >
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Gestión:
            </span>
            <select
              value={gestion}
              onChange={(e) => setGestion(e.target.value)}
              className={`px-6 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-bold ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>

              {/* BOTÓN DE DESCARGA PDF */}
            <button
              onClick={downloadJustificativoPDF}
              className={`px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-blue-800 hover:bg-blue-900 text-white'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              <span>📄</span>
              <span>Descargar Antecedentes PDF</span>
            </button>
          </motion.div>
        </motion.div>

        {/* SECCIÓN INICIAL */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Información Contextual */}
          <motion.div
            variants={slideInVariants}
            className={`p-8 rounded-2xl shadow-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-3 h-8 bg-blue-500 rounded-full mr-4"></span>
              ANTECEDENTES:
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                <strong>Herramienta de análisis estadístico</strong> desarrollada para el seguimiento de empresas del sector manufacturero. 
                Su objetivo principal es <strong>visualizar información clave</strong> sobre la estructura, desempeño y distribución 
                de las unidades económicas.
              </p>
              
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <p className="text-sm italic">
                  <strong>⚠️ ETAPA PILOTO:</strong> Los datos presentados no son definitivos ni consistenciados. 
                  Su función es validar la pertinencia de variables, mecanismos de captura y modelos de visualización.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className={`p-4 rounded-lg text-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(datosTecnicos.unidadesBaseEmpresarial[gestion as keyof typeof datosTecnicos.unidadesBaseEmpresarial])}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Registros Totales</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {tasaRespuesta.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tasa de Respuesta</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metodología y Objetivos */}
          <motion.div
            variants={slideInVariants}
            className={`p-8 rounded-2xl shadow-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-3 h-8 bg-green-500 rounded-full mr-4"></span>
              METODOLOGÍA Y OBJETIVOS.
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Cobertura:</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Nacional - Empresas inscritas en SEPREC, distribuidas por departamento y sector
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Objetivos Específicos:</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                  <li>Validar estructura de variables y consistencia interna</li>
                  <li>Identificar tendencias preliminares en tamaño y localización</li>
                  <li>Evaluar funcionalidad técnica y visual del dashboard</li>
                  <li>Servir como base para el diseño de la versión definitiva</li>
                </ul>
              </div>

              <div className={`p-3 rounded-lg mt-4 ${
                theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50'
              }`}>
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Nota técnica:</strong> Los resultados no deben interpretarse como cifras oficiales; 
                  su función es exploratoria y de ajuste metodológico.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* KPIs PRINCIPALES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {formatNumber(totalesUnidades[gestion as keyof typeof totalesUnidades])}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unidades con Movimiento</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {formatNumber(datosTecnicos.completaronEncuesta[gestion as keyof typeof datosTecnicos.completaronEncuesta])}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completaron Encuesta</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {formatNumber(datosTecnicos.declararonSinMovimiento[gestion as keyof typeof datosTecnicos.declararonSinMovimiento])}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Sin Movimiento</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {gestion}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Gestión en Análisis</div>
          </motion.div>
        </motion.div>

        {/* GRÁFICAS PRINCIPALES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Gráfica 1: Unidades por Departamento */}
          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              PARTICIPACIÓN DE UNIDADES ECONÓMICAS DEL SECTOR MANUFACTURERO POR DEPARTAMENTO 2022 - 2023 - 2024 <br />
              (Número de Unidades Económicas)
            </h3>
            <DashboardBarChart 
              data={unidadesPorDepartamento}
              gestion={gestion}
              darkMode={theme === 'dark'}
            />
          </motion.div>

          {/* Gráfica 2: Tipo Societario */}
          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              PARTICIPACIÓN DE UNIDADES ECONÓMICAS DEL SECTOR MANUFACTURERO POR TIPO SOCIETARIO 2022 - 2023 - 2024 <br />
              (Número de Unidades Económicas)
            </h3>
            <DashboardPieChart 
              data={unidadesPorTipoSocietario}
              gestion={gestion}
              darkMode={theme === 'dark'}
            />
          </motion.div>
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
                Ministerio de Desarrollo Productivo y Economía Plural
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