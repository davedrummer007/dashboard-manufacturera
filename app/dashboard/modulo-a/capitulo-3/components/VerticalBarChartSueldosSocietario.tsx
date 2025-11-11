"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { SueldosPorcentajeData } from '../types/charts'

interface VerticalBarChartSueldosSocietarioProps {
  data: SueldosPorcentajeData[]
  gestion: string
  darkMode: boolean
}

const VerticalBarChartSueldosSocietario: React.FC<VerticalBarChartSueldosSocietarioProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos por porcentaje descendente
  const sortedData = [...data].sort((a, b) => b.porcentaje - a.porcentaje)
  
  // Paleta de morados elegantes para sueldos societarios
  const purpleColors = ['#0cb846ff', '#3A86FF', '#FB5607', '#FF006E']

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
        fontSize: '15px',
        fontWeight: 'bold',
        colors: [darkMode ? '#fff' : '#1F2937']
      },
      offsetY: -25,
    },
    xaxis: {
      categories: sortedData.map(item => {
        const shortNames: { [key: string]: string } = {
          'SOCIEDAD ANONIMA': 'S.A.',
          'SOCIEDAD DE RESPONSABILIDAD LIMITADA': 'S.R.L.',
          'EMPRESA UNIPERSONAL': 'UNIPERSONAL',
          'OTROS (AS)': 'OTRAS EMPRESAS'
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
      margin: 0,
      offsetY: -5
    },
    colors: purpleColors,
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
          return val.toFixed(1) + '%'
        }
      }
    }
  }

  const chartSeries = [{
    name: 'Porcentaje de Sueldos',
    data: sortedData.map(item => item.porcentaje)
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

export default VerticalBarChartSueldosSocietario