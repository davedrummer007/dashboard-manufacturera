'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  data: any
  darkMode: boolean
  title?: string
}

export default function PieChart({ data, darkMode }: PieChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: darkMode ? '#fff' : '#000'
        }
      }
    }
  }

  return <Pie data={data} options={options} />
}