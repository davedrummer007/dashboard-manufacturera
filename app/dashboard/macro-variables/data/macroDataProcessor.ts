// app/dashboard/macro-variables/data/macroDataProcessor.ts

export interface MacroVariableData {
  departamento: string
  valor: number
  gestion: string
  tipo: 'VBP' | 'CI' // Nuevo campo para diferenciar entre Valor Bruto y Consumo Intermedio
}

// Datos de Valor Bruto de Producción (VBP) por departamento y gestión
export const vbpData: MacroVariableData[] = [
  // 2022 - VBP
  { departamento: "PANDO", valor: 659140197, gestion: "2022", tipo: "VBP" },
  { departamento: "POTOSI", valor: 736686103, gestion: "2022", tipo: "VBP" },
  { departamento: "BENI", valor: 775459056, gestion: "2022", tipo: "VBP" },
  { departamento: "ORURO", valor: 1667236970, gestion: "2022", tipo: "VBP" },
  { departamento: "CHUQUISACA", valor: 2113125927, gestion: "2022", tipo: "VBP" },
  { departamento: "TARIJA", valor: 2597787837, gestion: "2022", tipo: "VBP" },
  { departamento: "SANTA CRUZ", valor: 14481697866, gestion: "2022", tipo: "VBP" },
  { departamento: "COCHABAMBA", valor: 16226480741, gestion: "2022", tipo: "VBP" },
  { departamento: "LA PAZ", valor: 17719239423, gestion: "2022", tipo: "VBP" },
  
  // 2023 - VBP
  { departamento: "PANDO", valor: 409166469, gestion: "2023", tipo: "VBP" },
  { departamento: "BENI", valor: 1077471701, gestion: "2023", tipo: "VBP" },
  { departamento: "POTOSI", valor: 1432082641, gestion: "2023", tipo: "VBP" },
  { departamento: "ORURO", valor: 2454998813, gestion: "2023", tipo: "VBP" },
  { departamento: "CHUQUISACA", valor: 2850526399, gestion: "2023", tipo: "VBP" },
  { departamento: "TARIJA", valor: 2850526399, gestion: "2023", tipo: "VBP" },
  { departamento: "COCHABAMBA", valor: 16912214042, gestion: "2023", tipo: "VBP" },
  { departamento: "SANTA CRUZ", valor: 20649267790, gestion: "2023", tipo: "VBP" },
  { departamento: "LA PAZ", valor: 21317573022, gestion: "2023", tipo: "VBP" },
  
  // 2024 - VBP
  { departamento: "PANDO", valor: 396879855, gestion: "2024", tipo: "VBP" },
  { departamento: "POTOSI", valor: 760686390, gestion: "2024", tipo: "VBP" },
  { departamento: "BENI", valor: 892979675, gestion: "2024", tipo: "VBP" },
  { departamento: "ORURO", valor: 1819032671, gestion: "2024", tipo: "VBP" },
  { departamento: "CHUQUISACA", valor: 1918252635, gestion: "2024", tipo: "VBP" },
  { departamento: "TARIJA", valor: 2116692562, gestion: "2024", tipo: "VBP" },
  { departamento: "COCHABAMBA", valor: 11939468984, gestion: "2024", tipo: "VBP" },
  { departamento: "LA PAZ", valor: 15180654470, gestion: "2024", tipo: "VBP" },
  { departamento: "SANTA CRUZ", valor: 16106707466, gestion: "2024", tipo: "VBP" }
]

