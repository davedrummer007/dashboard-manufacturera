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

export default function Capitulo7() {
  const { theme } = useTheme()

  // Datos para distribución de activos fijos
  const distribucionActivosData = {
    labels: ["Edificios", "Maquinaria", "Vehículos", "Muebles", "Herramientas", "Computación", "Terrenos", "Otros"],
    datasets: [{
      data: [35, 25, 12, 8, 5, 7, 5, 3],
      backgroundColor: theme === 'dark' 
        ? ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#6b7280"] 
        : ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#9ca3af"]
    }]
  }

  // Datos para valor de activos por categoría
  const valorActivosData = {
    labels: ["Edificios", "Maquinaria", "Vehículos", "Muebles", "Herramientas", "Computación", "Terrenos", "Otros"],
    datasets: [{
      label: "Valor Contable (Millones USD)",
      data: [8.4, 6.0, 2.9, 1.9, 1.2, 1.7, 1.2, 0.7],
      backgroundColor: theme === 'dark' 
        ? ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#db2777", "#0891b2", "#4b5563"] 
        : ["#93c5fd", "#6ee7b7", "#fcd34d", "#fca5a5", "#d8b4fe", "#f9a8d4", "#a5f3fc", "#d1d5db"]
    }]
  }

  // Datos para depreciación acumulada
  const depreciacionData = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Depreciación Anual",
        data: [1.2, 1.4, 1.6, 1.8],
        backgroundColor: theme === 'dark' ? "#8b5cf6" : "#8b5cf6",
        borderColor: theme === 'dark' ? "#8b5cf6" : "#8b5cf6",
        borderWidth: 2
      },
      {
        label: "Depreciación Acumulada",
        data: [4.8, 6.2, 7.8, 9.6],
        backgroundColor: theme === 'dark' ? "#3b82f6" : "#3b82f6",
        borderColor: theme === 'dark' ? "#3b82f6" : "#3b82f6",
        borderWidth: 2
      }
    ]
  }

  // Datos para antigüedad de activos
  const antiguedadActivosData = {
    labels: ["< 2 años", "2-5 años", "5-10 años", "> 10 años"],
    datasets: [{
      data: [25, 40, 25, 10],
      backgroundColor: theme === 'dark' 
        ? ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"] 
        : ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]
    }]
  }

  // Datos para inversión en nuevos activos
  const inversionActivosData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{
      label: "Inversión en Nuevos Activos (Miles USD)",
      data: [450, 320, 580, 720],
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
            Capítulo 7 - ACTIVOS FIJOS
          </h2>
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
              title="Valor Total Activos Fijos" 
              value="$24.0M" 
              trend="up"
              description="+8.5% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Depreciación Acumulada" 
              value="$9.6M" 
              trend="up"
              description="40% del valor total"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Inversión 2023" 
              value="$2.07M" 
              trend="up"
              description="+15.2% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
        </motion.div>

        {/* Resumen General de Activos Fijos */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Resumen General de Activos Fijos
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <PieChart 
                data={distribucionActivosData} 
                darkMode={theme === 'dark'}
                title="Distribución por Tipo de Activo (%)"
              />
            </div>
            <div className="h-96">
              <BarChart 
                data={valorActivosData} 
                darkMode={theme === 'dark'} 
                title="Valor Contable por Categoría (Millones USD)"
              />
            </div>
          </div>
        </motion.div>

        {/* Sección 1: Edificios y Construcciones */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            1. Edificios y Construcciones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Plantas Industriales - $5.2M</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Planta Principal: 12,000 m² - $3.8M</li>
                <li>• Planta Secundaria: 5,000 m² - $1.4M</li>
                <li>• Antigüedad promedio: 8.5 años</li>
                <li>• Depreciación acumulada: $2.1M</li>
              </ul>
            </div>
            
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <h4 className="font-medium text-cyan-800 dark:text-cyan-200">Instalaciones Técnicas - $3.2M</h4>
              <ul className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">
                <li>• Sistemas eléctricos: $1.2M</li>
                <li>• Climatización y ventilación: $850K</li>
                <li>• Sistemas de seguridad: $450K</li>
                <li>• Infraestructura TI: $700K</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPIBox 
              title="Valor Total" 
              value="$8.4M" 
              trend="up"
              description="35% del total activos"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Vida Útil Restante" 
              value="22 años" 
              trend="stable"
              description="72% de vida útil"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Mantenimiento Anual" 
              value="$180K" 
              trend="down"
              description="-5% vs 2022"
              darkMode={theme === 'dark'}
              small
            />
          </div>
        </motion.div>

        {/* Sección 2: Maquinaria y Equipo */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            2. Maquinaria y Equipo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Maquinaria de Producción - $4.2M</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Líneas de ensamblaje: $1.8M</li>
                <li>• Máquinas CNC: $1.2M</li>
                <li>• Equipos de moldeo: $750K</li>
                <li>• Sistemas de control: $450K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Equipos Especializados - $1.8M</h4>
              <ul className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
                <li>• Equipos de laboratorio: $650K</li>
                <li>• Instrumentos de medición: $420K</li>
                <li>• Sistemas de calidad: $380K</li>
                <li>• Equipos de prueba: $350K</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPIBox 
              title="Valor Total" 
              value="$6.0M" 
              trend="up"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Capacidad Utilizada" 
              value="85%" 
              trend="up"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Tecnología > 5 años" 
              value="45%" 
              trend="down"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Mantenimiento" 
              value="$220K" 
              trend="stable"
              darkMode={theme === 'dark'}
              small
            />
          </div>
        </motion.div>

        {/* Sección 3: Vehículos y Equipo de Transporte */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            3. Vehículos y Equipo de Transporte
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h4 className="font-medium text-amber-800 dark:text-amber-200">Vehículos de Transporte - $1.9M</h4>
              <ul className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                <li>• Camiones de carga: 8 unidades - $1.2M</li>
                <li>• Furgonetas de reparto: 12 unidades - $450K</li>
                <li>• Vehículos ejecutivos: 6 unidades - $250K</li>
                <li>• Kilometraje promedio: 45,000 km/año</li>
              </ul>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-800 dark:text-orange-200">Equipos de Manejo - $1.0M</h4>
              <ul className="mt-2 text-sm text-orange-700 dark:text-orange-300">
                <li>• Montacargas: 6 unidades - $480K</li>
                <li>• Grúas y elevadores: $320K</li>
                <li>• Carretillas y transpalets: $120K</li>
                <li>• Sistemas de almacenamiento: $80K</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPIBox 
              title="Valor Total" 
              value="$2.9M" 
              trend="up"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Antigüedad Promedio" 
              value="3.8 años" 
              trend="down"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Costo Mantenimiento" 
              value="$85K" 
              trend="stable"
              darkMode={theme === 'dark'}
              small
            />
          </div>
        </motion.div>

        {/* Sección 4-8: Otros Activos Fijos */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Otros Activos Fijos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={depreciacionData} 
                darkMode={theme === 'dark'} 
                title="Evolución de Depreciación (Millones USD)"
              />
            </div>
            <div className="h-96">
              <PieChart 
                data={antiguedadActivosData} 
                darkMode={theme === 'dark'}
                title="Distribución por Antigüedad (%)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">4. Muebles y Enseres - $1.9M</h4>
              <ul className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                <li>• Mobiliario oficinas: $850K</li>
                <li>• Mobiliario áreas comunes: $420K</li>
                <li>• Equipos de cocina: $280K</li>
                <li>• Decoración y arte: $350K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h4 className="font-medium text-pink-800 dark:text-pink-200">5. Herramientas - $1.2M</h4>
              <ul className="mt-2 text-sm text-pink-700 dark:text-pink-300">
                <li>• Herramientas manuales: $350K</li>
                <li>• Herramientas eléctricas: $480K</li>
                <li>• Equipos de medición: $220K</li>
                <li>• Moldes y troqueles: $150K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-medium text-indigo-800 dark:text-indigo-200">6. Equipo de Computación - $1.7M</h4>
              <ul className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
                <li>• Servidores y redes: $750K</li>
                <li>• Computadoras: $450K</li>
                <li>• Equipos periféricos: $280K</li>
                <li>• Software y licencias: $220K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <h4 className="font-medium text-teal-800 dark:text-teal-200">7. Terrenos - $1.2M</h4>
              <ul className="mt-2 text-sm text-teal-700 dark:text-teal-300">
                <li>• Terreno planta principal: 25,000 m² - $850K</li>
                <li>• Terreno almacenes: 8,000 m² - $280K</li>
                <li>• Plusvalía acumulada: +35%</li>
                <li>• Zonas de expansión: 5,000 m²</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">8. Otros Activos Fijos - $0.7M</h4>
              <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Equipos de comunicación: $250K</li>
                <li>• Sistemas de seguridad: $180K</li>
                <li>• Activos en leasing: $150K</li>
                <li>• Obras en curso: $120K</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Inversiones y Planes Futuros */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Inversiones y Planes Futuros
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={inversionActivosData} 
                darkMode={theme === 'dark'} 
                title="Inversión en Nuevos Activos 2023"
              />
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200">Plan de Inversiones 2024</h4>
                <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <li>• Modernización maquinaria: $1.2M</li>
                  <li>• Expansión planta: $850K</li>
                  <li>• Tecnología Industry 4.0: $650K</li>
                  <li>• Vehículos eléctricos: $280K</li>
                  <li>• Infraestructura TI: $420K</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200">Estrategia de Mantenimiento</h4>
                <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                  <li>• Mantenimiento predictivo: 45% de equipos</li>
                  <li>• Renovación programada: 20% anual</li>
                  <li>• Vida útil extendida: +15% en promedio</li>
                  <li>• ROI mantenimiento: 3.8x</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPIBox 
              title="Presupuesto 2024" 
              value="$3.4M" 
              trend="up"
              description="+64% vs 2023"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="ROI Esperado" 
              value="22%" 
              trend="up"
              description="+4% vs promedio"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Periodo Recuperación" 
              value="4.5 años" 
              trend="down"
              description="-0.8 años vs 2022"
              darkMode={theme === 'dark'}
              small
            />
          </div>
        </motion.div>

      </div>
    </div>
  )
}