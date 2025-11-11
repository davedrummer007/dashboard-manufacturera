// app/dashboard/modulo-b/capitulo-2/data/dataProcessor.ts

import { GestionAmbientalData, PreguntaAmbientalData, PreguntaChartData } from '../types/charts'

// Datos de SISTEMA DE GESTIÓN AMBIENTAL.csv
export const gestionAmbientalData: GestionAmbientalData[] = [
  {
    gestion: "2022",
    preg_1_si: 1134,
    preg_1_no: 2891,
    preg_1_si_porcentaje: 28.17,
    preg_8_si: 885,
    preg_8_no: 3140,
    preg_8_si_porcentaje: 21.99,
    total_registros: 4025
  },
  {
    gestion: "2023",
    preg_1_si: 1618,
    preg_1_no: 6270,
    preg_1_si_porcentaje: 20.51,
    preg_8_si: 1361,
    preg_8_no: 6527,
    preg_8_si_porcentaje: 17.25,
    total_registros: 7888
  },
  {
    gestion: "2024",
    preg_1_si: 971,
    preg_1_no: 4061,
    preg_1_si_porcentaje: 19.30,
    preg_8_si: 818,
    preg_8_no: 4214,
    preg_8_si_porcentaje: 16.26,
    total_registros: 5032
  }
]

// Función para obtener datos por gestión
export const getGestionAmbientalByGestion = (gestion: string): GestionAmbientalData | undefined => {
  return gestionAmbientalData.find(item => item.gestion === gestion)
}

// Función para obtener datos de una pregunta específica
export const getPreguntaAmbientalData = (gestion: string, pregunta: string): PreguntaAmbientalData => {
  const data = getGestionAmbientalByGestion(gestion)
  if (!data) {
    return { si: 0, no: 0, siPorcentaje: 0, total: 0 }
  }

  let si, no, siPorcentaje

  switch (pregunta) {
    case 'preg_1':
      si = data.preg_1_si
      no = data.preg_1_no
      siPorcentaje = data.preg_1_si_porcentaje
      break
    case 'preg_8':
      si = data.preg_8_si
      no = data.preg_8_no
      siPorcentaje = data.preg_8_si_porcentaje
      break
    default:
      si = no = siPorcentaje = 0
  }

  const total = si + no

  return {
    si,
    no,
    siPorcentaje,
    total
  }
}

// Función para preparar datos para gráfica
export const getPreguntaChartData = (gestion: string, pregunta: string): PreguntaChartData => {
  const preguntaData = getPreguntaAmbientalData(gestion, pregunta)
  
  return {
    labels: ['SÍ', 'NO'],
    series: [preguntaData.si, preguntaData.no],
    colors: ['#0dc4baff', '#9239e6ff'], // Verde para SÍ, Rojo para NO
    Porcentajes: [preguntaData.siPorcentaje, (100 - preguntaData.siPorcentaje)]
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
    'preg_1': 'UNIDADES ECONÓMICAS\nCON LICENCIA AMBIENTAL',
    'preg_8': 'UNIDADES ECONÓMICAS\nCON CAPACITACIÓN A SU PERSONAL EN TEMÁTICA AMBIENTAL'
  }
  return titulos[pregunta] || 'Pregunta no definida'
}

export const getPreguntaDescripcion = (pregunta: string): string => {
  const descripciones: { [key: string]: string } = {
    'preg_1': 'En Porcentaje',
    'preg_8': 'En Porcentaje'
  }
  return descripciones[pregunta] || ''
}