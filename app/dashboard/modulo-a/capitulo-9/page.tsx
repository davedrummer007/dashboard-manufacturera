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

export default function Capitulo9() {
  const { theme } = useTheme()

  // Datos para distribución de insumos químicos
  const distribucionQuimicosData = {
    labels: ["Ácido Sulfúrico", "Ácido Clorhídrico", "Bicarbonato de Sodio", "Hipoclorito de Sodio", "Cloruro de Calcio", "Hidróxido de Sodio", "Hidróxido de Calcio", "Carbonato de Sodio"],
    datasets: [{
      data: [25, 18, 12, 10, 8, 15, 6, 6],
      backgroundColor: theme === 'dark' 
        ? ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16"] 
        : ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16"]
    }]
  }

  // Datos para consumo mensual de insumos químicos
  const consumoMensualData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ácido Sulfúrico (tons)",
        data: [120, 125, 130, 135, 140, 145],
        backgroundColor: theme === 'dark' ? "#3b82f6" : "#3b82f6"
      },
      {
        label: "Ácido Clorhídrico (tons)",
        data: [85, 88, 90, 92, 95, 98],
        backgroundColor: theme === 'dark' ? "#10b981" : "#10b981"
      },
      {
        label: "Hidróxido de Sodio (tons)",
        data: [70, 72, 75, 78, 80, 82],
        backgroundColor: theme === 'dark' ? "#06b6d4" : "#06b6d4"
      }
    ]
  }

  // Datos para tendencia de precios
  const tendenciaPreciosData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Ácido Sulfúrico (USD/ton)",
        data: [280, 295, 310, 325],
        borderColor: theme === 'dark' ? "#3b82f6" : "#3b82f6",
        backgroundColor: 'transparent',
        borderWidth: 3,
        tension: 0.3
      },
      {
        label: "Ácido Clorhídrico (USD/ton)",
        data: [320, 335, 350, 340],
        borderColor: theme === 'dark' ? "#10b981" : "#10b981",
        backgroundColor: 'transparent',
        borderWidth: 3,
        tension: 0.3
      },
      {
        label: "Hidróxido de Sodio (USD/ton)",
        data: [450, 465, 480, 495],
        borderColor: theme === 'dark' ? "#06b6d4" : "#06b6d4",
        backgroundColor: 'transparent',
        borderWidth: 3,
        tension: 0.3
      }
    ]
  }

  // Datos para proveedores principales
  const proveedoresData = {
    labels: ["Química Andina", "Productos Químicos Nacionales", "Importaciones Químicas", "Distribuidora Sur", "Otros"],
    datasets: [{
      data: [40, 25, 20, 10, 5],
      backgroundColor: theme === 'dark' 
        ? ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6b7280"] 
        : ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#9ca3af"]
    }]
  }

  // Datos para eficiencia en el uso
  const eficienciaUsoData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{
      label: "Eficiencia en el Uso (%)",
      data: [82, 85, 88, 91],
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
            Capítulo 9 - INSUMOS DE QUÍMICA BÁSICA
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gestión y análisis de insumos químicos fundamentales para procesos productivos
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
              title="Costo Total Insumos Químicos" 
              value="$2.8M" 
              trend="up"
              description="+8.5% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Consumo Anual" 
              value="1,850 tons" 
              trend="up"
              description="+6.2% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <KPIBox 
              title="Eficiencia en el Uso" 
              value="91%" 
              trend="up"
              description="+4.5% vs 2022"
              darkMode={theme === 'dark'}
            />
          </motion.div>
        </motion.div>

        {/* Resumen General */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Resumen General - Insumos Químicos
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <PieChart 
                data={distribucionQuimicosData} 
                darkMode={theme === 'dark'}
                title="Distribución por Tipo de Insumo (%)"
              />
            </div>
            <div className="h-96">
              <BarChart 
                data={consumoMensualData} 
                darkMode={theme === 'dark'} 
                title="Consumo Mensual (Enero-Junio)"
                isStacked={false}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Aplicaciones Principales</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• <strong>Tratamiento de aguas:</strong> 35% del consumo</li>
                <li>• <strong>Procesos de limpieza:</strong> 25% del consumo</li>
                <li>• <strong>Neutralización:</strong> 20% del consumo</li>
                <li>• <strong>Reactivos producción:</strong> 15% del consumo</li>
                <li>• <strong>Mantenimiento:</strong> 5% del consumo</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Indicadores de Gestión</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Rotación de inventario: 12.5x</li>
                <li>• Días de inventario: 29.2 días</li>
                <li>• Mermas controladas: 1.8%</li>
                <li>• Cumplimiento proveedores: 94%</li>
                <li>• Incidencias calidad: 0.8%</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Detalle de Insumos Químicos */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Detalle de Insumos Químicos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={tendenciaPreciosData} 
                darkMode={theme === 'dark'} 
                title="Tendencia de Precios 2023 (USD/ton)"
              />
            </div>
            <div className="h-96">
              <PieChart 
                data={proveedoresData} 
                darkMode={theme === 'dark'}
                title="Distribución por Proveedor (%)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ácido Sulfúrico */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">1. Ácido Sulfúrico - $700K (25%)</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Consumo anual: 1,450 tons</li>
                <li>• Precio promedio: $483/ton</li>
                <li>• Concentración: 98%</li>
                <li>• Aplicaciones: Tratamiento metales, neutralización</li>
                <li>• Proveedores: Química Andina (60%), Importaciones (40%)</li>
                <li>• Almacenamiento: Tanques especiales PP</li>
              </ul>
            </div>

            {/* Ácido Clorhídrico */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">2. Ácido Clorhídrico - $504K (18%)</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Consumo anual: 1,050 tons</li>
                <li>• Precio promedio: $480/ton</li>
                <li>• Concentración: 33%</li>
                <li>• Aplicaciones: Limpieza, decapado, pH ajuste</li>
                <li>• Proveedores: Productos Químicos Nacionales (70%)</li>
                <li>• Seguridad: Equipos protección corrosivos</li>
              </ul>
            </div>

            {/* Bicarbonato de Sodio */}
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h4 className="font-medium text-amber-800 dark:text-amber-200">3. Bicarbonato de Sodio - $336K (12%)</h4>
              <ul className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                <li>• Consumo anual: 1,200 tons</li>
                <li>• Precio promedio: $280/ton</li>
                <li>• Pureza: 99.8%</li>
                <li>• Aplicaciones: Neutralización, buffer, limpieza</li>
                <li>• Proveedores: Distribuidora Sur (80%), Local (20%)</li>
                <li>• Almacenamiento: Ambiente seco</li>
              </ul>
            </div>

            {/* Hipoclorito de Sodio */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200">4. Hipoclorito de Sodio - $280K (10%)</h4>
              <ul className="mt-2 text-sm text-red-700 dark:text-red-300">
                <li>• Consumo anual: 700 tons</li>
                <li>• Precio promedio: $400/ton</li>
                <li>• Concentración: 12-15%</li>
                <li>• Aplicaciones: Desinfección, blanqueo</li>
                <li>• Proveedores: Química Andina (100%)</li>
                <li>• Vida útil: 3 meses máximo</li>
              </ul>
            </div>

            {/* Cloruro de Calcio */}
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">5. Cloruro de Calcio - $224K (8%)</h4>
              <ul className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                <li>• Consumo anual: 400 tons</li>
                <li>• Precio promedio: $560/ton</li>
                <li>• Forma: Escamas 77-80%</li>
                <li>• Aplicaciones: Control polvo, secante</li>
                <li>• Proveedores: Importaciones Químicas (90%)</li>
                <li>• Higroscopicidad: Alta, almacenamiento sellado</li>
              </ul>
            </div>

            {/* Hidróxido de Sodio */}
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <h4 className="font-medium text-cyan-800 dark:text-cyan-200">6. Hidróxido de Sodio - $420K (15%)</h4>
              <ul className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">
                <li>• Consumo anual: 800 tons</li>
                <li>• Precio promedio: $525/ton</li>
                <li>• Forma: Escamas 99%</li>
                <li>• Aplicaciones: Limpieza, neutralización, procesos</li>
                <li>• Proveedores: Productos Químicos Nacionales (60%)</li>
                <li>• Manipulación: Extremadamente cautelosa</li>
              </ul>
            </div>

            {/* Hidróxido de Calcio */}
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h4 className="font-medium text-pink-800 dark:text-pink-200">7. Hidróxido de Calcio - $168K (6%)</h4>
              <ul className="mt-2 text-sm text-pink-700 dark:text-pink-300">
                <li>• Consumo anual: 300 tons</li>
                <li>• Precio promedio: $560/ton</li>
                <li>• Pureza: 95%</li>
                <li>• Aplicaciones: Tratamiento aguas, construcción</li>
                <li>• Proveedores: Local (100%)</li>
                <li>• Almacenamiento: Protegido de humedad</li>
              </ul>
            </div>

            {/* Carbonato de Sodio */}
            <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
              <h4 className="font-medium text-lime-800 dark:text-lime-200">8. Carbonato de Sodio - $168K (6%)</h4>
              <ul className="mt-2 text-sm text-lime-700 dark:text-lime-300">
                <li>• Consumo anual: 300 tons</li>
                <li>• Precio promedio: $560/ton</li>
                <li>• Grado: Técnico 99%</li>
                <li>• Aplicaciones: Vidrio, detergentes, pH</li>
                <li>• Proveedores: Distribuidora Sur (70%)</li>
                <li>• Estabilidad: Excelente, no higroscópico</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Gestión y Optimización */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Gestión y Optimización de Insumos Químicos
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96">
              <BarChart 
                data={eficienciaUsoData} 
                darkMode={theme === 'dark'} 
                title="Evolución de Eficiencia en el Uso 2023"
              />
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <h4 className="font-medium text-indigo-800 dark:text-indigo-200">Estrategias de Optimización</h4>
                <ul className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
                  <li>• <strong>Dosificación automatizada:</strong> 12% de ahorro</li>
                  <li>• <strong>Recirculación:</strong> 8% de reducción consumo</li>
                  <li>• <strong>Proveedores locales:</strong> 15% menor costo logístico</li>
                  <li>• <strong>Compras consolidadas:</strong> 5% descuento volumen</li>
                  <li>• <strong>Control estricto inventario:</strong> 2% menos mermas</li>
                </ul>
              </div>
              
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <h4 className="font-medium text-teal-800 dark:text-teal-200">Seguridad y Ambiental</h4>
                <ul className="mt-2 text-sm text-teal-700 dark:text-teal-300">
                  <li>• <strong>Capacitación:</strong> 120 horas anuales</li>
                  <li>• <strong>EPIs especializados:</strong> $25K inversión</li>
                  <li>• <strong>Tratamiento efluentes:</strong> 95% eficiencia</li>
                  <li>• <strong>Certificaciones:</strong> ISO 9001, 14001</li>
                  <li>• <strong>Emergencias:</strong> 0 incidentes mayores</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-800 dark:text-orange-200">Riesgos y Desafíos</h4>
              <ul className="mt-2 text-sm text-orange-700 dark:text-orange-300">
                <li>• Volatilidad precios internacionales</li>
                <li>• Dependencia de importaciones</li>
                <li>• Exigencias ambientales crecientes</li>
                <li>• Escasez de técnicos especializados</li>
                <li>• Regulaciones transporte materiales peligrosos</li>
                <li>• Costos de almacenamiento especializado</li>
              </ul>
            </div>
            
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Oportunidades 2024</h4>
              <ul className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
                <li>• Producción in situ de algunos químicos</li>
                <li>• Economía circular (recuperación 20% materiales)</li>
                <li>• Digitalización gestión inventarios</li>
                <li>• Alianzas con universidades para I+D</li>
                <li>• Optimización logística ($45K ahorro potencial)</li>
                <li>• Sustitución por alternativas menos peligrosas</li>
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
            Metas y Proyecciones 2024
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Objetivos de Eficiencia</h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Reducción consumo: 8% ($224K ahorro)</li>
                <li>• Aumento eficiencia: 95% (meta)</li>
                <li>• Minimizar mermas: 1.2% (objetivo)</li>
                <li>• Rotación inventario: 15x</li>
                <li>• Digitalización: 100% procesos</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Inversiones Programadas</h4>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300">
                <li>• Sistema dosificación automática: $120K</li>
                <li>• Tanques almacenamiento: $80K</li>
                <li>• Sensores monitoreo: $45K</li>
                <li>• Capacitación especializada: $25K</li>
                <li>• Software gestión: $30K</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Indicadores Clave</h4>
              <ul className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                <li>• Costo por tonelada: -6% vs 2023</li>
                <li>• Disponibilidad: 99.5%</li>
                <li>• Calidad: 99.8% especificaciones</li>
                <li>• Seguridad: 0 accidentes</li>
                <li>• Ambiental: 100% compliance</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPIBox 
              title="Ahorro Esperado" 
              value="$224K" 
              trend="down"
              description="8% reducción"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Inversión 2024" 
              value="$300K" 
              trend="up"
              description="ROI: 2.8x"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Eficiencia Meta" 
              value="95%" 
              trend="up"
              description="+4% vs 2023"
              darkMode={theme === 'dark'}
              small
            />
            <KPIBox 
              title="Proveedores Locales" 
              value="65%" 
              trend="up"
              description="+15% vs 2023"
              darkMode={theme === 'dark'}
              small
            />
          </div>
        </motion.div>

      </div>
    </div>
  )
}