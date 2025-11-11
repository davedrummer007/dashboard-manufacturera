/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  transpilePackages: ['echarts', 'zrender', 'apexcharts'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: { 
    optimizeCss: false
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración para desarrollo
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' ? '*' : ''
          },
        ],
      },
    ]
  },
  
  // Configuración del servidor de desarrollo
  serverRuntimeConfig: {
    // Permite conexiones desde cualquier IP en desarrollo
    allowDevFromAllOrigins: process.env.NODE_ENV === 'development'
  },
  
  // Para evitar problemas de CORS en desarrollo
  webpack: (config, { isServer, dev }) => {
    if (dev && !isServer) {
      config.devServer = {
        ...config.devServer,
        allowedHosts: 'all'
      }
    }
    return config
  }
}

// Configuración específica para desarrollo
if (process.env.NODE_ENV === 'development') {
  nextConfig.env = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  }
}

module.exports = nextConfig