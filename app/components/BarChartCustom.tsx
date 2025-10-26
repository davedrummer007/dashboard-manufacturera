'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartCustomProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string | string[]
    }[]
  }
  darkMode?: boolean;
  title?: string;
  height?: string; // ← Nueva prop para altura personalizada
}

export default function BarChartCustom({ data, darkMode = false, title, height = 'h-80' }: BarChartCustomProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ← IMPORTANTE para control de tamaño
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#E5E7EB' : '#111827'
        }
      },
      title: {
        display: !!title,
        text: title,
        color: darkMode ? '#E5E7EB' : '#111827'
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280'
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB'
        }
      },
      y: {
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280'
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB'
        }
      }
    }
  }

  return (
    <div className={height}> {/* ← Altura personalizable */}
      <Bar data={data} options={options} />
    </div>
  )
}