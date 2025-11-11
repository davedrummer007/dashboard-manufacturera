"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { DepartamentoData } from '../types/charts'
import { formatMillions } from '@/app/utils/chartFormatters';

interface VerticalBarChartProps {
  data: DepartamentoData[]
  gestion: string
  darkMode: boolean
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos de mayor a menor
  const sortedData = [...data].sort((a, b) => b.total - a.total)
  
  // Colores profesionales para las barras
  const professionalColors = [
    '#0750daff', '#038157ff', '#f52e2eff', '#F59E0B', '#8B5CF6', 
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
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
        opacity: 0.2
      }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: '70%',
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatMillions(val) // ← CAMBIAR AQUÍ
      },
      style: {
        fontSize: '17px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetY: -25
    },
    xaxis: {
      categories: sortedData.map(item => item.departamento),
      labels: {
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
      show: false,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    title: {
      text: `GESTIÓN ${gestion}`,
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      }
    },
    colors: professionalColors,
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
      padding: {
        top: -20,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return formatMillions(val) // ← CAMBIAR AQUÍ TAMBIÉN
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        dataLabels: {
          style: {
            fontSize: '10px'
          }
        }
      }
    }]
  }

  const chartSeries = [{
    name: 'Total Ingresos',
    data: sortedData.map(item => item.total)
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={500}
      />
    </div>
  )
}

export default VerticalBarChart