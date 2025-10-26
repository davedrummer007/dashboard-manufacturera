// app/dashboard/modulo-g/components/OriginalPieChart.tsx
'use client'

import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'
import { PreguntaMultipleData, PreguntaBinariaData } from '../types/charts'
import { formatNumber } from '../data/dataProcessor'

interface OriginalPieChartProps {
  data: PreguntaMultipleData | PreguntaBinariaData
  titulo: string
  gestion: string
  darkMode: boolean
  tipo?: 'pie' | 'donut'
  colorPalette?: string[]
}

const OriginalPieChart: React.FC<OriginalPieChartProps> = ({
  data,
  titulo,
  gestion,
  darkMode,
  tipo = 'donut',
  colorPalette // ✅ Este viene del page.tsx
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  // PALETAS CHILLONES Y LLAMATIVAS - ✅ ESTAS SON LAS QUE DEBEN APLICARSE
  const getColorPalette = (pregunta: string) => {
    const palettes: { [key: string]: string[] } = {
      // PALETA 1 - NEÓN ELECTRICO
      p1: ['#FF006E', '#FFBE0B', '#3A86FF', '#8338EC', '#FB5607'],
      // PALETA 2 - TROPICAL FUCSIA
      p2: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'],
      // PALETA 3 - CYBER PUNK
      p3: ['#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0', '#F72585'],
      // PALETA 4 - SUNSET VIBRANT
      p4: ['#FF5400', '#FF6D00', '#FF8500', '#FF9100', '#FF9E00']
    }
    return colorPalette || palettes[pregunta] || palettes.p1 // ✅ PRIORIDAD AL colorPalette
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
    if (!chartRef.current) return

    chartInstance.current = echarts.init(chartRef.current, darkMode ? 'dark' : 'light')

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: titulo,
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: darkMode ? '#fff' : '#1F2937',
        },
        top: '-1%'
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
        bottom: 0,
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
  }, [data, titulo, darkMode, tipo, colors])

  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}

export default OriginalPieChart