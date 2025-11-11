"use client";

import React from 'react'
import { ApexOptions } from 'apexcharts'
import { DepartamentoData } from '../data/dashboardData'
import { formatNumber } from '../data/dashboardData'
import { ApexChart } from './ChartWrapper'

interface DashboardBarChartProps {
  data: DepartamentoData[]
  gestion: string
  darkMode: boolean
}

const DashboardBarChart: React.FC<DashboardBarChartProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por la gestión seleccionada descendente
  const sortedData = [...data].sort((a, b) => b[gestion as keyof DepartamentoData] as number - (a[gestion as keyof DepartamentoData] as number))
  
  // Paleta de colores institucionales (azules)
const inventoryColors = [
  '#1E40AF', // Azul profundo
  '#DC2626', // Rojo intenso
  '#059669', // Verde esmeralda
  '#7C3AED', // Púrpura real
  '#EA580C', // Naranja fuego
  '#0D9488', // Verde azulado
  '#BE185D', // Rosa fuerte
  '#CA8A04', // Amarillo oro
  '#4338CA', // Índigo
  '#BE123C'  // Rojo cereza
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
        barHeight: '75%',
        distributed: true,
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatNumber(val)
      },
      style: {
        fontSize: '17px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetX: 10,
    },
    xaxis: {
      categories: sortedData.map(item => item.departamento),
      labels: {
        show: false,
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '12px',
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
    yaxis: {
      labels: {
        // ELIMINAR el formatter - porque el eje Y son strings (departamentos)
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '12px',
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
      text: `GESTIÓN ${gestion}`,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      }
    },
    colors: inventoryColors,
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return formatNumber(val) + ' unidades'
        }
      }
    }
  }

  const chartSeries = [{
    name: 'Unidades Económicas',
    data: sortedData.map(item => item[gestion as keyof DepartamentoData] as number)
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <ApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={500}
      />
    </div>
  )
}

export default DashboardBarChart