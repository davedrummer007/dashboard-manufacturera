// types/apexcharts.d.ts
import { ApexOptions } from 'apexcharts'

declare module 'apexcharts' {
  interface ApexOptions {
    chart?: {
      animations?: {
        enabled?: boolean
        easing?: string
        speed?: number
        animateGradually?: {
          enabled?: boolean
          delay?: number
        }
        dynamicAnimation?: {
          enabled?: boolean
          speed?: number
        }
      }
    }
    grid?: {
      yaxis?: {
        lines?: {
          show?: boolean
          opacity?: number
        }
      }
    }
    legend?: {
      markers?: {
        width?: number
        height?: number
        radius?: number
        offsetX?: number
        offsetY?: number
      }
    }
    states?: {
      hover?: {
        filter?: {
          type?: string
          value?: number
        }
      }
      active?: {
        filter?: {
          type?: string
          value?: number
        }
      }
    }
  }
}