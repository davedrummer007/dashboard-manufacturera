'use client'

import Link from 'next/link'
import { useTheme } from '@/app/providers/ThemeProvider'
import { BanknotesIcon, ChartBarIcon, DocumentChartBarIcon, CubeIcon, UserGroupIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'

export default function ModuloA() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('useEffect ejecutado - isClient a true')
    setIsClient(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const capitulos = [
    { 
      id: 1, 
      nombre: 'INGRESOS', 
      href: '/dashboard/modulo-a/capitulo-1',
      icon: ChartBarIcon,
      descripcion: 'Análisis de ingresos y ventas'
    },
    { 
      id: 2, 
      nombre: 'INVENTARIOS', 
      href: '/dashboard/modulo-a/capitulo-2',
      icon: CubeIcon,
      descripcion: 'Gestión de stock y existencias'
    },
    { 
      id: 3, 
      nombre: 'PERSONAL OCUPADO', 
      href: '/dashboard/modulo-a/capitulo-3',
      icon: UserGroupIcon,
      descripcion: 'Sueldos, salarios y nómina'
    },
    { 
      id: 4, 
      nombre: 'ACTIVOS FIJOS', 
      href: '/dashboard/modulo-a/capitulo-4',
      icon: BuildingLibraryIcon,
      descripcion: 'Grandes empresas'
    },
    { 
      id: 5, 
      nombre: 'ACTIVOS FIJOS', 
      href: '/dashboard/modulo-a/capitulo-5',
      icon: BuildingLibraryIcon,
      descripcion: 'Micro, pequeñas y medianas empresas'
    },
  ]

  if (isLoading) {
    return (
      <div className="w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="text-center text-gray-500">Cargando módulo...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Encabezado elegante */}
      <div className="mb-12 text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 ${
          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
        }`}>
          <BanknotesIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Información Financiera
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Seleccione un capítulo para acceder a los reportes detallados y análisis estadísticos
        </p>
      </div>

      {/* Grid de Capítulos - Diseño elegante */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capitulos.map((capitulo) => (
            <Link
              key={capitulo.id}
              href={capitulo.href}
              className={`
                group relative p-6 rounded-2xl transition-all duration-300
                ${theme === 'dark' 
                  ? 'bg-gray-800/80 hover:bg-gray-700/90 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
                }
                hover:shadow-xl hover:scale-105
                overflow-hidden
              `}
            >
              {/* Efecto de fondo sutil */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === 'dark' 
                  ? 'from-blue-900/20 to-purple-900/20' 
                  : 'from-blue-50/50 to-purple-50/50'
              }`} />
              
              <div className="relative z-10">
                {/* Icono y número */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-blue-900/40' : 'bg-blue-100'
                  }`}>
                    <capitulo.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    Cap. {capitulo.id}
                  </span>
                </div>

                {/* Contenido */}
                <div className="space-y-3">
                  <h3 className={`text-lg font-semibold leading-tight ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {capitulo.nombre}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {capitulo.descripcion}
                  </p>

                  {/* Indicador de acción */}
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Ver análisis
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 ${
                      theme === 'dark' ? 'bg-blue-900/40' : 'bg-blue-100'
                    }`}>
                      <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Información adicional sutil */}
      <div className={`mt-12 text-center p-6 rounded-2xl max-w-4xl mx-auto ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          💡 <strong>Tip:</strong> Cada capítulo contiene gráficos interactivos, filtros avanzados y opciones de exportación para un análisis detallado.
        </p>
      </div>
    </div>
  )
}