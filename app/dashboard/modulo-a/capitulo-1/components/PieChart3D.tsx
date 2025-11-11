"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface TipoSocietarioData {
  unipersonal: number
  sociedadLimitada: number
  sociedadAnonima: number
  otrasSociedades: number
}

interface PieChart3DProps {
  data: TipoSocietarioData
  gestion: string
  darkMode: boolean
}

const PieChart3D: React.FC<PieChart3DProps> = ({ data, gestion, darkMode }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 450,
      background: 'transparent'
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              color: darkMode ? '#fff' : '#374151'
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 'bold',
              color: darkMode ? '#fff' : '#1F2937',
              formatter: function (val: string) {
                return val + '%'
              }
            },
            total: {
              show: true,
              label: 'Total',
              color: darkMode ? '#9CA3AF' : '#6B7280',
              fontSize: '14px',
              fontWeight: 600,
              formatter: function (w) {
                return '100%'
              }
            }
          }
        },
        expandOnClick: true,
        customScale: 1,
        offsetX: 0,
        offsetY: 0
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%'
      },
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#000']
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.8
      }
    },
    labels: [
      'SOCIEDAD ANÓNIMA', 
      'SOCIEDAD LIMITADA', 
      'UNIPERSONAL', 
      'OTRAS SOCIEDADES'
    ],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 600,
      labels: {
        colors: darkMode ? '#fff' : '#374151',
        useSeriesColors: false
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    title: {
      text: `DISTRIBUCIÓN POR TIPO SOCIETARIO - ${gestion}`,
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      }
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    stroke: {
      show: true,
      width: 2,
      colors: [darkMode ? '#1F2937' : '#ffffff']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#60A5FA', '#34D399', '#FBBF24', '#F87171'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return val.toFixed(1) + '%'
        }
      }
    }
  }

  const chartSeries = [
    data.sociedadAnonima,
    data.sociedadLimitada,
    data.unipersonal,
    data.otrasSociedades
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={450}
      />
    </div>
  )
}

export default PieChart3D