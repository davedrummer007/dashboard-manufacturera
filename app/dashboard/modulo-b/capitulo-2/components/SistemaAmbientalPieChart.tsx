// app/dashboard/modulo-b/capitulo-2/components/SistemaAmbientalPieChart.tsx
"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { PreguntaChartData } from '../types/charts'
import { formatPercent, formatNumber } from '../data/dataProcessor'

interface SistemaAmbientalPieChartProps {
  data: PreguntaChartData
  titulo: string
  descripcion: string
  gestion: string
  darkMode: boolean
}

const SistemaAmbientalPieChart: React.FC<SistemaAmbientalPieChartProps> = ({
  data,
  titulo,
  descripcion,
  gestion,
  darkMode
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 350, // Reducimos altura porque el título va fuera
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
        }
      }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: darkMode ? '#fff' : '#374151'
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 'bold',
              color: darkMode ? '#fff' : '#1F2937',
              formatter: function (val: string) {
                return val
              }
            },
            total: {
              show: true,
              label: 'Total',
              color: darkMode ? '#9CA3AF' : '#6B7280',
              formatter: function (w: any) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString()
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        const seriesName = opts.w.config.labels[opts.seriesIndex]
        const porcentaje = data.Porcentajes[opts.seriesIndex]
        return [seriesName, formatPercent(porcentaje)]
      },
      style: {
        fontSize: '20px',
        fontWeight: 600,
        colors: ['#ffc60cff']
      },
      /*dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }*/
    },
    labels: data.labels,
    colors: data.colors,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontWeight: 600,
      labels: {
        colors: darkMode ? '#fff' : '#374151'
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4
      }
    },
    // ELIMINAMOS el título del chart y lo movemos fuera
    title: {
      text: undefined, // Eliminamos el título del chart
    },
    subtitle: {
      text: undefined, // Eliminamos el subtítulo del chart
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number, { seriesIndex }: { seriesIndex: number }) {
          const porcentaje = data.Porcentajes[seriesIndex]
          return `${formatNumber(val)} empresas (${formatPercent(porcentaje)})`
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 320
        },
        legend: {
          position: 'bottom',
          fontSize: '10px'
        }
      }
    }]
  }

  const chartSeries = data.series

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      {/* Título personalizado con white-space: pre-line */}
      <div className="text-center mb-4">
        <h3 
          className="text-lg font-bold text-gray-900 dark:text-white"
          style={{ whiteSpace: 'pre-line' }}
        >
          {titulo}
        </h3>
        {descripcion && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {descripcion}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Gestión {gestion}
        </p>
      </div>
      
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={350}
      />
    </div>
  )
}

export default SistemaAmbientalPieChart