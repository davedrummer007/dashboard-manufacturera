"use client";

import React from 'react'
import { ApexOptions } from 'apexcharts'
import { TipoSocietarioData } from '../data/dashboardData'
import { ApexChart } from './ChartWrapper'

interface DashboardPieChartProps {
  data: TipoSocietarioData[]
  gestion: string
  darkMode: boolean
}

const DashboardPieChart: React.FC<DashboardPieChartProps> = ({ data, gestion, darkMode }) => {
  // Paleta de colores profesionales (verdes)
  const inventoryColors = [
  '#1E40AF', // Azul profundo
  '#DC2626', // Rojo intenso
  '#059669', // Verde esmeralda
  '#7C3AED', // Púrpura real
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
        columnWidth: '60%',
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
        fontSize: '17px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetY: -30,
    },
    xaxis: {
      categories: data.map(item => {
        const shortNames: { [key: string]: string } = {
          'EMPRESA UNIPERSONAL': 'UNIPERSONAL',
          'SOCIEDAD DE RESPONSABILIDAD LIMITADA': 'S.R.L',
          'SOCIEDAD ANONIMA': 'S.A.',
          'OTROS TIPOS SOCIETARIOS': 'OTRAS EMPRESAS'
        }
        return shortNames[item.tipoSocietario] || item.tipoSocietario
      }),
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
      max: 100,
      labels: {
        show: false,
        formatter: function (val: number) {
          return val.toFixed(0) + '%' 
        },
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '11px'
        }
      },
      axisBorder: {
        show: false,
        color: darkMode ? '#374151' : '#E5E7EB'
      },
      axisTicks: {
        show: false,
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
          return val.toFixed(1) + '%'
        }
      }
    }
  }

  const chartSeries = [{
    name: 'Porcentaje',
    data: data.map(item => item[gestion as keyof TipoSocietarioData] as number)
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <ApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={450}
      />
    </div>
  )
}

export default DashboardPieChart