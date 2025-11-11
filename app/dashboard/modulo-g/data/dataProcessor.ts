// app/dashboard/modulo-g/data/dataProcessor.ts
import { 
  InfraestructuraData, 
  PreguntaBinariaData, 
  PreguntaMultipleData, 
  PreguntaChartData,
  StackedBarData 
} from '../types/charts'

// Datos de INFRAESTRUCTURA Y SERVICIOS.csv
export const infraestructuraData: InfraestructuraData[] = [
  {
    gestion: "2022",
    p1_si: 222, p1_no: 3808, p1_si_percent: 5.51, p1_no_percent: 94.49,
    p4_param_101: 1223, p4_param_102: 135, p4_param_103: 2672, p4_sin_respuesta: 0,
    p5_param_104: 346, p5_param_105: 76, p5_param_106: 3608, p5_sin_respuesta: 0,
    p6_param_107: 164, p6_param_108: 129, p6_param_109: 525, p6_param_110: 53, p6_sin_respuesta: 3159,
    total_registros: 4030
  },
  {
    gestion: "2023",
    p1_si: 403, p1_no: 7512, p1_si_percent: 5.09, p1_no_percent: 94.91,
    p4_param_101: 2765, p4_param_102: 203, p4_param_103: 4947, p4_sin_respuesta: 0,
    p5_param_104: 527, p5_param_105: 135, p5_param_106: 7253, p5_sin_respuesta: 0,
    p6_param_107: 0, p6_param_108: 0, p6_param_109: 0, p6_param_110: 0, p6_sin_respuesta: 7915,
    total_registros: 7915
  },
  {
    gestion: "2024",
    p1_si: 238, p1_no: 4817, p1_si_percent: 4.71, p1_no_percent: 95.29,
    p4_param_101: 1881, p4_param_102: 143, p4_param_103: 3031, p4_sin_respuesta: 0,
    p5_param_104: 347, p5_param_105: 86, p5_param_106: 4622, p5_sin_respuesta: 0,
    p6_param_107: 0, p6_param_108: 0, p6_param_109: 0, p6_param_110: 0, p6_sin_respuesta: 5055,
    total_registros: 5055
  }
]

// Función para obtener datos por gestión
export const getInfraestructuraByGestion = (gestion: string): InfraestructuraData | undefined => {
  return infraestructuraData.find(item => item.gestion === gestion)
}

// Función para obtener datos de pregunta binaria (P1)
export const getPreguntaBinariaData = (gestion: string, pregunta: string): PreguntaBinariaData => {
  const data = getInfraestructuraByGestion(gestion)
  if (!data) {
    return { si: 0, no: 0, siPorcentaje: 0, noPorcentaje: 0, total: 0 }
  }

  let si, no, siPorcentaje, noPorcentaje

  switch (pregunta) {
    case 'p1': 
      si = data.p1_si; 
      no = data.p1_no; 
      siPorcentaje = data.p1_si_percent; 
      noPorcentaje = data.p1_no_percent; 
      break
    default: 
      si = no = siPorcentaje = noPorcentaje = 0
  }

  const total = si + no

  return { si, no, siPorcentaje, noPorcentaje, total }
}

