"use client";
// app/components/KPIBox.tsx
interface KPIBoxProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'stable' | undefined;
  description?: string;
  icon?: string | React.ReactNode;
  darkMode?: boolean;
  small?: boolean; // ✅ Ya está
}

export default function KPIBox({
  title,
  value,
  trend,
  description,
  icon,
  darkMode = false,
  small = false
}: KPIBoxProps) {
  return (
    <div className={`${small ? 'p-3' : 'p-4'} rounded-lg shadow border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <h3 className={`
          ${small ? 'text-xs' : 'text-sm'} font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }
        `}>
          {title}
        </h3>
        {typeof icon === 'string' ? (
          <span className="text-lg">{icon}</span>
        ) : (
          icon
        )}
      </div>
      <p className={`
        ${small ? 'text-xl' : 'text-2xl'} font-bold mt-1 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }
      `}>
        {value}
      </p>
      {(trend || description) && (
        <div className="flex items-center mt-1">
          {trend && (
            <span className={`
              text-xs ${
                trend === 'up' 
                  ? (darkMode ? 'text-green-400' : 'text-green-600')
                  : trend === 'down'
                  ? (darkMode ? 'text-red-400' : 'text-red-600')
                  : (darkMode ? 'text-yellow-400' : 'text-yellow-600') // ✅ Para 'stable'
              }
            `}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {/* ✅ Icono para stable */}
            </span>
          )}
          {description && (
            <span className={`
              text-xs ml-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }
            `}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
