"use client";

import { useState } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'

interface DataFiltersProps {
  selectedGestion: string
  onGestionChange: (gestion: string) => void
}

export default function DataFilters({ selectedGestion, onGestionChange }: DataFiltersProps) {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const gestiones = ['2022', '2023', '2024']

  return (
    <div className={`p-6 rounded-2xl shadow-lg mb-8 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        {/* Título */}
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
          }`}>
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Filtros de Visualización
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selecciona la gestión a visualizar
            </p>
          </div>
        </div>

        {/* Selector de Gestión */}
        <div className="relative">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Gestión:
            </span>
            <div className="relative">
              <select
                value={selectedGestion}
                onChange={(e) => onGestionChange(e.target.value)}
                className={`
                  appearance-none px-4 py-2 pr-8 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  cursor-pointer
                `}
              >
                {gestiones.map((gestion) => (
                  <option key={gestion} value={gestion}>
                    {gestion}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de gestión activa */}
      <div className={`mt-4 p-3 rounded-lg text-center ${
        theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
      }`}>
        <span className={`text-sm font-medium ${
          theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
        }`}>
          📊 Visualizando datos de la gestión: <strong>{selectedGestion}</strong>
        </span>
      </div>
    </div>
  )
}