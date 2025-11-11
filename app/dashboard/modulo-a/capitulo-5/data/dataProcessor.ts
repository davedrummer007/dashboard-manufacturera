import { ActivosFijosPyMEData } from '../types/charts'

// Datos de ACTIVOS FIJOS MICRO - PEQUEÑA - MEDIANA EMPRESA.csv
export const activosFijosPyMEData: ActivosFijosPyMEData[] = [
  // 2022
  { tipoSocietario: "UNIPERSONAL", valorContable: 591016564, gestion: "2022" },
  { tipoSocietario: "OTRAS EMPRESAS", valorContable: 80578916, gestion: "2022" },
  { tipoSocietario: "S.A.", valorContable: 2387425488, gestion: "2022" },
  { tipoSocietario: "S.R.L.", valorContable: 2397209610, gestion: "2022" },
  
  // 2023
  { tipoSocietario: "UNIPERSONAL", valorContable: 1400915914, gestion: "2023" },
  { tipoSocietario: "OTRAS EMPRESAS", valorContable: 107706910, gestion: "2023" },
  { tipoSocietario: "S.A.", valorContable: 2788868646, gestion: "2023" },
  { tipoSocietario: "S.R.L.", valorContable: 3701771420, gestion: "2023" },
  
  // 2024
  { tipoSocietario: "UNIPERSONAL", valorContable: 510333594, gestion: "2024" },
  { tipoSocietario: "OTRAS EMPRESAS", valorContable: 11926893, gestion: "2024" },
  { tipoSocietario: "S.A.", valorContable: 767595887, gestion: "2024" },
  { tipoSocietario: "S.R.L.", valorContable: 2210752103, gestion: "2024" }
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
export const getActivosFijosPyMEByGestion = (gestion: string) => {
  return activosFijosPyMEData.filter(item => item.gestion === gestion)
}