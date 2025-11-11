"use client";

import { useState, useEffect, Suspense } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { getActivosFijosPyMEByGestion, formatNumber } from './data/dataProcessor'
import dynamic from 'next/dynamic'

// Dynamic imports para componentes con gráficos
const VerticalBarChartAFPyME = dynamic(() => import('./components/VerticalBarChartAFPyME'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const DataFilters = dynamic(() => import('./components/DataFilters'), {
  ssr: false,
  loading: () => <div className="flex justify-center p-4">Cargando filtros...</div>
});

// Obtener animaciones específicas para el capítulo 5
const animation = getAnimationByChapter(5)

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

export default function Capitulo5() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  // Obtener datos filtrados por gestión
  const activosFijosPyME = getActivosFijosPyMEByGestion(gestion)
  
  // Calcular totales para KPIs
  const totalActivosFijosPyME = activosFijosPyME.reduce((sum, item) => sum + item.valorContable, 0)

  // Calcular crecimiento vs gestión anterior
  const getCrecimientoActivosPyME = () => {
    if (gestion === '2022') return 0
    const gestionAnterior = gestion === '2023' ? '2022' : '2023'
    const datosAnteriores = getActivosFijosPyMEByGestion(gestionAnterior)
    const totalAnterior = datosAnteriores.reduce((sum, item) => sum + item.valorContable, 0)
    return ((totalActivosFijosPyME - totalAnterior) / totalAnterior) * 100
  }

  const crecimientoActivosPyME = getCrecimientoActivosPyME()

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
          Activos Fijos PyME
        </h1>
        <h2 className="text-xl text-orange-600 dark:text-orange-400 mt-2">
          ACTIVOS FIJOS - MICRO/PEQUEÑA/MEDIANA EMPRESA
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
              🏢 Total Activos Fijos PyME {gestion}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              Bs. {formatNumber(totalActivosFijosPyME)}
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Valor contable total PyME
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              📈 Crecimiento PyME
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              crecimientoActivosPyME > 0 ? 'text-green-600' : crecimientoActivosPyME < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {crecimientoActivosPyME > 0 ? '+' : ''}{crecimientoActivosPyME.toFixed(1)}%
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Vs gestión anterior
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Gráfico Principal: Activos Fijos PyME por Tipo Societario */}
      <Suspense fallback={<LoadingSpinner />}>
        <motion.div
          variants={animation.item}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            VALOR CONTABLE DE ACTIVOS FIJOS EN MICRO, PEQUEÑAS Y MEDIANAS EMPRESAS DEL SECTOR MANUFACTURERO POR TIPO SOCIETARIO <br />
            (En Millones de Bolivianos)
          </h3>
          <VerticalBarChartAFPyME 
            data={activosFijosPyME}
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
          Análisis de Activos Fijos - Micro, Pequeña y Mediana Empresa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-orange-600 dark:text-orange-400">
              Características PyME
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Sociedades de Responsabilidad Limitada</span> lideran en activos</li>
              <li>• <span className="font-medium">Empresas Unipersonales</span> con participación significativa</li>
              <li>• <span className="font-medium">Diversidad societaria</span> en el sector PyME</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-amber-600 dark:text-amber-400">
              Dinámica Empresarial
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Crecimiento variable</span> según el tipo societario</li>
              <li>• <span className="font-medium">Flexibilidad operativa</span> característica de las PyME</li>
              <li>• <span className="font-medium">Importante contribución</span> al sector manufacturero</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* FOOTER INSTITUCIONAL */}
      <motion.div
        variants={itemVariants}
        className={`mt-12 p-6 rounded-2xl border-l-4 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-orange-500' 
            : 'bg-orange-50 border-orange-500'
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