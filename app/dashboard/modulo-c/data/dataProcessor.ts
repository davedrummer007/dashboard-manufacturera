// app/dashboard/modulo-c/data/dataProcessor.ts

import { TICData, PreguntaTICData, PreguntaChartData } from '../types/charts'

// Datos de TECNOLOGÍAS DE INFORMACIÓN - COMUNICACIÓN (TIC) Y TRANSFORMACIÓN DIGITAL.csv
export const ticData: TICData[] = [
  {
    gestion: "2022",
    p1_si: 2695, p1_no: 1326, p1_si_percent: 67.02, p1_no_percent: 32.98,
    p2_si: 1937, p2_no: 2084, p2_si_percent: 48.17, p2_no_percent: 51.83,
    p3_si: 2946, p3_no: 1075, p3_si_percent: 73.27, p3_no_percent: 26.73,
    p4_si: 855, p4_no: 3166, p4_si_percent: 21.26, p4_no_percent: 78.74,
    p5_si: 1345, p5_no: 2676, p5_si_percent: 33.45, p5_no_percent: 66.55,
    p6_si: 1113, p6_no: 2908, p6_si_percent: 27.68, p6_no_percent: 72.32,
    p7_si: 558, p7_no: 3463, p7_si_percent: 13.88, p7_no_percent: 86.12,
    p8_si: 465, p8_no: 3556, p8_si_percent: 11.56, p8_no_percent: 88.44,
    p9_si: 1903, p9_no: 2118, p9_si_percent: 47.33, p9_no_percent: 52.67,
    p10_si: 981, p10_no: 3040, p10_si_percent: 24.40, p10_no_percent: 75.60,
    p11_si: 284, p11_no: 3737, p11_si_percent: 7.06, p11_no_percent: 92.94,
    total_registros: 4021
  },
  {
    gestion: "2023",
    p1_si: 4948, p1_no: 2925, p1_si_percent: 62.85, p1_no_percent: 37.15,
    p2_si: 3870, p2_no: 4003, p2_si_percent: 49.16, p2_no_percent: 50.84,
    p3_si: 5854, p3_no: 2019, p3_si_percent: 74.36, p3_no_percent: 25.64,
    p4_si: 1450, p4_no: 6423, p4_si_percent: 18.42, p4_no_percent: 81.58,
    p5_si: 2409, p5_no: 5464, p5_si_percent: 30.60, p5_no_percent: 69.40,
    p6_si: 1965, p6_no: 5908, p6_si_percent: 24.96, p6_no_percent: 75.04,
    p7_si: 1092, p7_no: 6781, p7_si_percent: 13.87, p7_no_percent: 86.13,
    p8_si: 888, p8_no: 6985, p8_si_percent: 11.28, p8_no_percent: 88.72,
    p9_si: 3655, p9_no: 4218, p9_si_percent: 46.42, p9_no_percent: 53.58,
    p10_si: 1707, p10_no: 6166, p10_si_percent: 21.68, p10_no_percent: 78.32,
    p11_si: 425, p11_no: 7448, p11_si_percent: 5.40, p11_no_percent: 94.60,
    total_registros: 7873
  },
  {
    gestion: "2024",
    p1_si: 3174, p1_no: 1856, p1_si_percent: 63.10, p1_no_percent: 36.90,
    p2_si: 2535, p2_no: 2495, p2_si_percent: 50.40, p2_no_percent: 49.60,
    p3_si: 3812, p3_no: 1218, p3_si_percent: 75.79, p3_no_percent: 24.21,
    p4_si: 933, p4_no: 4097, p4_si_percent: 18.55, p4_no_percent: 81.45,
    p5_si: 1494, p5_no: 3536, p5_si_percent: 29.70, p5_no_percent: 70.30,
    p6_si: 1168, p6_no: 3862, p6_si_percent: 23.22, p6_no_percent: 76.78,
    p7_si: 697, p7_no: 4333, p7_si_percent: 13.86, p7_no_percent: 86.14,
    p8_si: 562, p8_no: 4468, p8_si_percent: 11.17, p8_no_percent: 88.83,
    p9_si: 2301, p9_no: 2729, p9_si_percent: 45.75, p9_no_percent: 54.25,
    p10_si: 965, p10_no: 4065, p10_si_percent: 19.18, p10_no_percent: 80.82,
    p11_si: 280, p11_no: 4750, p11_si_percent: 5.57, p11_no_percent: 94.43,
    total_registros: 5030
  }
]

// Función para obtener datos por gestión
export const getTICByGestion = (gestion: string): TICData | undefined => {
  return ticData.find(item => item.gestion === gestion)
}

