// app/dashboard/modulo-d/components/KpiInnovacion.tsx
"use client";

import React from 'react'
import { PreguntaInnovacionData } from '../types/charts'
import { formatNumber, formatPercent } from '../data/dataProcessor'

interface KpiInnovacionProps {
  preguntas: {
    [key: string]: PreguntaInnovacionData
  }
  darkMode: boolean
}

const KpiInnovacion: React.FC<KpiInnovacionProps> = ({ preguntas, darkMode }) => {
  const kpis = [
    {
      key: 'p1',
      titulo: 'Equipos de Innovación',
      valor: preguntas.p1.siPorcentaje,
      descripcion: 'Empresas con equipos dedicados a innovación',
      color: 'text-blue-600',
      icon: '👥'
    },
    {
      key: 'p4',
      titulo: 'Metodología Innovación',
      valor: preguntas.p4.siPorcentaje,
      descripcion: 'Empresas con metodología formal de innovación',
      color: 'text-green-600',
      icon: '📋'
    },
    {
      key: 'p6',
      titulo: 'Patentes Registradas',
      valor: preguntas.p6.siPorcentaje,
      descripcion: 'Empresas que registraron o patentaron innovaciones',
      color: 'text-purple-600',
      icon: '🏆'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className={`p-6 rounded-xl shadow-md ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                {kpi.icon} {kpi.titulo}
              </h3>
              <p className={`text-2xl font-bold mt-2 ${kpi.color}`}>
                {formatPercent(kpi.valor)}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(preguntas[kpi.key].si)} empresas
              </div>
              <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {kpi.descripcion}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default KpiInnovacion