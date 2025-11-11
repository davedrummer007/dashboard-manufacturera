"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { SueldosSalariosData } from '../types/charts'
import { formatNumber, formatCurrency } from '../data/dataProcessor'
import { formatMillions } from '@/app/utils/chartFormatters';
import { format } from 'path'

interface HorizontalBarChartSueldosProps {
  data: SueldosSalariosData[]
  gestion: string
  darkMode: boolean
}

const HorizontalBarChartSueldos: React.FC<HorizontalBarChartSueldosProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por total de sueldos descendente
  const sortedData = [...data].sort((a, b) => b.total - a.total)
  
  // Paleta de dorados/ámbar para sueldos
const inventoryColors = [
  '#3366CC', // Azul corporativo
  '#DC3912', // Rojo alerta
  '#FF9900', // Naranja energía
  '#109618', // Verde éxito
  '#990099', // Púrpura creativo
  '#0099C6', // Azul cielo
  '#DD4477', // Rosa impacto
  '#66AA00', // Verde lima
  '#B82E2E', // Rojo vino
  '#316395'  // Azul marino
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
        blur: 4,
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
        borderRadius: 6,
        horizontal: true,
        barHeight: '70%',
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatMillions(val)
      },
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetX: 30,
    },
    xaxis: {
      categories: sortedData.map(item => item.departamento),
      labels: {
        show: false,
        formatter: function (val: string) {
          return val
        },
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '11px'
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
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '14px',
          fontWeight: 400
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
      text: `GESTIÓN ${gestion}`,
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      }
    },
    colors: inventoryColors,
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return formatMillions(val)
        }
      },
      x: {
        formatter: function (val: number, { series, seriesIndex, dataPointIndex, w }) {
          const personal = sortedData[dataPointIndex].personal
          return `${sortedData[dataPointIndex].departamento} - ${formatNumber(personal)} personas`
        }
      }
    }
  }

  const chartSeries = [{
    name: 'Sueldos y Salarios',
    data: sortedData.map(item => item.total)
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

export default HorizontalBarChartSueldos