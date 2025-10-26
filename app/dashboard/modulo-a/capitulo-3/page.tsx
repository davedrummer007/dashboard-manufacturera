'use client'

import { useState } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { motion } from 'framer-motion'
import { getAnimationByChapter } from '@/app/utils/animations'
import { getDataByGestion, formatNumber, formatCurrency } from './data/dataProcessor'
import VerticalBarChartPersonal from './components/VerticalBarChartPersonal'
import VerticalBarChartSocietario from './components/VerticalBarChartSocietario'
import HorizontalBarChartSueldos from './components/HorizontalBarChartSueldos'
import VerticalBarChartSueldosSocietario from './components/VerticalBarChartSueldosSocietario'
import DataFilters from './components/DataFilters'

// Obtener animaciones específicas para el capítulo 3
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

export default function Capitulo3() {
  const { theme } = useTheme()
  const [gestion, setGestion] = useState('2022')
  
  // Obtener datos filtrados por gestión
  const { personalOcupado, personalPorcentaje, sueldosSalarios, sueldosPorcentaje } = getDataByGestion(gestion)
  
  // Calcular totales para KPIs
  const totalPersonal = personalOcupado.reduce((sum, item) => sum + item.total, 0)
  const totalSueldos = sueldosSalarios.reduce((sum, item) => sum + item.total, 0)
  const promedioSueldoPorPersona = totalPersonal > 0 ? totalSueldos / totalPersonal : 0

  // Calcular crecimiento vs gestión anterior
  const getCrecimientoPersonal = () => {
    if (gestion === '2022') return 0
    const gestionAnterior = gestion === '2023' ? '2022' : '2023'
    const datosAnteriores = getDataByGestion(gestionAnterior).personalOcupado
    const totalAnterior = datosAnteriores.reduce((sum, item) => sum + item.total, 0)
    return ((totalPersonal - totalAnterior) / totalAnterior) * 100
  }

  const crecimientoPersonal = getCrecimientoPersonal()

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
          Recursos Humanos
        </h1>
        <h2 className="text-xl text-green-600 dark:text-green-400 mt-2">
          PERSONAL OCUPADO, SUELDOS Y SALARIOS
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
              👥 Total Personal {gestion}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatNumber(totalPersonal)}
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Personas ocupadas
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={animation.item}>
          <div className={`p-6 rounded-xl shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              📈 Crecimiento Personal
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              crecimientoPersonal > 0 ? 'text-green-600' : crecimientoPersonal < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {crecimientoPersonal > 0 ? '+' : ''}{crecimientoPersonal.toFixed(1)}%
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
              💵 Total Sueldos {gestion}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatCurrency(totalSueldos)}
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Monto total en salarios
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Gráfico 1: Personal por Departamento */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          COMPOSICIÓN DEL PERSONAL DEL SECTOR MANUFACTURERO POR DEPARTAMENTO <br />
          (En Número de Personas)
        </h3>
        <VerticalBarChartPersonal 
          data={personalOcupado}
          gestion={gestion}
          darkMode={theme === 'dark'}
        />
      </motion.div>

      {/* Gráficos 2 y 3 en grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 2: Personal por Tipo Societario */}
        <motion.div
          variants={animation.item}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text:justify">
            DISTRIBUCIÓN DEL PERSONAL POR CATEGORÍA OCUPACIONAL DEL SECTOR MANUFACTURERO <br />
            (En Porcentajes)
          </h3>
          <VerticalBarChartSocietario 
            data={personalPorcentaje}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>

        {/* Gráfico 3: Sueldos por Tipo Societario */}
        <motion.div
          variants={animation.item}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text:justify">
            SUELDOS Y SALARIOS DEL SECTOR MANUFACTURERO POR TIPO SOCIETARIO <br />
            (En Porcentajes)
          </h3>
          <VerticalBarChartSueldosSocietario 
            data={sueldosPorcentaje}
            gestion={gestion}
            darkMode={theme === 'dark'}
          />
        </motion.div>
      </div>

      {/* Gráfico 4: Sueldos por Departamento (Horizontal) */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          SUELDOS Y SALARIOS DEL SECTOR MANUFACTURERO POR DEPARTAMENTO <br />
          (En Millones de Bolivianos)
        </h3>
        <HorizontalBarChartSueldos 
          data={sueldosSalarios}
          gestion={gestion}
          darkMode={theme === 'dark'}
        />
      </motion.div>

      {/* Información adicional */}
      <motion.div
        variants={animation.item}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Análisis de Personal y Remuneraciones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-green-600 dark:text-green-400">
              Distribución del Personal
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">Santa Cruz</span> concentra la mayor cantidad de personal</li>
              <li>• <span className="font-medium">Sociedades Anónimas</span> emplean al mayor porcentaje</li>
              <li>• <span className="font-medium">Personal permanente</span> representa la mayoría</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">
              Tendencias Salariales
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <span className="font-medium">La Paz y Santa Cruz</span> lideran en montos de sueldos</li>
              <li>• <span className="font-medium">Sociedades Anónimas</span> concentran la mayor masa salarial</li>
              <li>• <span className="font-medium">Crecimiento sostenido</span> en personal y remuneraciones</li>
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