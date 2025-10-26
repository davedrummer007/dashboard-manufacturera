// app/dashboard/modulo-d/types/charts.ts
export interface InnovacionData {
  gestion: string
  p1_si: number
  p1_no: number
  p1_si_percent: number
  p1_no_percent: number
  p4_si: number
  p4_no: number
  p4_si_percent: number
  p4_no_percent: number
  p6_si: number
  p6_no: number
  p6_si_percent: number
  p6_no_percent: number
  total_registros: number
}

export interface PreguntaInnovacionData {
  si: number
  no: number
  siPorcentaje: number
  noPorcentaje: number
  total: number
}

export interface PreguntaChartData {
  labels: string[]
  series: number[]
  colors: string[]
  Porcentajes: number[]
}