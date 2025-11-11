// app/dashboard/modulo-g/components/ChartWithData.tsx
"use client";

import React, { useRef, useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { PreguntaMultipleData, PreguntaBinariaData } from '../types/charts'
import { formatNumber } from '../data/dataProcessor'
import ClientOnly from '@/app/components/ClientOnly'

interface ChartWithDataProps {
  data: PreguntaMultipleData | PreguntaBinariaData
  titulo: string
  gestion: string
  darkMode: boolean
  tipo?: 'pie' | 'donut'
  colorPalette?: string[]
}

const ChartWithData: React.FC<ChartWithDataProps> = ({
  data,
  titulo,
  gestion,
  darkMode,
  tipo = 'donut',
  colorPalette
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // PALETAS DE COLORES
  const getColorPalette = (pregunta: string) => {
    const palettes: { [key: string]: string[] } = {
      p1: ['#1E40AF', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444'],
      p2: ['#7C3AED', '#059669', '#F97316', '#06B6D4', '#84CC16'],
      p3: ['#DC2626', '#F59E0B', '#8B5CF6', '#06D6A0', '#3B82F6'],
      p4: ['#7E22CE', '#BE185D', '#FBBF24', '#0D9488', '#6366F1']
    }
    return colorPalette || palettes[pregunta] || palettes.p1
  }

  const getPreguntaFromTitle = (titulo: string): string => {
    if (titulo.includes('Múltiples')) return 'p1'
    if (titulo.includes('Tipo de Predio')) return 'p2'
    if (titulo.includes('Ubicación')) return 'p3'
    if (titulo.includes('Servicios')) return 'p4'
    return 'p1'
  }

  const preguntaKey = getPreguntaFromTitle(titulo)
  const colors = getColorPalette(preguntaKey)

  const isBinario = 'si' in data
  const labels = isBinario ? ['SÍ', 'NO'] : data.labels
  const seriesData = isBinario ? [data.si, data.no] : data.series

  useEffect(() => {
    if (!chartRef.current || !isClient) return

    chartInstance.current = echarts.init(chartRef.current, darkMode ? 'dark' : 'light')

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: titulo,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: darkMode ? '#fff' : '#1F2937',
        },
        top: '10%'
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `
            <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">${params.name}</div>
            <div style="font-size: 13px;">${formatNumber(params.value)} empresas</div>
            <div style="color: ${params.color}; font-size: 13px; font-weight: bold;">${params.percent}%</div>
          `
        },
        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      },
      legend: {
        orient: 'horizontal',
        bottom: 10,
        textStyle: {
          color: darkMode ? '#fff' : '#374151',
          fontSize: 14,
        },
      },
      series: [
        {
          name: titulo,
          type: 'pie',
          radius: tipo === 'donut' ? ['45%', '75%'] : '70%',
          center: ['50%', '50%'],
          itemStyle: {
            borderRadius: 8,
            borderColor: darkMode ? '#1F2937' : '#fff',
            borderWidth: 3,
          },
          label: {
            formatter: '{b}\n{d}%',
            fontSize: 14,
            fontWeight: 'bold',
          },
          data: labels.map((label: string, index: number) => ({
            name: label,
            value: seriesData[index],
            itemStyle: {
              color: colors[index % colors.length]
            }
          })),
        }
      ]
    }

    chartInstance.current.setOption(option)

    return () => {
      chartInstance.current?.dispose()
    }
  }, [data, titulo, darkMode, tipo, colors, isClient])

  useEffect(() => {
    if (!isClient) return
    
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  return (
    <ClientOnly>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Gestión {gestion}
        </div>
      </div>
    </ClientOnly>
  )
}

export default ChartWithData