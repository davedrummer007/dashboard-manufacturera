// app/dashboard/modulo-d/data/dataProcessor.ts
import { InnovacionData, PreguntaInnovacionData, PreguntaChartData } from '../types/charts'

// Datos de INNOVACIÓN Y DIGITALIZACIÓN.csv
export const innovacionData: InnovacionData[] = [
  {
    gestion: "2022",
    p1_si: 443, p1_no: 3578, p1_si_percent: 11.02, p1_no_percent: 88.98,
    p4_si: 169, p4_no: 272, p4_si_percent: 4.2, p4_no_percent: 6.76,
    p6_si: 46, p6_no: 401, p6_si_percent: 1.14, p6_no_percent: 9.97,
    total_registros: 4021
  },
  {
    gestion: "2023",
    p1_si: 849, p1_no: 7023, p1_si_percent: 10.79, p1_no_percent: 89.21,
    p4_si: 310, p4_no: 534, p4_si_percent: 3.94, p4_no_percent: 6.78,
    p6_si: 95, p6_no: 764, p6_si_percent: 1.21, p6_no_percent: 9.71,
    total_registros: 7872
  },
  {
    gestion: "2024",
    p1_si: 496, p1_no: 4533, p1_si_percent: 9.86, p1_no_percent: 90.14,
    p4_si: 188, p4_no: 308, p4_si_percent: 3.74, p4_no_percent: 6.12,
    p6_si: 49, p6_no: 451, p6_si_percent: 0.97, p6_no_percent: 8.97,
    total_registros: 5029
  }
]

// Función para obtener datos por gestión
export const getInnovacionByGestion = (gestion: string): InnovacionData | undefined => {
  return innovacionData.find(item => item.gestion === gestion)
}

// Función para obtener datos de una pregunta específica
export const getPreguntaInnovacionData = (gestion: string, pregunta: string): PreguntaInnovacionData => {
  const data = getInnovacionByGestion(gestion)
  if (!data) {
    return { si: 0, no: 0, siPorcentaje: 0, noPorcentaje: 0, total: 0 }
  }

  let si, no, siPorcentaje, noPorcentaje

  switch (pregunta) {
    case 'p1': si = data.p1_si; no = data.p1_no; siPorcentaje = data.p1_si_percent; noPorcentaje = data.p1_no_percent; break
    case 'p4': si = data.p4_si; no = data.p4_no; siPorcentaje = data.p4_si_percent; noPorcentaje = data.p4_no_percent; break
    case 'p6': si = data.p6_si; no = data.p6_no; siPorcentaje = data.p6_si_percent; noPorcentaje = data.p6_no_percent; break
    default: si = no = siPorcentaje = noPorcentaje = 0
  }

  const total = si + no

  return { si, no, siPorcentaje, noPorcentaje, total }
}

// Función para preparar datos para gráfica
export const getPreguntaChartData = (gestion: string, pregunta: string): PreguntaChartData => {
  const preguntaData = getPreguntaInnovacionData(gestion, pregunta)
  
  return {
    labels: ['SÍ', 'NO'],
    series: [preguntaData.si, preguntaData.no],
    colors: ['#10B981', '#7C3AED'],
    Porcentajes: [preguntaData.siPorcentaje, preguntaData.noPorcentaje]
  }
}

// Función para formatear números
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num)
}

// Función para formatear Porcentajes
export const formatPercent = (num: number): string => {
  return `${num.toFixed(1)}%`
}

// Textos descriptivos de las preguntas
export const getPreguntaTitulo = (pregunta: string): string => {
  const titulos: { [key: string]: string } = {
    'p1': 'UNIDADES ECONÓMICAS\nQUE CUENTAN CON EQUIPOS DE INNOVACIÓN',
    'p4': 'UNIDADES ECONÓMICAS\nCON METODOLOGÍAS DE INNOVACIÓN',
    'p6': 'UNIDADES ECONÓMICAS\nQUE PATENTARON SU INNOVACIÓN'
  }
  return titulos[pregunta] || 'Pregunta no definida'
}

export const getPreguntaDescripcion = (pregunta: string): string => {
  const descripciones: { [key: string]: string } = {
    'p1': 'En Porcentaje',
    'p4': 'En Porcentaje',
    'p6': 'En Porcentaje'
  }
  return descripciones[pregunta] || ''
}

// Función para obtener todas las preguntas (para tabla resumen)
export const getAllPreguntasData = (gestion: string) => {
  const preguntas = ['p1', 'p4', 'p6']
  return preguntas.map(pregunta => ({
    pregunta,
    data: getPreguntaInnovacionData(gestion, pregunta),
    titulo: getPreguntaTitulo(pregunta)
  }))
}