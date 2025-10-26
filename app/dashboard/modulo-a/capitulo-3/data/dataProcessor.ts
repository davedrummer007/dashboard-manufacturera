import { 
  PersonalOcupadoData,
  PersonalPorcentajeData,
  SueldosSalariosData,
  SueldosPorcentajeData
} from '../types/charts'

// Datos de PERSONAL OCUPADO - EN NUMERO DE PERSONAS.csv
export const personalOcupadoData: PersonalOcupadoData[] = [
  // 2022
  { departamento: "SANTA CRUZ", total: 49364, gestion: "2022" },
  { departamento: "LA PAZ", total: 45330, gestion: "2022" },
  { departamento: "COCHABAMBA", total: 15699, gestion: "2022" },
  { departamento: "TARIJA", total: 2714, gestion: "2022" },
  { departamento: "CHUQUISACA", total: 2512, gestion: "2022" },
  { departamento: "BENI", total: 1736, gestion: "2022" },
  { departamento: "ORURO", total: 1273, gestion: "2022" },
  { departamento: "POTOSI", total: 714, gestion: "2022" },
  { departamento: "PANDO", total: 646, gestion: "2022" },
  
  // 2023
  { departamento: "SANTA CRUZ", total: 76454, gestion: "2023" },
  { departamento: "LA PAZ", total: 49996, gestion: "2023" },
  { departamento: "COCHABAMBA", total: 22992, gestion: "2023" },
  { departamento: "BENI", total: 5894, gestion: "2023" },
  { departamento: "TARIJA", total: 4290, gestion: "2023" },
  { departamento: "ORURO", total: 3969, gestion: "2023" },
  { departamento: "CHUQUISACA", total: 3454, gestion: "2023" },
  { departamento: "POTOSI", total: 1650, gestion: "2023" },
  { departamento: "PANDO", total: 887, gestion: "2023" },
  
  // 2024
  { departamento: "SANTA CRUZ", total: 49201, gestion: "2024" },
  { departamento: "LA PAZ", total: 27782, gestion: "2024" },
  { departamento: "COCHABAMBA", total: 17425, gestion: "2024" },
  { departamento: "BENI", total: 4070, gestion: "2024" },
  { departamento: "TARIJA", total: 3118, gestion: "2024" },
  { departamento: "ORURO", total: 1863, gestion: "2024" },
  { departamento: "CHUQUISACA", total: 1591, gestion: "2024" },
  { departamento: "POTOSI", total: 1170, gestion: "2024" },
  { departamento: "PANDO", total: 723, gestion: "2024" }
]

// Datos de PERSONAL OCUPADO - POR Porcentajes.csv (PROMEDIOS GENERALES)
export const personalPorcentajeData: PersonalPorcentajeData[] = [
  // 2022 - Promedios generales de la fila TOTALES
  { tipoSocietario: "PROMEDIOS", total: 119988, permanente: 92.17, eventual: 2.98, apoyo: 4.86, gestion: "2022" },
  
  // 2023 - Promedios generales de la fila TOTALES
  { tipoSocietario: "PROMEDIOS", total: 169586, permanente: 89.68, eventual: 3.94, apoyo: 6.37, gestion: "2023" },
  
  // 2024 - Promedios generales de la fila TOTALES
  { tipoSocietario: "PROMEDIOS", total: 106943, permanente: 90.74, eventual: 4.53, apoyo: 4.74, gestion: "2024" }
]

