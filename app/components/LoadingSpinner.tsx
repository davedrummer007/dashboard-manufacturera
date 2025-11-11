"use client";

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      {/* Contenedor principal con peso balanceado */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Anillo exterior con presencia */}
        <motion.div
          className="absolute inset-0 border-[1.5px] border-blue-200/60 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Círculo principal con peso adecuado */}
        <motion.div
          className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.03, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Spinner con grosor perfecto */}
          <motion.div
            className="w-14 h-14 border-[1.5px] border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      {/* Texto con presencia */}
      <div className="text-center space-y-3">
        <motion.h3 
          className="text-lg font-medium text-gray-700 dark:text-gray-300 tracking-wide"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Cargando información
        </motion.h3>
        
        {/* Puntos con peso visible */}
        <motion.div 
          className="flex justify-center space-x-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.15
              }}
            />
          ))}
        </motion.div>

        {/* Texto secundario con presencia */}
        <motion.p
          className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Por favor espere...
        </motion.p>
      </div>

      {/* Barra de progreso con grosor ideal */}
      <motion.div 
        className="w-52 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          animate={{ 
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}