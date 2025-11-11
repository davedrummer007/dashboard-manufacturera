"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { ActivosFijosData } from '../types/charts'
import { formatMillions } from '@/app/utils/chartFormatters';

interface VerticalBarChartAFGrandeProps {
  data: ActivosFijosData[]
  gestion: string
  darkMode: boolean
}

const VerticalBarChartAFGrande: React.FC<VerticalBarChartAFGrandeProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por valor contable descendente
  const sortedData = [...data].sort((a, b) => b.valorContable - a.valorContable)
  
  // Paleta de colores para activos fijos
  const activosFijosColors = [
    '#f5d93eff', '#30d62aff', '#45B7D1', '#ee9816ff', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
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
        return formatMillions(val)
      },
      style: {
        fontSize: '17px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetY: -25,
    },
    xaxis: {
      categories: sortedData.map(item => item.tipoSocietario),
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
          return formatMillions(val)
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
    colors: activosFijosColors,
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
          return formatMillions(val)
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
    name: 'Valor Contable',
    data: sortedData.map(item => item.valorContable)
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

export default VerticalBarChartAFGrande