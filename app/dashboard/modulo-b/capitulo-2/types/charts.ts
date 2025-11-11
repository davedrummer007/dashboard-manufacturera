// app/dashboard/modulo-b/capitulo-2/types/charts.ts

export interface GestionAmbientalData {
  gestion: string
  preg_1_si: number
  preg_1_no: number
  preg_1_si_porcentaje: number
  preg_8_si: number
  preg_8_no: number
  preg_8_si_porcentaje: number
  total_registros: number
}

export interface PreguntaAmbientalData {
  si: number
  no: number
  siPorcentaje: number
  total: number
}

export interface PreguntaChartData {
  labels: string[]
  series: number[]
  colors: string[]
  Porcentajes: number[]
}