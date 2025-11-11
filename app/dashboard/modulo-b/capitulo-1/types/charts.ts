// app/dashboard/modulo-b/types/charts.ts

export interface SistemaGestionData {
  gestion: string
  preg_1_si: number
  preg_1_no: number
  preg_1_sin_respuesta: number
  preg_4_si: number
  preg_4_no: number
  preg_4_sin_respuesta: number
  preg_6_si: number
  preg_6_no: number
  preg_6_sin_respuesta: number
  preg_7_si: number
  preg_7_no: number
  preg_7_sin_respuesta: number
  total_registros: number
}

export interface PreguntaData {
  si: number
  no: number
  sinRespuesta: number
  total: number
  Porcentajesi: number
  porcentajeNo: number
  PorcentajesinRespuesta: number
}

export interface PreguntaChartData {
  labels: string[]
  series: number[]
  colors: string[]
}