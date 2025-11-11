// Datos procesados del CSV "CUADROS DE ANTECEDENTES JUSTIFICATIVOS.csv"

export interface DepartamentoData {
  departamento: string
  "2022": number
  "2023": number
  "2024": number
}

export interface TipoSocietarioData {
  tipoSocietario: string
  "2022": number
  "2023": number
  "2024": number
}

// Datos de unidades económicas por departamento
export const unidadesPorDepartamento: DepartamentoData[] = [
  { departamento: "PANDO", "2022": 34, "2023": 30, "2024": 24 },
  { departamento: "BENI", "2022": 40, "2023": 79, "2024": 54 },
  { departamento: "POTOSI", "2022": 38, "2023": 105, "2024": 46 },
  { departamento: "ORURO", "2022": 86, "2023": 180, "2024": 110 },
  { departamento: "CHUQUISACA", "2022": 109, "2023": 209, "2024": 116 },
  { departamento: "TARIJA", "2022": 134, "2023": 209, "2024": 128 },
  { departamento: "COCHABAMBA", "2022": 837, "2023": 1240, "2024": 722 },
  { departamento: "SANTA CRUZ", "2022": 747, "2023": 1514, "2024": 974 },
  { departamento: "LA PAZ", "2022": 914, "2023": 1563, "2024": 918 }
]

// Datos de unidades económicas por tipo societario (convertir Porcentajes a números)
export const unidadesPorTipoSocietario: TipoSocietarioData[] = [
  { tipoSocietario: "EMPRESA UNIPERSONAL", "2022": 59.14, "2023": 64.81, "2024": 64.52 },
  { tipoSocietario: "SOCIEDAD DE RESPONSABILIDAD LIMITADA", "2022": 35.45, "2023": 31.23, "2024": 31.86 },
  { tipoSocietario: "SOCIEDAD ANONIMA", "2022": 5.27, "2023": 3.76, "2024": 3.40 },
  { tipoSocietario: "OTROS TIPOS SOCIETARIOS", "2022": 0.14, "2023": 0.19, "2024": 0.23 }
]

// Totales generales
export const totalesUnidades = {
  "2022": 2939,
  "2023": 5129,
  "2024": 3092
}

// Datos técnicos del dashboard
export const datosTecnicos = {
  unidadesBaseEmpresarial: {
    "2022": 10778,
    "2023": 10581,
    "2024": 10239
  },
  completaronEncuesta: {
    "2022": 4037,
    "2023": 7905,
    "2024": 5036
  },
  declararonConMovimiento: {
    "2022": 2939,
    "2023": 5129,
    "2024": 3092
  },
  declararonSinMovimiento: {
    "2022": 1098,
    "2023": 2776,
    "2024": 1944
  }
}

// Función para formatear números
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num)
}