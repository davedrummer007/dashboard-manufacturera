'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '../providers/ThemeProvider'
import ThemeToggle from './ThemeToggle'
import { 
  HomeIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  BuildingStorefrontIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface SidebarProps {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

export default function Sidebar({ expanded, setExpanded }: SidebarProps) {
  const pathname = usePathname()
  const { theme } = useTheme()

  const menuItems = [
    { 
      name: 'Inicio', 
      subtitle: '',
      href: '/', 
      icon: HomeIcon 
    },
    { 
      name: 'Información Financiera', 
      href: '/dashboard/modulo-a', 
      icon: BanknotesIcon 
    },
    { 
      name: 'Gestión Integrada', 
      href: '/dashboard/modulo-b', 
      icon: Cog6ToothIcon 
    },
    { 
      name: 'Tecnologías de Información (TIC)', 
      href: '/dashboard/modulo-c', 
      icon: ComputerDesktopIcon 
    },
    { 
      name: 'Innovación y Digitalización', 
      href: '/dashboard/modulo-d', 
      icon: LightBulbIcon 
    },
    { 
      name: 'Infraestructura y Servicios', 
      href: '/dashboard/modulo-g', 
      icon: BuildingStorefrontIcon 
    },
    { 
      name: 'Macro Variables', 
      subtitle: 'Valor Bruto de Producción',
      href: '/dashboard/macro-variables', 
      icon: ChartBarIcon 
    }
  ]

  return (
    <div className={`
      flex flex-col 
      bg-[#0F172A] text-gray-100 border-r border-[#1E293B]
      ${expanded ? 'w-64' : 'w-20'} 
      h-screen
      transition-all duration-200
      fixed left-0 top-0
    `}>
      {/* Cabecera */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {expanded && (
          <h1 className="text-xl font-bold text-white truncate justify-center">
            MENÚ
          </h1>
        )}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white"
        >
          {expanded ? '◀' : '▶'}
        </button>
      </div>

      {/* Menú */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center p-3 mx-2 my-1 rounded-lg transition-colors
              ${pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-[#1E40AF] text-white shadow-lg'
                : 'hover:bg-[#1E293B] text-gray-300 hover:text-white'
              }`}
          >
            <item.icon className={`h-5 w-5 flex-shrink-0 ${
              pathname === item.href || pathname.startsWith(item.href + '/') 
                ? 'text-blue-300' 
                : 'text-gray-400'
            }`} />
            {expanded && (
              <div className="ml-3 flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {item.name}
                </div>
                {item.subtitle && (
                  <div className="text-xs text-gray-400 truncate mt-0.5">
                    {item.subtitle}
                  </div>
                )}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* Botón de Tema */}
      <div className="p-4 border-t border-gray-800">
        <ThemeToggle expanded={expanded} />
      </div>
    </div>
  )
}