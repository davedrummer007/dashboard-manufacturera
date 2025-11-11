// app/dashboard/modulo-b/data/dataProcessor.ts

import { SistemaGestionData, PreguntaData, PreguntaChartData } from '../types/charts'

// Datos de SISTEMAS DE GESTIÓN CERTIFICADOS.csv
export const sistemasGestionData: SistemaGestionData[] = [
  {
    gestion: "2022",
    preg_1_si: 233,
    preg_1_no: 3798,
    preg_1_sin_respuesta: 2,
    preg_4_si: 124,
    preg_4_no: 3905,
    preg_4_sin_respuesta: 4,
    preg_6_si: 518,
    preg_6_no: 3513,
    preg_6_sin_respuesta: 2,
    preg_7_si: 233,
    preg_7_no: 3796,
    preg_7_sin_respuesta: 4,
    total_registros: 4033
  },
  {
    gestion: "2023",
    preg_1_si: 370,
    preg_1_no: 7525,
    preg_1_sin_respuesta: 5,
    preg_4_si: 176,
    preg_4_no: 7715,
    preg_4_sin_respuesta: 9,
    preg_6_si: 780,
    preg_6_no: 7110,
    preg_6_sin_respuesta: 10,
    preg_7_si: 383,
    preg_7_no: 7507,
    preg_7_sin_respuesta: 10,
    total_registros: 7900
  },
  {
    gestion: "2024",
    preg_1_si: 238,
    preg_1_no: 4795,
    preg_1_sin_respuesta: 1,
    preg_4_si: 105,
    preg_4_no: 4919,
    preg_4_sin_respuesta: 10,
    preg_6_si: 429,
    preg_6_no: 4603,
    preg_6_sin_respuesta: 2,
    preg_7_si: 216,
    preg_7_no: 4815,
    preg_7_sin_respuesta: 3,
    total_registros: 5034
  }
]

// Función para obtener datos por gestión
export const getSistemasGestionByGestion = (gestion: string): SistemaGestionData | undefined => {
  return sistemasGestionData.find(item => item.gestion === gestion)
}

// Función para obtener datos de una pregunta específica
export const getPreguntaData = (gestion: string, pregunta: string): PreguntaData => {
  const data = getSistemasGestionByGestion(gestion)
  if (!data) {
    return { si: 0, no: 0, sinRespuesta: 0, total: 0, Porcentajesi: 0, porcentajeNo: 0, PorcentajesinRespuesta: 0 }
  }

  let si, no, sinRespuesta

  switch (pregunta) {
    case 'preg_1':
      si = data.preg_1_si
      no = data.preg_1_no
      sinRespuesta = data.preg_1_sin_respuesta
      break
    case 'preg_4':
      si = data.preg_4_si
      no = data.preg_4_no
      sinRespuesta = data.preg_4_sin_respuesta
      break
    case 'preg_6':
      si = data.preg_6_si
      no = data.preg_6_no
      sinRespuesta = data.preg_6_sin_respuesta
      break
    case 'preg_7':
      si = data.preg_7_si
      no = data.preg_7_no
      sinRespuesta = data.preg_7_sin_respuesta
      break
    default:
      si = no = sinRespuesta = 0
  }

  const total = si + no + sinRespuesta
  const Porcentajesi = total > 0 ? (si / total) * 100 : 0
  const porcentajeNo = total > 0 ? (no / total) * 100 : 0
  const PorcentajesinRespuesta = total > 0 ? (sinRespuesta / total) * 100 : 0

  return {
    si,
    no,
    sinRespuesta,
    total,
    Porcentajesi,
    porcentajeNo,
    PorcentajesinRespuesta
  }
}

// Función para preparar datos para gráfica (SIN "Sin Respuesta")
export const getPreguntaChartData = (gestion: string, pregunta: string): PreguntaChartData => {
  const preguntaData = getPreguntaData(gestion, pregunta)
  
  // Solo incluir SÍ y NO, excluir "Sin Respuesta"
  return {
    labels: ['SÍ', 'NO'],
    series: [preguntaData.si, preguntaData.no],
    colors: ['#322a9dff', '#39e6a4ff']
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
    'preg_1': 'ADOPCIÓN DE SISTEMAS DE GESTIÓN INTEGRADA\n(ISO 9001, 14001, u otros.)',
    'preg_4': 'UNIDADES ECONÓMICAS\nCON CERTIFICACIÓN DE PRODUCTOS',
    'preg_6': 'UNIDADES ECONÓMICAS\nCON SELLO HECHO EN BOLIVIA',
    'preg_7': 'UNIDADES ECONÓMICAS\nCON SELLO SOCIAL BOLIVIANO'
  }
  return titulos[pregunta] || 'Pregunta no definida'
}

export const getPreguntaDescripcion = (pregunta: string): string => {
  const descripciones: { [key: string]: string } = {
    'preg_1': 'En Porcentaje',
    'preg_4': 'En Porcentaje',
    'preg_6': 'En Porcentaje',
    'preg_7': 'En Porcentaje'
  }
  return descripciones[pregunta] || ''
}