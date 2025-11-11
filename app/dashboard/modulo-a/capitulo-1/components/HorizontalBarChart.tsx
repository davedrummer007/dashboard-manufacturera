"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { ActividadEconomicaData } from '../types/charts'
import { formatMillions } from '@/app/utils/chartFormatters';

interface HorizontalBarChartProps {
  data: ActividadEconomicaData[]
  gestion: string
  darkMode: boolean
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos de mayor a menor y limitar a 10 actividades
  const sortedData = [...data]
    .sort((a, b) => b.totalIngresos - a.totalIngresos)
    // .slice(0, 10)

  // Colores diferentes para cada barra pero manteniendo el estilo limpio
  const barColors = [
    '#0750daff', '#038157ff', '#f52e2eff', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ]

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 500,
      width: '100%',
      background: 'transparent',
      toolbar: {
        show: true
      }
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '80%',
        distributed: true, // Esto hace que cada barra tenga color diferente
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatMillions(val)
      },
      style: {
        fontSize: '17px',
        colors: [darkMode ? '#fff' : '#232325ff']
      },
      offsetX: 20
    },
    xaxis: {
      categories: sortedData.map(item => item.actividadEconomica),
      labels: {
        show: false,
        formatter: function (value: string) {
          return formatMillions(parseFloat(value))
        },
        style: {
          colors: darkMode ? '#fff' : '#000',
          fontSize: '5px'
        }
      },
      title: {
        text: 'Total Ingresos (Bs)',
        style: {
          color: darkMode ? '#fff' : '#000'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '14px',  // ← Aumentar tamaño
          fontWeight: 600,
          fontFamily: 'Arial, sans-serif'
        },
        maxWidth: 550,  // ← Ajustar posición horizontal
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
      text: `Gestión ${gestion}`,
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#000'
      }
    },
    colors: barColors, // Colores diferentes para cada barra
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      padding: {
        left: 20,   // ← MÁS ESPACIO PARA NOMBRES LARGOS
        right: 10
      }
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return formatMillions(val)
        }
      }
    },
    legend: {
      show: false // Ocultamos la leyenda ya que cada barra es diferente
    }
  }

  const chartSeries = [{
    name: 'Total Ingresos',
    data: sortedData.map(item => item.totalIngresos)
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={500}
      />
    </div>
  )
}

export default HorizontalBarChart