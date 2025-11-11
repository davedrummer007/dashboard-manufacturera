"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/providers/ThemeProvider'
import { CogIcon, DocumentCheckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import LoadingSpinner from '@/app/components/LoadingSpinner'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}


export default function ModuloB() {
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const capitulos = [
    { 
      id: 1, 
      nombre: 'SISTEMAS DE GESTIÓN CERTIFICADOS', 
      href: '/dashboard/modulo-b/capitulo-1',
      icon: DocumentCheckIcon,
      descripcion: 'Certificaciones ISO y sistemas de calidad implementados',
      color: 'blue',
      statusColor: 'bg-blue-500' // ← COLOR INDIVIDUAL PARA EL PUNTO
    },
    { 
      id: 2, 
      nombre: 'GESTIÓN AMBIENTAL', 
      href: '/dashboard/modulo-b/capitulo-2',
      icon: ShieldCheckIcon,
      descripcion: 'Licencias ambientales y cumplimiento normativo',
      color: 'emerald',
      statusColor: 'bg-emerald-500' // ← COLOR INDIVIDUAL PARA EL PUNTO
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { 
      bg: string, 
      text: string, 
      border: string,
      darkBg: string,
      darkText: string,
      hover: string,
      status: string // ← NUEVA PROPIEDAD PARA EL PUNTO
    } } = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        darkBg: 'dark:bg-blue-900/20',
        darkText: 'dark:text-blue-400',
        hover: 'hover:border-blue-300 dark:hover:border-blue-600',
        status: 'bg-blue-500' // ← AZUL PARA SISTEMAS CERTIFICADOS
      },
      emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        darkBg: 'dark:bg-emerald-900/20',
        darkText: 'dark:text-emerald-400',
        hover: 'hover:border-emerald-300 dark:hover:border-emerald-600',
        status: 'bg-emerald-500' // ← VERDE PARA GESTIÓN AMBIENTAL
      }
    }
    return colors[color] || colors.blue
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <LoadingSpinner />
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
          <CogIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Gestión Integrada
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Sistemas de gestión certificados y cumplimiento ambiental empresarial
        </p>
      </div>

      {/* Grid de Capítulos - Centrado para 2 elementos */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capitulos.map((capitulo) => {
            const colorClasses = getColorClasses(capitulo.color)
            const IconComponent = capitulo.icon
            
            return (
              <Link
                key={capitulo.id}
                href={capitulo.href}
                className={`
                  group relative p-8 rounded-2xl transition-all duration-300
                  ${theme === 'dark' 
                    ? 'bg-gray-800/80 hover:bg-gray-700/90 border border-gray-700' 
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }
                  ${colorClasses.hover}
                  hover:shadow-xl hover:scale-105
                  overflow-hidden
                `}
              >
                {/* Efecto de fondo sutil */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  colorClasses.text.includes('blue') 
                    ? (theme === 'dark' ? 'from-blue-900/20 to-cyan-900/20' : 'from-blue-50/50 to-cyan-50/50')
                    : (theme === 'dark' ? 'from-emerald-900/20 to-green-900/20' : 'from-emerald-50/50 to-green-50/50')
                }`} />
                
                <div className="relative z-10">
                  {/* Icono y número */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl ${
                      colorClasses.darkBg
                    }`}>
                      <IconComponent className={`h-6 w-6 ${colorClasses.text} ${colorClasses.darkText}`} />
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
                  <div className="space-y-4">
                    <h3 className={`text-xl font-semibold leading-tight ${
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
                    <div className="flex items-center justify-between pt-4">
                      <span className={`text-sm font-medium ${
                        colorClasses.darkText
                      }`}>
                        Ver análisis
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 ${
                        colorClasses.darkBg
                      }`}>
                        <svg className={`w-4 h-4 ${colorClasses.text} ${colorClasses.darkText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicador de estado - COLOR INDIVIDUAL */}
                <div className="absolute top-6 right-6">
                  <div className={`w-3 h-3 ${colorClasses.status} rounded-full ring-2 ring-white dark:ring-gray-800`}></div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Información adicional sutil */}
      <div className={`mt-12 text-center p-6 rounded-2xl max-w-2xl mx-auto ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          🛡️ <strong>Sistemas Certificados:</strong> Monitoreo de estándares de calidad y cumplimiento ambiental corporativo.
        </p>
      </div>
      {/* FOOTER INSTITUCIONAL MEJORADO */}
      <motion.div
        variants={itemVariants}
        className={`mt-12 p-6 rounded-2xl border-l-4 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-blue-500' 
            : 'bg-blue-50 border-blue-500'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Información Ministerial con enlaces */}
          <div className="space-y-2">
            <button 
              onClick={() => window.open('https://produccion.gob.bo/', '_blank')}
              className={`font-semibold text-left hover:text-blue-600 transition-colors ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              Ministerio de Desarrollo Productivo y Economía Plural
            </button>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Viceministerio de Políticas de Industrialización • Dirección General de Análisis Productiva Industrial
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Av. Mariscal Santa Cruz, Edificio Centro de Telecomunicaciones La Paz, piso 17 Of.: UAPEP - DGAPIEP Teléfono: +591 (2) 2184444
            </p>
          </div>

          {/* Logos institucionales */}
          <div className="mt-4 md:mt-0 flex space-x-4">
            {/* SEPREC */}
            <button 
              onClick={() => window.open('https://www.seprec.gob.bo/', '_blank')}
              className="flex flex-col items-center group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">SEP</span>
              </div>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">SEPREC</span>
            </button>

            {/* AEMP */}
            <button 
              onClick={() => window.open('https://www.autoridadempresas.gob.bo/', '_blank')}
              className="flex flex-col items-center group"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-xs font-bold text-green-700 dark:text-green-300">AE</span>
              </div>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">AEMP</span>
            </button>
          </div>
        </div>

        {/* Resolución */}
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Resolución Ministerial MDPyEP/DESPACHO/Nº 056/2023
          </p>
        </div>
      </motion.div>
    </div>
  )
}