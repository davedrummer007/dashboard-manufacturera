import { DepartamentoData, TipoSocietarioData, ActividadEconomicaData } from '../types/charts'

// Datos hardcodeados de tus CSV
export const departamentoData: DepartamentoData[] = [
  // 2022
  { departamento: "SANTA CRUZ", total: 34826566394, gestion: "2022" },
  { departamento: "LA PAZ", total: 13609452505, gestion: "2022" },
  { departamento: "COCHABAMBA", total: 3702299121, gestion: "2022" },
  { departamento: "CHUQUISACA", total: 833294677, gestion: "2022" },
  { departamento: "TARIJA", total: 529131023, gestion: "2022" },
  { departamento: "PANDO", total: 505805457, gestion: "2022" },
  { departamento: "ORURO", total: 357117527, gestion: "2022" },
  { departamento: "POTOSI", total: 218870968, gestion: "2022" },
  { departamento: "BENI", total: 189545670, gestion: "2022" },
  
  // 2023
  { departamento: "SANTA CRUZ", total: 43870270441, gestion: "2023" },
  { departamento: "LA PAZ", total: 15155859836, gestion: "2023" },
  { departamento: "COCHABAMBA", total: 6747572194, gestion: "2023" },
  { departamento: "ORURO", total: 1116022504, gestion: "2023" },
  { departamento: "CHUQUISACA", total: 855989179, gestion: "2023" },
  { departamento: "TARIJA", total: 771690371, gestion: "2023" },
  { departamento: "BENI", total: 704787090, gestion: "2023" },
  { departamento: "POTOSI", total: 276349337, gestion: "2023" },
  { departamento: "PANDO", total: 142729147, gestion: "2023" },
  
  // 2024
  { departamento: "SANTA CRUZ", total: 28992574193, gestion: "2024" },
  { departamento: "LA PAZ", total: 10848867600, gestion: "2024" },
  { departamento: "COCHABAMBA", total: 7325646022, gestion: "2024" },
  { departamento: "ORURO", total: 1333677521, gestion: "2024" },
  { departamento: "TARIJA", total: 820981287, gestion: "2024" },
  { departamento: "BENI", total: 660888749, gestion: "2024" },
  { departamento: "CHUQUISACA", total: 259881226, gestion: "2024" },
  { departamento: "POTOSI", total: 250741011, gestion: "2024" },
  { departamento: "PANDO", total: 189849432, gestion: "2024" }
]

export const tipoSocietarioData: { [key: string]: TipoSocietarioData } = {
  "2022": {
    unipersonal: 2.71,
    sociedadLimitada: 22.15,
    sociedadAnonima: 73.67,
    otrasSociedades: 1.46
  },
  "2023": {
    unipersonal: 4.56,
    sociedadLimitada: 24.16,
    sociedadAnonima: 70.24,
    otrasSociedades: 1.04
  },
  "2024": {
    unipersonal: 3.57,
    sociedadLimitada: 32.35,
    sociedadAnonima: 63.03,
    otrasSociedades: 1.05
  }
}

