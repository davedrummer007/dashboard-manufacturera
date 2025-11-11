// app/dashboard/modulo-c/components/TICPieChart.tsx
"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { PreguntaChartData } from '../types/charts'
import { formatPercent, formatNumber } from '../data/dataProcessor'

interface TICPieChartProps {
  data: PreguntaChartData
  titulo: string
  descripcion: string
  gestion: string
  darkMode: boolean
}

const TICPieChart: React.FC<TICPieChartProps> = ({
  data,
  titulo,
  descripcion,
  gestion,
  darkMode
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
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
        //fontWeight: 600,
        colors: ['#ffc60cff']
      },
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
    // Título condicional - solo mostrar si no está vacío
    ...(titulo && {
      title: {
        text: titulo,
        align: 'center',
        style: {
          fontSize: '13px',
          fontWeight: 'bold',
          color: darkMode ? '#fff' : '#1F2937'
        },
        margin: 20
      }
    }),
    // Subtítulo condicional - solo mostrar si no está vacío
    ...(descripcion && {
      subtitle: {
        text: descripcion,
        align: 'center',
        style: {
          fontSize: '11px',
          color: darkMode ? '#9CA3AF' : '#6B7280'
        }
      }
    }),
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
          height: 350
        },
        legend: {
          position: 'bottom',
          fontSize: '10px'
        },
        ...(titulo && {
          title: {
            style: {
              fontSize: '12px'
            }
          }
        })
      }
    }]
  }

  const chartSeries = data.series

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={400}
      />
    </div>
  )
}

export default TICPieChart