"use client";

import React from 'react'
import ReactECharts from 'echarts-for-react'
import { InventarioInicialFinalData } from '../types/charts'
import { formatMillions } from '@/app/utils/chartFormatters' // ← NUEVO IMPORT

interface DoubleVerticalBarChartProps {
  data: InventarioInicialFinalData[]
  gestion: string
  darkMode: boolean
}

const DoubleVerticalBarChart: React.FC<DoubleVerticalBarChartProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por inventario final descendente
  const sortedData = [...data].sort((a, b) => b.invFinal - a.invFinal)

  // NOMBRES ABREVIADOS MEJORADOS - MÁS LEGIBLES
  const shortNames: { [key: string]: string } = {
    'SOCIEDAD ANONIMA': 'S.A.',
    'SOCIEDAD LIMITADA': 'S.R.L.', 
    'EMPRESA UNIPERSONAL': 'UNIPERSONAL',
    'OTROS': 'OTRAS EMPRESAS'
  }

  const categories = sortedData.map(item => shortNames[item.tipoSocietario] || item.tipoSocietario)
  const initialData = sortedData.map(item => item.invInicial)
  const finalData = sortedData.map(item => item.invFinal)

  // Configuración INDIVIDUAL para labels
  const getLabelConfig = (tipoSocietario: string, isInitial: boolean) => {
    const configs: any = {
      'SOCIEDAD ANONIMA': { initial: { position: 'top', offset: [0, -25] }, final: { position: 'top', offset: [0, 0] } },
      'SOCIEDAD LIMITADA': { initial: { position: 'top', offset: [0, -25] }, final: { position: 'top', offset: [0, 2] } },
      'EMPRESA UNIPERSONAL': { initial: { position: 'top', offset: [0, 0] }, final: { position: 'top', offset: [0, -20] } },
      'OTROS': { initial: { position: 'top', offset: [0, 0] }, final: { position: 'top', offset: [0, -20] } }
    }
    
    const config = configs[tipoSocietario] || { initial: { position: 'top', offset: [0, -20] }, final: { position: 'top', offset: [0, 0] } }
    return isInitial ? config.initial : config.final
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params: any) {
        // USAR formatMillions EN TOOLTIP
        return `${params[0].name}<br/>${params[0].seriesName}: ${formatMillions(params[0].value)}<br/>${params[1].seriesName}: ${formatMillions(params[1].value)}`
      }
    },
    legend: {
      data: ['Inventario Inicial', 'Inventario Final'],
      top: -5,
      textStyle: { 
        color: darkMode ? '#fff' : '#374151',
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { 
        lineStyle: { 
          color: darkMode ? '#374151' : '#E5E7EB',
          width: 2
        } 
      },
      axisTick: { 
        lineStyle: { 
          color: darkMode ? '#374151' : '#E5E7EB',
          width: 2
        } 
      },
      axisLabel: { 
        color: darkMode ? '#fff' : '#374151',
        fontSize: 12,
        fontWeight: 'bold',
        interval: 0 // ← GARANTIZA QUE SE MUESTRAN TODAS LAS ETIQUETAS
      }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        name: 'Inventario Inicial',
        type: 'bar',
        barWidth: '35%',
        itemStyle: { 
          color: '#d5e639ff',
          borderRadius: [6, 6, 0, 0]
        },
        data: initialData.map((value, index) => ({
          value: value,
          label: {
            show: true,
            position: getLabelConfig(sortedData[index].tipoSocietario, true).position,
            offset: getLabelConfig(sortedData[index].tipoSocietario, true).offset,
            formatter: formatMillions(value), // ← USAR formatMillions AQUÍ
            color: darkMode ? '#FFFFFF' : '#1F2937',
            fontSize: 15,
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            borderColor: 'transparent'
          }
        }))
      },
      {
        name: 'Inventario Final',
        type: 'bar',
        barWidth: '35%',
        itemStyle: { 
          color: '#2A9D8F',
          borderRadius: [6, 6, 0, 0]
        },
        data: finalData.map((value, index) => ({
          value: value,
          label: {
            show: true,
            position: getLabelConfig(sortedData[index].tipoSocietario, false).position,
            offset: getLabelConfig(sortedData[index].tipoSocietario, false).offset,
            formatter: formatMillions(value), // ← USAR formatMillions AQUÍ
            color: darkMode ? '#FFFFFF' : '#1F2937',
            fontSize: 15,
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            borderColor: 'transparent'
          }
        }))
      }
    ]
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          GESTIÓN {gestion}
        </h2>
      </div>
      <ReactECharts 
        option={option} 
        style={{ height: '500px', width: '100%' }} 
        opts={{ renderer: 'svg' }}
      />
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Valores en millones - Barras comparativas por tipo societario
      </div>
    </div>
  )
}

export default DoubleVerticalBarChart