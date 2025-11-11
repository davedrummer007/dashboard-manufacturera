"use client";

import { useTheme } from '../providers/ThemeProvider'
import MoonIcon from '@heroicons/react/24/solid/MoonIcon'
import SunIcon from '@heroicons/react/24/solid/SunIcon'

interface ThemeToggleProps {
  expanded: boolean
}

export default function ThemeToggle({ expanded }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center w-full p-2 rounded-lg transition-colors bg-gray-800 hover:bg-gray-700 text-white ${
        expanded ? 'px-4' : 'px-2'
      }`}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-white-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-blue-300" />
      )}
      {expanded && (
        <span className="ml-2 text-sm">
          {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
        </span>
      )}
    </button>
  )
}