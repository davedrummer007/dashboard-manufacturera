// app/dashboard/macro-variables/components/MacroKPIs.tsx
"use client";

import React from 'react'
import { getTotalByGestionAndType, getDepartamentoLiderByGestionAndType, formatMillions, formatCurrency } from '../data/macroDataProcessor'

interface MacroKPIsProps {
  selectedGestion: string
  activeTab: 'VBP' | 'CI'
  darkMode: boolean
}

export default function MacroKPIs({ selectedGestion, activeTab, darkMode }: MacroKPIsProps) {
  const total = getTotalByGestionAndType(selectedGestion, activeTab)
  const departamentoLider = getDepartamentoLiderByGestionAndType(selectedGestion, activeTab)

  const getTabConfig = () => {
    if (activeTab === 'VBP') {
      return {
        title: 'Valor Bruto Total',
        icon: '📊',
        color: 'blue',
        liderTitle: 'Departamento Líder en Producción'
      }
    } else {
      return {
        title: 'Consumo Intermedio Total',
        icon: '🔥',
        color: 'green',
        liderTitle: 'Departamento con Mayor Consumo'
      }
    }
  }

  const config = getTabConfig()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* KPI Total */}
      <div className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } border-l-4 ${
        config.color === 'blue' ? 'border-blue-500' : 'border-green-500'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              {config.icon} {config.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {formatMillions(total)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formatCurrency(total)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${
            config.color === 'blue' 
              ? darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
              : darkMode ? 'bg-green-900/30' : 'bg-green-100'
          }`}>
            <span className={`text-2xl ${
              config.color === 'blue' ? 'text-blue-600' : 'text-green-600'
            }`}>
              {config.icon}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Departamento Líder */}
      <div className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } border-l-4 ${
        config.color === 'blue' ? 'border-blue-500' : 'border-green-500'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              🏆 {config.liderTitle}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {departamentoLider ? departamentoLider.departamento : 'N/A'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {departamentoLider ? formatMillions(departamentoLider.valor) : 'Sin datos'}
            </p>
          </div>
          <div className={`p-3 rounded-full ${
            config.color === 'blue' 
              ? darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
              : darkMode ? 'bg-green-900/30' : 'bg-green-100'
          }`}>
            <span className={`text-2xl ${
              config.color === 'blue' ? 'text-blue-600' : 'text-green-600'
            }`}>
              🏆
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}