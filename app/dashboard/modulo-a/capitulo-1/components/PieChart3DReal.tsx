"use client";

import React from 'react'
import ReactECharts from 'echarts-for-react'

interface PieChart3DRealProps {
  data: any // Cambiamos a any para mayor flexibilidad
  gestion: string
  darkMode: boolean
}

const PieChart3DReal: React.FC<PieChart3DRealProps> = ({ data, gestion, darkMode }) => {
  // Función para obtener valores de diferentes estructuras de datos
  const getValue = (data: any, possibleKeys: string[], fallback: number = 0): number => {
    if (!data) return fallback
    
    for (const key of possibleKeys) {
      if (data[key] !== undefined && data[key] !== null) {
        return parseFloat(data[key]) || fallback
      }
    }
    return fallback
  }

  // Debug para ver la estructura de datos
  console.log('Datos recibidos en PieChart3DReal:', data)

  const option = {
    title: {
      text: `GESTIÓN ${gestion}`,
      textStyle: {
        color: darkMode ? '#fff' : '#1F2937',
        fontSize: 20,
        fontWeight: 'bold'
      },
      left: 'center',
      top: -5
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
      width: 'auto',
      textStyle: {
        color: darkMode ? '#fff' : '#374151',
        fontSize: 20,
        fontWeight: 'bold'
      },
      itemWidth: 20,
      itemHeight: 20,
      itemGap: 40,
      formatter: function (name: string) {
        const shortNames: { [key: string]: string } = {
          'S.A.': 'S.A.',
          'S.R.L.': 'S.R.L.',
          'UNIPERSONAL': 'UNIPERSONAL',
          'OTRAS EMPRESAS': 'OTRAS EMPRESAS'
        }
        return shortNames[name] || name
      },
      data: ['S.A.', 'S.R.L.', 'UNIPERSONAL', 'OTRAS EMPRESAS']
    },
    series: [
      {
        name: `Distribución ${gestion}`,
        type: 'pie',
        radius: ['40%', '75%'],
        center: ['60%', '50%'],
        data: [
          {
            value: getValue(data, [
              'sociedadAnonima', 
              'S.A.', 
              'sociedad_anonima',
              'SociedadAnonima',
              'porcentaje'
            ], 25),
            name: 'S.A.',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#60A5FA' },
                  { offset: 1, color: '#1D4ED8' }
                ]
              }
            }
          },
          {
            value: getValue(data, [
              'sociedadLimitada',
              'S.R.L.', 
              'sociedad_limitada',
              'SociedadLimitada'
            ], 25),
            name: 'S.R.L.',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#34D399' },
                  { offset: 1, color: '#047857' }
                ]
              }
            }
          },
          {
            value: getValue(data, [
              'unipersonal',
              'UNIPERSONAL',
              'empresaUnipersonal',
              'EMPRESA UNIPERSONAL'
            ], 25),
            name: 'UNIPERSONAL',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#FBBF24' },
                  { offset: 1, color: '#D97706' }
                ]
              }
            }
          },
          {
            value: getValue(data, [
              'otrasSociedades',
              'OTRAS EMPRESAS',
              'otras_sociedades',
              'otros'
            ], 25),
            name: 'OTRAS EMPRESAS',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#F87171' },
                  { offset: 1, color: '#DC2626' }
                ]
              }
            }
          }
        ],
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx: number) {
          return idx * 200
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: darkMode ? '#1F2937' : '#fff',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        label: {
          color: darkMode ? '#fff' : '#374151',
          fontWeight: 'bold',
          formatter: '{b}\n{c}%',
          fontSize: 15
        },
        labelLine: {
          length: 15,
          length2: 10
        }
      }
    ],
    grid: {
      top: '15%',
      bottom: '10%',
      left: '0%',
      right: '5%'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <ReactECharts 
        option={option} 
        style={{ height: '550px', width: '100%', minHeight: '550px' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  )
}

export default PieChart3DReal