// Función para obtener datos de pregunta múltiple (P4, P5, P6) - ✅ SIN COLORES
export const getPreguntaMultipleData = (gestion: string, pregunta: string): PreguntaMultipleData => {
  const data = getInfraestructuraByGestion(gestion)
  if (!data) {
    return { labels: [], series: [], colors: [], Porcentajes: [], total: 0 }
  }

  let labels: string[] = []
  let series: number[] = []
  let colors: string[] = [] // ✅ SIEMPRE VACÍO - se asignan en el componente
  let Porcentajes: number[] = []

  switch (pregunta) {
    case 'p4':
      labels = ['Alquilada', 'Anticrético', 'Propio']
      series = [data.p4_param_101, data.p4_param_102, data.p4_param_103]
      // ✅ ELIMINADO: colors = ['#3B82F6', '#8B5CF6', '#10B981']
      Porcentajes = [
        (data.p4_param_101 / data.total_registros) * 100,
        (data.p4_param_102 / data.total_registros) * 100,
        (data.p4_param_103 / data.total_registros) * 100
      ]
      break
    case 'p5':
      labels = ['Parque Industrial', 'Zona Franca', 'Ninguno']
      series = [data.p5_param_104, data.p5_param_105, data.p5_param_106]
      // ✅ ELIMINADO: colors = ['#F59E0B', '#EF4444', '#6B7280']
      Porcentajes = [
        (data.p5_param_104 / data.total_registros) * 100,
        (data.p5_param_105 / data.total_registros) * 100,
        (data.p5_param_106 / data.total_registros) * 100
      ]
      break
    case 'p6':
      labels = ['Alcantarillado', 'Agua', 'Electricidad', 'Gas']
      series = [data.p6_param_107, data.p6_param_108, data.p6_param_109, data.p6_param_110]
      // ✅ ELIMINADO: colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
      Porcentajes = [
        (data.p6_param_107 / data.total_registros) * 100,
        (data.p6_param_108 / data.total_registros) * 100,
        (data.p6_param_109 / data.total_registros) * 100,
        (data.p6_param_110 / data.total_registros) * 100
      ]
      break
    default:
      labels = []; series = []; colors = []; Porcentajes = []
  }

  const total = series.reduce((sum, val) => sum + val, 0)

  return { labels, series, colors, Porcentajes, total }
}


// Función para obtener datos de servicios (P6) - Stacked Bar Chart
export const getServiciosStackedData = (gestion: string): StackedBarData => {
  const data = getInfraestructuraByGestion(gestion)
  if (!data) {
    return { labels: [], series: [], colors: [], total: 0 }
  }

  const labels = ['Alcantarillado', 'Agua', 'Electricidad', 'Gas']
  const series = [
    {
      name: 'Con Servicio',
      data: [data.p6_param_107, data.p6_param_108, data.p6_param_109, data.p6_param_110]
    },
    {
      name: 'Sin Servicio',
      data: [
        data.total_registros - data.p6_param_107,
        data.total_registros - data.p6_param_108,
        data.total_registros - data.p6_param_109,
        data.total_registros - data.p6_param_110
      ]
    }
  ]
  const colors = ['#10B981', '#EF4444']

  const total = data.total_registros

  return { labels, series, colors, total }
}

// Función para preparar datos para gráfica circular (P1)
export const getPreguntaChartData = (gestion: string, pregunta: string): PreguntaChartData => {
  const preguntaData = getPreguntaBinariaData(gestion, pregunta)
  
  return {
    labels: ['SÍ', 'NO'],
    series: [preguntaData.si, preguntaData.no],
    colors: [], // ✅ VACÍO - se asignan en el componente
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
    'p1': 'Unidades Económicas Multi Planta',
    'p4': 'Composición del Capital Fijo: Uso del predio',
    'p5': '% de Unidades en Zonas de incentivo (Parque/Zona Franca)',
    'p6': 'Tasa de Cobertura de Servicios Básicos Clave'
  }
  return titulos[pregunta] || 'Pregunta no definida'
}

export const getPreguntaDescripcion = (pregunta: string): string => {
  const descripciones: { [key: string]: string } = {
    'p1': 'Empresas con una o más plantas operativas',
    'p4': 'Distribución según tipo mobiliario del predio de la unidad económica',
    'p5': 'Distribución según Ubicación geográfica del predio de la unidad económica',
    'p6': 'Servicios básicos disponibles en las instalaciones'
  }
  return descripciones[pregunta] || ''
}

// Función para obtener datos para tabla resumen
export const getAllPreguntasData = (gestion: string) => {
  const data = getInfraestructuraByGestion(gestion)
  if (!data) return []

  return [
    {
      pregunta: 'p1',
      titulo: 'Múltiples plantas',
      data: getPreguntaBinariaData(gestion, 'p1')
    },
    {
      pregunta: 'p4',
      titulo: 'Tipo de predio',
      data: getPreguntaMultipleData(gestion, 'p4')
    },
    {
      pregunta: 'p5',
      titulo: 'Ubicación estratégica',
      data: getPreguntaMultipleData(gestion, 'p5')
    },
    {
      pregunta: 'p6',
      titulo: 'Servicios básicos',
      data: getServiciosStackedData(gestion)
    }
  ]
}

