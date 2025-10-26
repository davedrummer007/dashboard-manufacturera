// app/dashboard/modulo-g/types/charts.ts
export interface InfraestructuraData {
  gestion: string
  p1_si: number
  p1_no: number
  p1_si_percent: number
  p1_no_percent: number
  p4_param_101: number
  p4_param_102: number
  p4_param_103: number
  p4_sin_respuesta: number
  p5_param_104: number
  p5_param_105: number
  p5_param_106: number
  p5_sin_respuesta: number
  p6_param_107: number
  p6_param_108: number
  p6_param_109: number
  p6_param_110: number
  p6_sin_respuesta: number
  total_registros: number
}

export interface PreguntaBinariaData {
  si: number
  no: number
  siPorcentaje: number
  noPorcentaje: number
  total: number
}

export interface PreguntaMultipleData {
  labels: string[]
  series: number[]
  colors: string[]
  Porcentajes: number[]
  total: number
}

export interface PreguntaChartData {
  labels: string[]
  series: number[]
  colors: string[]
  Porcentajes: number[]
}

export interface StackedBarData {
  labels: string[]
  series: { name: string; data: number[] }[]
  colors: string[]
  total: number
}