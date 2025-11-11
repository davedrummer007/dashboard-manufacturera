"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { PersonalPorcentajeData } from '../types/charts'

interface VerticalBarChartSocietarioProps {
  data: PersonalPorcentajeData[]
  gestion: string
  darkMode: boolean
}

const VerticalBarChartSocietario: React.FC<VerticalBarChartSocietarioProps> = ({ data, gestion, darkMode }) => {
  // Tomar los datos de la gestión actual (solo un registro)
  const currentData = data.find(item => item.gestion === gestion)
  
  // Si no hay datos, retornar null
  if (!currentData) return null

  // Paleta de azules profesionales
  const colors = ['#2A9D8F', '#6ae970ff', '#f37208ff'] // Permanente, Eventual, Apoyo

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 450,
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
        top: 3,
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
        horizontal: false,
        columnWidth: '50%',
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%'
      },
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetY: -25,
    },
    xaxis: {
      categories: ['PERMANENTE', 'EVENTUAL', 'DE APOYO'],
      labels: {
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '14px',
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
      max: 100,
      labels: {
        show: false,
        formatter: function (val: number) {
          return val.toFixed(0) + '%'
        },
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '12px'
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
    colors: colors,
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return val.toFixed(1) + '%'
        }
      }
    }
  }

  const chartSeries = [{
    name: 'Porcentaje',
    data: [
      currentData.permanente,
      currentData.eventual,
      currentData.apoyo
    ]
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={450}
      />
    </div>
  )
}

export default VerticalBarChartSocietario