// Función para obtener datos de una pregunta específica
export const getPreguntaTICData = (gestion: string, pregunta: string): PreguntaTICData => {
  const data = getTICByGestion(gestion)
  if (!data) {
    return { si: 0, no: 0, siPorcentaje: 0, noPorcentaje: 0, total: 0 }
  }

  let si, no, siPorcentaje, noPorcentaje

  switch (pregunta) {
    case 'p1': si = data.p1_si; no = data.p1_no; siPorcentaje = data.p1_si_percent; noPorcentaje = data.p1_no_percent; break
    case 'p2': si = data.p2_si; no = data.p2_no; siPorcentaje = data.p2_si_percent; noPorcentaje = data.p2_no_percent; break
    case 'p3': si = data.p3_si; no = data.p3_no; siPorcentaje = data.p3_si_percent; noPorcentaje = data.p3_no_percent; break
    case 'p4': si = data.p4_si; no = data.p4_no; siPorcentaje = data.p4_si_percent; noPorcentaje = data.p4_no_percent; break
    case 'p5': si = data.p5_si; no = data.p5_no; siPorcentaje = data.p5_si_percent; noPorcentaje = data.p5_no_percent; break
    case 'p6': si = data.p6_si; no = data.p6_no; siPorcentaje = data.p6_si_percent; noPorcentaje = data.p6_no_percent; break
    case 'p7': si = data.p7_si; no = data.p7_no; siPorcentaje = data.p7_si_percent; noPorcentaje = data.p7_no_percent; break
    case 'p8': si = data.p8_si; no = data.p8_no; siPorcentaje = data.p8_si_percent; noPorcentaje = data.p8_no_percent; break
    case 'p9': si = data.p9_si; no = data.p9_no; siPorcentaje = data.p9_si_percent; noPorcentaje = data.p9_no_percent; break
    case 'p10': si = data.p10_si; no = data.p10_no; siPorcentaje = data.p10_si_percent; noPorcentaje = data.p10_no_percent; break
    case 'p11': si = data.p11_si; no = data.p11_no; siPorcentaje = data.p11_si_percent; noPorcentaje = data.p11_no_percent; break
    default: si = no = siPorcentaje = noPorcentaje = 0
  }

  const total = si + no

  return { si, no, siPorcentaje, noPorcentaje, total }
}

// Función para preparar datos para gráfica
export const getPreguntaChartData = (gestion: string, pregunta: string): PreguntaChartData => {
  const preguntaData = getPreguntaTICData(gestion, pregunta)
  
  return {
    labels: ['SÍ', 'NO'],
    series: [preguntaData.si, preguntaData.no],
    colors: ['#1E40AF', '#F97316'],
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

// Textos descriptivos de las preguntas CON SALTO DE LÍNEA
export const getPreguntaTitulo = (pregunta: string): string => {
  const titulos: { [key: string]: string } = {
    'p1': 'UNIDADES ECONÓMICAS\nCON PCS DE ESCRITORIO',
    'p2': 'UNIDADES ECONÓMICAS\nCON DISPOSITIVOS MOVILES (LAPTOPS)',
    'p3': 'UNIDADES ECONÓMICAS\nCON ACCESO A INTERNET',
    'p4': 'UNIDADES ECONÓMICAS\nCON SITIO WEB PROPIO',
    'p5': 'UNIDADES ECONÓMICAS\nCON REDES SOCIALES (FACEBOOK, TWITTER, INSTAGRAM)',
    'p6': 'UNIDADES ECONÓMICAS\nQUE INVIERTEN EN PUBLICIDAD DIGITAL',
    'p7': 'UNIDADES ECONÓMICAS\nQUE REALIZAN COMPRAS POR INTERNET',
    'p8': 'UNIDADES ECONÓMICAS\nQUE REALIZAN VENTAS POR INTERNET',
    'p9': 'UNIDADES ECONÓMICAS\nQUE UTILIZAN INTERNET PARA SERVICIOS FINANCIEROS/BANCARIOS',
    'p10': 'UNIDADES ECONÓMICAS\nQUE CUENTAN CON HABILITACION DE TELETRABAJO/TRABAJO REMOTO',
    'p11': 'UNIDADES ECONÓMICAS\nQUE CUENTAN CON SISTEMAS DE GESTION INTEGRADA'
  }
  return titulos[pregunta] || 'Pregunta no definida'
}

export const getPreguntaDescripcion = (pregunta: string): string => {
  const descripciones: { [key: string]: string } = {
    'p1': 'En Porcentaje',
    'p2': 'En Porcentaje',
    'p3': 'En Porcentaje',
    'p4': 'En Porcentaje',
    'p5': 'En Porcentaje',
    'p6': 'En Porcentaje',
    'p7': 'En Porcentaje',
    'p8': 'En Porcentaje',
    'p9': 'En Porcentaje',
    'p10': 'En Porcentaje',
    'p11': 'En Porcentaje'
  }
  return descripciones[pregunta] || ''
}

// Función para obtener todas las preguntas (para tabla resumen)
export const getAllPreguntasData = (gestion: string) => {
  const preguntas = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11']
  return preguntas.map(pregunta => ({
    pregunta,
    data: getPreguntaTICData(gestion, pregunta),
    titulo: getPreguntaTitulo(pregunta)
  }))
}