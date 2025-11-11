"use client";

import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { DepartamentoPatrimonioData } from '../types/charts'
import { formatNumber } from '../data/dataProcessor'
import { formatMillions } from '@/app/utils/chartFormatters';

interface HorizontalBarChartInventoryProps {
  data: DepartamentoPatrimonioData[]
  gestion: string
  darkMode: boolean
}

const HorizontalBarChartInventory: React.FC<HorizontalBarChartInventoryProps> = ({ data, gestion, darkMode }) => {
  // Ordenar datos de mayor a menor
  const sortedData = [...data].sort((a, b) => b.patrimonio - a.patrimonio)

  // Nuevos colores profesionales para INVENTARIO (tonos verdes)
const inventoryColors = [
  '#162addff', // Azul intenso
  '#FF7F0E', // Naranja vibrante
  '#2CA02C', // Verde fuerte
  '#D62728', // Rojo destacado
  '#9467BD', // Púrpura distintivo
  '#8C564B', // Marrón café
  '#E377C2', // Rosa magenta
  '#7F7F7F', // Gris medio
  '#BCBD22', // Verde oliva
  '#17BECF'  // Cyan azulado
]

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 500,
      background: 'transparent',
      toolbar: {
        show: true
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
        borderRadius: 6,
        horizontal: true,
        barHeight: '80%',
        distributed: true,
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
      offsetX: 15,
    },
    xaxis: {
      // EJE X: VALORES NUMÉRICOS
      labels: {
        show: false,
        formatter: function (value: string) {
          return formatNumber(parseFloat(value))
        },
        style: {
          colors: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '11px',
          fontWeight: 500
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
      labels: {
        style: {
          colors: darkMode ? '#fff' : '#374151',
          fontSize: '12px',
          fontWeight: 600
        }
      }
    },
    title: {
      text: `GESTIÓN ${gestion}`,
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#1F2937'
      }
    },
    colors: inventoryColors,
    grid: {
      borderColor: darkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return formatMillions(val)
        }
      }
    }
  }

  const chartSeries = [{
    name: 'Patrimonio',
    data: sortedData.map(item => ({
      x: item.departamento,  // ¡NOMBRE como coordenada X!
      y: item.patrimonio     // VALOR como coordenada Y!
    }))
  }]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={500}
      />
    </div>
  )
}

export default HorizontalBarChartInventory