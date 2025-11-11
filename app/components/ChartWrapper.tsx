// components/ChartWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// ApexCharts con dynamic import
export const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
      <div className="text-gray-500">Cargando gráfico...</div>
    </div>
  )
});

// ECharts con dynamic import  
export const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
      <div className="text-gray-500">Cargando gráfico...</div>
    </div>
  )
});