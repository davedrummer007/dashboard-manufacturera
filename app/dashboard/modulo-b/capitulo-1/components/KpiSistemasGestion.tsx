// app/dashboard/modulo-b/components/KpiSistemasGestion.tsx
"use client";

import React from 'react'
import { PreguntaData } from '../types/charts'
import { formatNumber, formatPercent } from '../data/dataProcessor'

interface KpiSistemasGestionProps {
  preguntas: {
    preg_1: PreguntaData
    preg_4: PreguntaData
    preg_6: PreguntaData
    preg_7: PreguntaData
  }
  darkMode: boolean
}

const KpiSistemasGestion: React.FC<KpiSistemasGestionProps> = ({ preguntas, darkMode }) => {
  const kpis = [
    {
      titulo: 'Sistemas Certificados',
      valor: preguntas.preg_1.Porcentajesi,
      descripcion: 'Empresas con sistemas certificados',
      color: 'text-green-600',
      icon: '🖥️'
    },
    {
      titulo: 'Renovaciones',
      valor: preguntas.preg_4.Porcentajesi,
      descripcion: 'Empresas que renovaron certificados',
      color: 'text-blue-600',
      icon: '🔄'
    },
    {
      titulo: 'Nuevos Sistemas',
      valor: preguntas.preg_6.Porcentajesi,
      descripcion: 'Empresas que implementaron nuevos sistemas',
      color: 'text-orange-600',
      icon: '🆕'
    },
    {
      titulo: 'Procesos Certificados',
      valor: preguntas.preg_7.Porcentajesi,
      descripcion: 'Empresas que certificaron nuevos procesos',
      color: 'text-purple-600',
      icon: '📋'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {kpi.descripcion}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default KpiSistemasGestion