// Datos de Consumo Intermedio (CI) por departamento y gestión - DEL CSV QUE COMPARTISTE
export const ciData: MacroVariableData[] = [
  // 2022 - CI
  { departamento: "PANDO", valor: 659140197, gestion: "2022", tipo: "CI" },
  { departamento: "POTOSI", valor: 736686103, gestion: "2022", tipo: "CI" },
  { departamento: "BENI", valor: 775459056, gestion: "2022", tipo: "CI" },
  { departamento: "ORURO", valor: 1667236970, gestion: "2022", tipo: "CI" },
  { departamento: "CHUQUISACA", valor: 2113125927, gestion: "2022", tipo: "CI" },
  { departamento: "TARIJA", valor: 2597787837, gestion: "2022", tipo: "CI" },
  { departamento: "SANTA CRUZ", valor: 14481697866, gestion: "2022", tipo: "CI" },
  { departamento: "COCHABAMBA", valor: 16226480741, gestion: "2022", tipo: "CI" },
  { departamento: "LA PAZ", valor: 17719239423, gestion: "2022", tipo: "CI" },
  
  // 2023 - CI
  { departamento: "PANDO", valor: 409166469, gestion: "2023", tipo: "CI" },
  { departamento: "BENI", valor: 1077471701, gestion: "2023", tipo: "CI" },
  { departamento: "POTOSI", valor: 1432082641, gestion: "2023", tipo: "CI" },
  { departamento: "ORURO", valor: 2454998813, gestion: "2023", tipo: "CI" },
  { departamento: "CHUQUISACA", valor: 2850526399, gestion: "2023", tipo: "CI" },
  { departamento: "TARIJA", valor: 2850526399, gestion: "2023", tipo: "CI" },
  { departamento: "COCHABAMBA", valor: 16912214042, gestion: "2023", tipo: "CI" },
  { departamento: "SANTA CRUZ", valor: 20649267790, gestion: "2023", tipo: "CI" },
  { departamento: "LA PAZ", valor: 21317573022, gestion: "2023", tipo: "CI" },
  
  // 2024 - CI
  { departamento: "PANDO", valor: 396879855, gestion: "2024", tipo: "CI" },
  { departamento: "POTOSI", valor: 760686390, gestion: "2024", tipo: "CI" },
  { departamento: "BENI", valor: 892979675, gestion: "2024", tipo: "CI" },
  { departamento: "ORURO", valor: 1819032671, gestion: "2024", tipo: "CI" },
  { departamento: "CHUQUISACA", valor: 1918252635, gestion: "2024", tipo: "CI" },
  { departamento: "TARIJA", valor: 2116692562, gestion: "2024", tipo: "CI" },
  { departamento: "COCHABAMBA", valor: 11939468984, gestion: "2024", tipo: "CI" },
  { departamento: "LA PAZ", valor: 15180654470, gestion: "2024", tipo: "CI" },
  { departamento: "SANTA CRUZ", valor: 16106707466, gestion: "2024", tipo: "CI" }
]

// Combinar todos los datos
export const macroVariablesData: MacroVariableData[] = [...vbpData, ...ciData]

// Función para obtener datos por gestión y tipo
export const getMacroDataByGestionAndType = (gestion: string, tipo: 'VBP' | 'CI'): MacroVariableData[] => {
  return macroVariablesData.filter(item => item.gestion === gestion && item.tipo === tipo)
}

// Función para obtener datos por gestión (mantener compatibilidad)
export const getMacroDataByGestion = (gestion: string): MacroVariableData[] => {
  return macroVariablesData.filter(item => item.gestion === gestion && item.tipo === 'VBP')
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

// Calcular totales por gestión y tipo
export const getTotalByGestionAndType = (gestion: string, tipo: 'VBP' | 'CI'): number => {
  const data = getMacroDataByGestionAndType(gestion, tipo)
  return data.reduce((sum, item) => sum + item.valor, 0)
}

// Calcular totales por gestión (mantener compatibilidad)
export const getTotalByGestion = (gestion: string): number => {
  return getTotalByGestionAndType(gestion, 'VBP')
}

// Obtener departamento líder por gestión y tipo
export const getDepartamentoLiderByGestionAndType = (gestion: string, tipo: 'VBP' | 'CI'): MacroVariableData | null => {
  const data = getMacroDataByGestionAndType(gestion, tipo)
  if (!data || data.length === 0) return null
  
  return data.reduce((max, current) => 
    current.valor > max.valor ? current : max
  )
}

// Obtener departamento líder por gestión (mantener compatibilidad)
export const getDepartamentoLiderByGestion = (gestion: string): MacroVariableData | null => {
  return getDepartamentoLiderByGestionAndType(gestion, 'VBP')
}