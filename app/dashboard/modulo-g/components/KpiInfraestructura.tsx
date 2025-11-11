// app/dashboard/modulo-g/components/KpiInfraestructura.tsx
"use client";

import React from 'react'
import { PreguntaBinariaData, PreguntaMultipleData } from '../types/charts'
import { formatNumber, formatPercent } from '../data/dataProcessor'

interface KpiInfraestructuraProps {
  preguntas: {
    p1: PreguntaBinariaData
    p4: PreguntaMultipleData
    p5: PreguntaMultipleData
  }
  darkMode: boolean
}

const KpiInfraestructura: React.FC<KpiInfraestructuraProps> = ({ preguntas, darkMode }) => {
  const kpis = [
    {
      key: 'p1',
      titulo: 'Múltiples Plantas',
      valor: preguntas.p1.siPorcentaje,
      descripcion: 'Empresas con más de una planta operativa',
      color: 'text-blue-600',
      icon: '🏭'
    },
    {
      key: 'p4',
      titulo: 'Predios Propios',
      valor: preguntas.p4.Porcentajes[2], // Propio
      descripcion: 'Empresas con predios de propiedad',
      color: 'text-green-600',
      icon: '🏠'
    },
    {
      key: 'p5',
      titulo: 'Parques Industriales',
      valor: preguntas.p5.Porcentajes[0], // Parque Industrial
      descripcion: 'Empresas ubicadas en parques industriales',
      color: 'text-purple-600',
      icon: '🏢'
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
                {kpi.key === 'p1' 
                  ? `${formatNumber(preguntas.p1.si)} empresas`
                  : kpi.key === 'p4'
                  ? `${formatNumber(preguntas.p4.series[2])} empresas`
                  : `${formatNumber(preguntas.p5.series[0])} empresas`
                }
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

export default KpiInfraestructura