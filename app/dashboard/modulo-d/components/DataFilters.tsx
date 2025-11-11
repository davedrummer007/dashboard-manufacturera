// app/dashboard/modulo-d/components/DataFilters.tsx
"use client";

import React from 'react'

interface DataFiltersProps {
  gestion: string
  onGestionChange: (gestion: string) => void
  darkMode: boolean
}

const DataFilters: React.FC<DataFiltersProps> = ({ gestion, onGestionChange, darkMode }) => {
  const gestiones = ['2022', '2023', '2024']

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            Innovación y Digitalización
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            Gestión seleccionada: <span className="font-semibold text-blue-600 dark:text-blue-400">{gestion}</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Filtrar por:
          </span>
          <select
            value={gestion}
            onChange={(e) => onGestionChange(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium whitespace-nowrap ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {gestiones.map((gestionOption) => (
              <option key={gestionOption} value={gestionOption}>
                Gestión {gestionOption}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default DataFilters