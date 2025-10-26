'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartCustomProps {
  data: any
  darkMode: boolean
  height?: string; // ← Nueva prop para altura
}

export default function PieChartCustom({ data, darkMode, height = 'h-64' }: PieChartCustomProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ← IMPORTANTE
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: darkMode ? '#fff' : '#000'
        }
      }
    }
  }

  return (
    <div className={height}> {/* ← Altura personalizable */}
      <Pie data={data} options={options} />
    </div>
  )
}