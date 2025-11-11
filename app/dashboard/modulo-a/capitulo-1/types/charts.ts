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

export interface CSVRow {
  [key: string]: string
}

export interface DepartamentoData {
  departamento: string
  total: number
  gestion: string
}

// INTERFAZ CORREGIDA - Eliminamos propiedades que no usamos
export interface TipoSocietarioData {
  unipersonal: number
  sociedadLimitada: number
  sociedadAnonima: number
  otrasSociedades: number
}

export interface ActividadEconomicaData {
  gestion: string
  actividadEconomica: string
  totalIngresos: number
}