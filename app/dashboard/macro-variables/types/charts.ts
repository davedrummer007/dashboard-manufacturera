// app/dashboard/macro-variables/types/charts.ts

export interface MacroVariableData {
  departamento: string
  valor: number
  gestion: string
  tipo: 'VBP' | 'CI'
}

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

export interface KPIData {
  total: number
  departamentoLider: string
  valorLider: number
  crecimiento?: number
}