// app/dashboard/modulo-c/components/KpiTIC.tsx
"use client";

import React from 'react'
import { PreguntaTICData } from '../types/charts'
import { formatNumber, formatPercent } from '../data/dataProcessor'

interface KpiTICProps {
  preguntas: {
    [key: string]: PreguntaTICData
  }
  darkMode: boolean
}

const KpiTIC: React.FC<KpiTICProps> = ({ preguntas, darkMode }) => {
  const kpis = [
    {
      key: 'p1',
      titulo: 'Acceso a Internet',
      valor: preguntas.p1.siPorcentaje,
      descripcion: 'Empresas con conexión a internet',
      color: 'text-blue-600',
      icon: '🌐'
    },
    {
      key: 'p3',
      titulo: 'Email Empresarial',
      valor: preguntas.p3.siPorcentaje,
      descripcion: 'Usan correo electrónico corporativo',
      color: 'text-green-600',
      icon: '📧'
    },
    {
      key: 'p9',
      titulo: 'Dispositivos Móviles',
      valor: preguntas.p9.siPorcentaje,
      descripcion: 'Utilizan móviles para negocio',
      color: 'text-purple-600',
      icon: '📱'
    },
    {
      key: 'p6',
      titulo: 'Sistemas ERP',
      valor: preguntas.p6.siPorcentaje,
      descripcion: 'Implementan sistemas de gestión',
      color: 'text-orange-600',
      icon: '💼'
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

export default KpiTIC