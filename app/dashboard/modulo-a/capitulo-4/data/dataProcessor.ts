import { ActivosFijosData } from '../types/charts'

// Datos de ACTIVOS FIJOS GRANDES EMPRESAS.csv
export const activosFijosData: ActivosFijosData[] = [
  // 2022
  { tipoSocietario: "UNIPERSONAL", valorContable: 19333326, gestion: "2022" },
  { tipoSocietario: "OTRAS EMPRESAS", valorContable: 130814024, gestion: "2022" },
  { tipoSocietario: "S.A.", valorContable: 17682293870, gestion: "2022" },
  { tipoSocietario: "S.R.L.", valorContable: 2773437963, gestion: "2022" },
  
  // 2023
  { tipoSocietario: "UNIPERSONAL", valorContable: 80924173, gestion: "2023" },
  { tipoSocietario: "OTRAS EMPRESAS", valorContable: 51704494, gestion: "2023" },
  { tipoSocietario: "S.A.", valorContable: 40814614822, gestion: "2023" },
  { tipoSocietario: "S.R.L.", valorContable: 6557220896, gestion: "2023" },
  
  // 2024
  { tipoSocietario: "UNIPERSONAL", valorContable: 106999562, gestion: "2024" },
  { tipoSocietario: "OTRAS EMPRESAS", valorContable: 134477311, gestion: "2024" },
  { tipoSocietario: "S.A.", valorContable: 14402890799, gestion: "2024" },
  { tipoSocietario: "S.R.L.", valorContable: 3522627890, gestion: "2024" }
]

// Función para formatear números con separadores de miles
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num)
}

// Función para formatear moneda
export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'BOB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num)
}

// Función para obtener datos filtrados por gestión
export const getActivosFijosByGestion = (gestion: string) => {
  return activosFijosData.filter(item => item.gestion === gestion)
}