// Datos de PERSONAL OCUPADO - SUELDOS Y SALARIOS.csv
export const sueldosSalariosData: SueldosSalariosData[] = [
  // 2022
  { departamento: "SANTA CRUZ", personal: 48387, total: 1000938099, gestion: "2022" },
  { departamento: "LA PAZ", personal: 42200, total: 848503383, gestion: "2022" },
  { departamento: "COCHABAMBA", personal: 14545, total: 76757191, gestion: "2022" },
  { departamento: "TARIJA", personal: 2550, total: 14050277, gestion: "2022" },
  { departamento: "CHUQUISACA", personal: 2346, total: 100010441, gestion: "2022" },
  { departamento: "BENI", personal: 1668, total: 4797281, gestion: "2022" },
  { departamento: "ORURO", personal: 1182, total: 5422722, gestion: "2022" },
  { departamento: "POTOSI", personal: 672, total: 5679381, gestion: "2022" },
  { departamento: "PANDO", personal: 611, total: 1869818, gestion: "2022" },
  
  // 2023
  { departamento: "SANTA CRUZ", personal: 72225, total: 849213015, gestion: "2023" },
  { departamento: "LA PAZ", personal: 47563, total: 601795554, gestion: "2023" },
  { departamento: "COCHABAMBA", personal: 21077, total: 137824525, gestion: "2023" },
  { departamento: "BENI", personal: 5762, total: 16760515, gestion: "2023" },
  { departamento: "TARIJA", personal: 3937, total: 27903519, gestion: "2023" },
  { departamento: "CHUQUISACA", personal: 3133, total: 126531255, gestion: "2023" },
  { departamento: "ORURO", personal: 2724, total: 9425468, gestion: "2023" },
  { departamento: "POTOSI", personal: 1514, total: 6458895, gestion: "2023" },
  { departamento: "PANDO", personal: 844, total: 1747605, gestion: "2023" },
  
  // 2024
  { departamento: "SANTA CRUZ", personal: 47487, total: 468814382, gestion: "2024" },
  { departamento: "LA PAZ", personal: 26241, total: 533119987, gestion: "2024" },
  { departamento: "COCHABAMBA", personal: 16332, total: 116498725, gestion: "2024" },
  { departamento: "BENI", personal: 3971, total: 7905846, gestion: "2024" },
  { departamento: "TARIJA", personal: 2923, total: 28389957, gestion: "2024" },
  { departamento: "ORURO", personal: 1692, total: 7957772, gestion: "2024" },
  { departamento: "CHUQUISACA", personal: 1444, total: 8989021, gestion: "2024" },
  { departamento: "POTOSI", personal: 1098, total: 5741401, gestion: "2024" },
  { departamento: "PANDO", personal: 691, total: 3400311, gestion: "2024" }
]

// Datos de PERSONAL OCUPADO - SUELDOS Y SALARIOS TIPO SOCIETARIO POR PORCENTAJE.csv
export const sueldosPorcentajeData: SueldosPorcentajeData[] = [
  // 2022
  { tipoSocietario: "SOCIEDAD ANONIMA", sueldos: 84.17, porcentaje: 84.17, gestion: "2022" },
  { tipoSocietario: "SOCIEDAD DE RESPONSABILIDAD LIMITADA", sueldos: 14.14, porcentaje: 14.14, gestion: "2022" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", sueldos: 1.33, porcentaje: 1.33, gestion: "2022" },
  { tipoSocietario: "OTROS (AS)", sueldos: 0.36, porcentaje: 0.36, gestion: "2022" },
  
  // 2023
  { tipoSocietario: "SOCIEDAD ANONIMA", sueldos: 74.61, porcentaje: 74.61, gestion: "2023" },
  { tipoSocietario: "SOCIEDAD DE RESPONSABILIDAD LIMITADA", sueldos: 22.53, porcentaje: 22.53, gestion: "2023" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", sueldos: 2.36, porcentaje: 2.36, gestion: "2023" },
  { tipoSocietario: "OTROS (AS)", sueldos: 0.50, porcentaje: 0.50, gestion: "2023" },
  
  // 2024
  { tipoSocietario: "SOCIEDAD ANONIMA", sueldos: 75.99, porcentaje: 75.99, gestion: "2024" },
  { tipoSocietario: "SOCIEDAD DE RESPONSABILIDAD LIMITADA", sueldos: 21.48, porcentaje: 21.48, gestion: "2024" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", sueldos: 1.97, porcentaje: 1.97, gestion: "2024" },
  { tipoSocietario: "OTROS (AS)", sueldos: 0.56, porcentaje: 0.56, gestion: "2024" }
]

// Función para formatear números con separadores de miles
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num)
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

// Función para obtener datos filtrados por gestión
export const getDataByGestion = (gestion: string) => {
  const personalOcupado = personalOcupadoData.filter(item => item.gestion === gestion)
  const personalPorcentaje = personalPorcentajeData.filter(item => item.gestion === gestion)
  const sueldosSalarios = sueldosSalariosData.filter(item => item.gestion === gestion)
  const sueldosPorcentaje = sueldosPorcentajeData.filter(item => item.gestion === gestion)
  
  return { personalOcupado, personalPorcentaje, sueldosSalarios, sueldosPorcentaje }
}