'use client'

import React from 'react'
import { MacroVariableData } from '../types/charts'
import { formatCurrency, getTotalByGestion, getDepartamentoLiderByGestion, getMacroDataByGestion } from '../data/macroDataProcessor'

interface MacroKPIsProps {
  selectedGestion: string  // ← CAMBIADO: ahora recibe solo la gestión seleccionada
  darkMode: boolean
}

const MacroKPIs: React.FC<MacroKPIsProps> = ({ selectedGestion, darkMode }) => {
  // Obtener datos de la gestión seleccionada
  const currentData = getMacroDataByGestion(selectedGestion)
  const totalActual = getTotalByGestion(selectedGestion)
  const liderActual = getDepartamentoLiderByGestion(selectedGestion)

  // Calcular datos de gestiones anteriores para comparación
  const gestionAnterior = String(parseInt(selectedGestion) - 1)
  const totalAnterior = getTotalByGestion(gestionAnterior)
  
  // Calcular crecimiento si hay datos anteriores
  const crecimiento = totalAnterior > 0 ? ((totalActual - totalAnterior) / totalAnterior) * 100 : 0

  // Obtener el top 3 departamentos
  const topDepartamentos = [...currentData]
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* KPI 1: Total Gestión Actual */}
      <div className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(totalActual)}
          </div>
          <div className={`p-1 rounded ${
            darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
          }`}>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {selectedGestion}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Valor Bruto Total</div>
      </div>

      {/* KPI 2: Departamento Líder */}
      <div className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-bold text-green-600 dark:text-green-400 truncate">
            {liderActual ? liderActual.departamento : 'N/A'}
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Departamento Líder</div>
        <div className="text-xs text-gray-500 mt-1 truncate">
          {liderActual ? formatCurrency(liderActual.valor) : 'Sin datos'}
        </div>
      </div>

      {/* KPI 3: Cantidad de Departamentos */}
      <div className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
          {currentData.length}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Departamentos Activos</div>
        <div className="text-xs text-gray-500 mt-1">Con datos reportados</div>
      </div>

      {/* KPI 4: Top 3 Departamentos */}
      <div className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Top 3 Departamentos
        </div>
        <div className="space-y-2">
          {topDepartamentos.map((depto, index) => (
            <div key={depto.departamento} className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400 truncate flex-1">
                {index + 1}. {depto.departamento}
              </span>
              <span className="text-gray-500 dark:text-gray-300 ml-2">
                {formatCurrency(depto.valor)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MacroKPIs