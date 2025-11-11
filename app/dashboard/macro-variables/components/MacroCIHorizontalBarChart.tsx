// app/dashboard/macro-variables/components/MacroCIHorizontalBarChart.tsx
"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { MacroVariableData } from '../types/charts'

interface MacroCIHorizontalBarChartProps {
  data: MacroVariableData[]
  gestion: string
  darkMode: boolean
}

// Función para formatear números con separadores de miles (5 cifras)
const formatNumberWithSeparators = (num: number): string => {
  // Convertir a millones y tomar solo la parte entera
  const valueInMillions = Math.floor(num / 1000000)
  
  // Formatear con separadores de miles
  return new Intl.NumberFormat('es-ES').format(valueInMillions)
}

const MacroCIHorizontalBarChart: React.FC<MacroCIHorizontalBarChartProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por valor descendente
  const sortedData = [...data].sort((a, b) => b.valor - a.valor)
  
  // Paleta de colores vibrantes para Consumo Intermedio
  const ciColors = [
    '#FF6B6B', // Rojo coral
    '#4ECDC4', // Verde azulado
    '#45B7D1', // Azul claro
    '#96CEB4', // Verde menta
    '#FFEAA7', // Amarillo pastel
    '#DDA0DD', // Ciruela
    '#98D8C8', // Verde agua
    '#F7DC6F', // Amarillo dorado
    '#BB8FCE', // Púrpura claro
    '#85C1E9'  // Azul cielo
  ]

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 500,
      background: 'transparent',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 6,
        color: darkMode ? '#000000' : '#9CA3AF',
        opacity: 0.3
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: true,
        barHeight: '70%',
        distributed: true,
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatNumberWithSeparators(val)
      },
      style: {
        fontSize: '17px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetX: 18,
    },
    xaxis: {
      categories: sortedData.map(item => item.departamento),
      labels: {
        show: false
      },
      axisBorder: {
        show: true,
        color: darkMode ? '#374151' : '#E5E7EB'
      },
      axisTicks: {
        show: true,
        color: darkMode ? '#374151' : '#E5E7EB'
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '13px',
          fontWeight: 600
        }
      },
      axisBorder: {
        show: true,
        color: darkMode ? '#374151' : '#E5E7EB'
      },
      axisTicks: {
        show: true,
        color: darkMode ? '#374151' : '#E5E7EB'
      }
    },
    title: {
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      }
    },
    colors: ciColors,
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return new Intl.NumberFormat('es-ES').format(val) + ' Bs.'
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 600
        },
        dataLabels: {
          style: {
            fontSize: '12px'
          }
        },
        plotOptions: {
          bar: {
            barHeight: '60%'
          }
        }
      }
    }]
  }

  const chartSeries = [{
    name: 'Consumo Intermedio',
    data: sortedData.map(item => item.valor)
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={500}
      />
    </div>
  )
}

export default MacroCIHorizontalBarChart