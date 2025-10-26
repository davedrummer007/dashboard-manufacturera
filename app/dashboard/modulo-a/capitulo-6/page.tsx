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

export default function Capitulo6() {
  const { theme } = useTheme()

  // Datos para distribución de gastos por categoría
  const distribucionGastosData = {
    labels: ["Energía y Combustibles", "Servicios Operativos", "Gastos Comerciales", "Mantenimiento y Reparaciones", "Gastos Financieros", "Otros Gastos"],
    datasets: [{
      data: [35, 25, 15, 12, 8, 5],
      backgroundColor: theme === 'dark' 
        ? ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"] 
        : ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#9ca3af"]
    }]
  }

  // Datos para energía y combustibles
  const energiaCombustiblesData = {
    labels: ["Energía Eléctrica", "Gas Natural", "Gas Licuado", "Gasolina", "Diésel", "Otros Combustibles"],
    datasets: [{
      label: "Costo Anual (Miles USD)",
      data: [480, 320, 180, 150, 220, 90],
      backgroundColor: theme === 'dark' 
        ? ["#6366f1", "#3b82f6", "#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6"] 
        : ["#6366f1", "#3b82f6", "#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6"]
    }]
  }

  // Datos para evolución trimestral de gastos
  const evolucionGastosData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Energía y Combustibles",
        data: [320, 340, 380, 400],
        backgroundColor: theme === 'dark' ? "#3b82f6" : "#3b82f6"
      },
      {
        label: "Servicios Operativos",
        data: [220, 240, 250, 260],
        backgroundColor: theme === 'dark' ? "#10b981" : "#10b981"
      },
      {
        label: "Gastos Comerciales",
        data: [140, 150, 160, 170],
        backgroundColor: theme === 'dark' ? "#f59e0b" : "#f59e0b"
      },
      {
        label: "Mantenimiento",
        data: [110, 115, 120, 125],
        backgroundColor: theme === 'dark' ? "#ef4444" : "#ef4444"
      }
    ]
  }

  // Datos para tendencia de gastos financieros
  const gastosFinancierosData = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [{
      label: "Gastos Financieros (Miles USD)",
      data: [280, 320, 380, 420],
      backgroundColor: theme === 'dark' ? "#8b5cf6" : "#8b5cf6",
      borderColor: theme === 'dark' ? "#8b5cf6" : "#8b5cf6",
      borderWidth: 2
    }]
  }

  // Datos para comparativa de eficiencia energética
  const eficienciaEnergeticaData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{
      label: "Consumo kWh por Unidad Producida",
      data: [12.5, 11.8, 11.2, 10.5],
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
            Capítulo 6 - OTROS GASTOS
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
              title="Total Otros Gastos 2023" 
              value="$3.8M" 
              trend="up"
              description="+12.5% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Porcentaje sobre Ventas" 
              value="18.5%" 
              trend="down"
              description="-1.2% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Ahorros por Optimización" 
              value="$285K" 
              trend="up"
              description="7.5% de reducción"
              darkMode={theme === 'dark'}
            />
          </motion.div>
        </motion.div>

        {/* Resumen General de Gastos */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Resumen General de Otros Gastos
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <PieChart 
                data={distribucionGastosData} 
                darkMode={theme === 'dark'}
                title="Distribución por Categoría de Gastos (%)"
              />
            </div>
            <div className="h-96">
              <BarChart 
                data={evolucionGastosData} 
                darkMode={theme === 'dark'} 
                title="Evolución Trimestral 2023 (Miles USD)"
                isStacked={true}
              />
            </div>
          </div>
        </motion.div>

        {/* Categoría 1: Energía y Combustibles */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Energía y Combustibles
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={energiaCombustiblesData} 
                darkMode={theme === 'dark'} 
                title="Distribución de Costos (Miles USD)"
              />
            </div>
            <div className="h-96">
              <BarChart 
                data={eficienciaEnergeticaData} 
                darkMode={theme === 'dark'} 
                title="Eficiencia Energética (kWh/Unidad)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">1. Energía eléctrica - $480K</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Consumo: 2.4M kWh</li>
                <li>• Costo promedio: $0.20/kWh</li>
                <li>• Reducción consumo: -8% vs 2022</li>
                <li>• Horario punta: 35% del consumo</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">2. Agua - $85K</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Consumo: 18,500 m³</li>
                <li>• Sistema de recirculación: 45%</li>
                <li>• Reducción consumo: -12% vs 2022</li>
                <li>• Tratamiento efluentes: $15K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <h4 className="font-medium text-cyan-800 dark:text-cyan-200">3. Gas Natural - $320K</h4>
              <ul className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">
                <li>• Consumo: 45,000 m³</li>
                <li>• Principales usos: Calderas, procesos térmicos</li>
                <li>• Eficiencia: 78% de aprovechamiento</li>
                <li>• Backup: sistema GLP</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h4 className="font-medium text-amber-800 dark:text-amber-200">4. Gas Licuado - $180K</h4>
              <ul className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                <li>• Consumo: 32,000 kg</li>
                <li>• Uso: Procesos especiales, backup</li>
                <li>• Almacenamiento: 2 tanques de 5,000 kg</li>
                <li>• Seguridad: $8K en mantenimiento</li>
              </ul>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-800 dark:text-orange-200">5. Gasolina - $150K</h4>
              <ul className="mt-2 text-sm text-orange-700 dark:text-orange-300">
                <li>• Consumo: 45,000 litros</li>
                <li>• Flota vehículos: 12 unidades</li>
                <li>• Rendimiento promedio: 8.5 km/lt</li>
                <li>• Control viajes: Sistema GPS</li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200">6. Diésel - $220K</h4>
              <ul className="mt-2 text-sm text-red-700 dark:text-red-300">
                <li>• Consumo: 55,000 litros</li>
                <li>• Maquinaria pesada: 8 equipos</li>
                <li>• Generación eléctrica: 15% del consumo</li>
                <li>• Mantenimiento filtros: $12K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">7. Otros Combustibles - $90K</h4>
              <ul className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                <li>• Lubricantes: $45K</li>
                <li>• Aceites especiales: $25K</li>
                <li>• Combustibles alternativos: $20K</li>
                <li>• Programa reciclaje: 60% de aceites</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Categoría 2: Servicios Operativos */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Servicios Operativos y Comerciales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <h4 className="font-medium text-teal-800 dark:text-teal-200">8. Servicios de transporte - $320K</h4>
              <ul className="mt-2 text-sm text-teal-700 dark:text-teal-300">
                <li>• Flete nacional: $180K</li>
                <li>• Flete internacional: $95K</li>
                <li>• Logística inversa: $45K</li>
                <li>• Proveedores: 5 empresas certificadas</li>
              </ul>
            </div>
            
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-medium text-indigo-800 dark:text-indigo-200">9. Costos operación export/import - $280K</h4>
              <ul className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
                <li>• Agentes aduaneros: $95K</li>
                <li>• Impuestos y aranceles: $120K</li>
                <li>• Certificaciones: $45K</li>
                <li>• Seguros internacionales: $20K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h4 className="font-medium text-pink-800 dark:text-pink-200">10. Servicios de comunicación - $120K</h4>
              <ul className="mt-2 text-sm text-pink-700 dark:text-pink-300">
                <li>• Internet y datos: $65K</li>
                <li>• Telefonía fija/móvil: $35K</li>
                <li>• Software comunicaciones: $20K</li>
                <li>• Redundancia: 2 proveedores</li>
              </ul>
            </div>
            
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
              <h4 className="font-medium text-rose-800 dark:text-rose-200">11. Gastos de comercialización - $380K</h4>
              <ul className="mt-2 text-sm text-rose-700 dark:text-rose-300">
                <li>• Publicidad: $150K</li>
                <li>• Ferias y eventos: $95K</li>
                <li>• Merchandising: $65K</li>
                <li>• Estudios de mercado: $70K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
              <h4 className="font-medium text-lime-800 dark:text-lime-200">12. Materiales de oficina - $75K</h4>
              <ul className="mt-2 text-sm text-lime-700 dark:text-lime-300">
                <li>• Papelería: $25K</li>
                <li>• Tóner e insumos: $30K</li>
                <li>• Mobiliario: $15K</li>
                <li>• Digitalización: -15% en consumo papel</li>
              </ul>
            </div>
            
            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
              <h4 className="font-medium text-violet-800 dark:text-violet-200">13. Honorarios profesionales - $180K</h4>
              <ul className="mt-2 text-sm text-violet-700 dark:text-violet-300">
                <li>• Consultoría técnica: $85K</li>
                <li>• Asesoría legal: $45K</li>
                <li>• Auditorías: $35K</li>
                <li>• Diseño y desarrollo: $15K</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Categoría 3: Mantenimiento y Gastos Financieros */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Mantenimiento, Gastos Financieros y Otros
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={gastosFinancierosData} 
                darkMode={theme === 'dark'} 
                title="Evolución Gastos Financieros 2020-2023"
              />
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium text-red-800 dark:text-red-200">14. Reparación y mantenimiento - $280K</h4>
                <ul className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <li>• Equipos productivos: $150K</li>
                  <li>• Infraestructura: $75K</li>
                  <li>• Mantenimiento preventivo: $40K</li>
                  <li>• Emergencias: $15K</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">15. Otros gastos operativos - $120K</h4>
                <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Seguros: $45K</li>
                  <li>• Capacitación: $35K</li>
                  <li>• Donaciones y RSE: $25K</li>
                  <li>• Impuestos municipales: $15K</li>
                </ul>
            </div>
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-medium text-purple-800 dark:text-purple-200">16. Gastos financieros - $420K</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <h5 className="font-semibold text-purple-700 dark:text-purple-300">Composición:</h5>
                <ul className="text-sm text-purple-600 dark:text-purple-400">
                  <li>• Intereses préstamos: $220K (52.4%)</li>
                  <li>• Comisiones bancarias: $85K (20.2%)</li>
                  <li>• Amortizaciones: $75K (17.9%)</li>
                  <li>• Otros gastos financieros: $40K (9.5%)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-purple-700 dark:text-purple-300">Tendencias:</h5>
                <ul className="text-sm text-purple-600 dark:text-purple-400">
                  <li>• Refinanciación exitosa: -3.2% tasa promedio</li>
                  <li>• Reducción comisiones: $15K de ahorro</li>
                  <li>• Plan de amortización: 36 meses</li>
                  <li>• Coverage ratio: 4.8x</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPIBox 
              title="ROI Optimización" 
              value="3.2x" 
              trend="up"
              description="+0.4x vs 2022"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Meta Reducción 2024" 
              value="10%" 
              trend="down"
              description="$380K objetivo"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Gastos Controlados" 
              value="92%" 
              trend="up"
              description="+5% vs 2022"
              darkMode={theme === 'dark'}
              small
            />
          </div>
        </motion.div>

        {/* Resumen Estratégico */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Resumen Estratégico y Oportunidades
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Oportunidades de Optimización</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Energía solar: Potencial 25% de ahorro ($120K)</li>
                <li>• Renegociación contratos: $85K de ahorro potencial</li>
                <li>• Digitalización procesos: 30% reducción papelería</li>
                <li>• Mantenimiento predictivo: 15% menos costos</li>
                <li>• Consolidación proveedores: 8% de ahorro</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Metas 2024</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Reducir gastos operativos en 10% ($380K)</li>
                <li>• Aumentar eficiencia energética en 15%</li>
                <li>• Digitalizar 80% de procesos administrativos</li>
                <li>• Implementar sistema de gestión energética</li>
                <li>• Reducir gastos financieros en 8% ($33.6K)</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}