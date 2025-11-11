// app/dashboard/modulo-g/components/NoDataMessage.tsx
"use client";

import React from 'react'

interface NoDataMessageProps {
  titulo: string
  gestion: string
  darkMode: boolean
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({
  titulo,
  gestion,
  darkMode
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
        {/* Ícono grande */}
        <div className="text-7xl text-amber-500 dark:text-amber-400">
          📊
        </div>
        
        {/* Título principal */}
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-amber-700 dark:text-amber-300 tracking-wide">
            INFORMACIÓN NO REGISTRADA
          </h3>
          
          {/* Descripción */}
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
            Las <span className="font-semibold text-amber-600 dark:text-amber-400">Unidades Económicas</span> no reportaron datos
          </p>
          
          {/* Detalles de gestión */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-700">
            <p className="text-lg font-bold text-amber-800 dark:text-amber-300">
              Gestión {gestion}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              {titulo}
            </p>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 max-w-md">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <span className="font-bold">💡 Información:</span> Datos disponibles en futuras actualizaciones
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoDataMessage