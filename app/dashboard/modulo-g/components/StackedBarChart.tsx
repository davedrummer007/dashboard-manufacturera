// app/dashboard/modulo-g/components/StackedBarChart.tsx
"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { StackedBarData } from '../types/charts'
import { formatNumber, formatPercent } from '../data/dataProcessor'

interface StackedBarChartProps {
  data: StackedBarData
  titulo: string
  descripcion: string
  gestion: string
  darkMode: boolean
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  titulo,
  descripcion,
  gestion,
  darkMode
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: true,
      background: 'transparent',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        borderRadiusApplication: 'end',
        columnWidth: '70%',
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val > 0 ? formatNumber(val) : ''
      },
      style: {
        fontSize: '11px',
        fontWeight: 600,
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: data.labels,
      labels: {
        style: {
          colors: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '12px',
          fontWeight: 600
        }
      }
    },
    yaxis: {
      title: {
        text: 'Número de Empresas',
        style: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '12px',
          fontWeight: 600
        }
      },
      labels: {
        style: {
          colors: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '11px'
        },
        formatter: function (val: number) {
          return formatNumber(val)
        }
      }
    },
    colors: data.colors,
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontWeight: 600,
      labels: {
        colors: darkMode ? '#fff' : '#374151'
      }
    },
    title: {
      text: titulo,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      },
      margin: 10
    },
    subtitle: {
      text: descripcion,
      align: 'center',
      style: {
        fontSize: '12px',
        color: darkMode ? '#9CA3AF' : '#6B7280'
      }
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return `${formatNumber(val)} empresas`
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 350
        },
        dataLabels: {
          enabled: false
        }
      }
    }]
  }

  const chartSeries = data.series

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={400}
      />
    </div>
  )
}

export default StackedBarChart