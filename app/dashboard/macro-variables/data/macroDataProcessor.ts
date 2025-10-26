// Datos procesados del CSV "MACRO VARIABLES.csv"

export interface MacroVariableData {
  departamento: string
  valor: number
  gestion: string
}

// Datos de Valor Bruto de Producción por departamento y gestión
export const macroVariablesData: MacroVariableData[] = [
  // 2022
  { departamento: "PANDO", valor: 659140197, gestion: "2022" },
  { departamento: "POTOSI", valor: 736686103, gestion: "2022" },
  { departamento: "BENI", valor: 775459056, gestion: "2022" },
  { departamento: "ORURO", valor: 1667236970, gestion: "2022" },
  { departamento: "CHUQUISACA", valor: 2113125927, gestion: "2022" },
  { departamento: "TARIJA", valor: 2597787837, gestion: "2022" },
  { departamento: "SANTA CRUZ", valor: 14481697866, gestion: "2022" },
  { departamento: "COCHABAMBA", valor: 16226480741, gestion: "2022" },
  { departamento: "LA PAZ", valor: 17719239423, gestion: "2022" },
  
  // 2023
  { departamento: "PANDO", valor: 409166469, gestion: "2023" },
  { departamento: "BENI", valor: 1077471701, gestion: "2023" },
  { departamento: "POTOSI", valor: 1432082641, gestion: "2023" },
  { departamento: "ORURO", valor: 2454998813, gestion: "2023" },
  { departamento: "CHUQUISACA", valor: 2850526399, gestion: "2023" },
  { departamento: "TARIJA", valor: 2850526399, gestion: "2023" },
  { departamento: "COCHABAMBA", valor: 16912214042, gestion: "2023" },
  { departamento: "SANTA CRUZ", valor: 20649267790, gestion: "2023" },
  { departamento: "LA PAZ", valor: 21317573022, gestion: "2023" },
  
  // 2024
  { departamento: "PANDO", valor: 396879855, gestion: "2024" },
  { departamento: "POTOSI", valor: 760686390, gestion: "2024" },
  { departamento: "BENI", valor: 892979675, gestion: "2024" },
  { departamento: "ORURO", valor: 1819032671, gestion: "2024" },
  { departamento: "CHUQUISACA", valor: 1918252635, gestion: "2024" },
  { departamento: "TARIJA", valor: 2116692562, gestion: "2024" },
  { departamento: "COCHABAMBA", valor: 11939468984, gestion: "2024" },
  { departamento: "LA PAZ", valor: 15180654470, gestion: "2024" },
  { departamento: "SANTA CRUZ", valor: 16106707466, gestion: "2024" }
]

// Función para obtener datos por gestión
export const getMacroDataByGestion = (gestion: string): MacroVariableData[] => {
  return macroVariablesData.filter(item => item.gestion === gestion)
}

// Función para formatear números en millones
export const formatMillions = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  }
  return num.toString()
}

// Función para formatear moneda
export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'BOB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num)
}

// Calcular totales por gestión
export const getTotalByGestion = (gestion: string): number => {
  const data = getMacroDataByGestion(gestion)
  return data.reduce((sum, item) => sum + item.valor, 0)
}

// Agregar esta función al macroDataProcessor.ts
export const getDepartamentoLiderByGestion = (gestion: string): MacroVariableData | null => {
  const data = getMacroDataByGestion(gestion)
  if (!data || data.length === 0) return null
  
  return data.reduce((max, current) => 
    current.valor > max.valor ? current : max
  )
}