// app/dashboard/modulo-g/components/HorizontalBarChart.tsx
"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { PreguntaMultipleData } from '../types/charts'
import { formatNumber, formatPercent } from '../data/dataProcessor'

interface HorizontalBarChartProps {
  data: PreguntaMultipleData
  titulo: string
  descripcion: string
  gestion: string
  darkMode: boolean
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
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
    grid: {
    show: false,        // Elimina todas las líneas de fondo
    borderColor: 'transparent', // Asegura que no haya bordes
        padding: {
            top: 0,
            right: 10,
            bottom: 0,
            left: 10
        }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        borderRadiusApplication: 'end',
        barHeight: '70%',
        distributed: true,
      }
    },
    dataLabels: {
    enabled: true,
    formatter: function (val: number) {
        return formatNumber(val)
    },
    style: {
        fontSize: '15px',
        fontWeight: 600,
        colors: [darkMode ? '#fff' : '#000'] // ✅ Color dinámico según tema
    },
    offsetX: 30,
    background: {
        enabled: false // ✅ Background deshabilitado
    }
    },
    xaxis: {
      labels: {
        show: false,
        style: {
          colors: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '11px'
        },
        formatter: function (val: string) { // ✅ CORREGIDO: Recibe string
          const num = parseFloat(val)
          return isNaN(num) ? val : formatNumber(num)
        }
      },
      title: {
        text: 'Número de Empresas',
        offsetY: -10,
        style: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '14px',
          fontWeight: 600
        }
      },
        axisBorder: {
            show: false // Opcional: elimina la línea del eje X
        },
        axisTicks: {
            show: false // Opcional: elimina las marcas del eje X
        }
    },
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '14px',
          fontWeight: 600
        }
      }
    },
    colors: data.colors,
    legend: {
      show: false
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
        formatter: function (val: number, { dataPointIndex }) {
          const porcentaje = data.Porcentajes[dataPointIndex]
          return `${formatNumber(val)} empresas (${formatPercent(porcentaje)})`
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

  // Para gráficas horizontales, las categorías van en el chartOptions, no en yaxis
  const chartSeries = [{
    name: 'Empresas',
    data: data.series
  }]

  // Configuración específica para gráfica horizontal
  const horizontalChartOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
    },
    xaxis: {
      ...chartOptions.xaxis,
      categories: data.labels, // ✅ Las categorías van en xaxis para horizontales
    },
    yaxis: {
      ...chartOptions.yaxis,
      // Sin categories aquí
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <Chart
        options={horizontalChartOptions as ApexOptions}
        series={chartSeries}
        type="bar"
        height={400}
      />
    </div>
  )
}

export default HorizontalBarChart