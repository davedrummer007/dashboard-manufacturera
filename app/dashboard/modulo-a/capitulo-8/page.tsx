'use client'

import { useTheme } from '@/app/providers/ThemeProvider'
import BarChart from '@/app/components/BarChart'
import PieChart from '@/app/components/PieChart'
import KPIBox from '@/app/components/KPIBox'
import { motion } from 'framer-motion'

// Animaciones de entrada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Capitulo8() {
  const { theme } = useTheme()

  // Datos para distribución de activos fijos MIPYMES
  const distribucionActivosData = {
    labels: ["Maquinaria", "Equipos Computación", "Vehículos", "Mobiliario", "Herramientas", "Instalaciones", "Otros"],
    datasets: [{
      data: [35, 20, 15, 12, 8, 5, 5],
      backgroundColor: theme === 'dark' 
        ? ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#6b7280"] 
        : ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#9ca3af"]
    }]
  }

  // Datos para comparativa por tamaño de empresa
  const comparativaTamanoData = {
    labels: ["Micro", "Pequeña", "Mediana"],
    datasets: [{
      label: "Inversión Promedio en Activos (Miles USD)",
      data: [85, 220, 650],
      backgroundColor: theme === 'dark' 
        ? ["#10b981", "#3b82f6", "#8b5cf6"] 
        : ["#10b981", "#3b82f6", "#8b5cf6"]
    }]
  }

  // Datos para evolución de activos en MIPYMES
  const evolucionActivosData = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [{
      label: "Valor Total Activos (Miles USD)",
      data: [420, 480, 550, 620],
      backgroundColor: theme === 'dark' ? "#3b82f6" : "#3b82f6",
      borderColor: theme === 'dark' ? "#3b82f6" : "#3b82f6",
      borderWidth: 2
    }]
  }

  // Datos para financiamiento de activos
  const financiamientoData = {
    labels: ["Recursos Propios", "Préstamos Bancarios", "Leasing", "Proveedores", "Gobierno"],
    datasets: [{
      data: [55, 25, 12, 5, 3],
      backgroundColor: theme === 'dark' 
        ? ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"] 
        : ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]
    }]
  }

  // Datos para rotación y productividad
  const productividadData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{
      label: "Productividad (USD/Activo)",
      data: [3.2, 3.5, 3.8, 4.1],
      backgroundColor: theme === 'dark' ? "#10b981" : "#10b981",
      borderColor: theme === 'dark' ? "#10b981" : "#10b981",
      borderWidth: 2
    }]
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="p-6 space-y-8">
        
        {/* Encabezado con animación */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Módulo A - Información Financiera
          </h1>
          <h2 className="text-xl text-blue-600 dark:text-blue-400 mt-2">
            Capítulo 8 - ACTIVOS FIJOS MIPYMES
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Análisis de activos fijos para Micro y Pequeñas Empresas manufactureras
          </p>
        </motion.div>

        {/* KPIs con animación escalonada */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants}>  
            <KPIBox 
              title="Total Activos Fijos MIPYMES" 
              value="$620K" 
              trend="up"
              description="+12.7% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Crecimiento Anual" 
              value="15.2%" 
              trend="up"
              description="+3.5% vs sector"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Productividad por Activo" 
              value="$4.1" 
              trend="up"
              description="+28% desde 2020"
              darkMode={theme === 'dark'}
            />
          </motion.div>
        </motion.div>

        {/* Resumen General MIPYMES */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Resumen General - Activos Fijos MIPYMES
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <PieChart 
                data={distribucionActivosData} 
                darkMode={theme === 'dark'}
                title="Distribución de Activos en MIPYMES (%)"
              />
            </div>
            <div className="h-96">
              <BarChart 
                data={comparativaTamanoData} 
                darkMode={theme === 'dark'} 
                title="Inversión Promedio por Tipo de Empresa"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Características de MIPYMES</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• <strong>Microempresas:</strong> 1-10 empleados, activos ≤ $100K</li>
                <li>• <strong>Pequeñas empresas:</strong> 11-50 empleados, activos ≤ $500K</li>
                <li>• <strong>Enfoque:</strong> Flexibilidad y adaptabilidad</li>
                <li>• <strong>Ventaja:</strong> Menor burocracia, decisiones ágiles</li>
                <li>• <strong>Desafío:</strong> Acceso limitado a financiamiento</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Estrategias de Gestión</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Adquisición gradual de equipos</li>
                <li>• Uso intensivo de activos existentes</li>
                <li>• Mantenimiento preventivo prioritario</li>
                <li>• Renovación tecnológica progresiva</li>
                <li>• Alianzas para compartir equipos</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Análisis Detallado por Categoría */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Análisis Detallado de Activos por Categoría
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={evolucionActivosData} 
                darkMode={theme === 'dark'} 
                title="Evolución del Valor de Activos 2020-2023"
              />
            </div>
            <div className="h-96">
              <PieChart 
                data={financiamientoData} 
                darkMode={theme === 'dark'}
                title="Fuentes de Financiamiento (%)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Maquinaria */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Maquinaria - $217K (35%)</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Equipos básicos de producción: $125K</li>
                <li>• Máquinas especializadas: $65K</li>
                <li>• Equipos de apoyo: $27K</li>
                <li>• Antigüedad promedio: 4.2 años</li>
                <li>• Capacidad utilizada: 78%</li>
              </ul>
            </div>

            {/* Equipos de Computación */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Equipos Computación - $124K (20%)</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Computadoras y laptops: $65K</li>
                <li>• Software especializado: $32K</li>
                <li>• Equipos periféricos: $18K</li>
                <li>• Infraestructura red: $9K</li>
                <li>• Actualización tecnológica: 60%</li>
              </ul>
            </div>

            {/* Vehículos */}
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h4 className="font-medium text-amber-800 dark:text-amber-200">Vehículos - $93K (15%)</h4>
              <ul className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                <li>• Vehículos de reparto: $55K</li>
                <li>• Vehículos ejecutivos: $25K</li>
                <li>• Equipos de transporte: $13K</li>
                <li>• Combustible y mantenimiento: $18K/año</li>
                <li>• Kilometraje promedio: 25,000 km/año</li>
              </ul>
            </div>

            {/* Mobiliario */}
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Mobiliario - $74K (12%)</h4>
              <ul className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                <li>• Muebles de oficina: $35K</li>
                <li>• Estaciones de trabajo: $22K</li>
                <li>• Áreas comunes: $12K</li>
                <li>• Almacenamiento: $5K</li>
                <li>• Vida útil restante: 7.5 años</li>
              </ul>
            </div>

            {/* Herramientas */}
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h4 className="font-medium text-pink-800 dark:text-pink-200">Herramientas - $50K (8%)</h4>
              <ul className="mt-2 text-sm text-pink-700 dark:text-pink-300">
                <li>• Herramientas manuales: $18K</li>
                <li>• Equipos eléctricos: $22K</li>
                <li>• Instrumentos medición: $8K</li>
                <li>• Equipos seguridad: $2K</li>
                <li>• Tasa de reposición: 15%/año</li>
              </ul>
            </div>

            {/* Instalaciones */}
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <h4 className="font-medium text-cyan-800 dark:text-cyan-200">Instalaciones - $31K (5%)</h4>
              <ul className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">
                <li>• Adecuaciones locativas: $18K</li>
                <li>• Sistemas eléctricos: $8K</li>
                <li>• Instalaciones especiales: $5K</li>
                <li>• Mantenimiento anual: $6K</li>
                <li>• Espacio productivo: 85% utilizado</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Estrategias y Financiamiento */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Estrategias de Financiamiento y Crecimiento
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={productividadData} 
                darkMode={theme === 'dark'} 
                title="Evolución de Productividad 2023"
              />
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <h4 className="font-medium text-indigo-800 dark:text-indigo-200">Programas de Apoyo Gubernamental</h4>
                <ul className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
                  <li>• <strong>FONDEPYME:</strong> $45K en créditos blandos</li>
                  <li>• <strong>PRODUCE:</strong> $28K en subsidios equipos</li>
                  <li>• <strong>Reactivación Productiva:</strong> $32K en garantías</li>
                  <li>• <strong>Descuentos tributarios:</strong> 15% en inversiones</li>
                  <li>• <strong>Capacitación:</strong> 120 horas técnicas subsidiadas</li>
                </ul>
              </div>
              
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <h4 className="font-medium text-teal-800 dark:text-teal-200">Alternativas de Financiamiento</h4>
                <ul className="mt-2 text-sm text-teal-700 dark:text-teal-300">
                  <li>• <strong>Leasing operativo:</strong> 23% de los activos</li>
                  <li>• <strong>Crédito proveedores:</strong> 45-60 días plazo</li>
                  <li>• <strong>Factoring:</strong> 8% de la cartera</li>
                  <li>• <strong>Crowdfunding productivo:</strong> $15K recaudados</li>
                  <li>• <strong>Cooperativas de ahorro:</strong> 12% tasa promedio</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-800 dark:text-orange-200">Retos y Desafíos</h4>
              <ul className="mt-2 text-sm text-orange-700 dark:text-orange-300">
                <li>• Acceso limitado a crédito formal</li>
                <li>• Altas tasas de interés (18-24%)</li>
                <li>• Garantías insuficientes</li>
                <li>• Burocracia en trámites</li>
                <li>• Falta de historial crediticio</li>
                <li>• Capacidad técnica limitada</li>
              </ul>
            </div>
            
            <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
              <h4 className="font-medium text-lime-800 dark:text-lime-200">Oportunidades 2024</h4>
              <ul className="mt-2 text-sm text-lime-700 dark:text-lime-300">
                <li>• Digitalización de procesos ($35K presupuesto)</li>
                <li>• Energías renovables (25% de ahorro potencial)</li>
                <li>• Economía circular ($18K valor recuperable)</li>
                <li>• Alianzas estratégicas (3 nuevas alianzas)</li>
                <li>• Exportación (15% crecimiento proyectado)</li>
                <li>• Innovación abierta ($12K en cooperación)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Metas y Proyecciones */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Metas y Proyecciones 2024-2025
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Objetivos de Inversión</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• <strong>2024:</strong> $180K en nuevos activos</li>
                <li>• <strong>2025:</strong> $220K en modernización</li>
                <li>• <strong>ROI esperado:</strong> 22% anual</li>
                <li>• <strong>Periodo recuperación:</strong> 3.8 años</li>
                <li>• <strong>Productividad:</strong> +30% en 2 años</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Estrategia de Crecimiento</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Gradual: 15-20% crecimiento anual</li>
                <li>• Sostenible: Deuda máxima 40% activos</li>
                <li>• Diversificado: 4 líneas de producto</li>
                <li>• Innovador: 8% de ventas en I+D</li>
                <li>• Exportador: 25% de producción</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Indicadores Clave</h4>
              <ul className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                <li>• Rotación activos: 2.8x (meta: 3.5x)</li>
                <li>• Margen operativo: 18% (meta: 22%)</li>
                <li>• Endeudamiento: 35% (límite: 45%)</li>
                <li>• Cobertura intereses: 4.2x (meta: 5x)</li>
                <li>• Liquidez: 1.8x (óptimo: 2x)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPIBox 
              title="Inversión 2024" 
              value="$180K" 
              trend="up"
              description="+45% vs 2023"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Empleo Generado" 
              value="28" 
              trend="up"
              description="+12% vs 2023"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Exportaciones" 
              value="25%" 
              trend="up"
              description="+8% vs 2023"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Innovación" 
              value="8%" 
              trend="up"
              description="+3% vs 2023"
              darkMode={theme === 'dark'}
              small
            />
          </div>
        </motion.div>

      </div>
    </div>
  )
}