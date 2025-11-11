"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { PersonalOcupadoData } from '../types/charts'
import { formatNumber } from '../data/dataProcessor'

interface VerticalBarChartPersonalProps {
  data: PersonalOcupadoData[]
  gestion: string
  darkMode: boolean
}

const VerticalBarChartPersonal: React.FC<VerticalBarChartPersonalProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por total descendente
  const sortedData = [...data].sort((a, b) => b.total - a.total)
  
  // Paleta de colores del inventario
  const inventoryColors = [
    '#FF0054', '#00D2FF', '#FFBD00', '#7BFF00', '#9D00FF',
    '#00FFC6', '#FF3700', '#0094FF', '#FF00E6', '#8CFF00'
  ]

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
        columnWidth: '65%',
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatNumber(val)
      },
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetY: -25,
    },
    xaxis: {
      categories: sortedData.map(item => item.departamento),
      labels: {
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '12px',
          fontWeight: 600
        },
        rotate: -45
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
        show: false,
        formatter: function (val: number) {
          return formatNumber(val)
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
    title: {
      text: `GESTIÓN ${gestion}`,
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      },
      margin: 0,
      offsetY: -5
    },
    colors: inventoryColors,
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
          return formatNumber(val) + ' personas'
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        dataLabels: {
          enabled: false
        }
      }
    }]
  }

  const chartSeries = [{
    name: 'Personal Ocupado',
    data: sortedData.map(item => item.total)
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

export default VerticalBarChartPersonal