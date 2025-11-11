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