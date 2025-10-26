import { 
  DepartamentoPatrimonioData, 
  PatrimonioPorcentajeData, 
  InventarioInicialFinalData 
} from '../types/charts'

// Datos de INVENTARIO - PATRIMONIO.csv
export const departamentoPatrimonioData: DepartamentoPatrimonioData[] = [
  // 2022
  { departamento: "SANTA CRUZ", patrimonio: 26005090234, gestion: "2022" },
  { departamento: "LA PAZ", patrimonio: 10091561168, gestion: "2022" },
  { departamento: "COCHABAMBA", patrimonio: 2837364182, gestion: "2022" },
  { departamento: "CHUQUISACA", patrimonio: 2049031638, gestion: "2022" },
  { departamento: "TARIJA", patrimonio: 462871844, gestion: "2022" },
  { departamento: "ORURO", patrimonio: 237399109, gestion: "2022" },
  { departamento: "BENI", patrimonio: 224710498, gestion: "2022" },
  { departamento: "POTOSI", patrimonio: 220481630, gestion: "2022" },
  { departamento: "PANDO", patrimonio: 194032307, gestion: "2022" },
  
  // 2023
  { departamento: "SANTA CRUZ", patrimonio: 29251081086, gestion: "2023" },
  { departamento: "LA PAZ", patrimonio: 11513658613, gestion: "2023" },
  { departamento: "COCHABAMBA", patrimonio: 4571623478, gestion: "2023" },
  { departamento: "CHUQUISACA", patrimonio: 2082683382, gestion: "2023" },
  { departamento: "TARIJA", patrimonio: 1052996123, gestion: "2023" },
  { departamento: "BENI", patrimonio: 757554996, gestion: "2023" },
  { departamento: "ORURO", patrimonio: 426138503, gestion: "2023" },
  { departamento: "POTOSI", patrimonio: 287929841, gestion: "2023" },
  { departamento: "PANDO", patrimonio: 205340639, gestion: "2023" },
  
  // 2024
  { departamento: "SANTA CRUZ", patrimonio: 22584469329, gestion: "2024" },
  { departamento: "LA PAZ", patrimonio: 6302448219, gestion: "2024" },
  { departamento: "COCHABAMBA", patrimonio: 3611894753, gestion: "2024" },
  { departamento: "TARIJA", patrimonio: 734507872, gestion: "2024" },
  { departamento: "BENI", patrimonio: 575664585, gestion: "2024" },
  { departamento: "ORURO", patrimonio: 444709346, gestion: "2024" },
  { departamento: "CHUQUISACA", patrimonio: 295355257, gestion: "2024" },
  { departamento: "POTOSI", patrimonio: 225840197, gestion: "2024" },
  { departamento: "PANDO", patrimonio: 143381221, gestion: "2024" }
]

// Datos de INVENTARIO - PATRIMONIO POR PORCENTAJE.csv
export const patrimonioPorcentajeData: PatrimonioPorcentajeData[] = [
  // 2022
  { tipoSocietario: "SOCIEDAD ANONIMA", patrimonio: 30253133473, porcentaje: 71, gestion: "2022" },
  { tipoSocietario: "SOCIEDAD LIMITADA", patrimonio: 10264339725, porcentaje: 24, gestion: "2022" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", patrimonio: 1521172365, porcentaje: 4, gestion: "2022" },
  { tipoSocietario: "OTROS", patrimonio: 283897046, porcentaje: 1, gestion: "2022" },
  
  // 2023
  { tipoSocietario: "SOCIEDAD ANONIMA", patrimonio: 33414812169, porcentaje: 79, gestion: "2023" },
  { tipoSocietario: "SOCIEDAD LIMITADA", patrimonio: 13616184672, porcentaje: 32, gestion: "2023" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", patrimonio: 2686457145, porcentaje: 6, gestion: "2023" },
  { tipoSocietario: "OTROS", patrimonio: 431552674, porcentaje: 1, gestion: "2023" },
  
  // 2024
  { tipoSocietario: "SOCIEDAD ANONIMA", patrimonio: 24648028458, porcentaje: 58, gestion: "2024" },
  { tipoSocietario: "SOCIEDAD LIMITADA", patrimonio: 8495003851, porcentaje: 20, gestion: "2024" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", patrimonio: 1406615640, porcentaje: 3, gestion: "2024" },
  { tipoSocietario: "OTROS", patrimonio: 368622830, porcentaje: 1, gestion: "2024" }
]

// Datos de INVENTARIO - INICIAL Y FINAL POR PORCENTAJE.csv
export const inventarioInicialFinalData: InventarioInicialFinalData[] = [
  // 2022
  { tipoSocietario: "SOCIEDAD ANONIMA", invInicial: 34695134347, invFinal: 35175502261, invInicialPorc: 67.40, invFinalPorc: 66.17, gestion: "2022" },
  { tipoSocietario: "SOCIEDAD LIMITADA", invInicial: 14228161129, invFinal: 15128318848, invInicialPorc: 27.64, invFinalPorc: 28.46, gestion: "2022" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", invInicial: 2247753825, invFinal: 2543740014, invInicialPorc: 4.37, invFinalPorc: 4.78, gestion: "2022" },
  { tipoSocietario: "OTROS", invInicial: 306644107, invFinal: 313156066, invInicialPorc: 0.60, invFinalPorc: 0.59, gestion: "2022" },
  
  // 2023
  { tipoSocietario: "SOCIEDAD ANONIMA", invInicial: 40352277022, invFinal: 39903653266, invInicialPorc: 63.17, invFinalPorc: 62.46, gestion: "2023" },
  { tipoSocietario: "SOCIEDAD LIMITADA", invInicial: 19120092404, invFinal: 19466149706, invInicialPorc: 29.93, invFinalPorc: 30.47, gestion: "2023" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", invInicial: 3927316739, invFinal: 4066752631, invInicialPorc: 6.15, invFinalPorc: 6.37, gestion: "2023" },
  { tipoSocietario: "OTROS", invInicial: 481534710, invFinal: 452382911, invInicialPorc: 0.75, invFinalPorc: 0.71, gestion: "2023" },
  
  // 2024
  { tipoSocietario: "SOCIEDAD ANONIMA", invInicial: 28939266324, invFinal: 29138361416, invInicialPorc: 65.82, invFinalPorc: 65.43, gestion: "2024" },
  { tipoSocietario: "SOCIEDAD LIMITADA", invInicial: 12556253841, invFinal: 12787512719, invInicialPorc: 28.56, invFinalPorc: 28.71, gestion: "2024" },
  { tipoSocietario: "EMPRESA UNIPERSONAL", invInicial: 2085332644, invFinal: 2201947431, invInicialPorc: 4.74, invFinalPorc: 4.94, gestion: "2024" },
  { tipoSocietario: "OTROS", invInicial: 385739562, invFinal: 406056090, invInicialPorc: 0.88, invFinalPorc: 0.91, gestion: "2024" }
]

// Función para formatear números con separadores de miles
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num)
}

// Función para obtener datos filtrados por gestión
export const getDataByGestion = (gestion: string) => {
  const departamentos = departamentoPatrimonioData.filter(item => item.gestion === gestion)
  const patrimonioPorcentaje = patrimonioPorcentajeData.filter(item => item.gestion === gestion)
  const inventarioIF = inventarioInicialFinalData.filter(item => item.gestion === gestion)
  
  return { departamentos, patrimonioPorcentaje, inventarioIF }
}