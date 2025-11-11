// app/dashboard/modulo-g/components/ModernPieChart.tsx
"use client";

import React from 'react'
import { PreguntaMultipleData, PreguntaBinariaData } from '../types/charts'

interface ModernPieChartProps {
  data: PreguntaMultipleData | PreguntaBinariaData
  titulo: string
  gestion: string
  darkMode: boolean
  tipo?: 'pie' | 'donut'
  colorPalette?: string[]
}

const ModernPieChart: React.FC<ModernPieChartProps> = ({
  data,
  titulo,
  gestion,
  darkMode,
  tipo = 'donut',
  colorPalette
}) => {
  const isBinario = 'si' in data
  const seriesData = isBinario ? [data.si, data.no] : data.series

  // ✅ DETECTAR SI TODOS LOS DATOS SON CERO
  const hasAllZeros = seriesData.every(val => val === 0)

  // ✅ PARA 2023-2024: SOLO MENSAJE ELEGANTE - SIN GRÁFICA
  if (hasAllZeros) {
    const NoDataMessage = React.lazy(() => import('../components/NoDataMessage'))
    
    return (
      <React.Suspense fallback={
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      }>
        <NoDataMessage 
          titulo={titulo}
          gestion={gestion}
          darkMode={darkMode}
        />
      </React.Suspense>
    )
  }

  // ✅ PARA 2022: USAR LAS GRÁFICAS ORIGINALES QUE YA FUNCIONABAN BIEN
  const OriginalPieChart = React.lazy(() => import('../components/OriginalPieChart'))
  
  return (
    <React.Suspense fallback={
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 mx-auto"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    }>
      <OriginalPieChart 
        data={data}
        titulo={titulo}
        gestion={gestion}
        darkMode={darkMode}
        tipo={tipo}
        colorPalette={colorPalette}
      />
    </React.Suspense>
  )
}

export default ModernPieChart