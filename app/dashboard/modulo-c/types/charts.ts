// app/dashboard/modulo-c/types/charts.ts

export interface TICData {
  gestion: string
  p1_si: number
  p1_no: number
  p1_si_percent: number
  p1_no_percent: number
  p2_si: number
  p2_no: number
  p2_si_percent: number
  p2_no_percent: number
  p3_si: number
  p3_no: number
  p3_si_percent: number
  p3_no_percent: number
  p4_si: number
  p4_no: number
  p4_si_percent: number
  p4_no_percent: number
  p5_si: number
  p5_no: number
  p5_si_percent: number
  p5_no_percent: number
  p6_si: number
  p6_no: number
  p6_si_percent: number
  p6_no_percent: number
  p7_si: number
  p7_no: number
  p7_si_percent: number
  p7_no_percent: number
  p8_si: number
  p8_no: number
  p8_si_percent: number
  p8_no_percent: number
  p9_si: number
  p9_no: number
  p9_si_percent: number
  p9_no_percent: number
  p10_si: number
  p10_no: number
  p10_si_percent: number
  p10_no_percent: number
  p11_si: number
  p11_no: number
  p11_si_percent: number
  p11_no_percent: number
  total_registros: number
}

export interface PreguntaTICData {
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