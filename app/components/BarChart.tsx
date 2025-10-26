// app/components/BarChart.tsx
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string | string[]
    }[]
  }
  darkMode?: boolean;
  title?: string; // ✅ Nueva propiedad
  isStacked?: boolean
}

export default function BarChart({ data, darkMode = false, title }: BarChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#E5E7EB' : '#111827'
        }
      },
      title: {
        display: !!title, // ✅ Solo muestra si hay título
        text: title,
        color: darkMode ? '#E5E7EB' : '#111827', // ✅ Color del título
        font: {
          size: 16,
          weight: 'bold' as const
        }
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

  return <Bar data={data} options={options} />
}