export const actividadEconomicaData: ActividadEconomicaData[] = [
  // 2022
  { gestion: "2022", actividadEconomica: "ELABORACIÓN DE PRODUCTOS ALIMENTICIOS", totalIngresos: 18717828332 },
  { gestion: "2022", actividadEconomica: "ELABORACIÓN DE BEBIDAS", totalIngresos: 7343932813 },
  { gestion: "2022", actividadEconomica: "FABRICACIÓN DE COQUE, PRODUCTOS DE LA REFINACIÓN DEL PETRÓLEO", totalIngresos: 7048741263 },
  { gestion: "2022", actividadEconomica: "FABRICACIÓN DE OTROS PRODUCTOS MINERALES NO METÁLICOS", totalIngresos: 5076197009 },
  { gestion: "2022", actividadEconomica: "OTRAS ACTIVIDADES DE LA INDUSTRIA MANUFACTURERA", totalIngresos: 4602476329 },
  { gestion: "2022", actividadEconomica: "FABRICACIÓN DE PRODUCTOS DE CAUCHO Y PLÁSTICO", totalIngresos: 2776855109 },
  { gestion: "2022", actividadEconomica: "FABRICACIÓN DE PRODUCTOS FARMACÉUTICOS...", totalIngresos: 2228257857 },
  { gestion: "2022", actividadEconomica: "FABRICACIÓN DE SUSTANCIAS Y PRODUCTOS QUÍMICOS", totalIngresos: 2145619389 },
  { gestion: "2022", actividadEconomica: "FABRICACIÓN DE PAPEL Y DE PRODUCTOS DE PAPEL", totalIngresos: 2042391769 },
  { gestion: "2022", actividadEconomica: "FABRICACIÓN DE PRODUCTOS ELABORADOS DE METAL...", totalIngresos: 1461633108 },
  { gestion: "2022", actividadEconomica: "OTRAS INDUSTRIAS MANUFACTURERAS n.c.p.", totalIngresos: 1328150365 },
  
  // 2023
  { gestion: "2023", actividadEconomica: "ELABORACIÓN DE PRODUCTOS ALIMENTICIOS", totalIngresos: 29648840487 },
  { gestion: "2023", actividadEconomica: "ELABORACIÓN DE BEBIDAS", totalIngresos: 8165824119 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE COQUE, PRODUCTOS DE LA REFINACIÓN DEL PETRÓLEO", totalIngresos: 7220096901 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE OTROS PRODUCTOS MINERALES NO METÁLICOS", totalIngresos: 5181181070 },
  { gestion: "2023", actividadEconomica: "OTRAS ACTIVIDADES DE LA INDUSTRIA MANUFACTURERA", totalIngresos: 5207767192 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE PRODUCTOS FARMACÉUTICOS...", totalIngresos: 3131529686 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE SUSTANCIAS Y PRODUCTOS QUÍMICOS", totalIngresos: 2847666208 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE PRODUCTOS DE CAUCHO Y PLÁSTICO", totalIngresos: 2585062693 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE PAPEL Y DE PRODUCTOS DE PAPEL", totalIngresos: 2310898010 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE METALES COMUNES", totalIngresos: 1726458984 },
  { gestion: "2023", actividadEconomica: "FABRICACIÓN DE PRODUCTOS ELABORADOS DE METAL...", totalIngresos: 1615944750 },
  
  // 2024
  { gestion: "2024", actividadEconomica: "ELABORACIÓN DE PRODUCTOS ALIMENTICIOS", totalIngresos: 15320260338 },
  { gestion: "2024", actividadEconomica: "ELABORACIÓN DE BEBIDAS", totalIngresos: 9081691550 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE COQUE, PRODUCTOS DE LA REFINACIÓN DEL PETRÓLEO", totalIngresos: 6711831364 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE OTROS PRODUCTOS MINERALES NO METÁLICOS", totalIngresos: 3926794433 },
  { gestion: "2024", actividadEconomica: "OTRAS ACTIVIDADES DE LA INDUSTRIA MANUFACTURERA", totalIngresos: 4228940169 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE PRODUCTOS FARMACÉUTICOS...", totalIngresos: 2318389702 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE SUSTANCIAS Y PRODUCTOS QUÍMICOS", totalIngresos: 2178594682 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE PRODUCTOS DE CAUCHO Y PLÁSTICO", totalIngresos: 1994071687 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE METALES COMUNES", totalIngresos: 1895602383 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE PAPEL Y DE PRODUCTOS DE PAPEL", totalIngresos: 1696351317 },
  { gestion: "2024", actividadEconomica: "FABRICACIÓN DE PRODUCTOS ELABORADOS DE METAL...", totalIngresos: 1330579417 }
]

// Función para formatear números con separadores de miles
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num)
}

// Función para obtener datos filtrados por gestión
export const getDataByGestion = (gestion: string) => {
  const departamentos = departamentoData.filter(item => item.gestion === gestion)
  const actividades = actividadEconomicaData.filter(item => item.gestion === gestion)
  const societario = tipoSocietarioData[gestion as keyof typeof tipoSocietarioData]
  
  return { departamentos, actividades, societario }
}