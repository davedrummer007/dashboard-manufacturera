export interface ChartData {
  labels: string[]
  datasets: {
    label?: string
    data: number[]
    backgroundColor: string[]
    borderColor?: string[]
    borderWidth?: number
  }[]
}

// Interfaces existentes del Capítulo 2
export interface DepartamentoPatrimonioData {
  departamento: string
  patrimonio: number
  gestion: string
}

export interface PatrimonioPorcentajeData {
  tipoSocietario: string
  patrimonio: number
  porcentaje: number
  gestion: string
}

export interface InventarioInicialFinalData {
  tipoSocietario: string
  invInicial: number
  invFinal: number
  invInicialPorc: number
  invFinalPorc: number
  gestion: string
}

// NUEVAS INTERFACES PARA CAPÍTULO 3 - PERSONAL OCUPADO
export interface PersonalOcupadoData {
  departamento: string
  total: number
  gestion: string
}

export interface PersonalPorcentajeData {
  tipoSocietario: string
  total: number
  permanente: number
  eventual: number
  apoyo: number
  gestion: string
}

export interface SueldosSalariosData {
  departamento: string
  personal: number
  total: number
  gestion: string
}

export interface SueldosPorcentajeData {
  tipoSocietario: string
  sueldos: number
  porcentaje: number
  gestion: string
}