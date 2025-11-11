"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { PatrimonioPorcentajeData } from '../types/charts'

interface VerticalBarChartInventoryProps {
  data: PatrimonioPorcentajeData[]
  gestion: string
  darkMode: boolean
}

const VerticalBarChartInventory: React.FC<VerticalBarChartInventoryProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por porcentaje descendente
  const sortedData = [...data].sort((a, b) => b.porcentaje - a.porcentaje)
  
  // Colores para Porcentajes de patrimonio (tonos púrpura)
  const percentageColors = [
    '#f38609ff', '#1D3557', '#29e4ebff', '#ebe714ff',
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
      offsetY: -30
    },
    xaxis: {
      categories: sortedData.map(item => {
        const shortNames: { [key: string]: string } = {
          'SOCIEDAD ANONIMA': 'S.A.',
          'SOCIEDAD LIMITADA': 'S.R.L.',
          'EMPRESA UNIPERSONAL': 'UNIPERSONAL',
          'OTROS': 'OTRAS EMPRESAS'
        }
        return shortNames[item.tipoSocietario] || item.tipoSocietario
      }),
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
        fontSize: '18px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      },
      margin: 10,
      offsetY: -10
    },
    colors: percentageColors,
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
      padding: {
        top: -15,
        right: 0,
        bottom: 0,
        left: 0
      }
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
    data: sortedData.map(item => item.porcentaje)
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={450}
      />
      {/* Texto adicional que querías agregar */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Distribución porcentual del patrimonio por tipo societario
      </div>
    </div>
  )
}

export default VerticalBarChartInventory