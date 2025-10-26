export const animationThemes = {
  // Tema 1: Fade con slide suave (Capítulo 1 - Ingresos)
  fadeSlide: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  },

  // Tema 2: Scale con fade (Capítulo 2 - Inventarios)
  scaleFade: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.15
        }
      }
    },
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }
    }
  },

  // Tema 3: Slide desde derecha (Capítulo 3 - Personal)
  slideRight: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  },

  // Tema 4: Flip card (Capítulo 4 - Materias Primas)
  flip: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.25
        }
      }
    },
    item: {
      hidden: { opacity: 0, rotateY: -15 },
      visible: {
        opacity: 1,
        rotateY: 0,
        transition: {
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }
    }
  },

  // Tema 5: Bounce suave (Capítulo 5 - Productos)
  bounce: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.18
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          ease: [0.34, 1.56, 0.64, 1],
          type: "spring",
          damping: 10,
          stiffness: 100
        }
      }
    }
  },

  // Tema 6: Rotación suave (Capítulo 6 - Gastos)
  rotate: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.13,
          delayChildren: 0.22
        }
      }
    },
    item: {
      hidden: { opacity: 0, rotate: -5 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: {
          duration: 0.65,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }
    }
  },

  // Tema 7: Zoom elegante (Capítulo 7 - Activos Fijos Grandes)
  zoom: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.11,
          delayChildren: 0.19
        }
      }
    },
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.75,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }
    }
  },

  // Tema 8: Desplazamiento desde abajo (Capítulo 8 - MIPYMES)
  slideUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.09,
          delayChildren: 0.16
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  },

  // Tema 9: Efecto de aparición (Capítulo 9 - Químicos)
  appear: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.14,
          delayChildren: 0.28
        }
      }
    },
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.85,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }
    }
  }
}

// Función para obtener animación por capítulo
export const getAnimationByChapter = (chapter: number) => {
  const themes = [
    animationThemes.fadeSlide,    // Capítulo 1 - Ingresos
    animationThemes.scaleFade,    // Capítulo 2 - Inventarios  
    animationThemes.slideRight,   // Capítulo 3 - Personal
    animationThemes.flip,         // Capítulo 4 - Materias Primas
    animationThemes.bounce,       // Capítulo 5 - Productos
    animationThemes.rotate,       // Capítulo 6 - Gastos
    animationThemes.zoom,         // Capítulo 7 - Activos Fijos Grandes
    animationThemes.slideUp,      // Capítulo 8 - MIPYMES
    animationThemes.appear        // Capítulo 9 - Químicos
  ]
  
  return themes[chapter - 1] || animationThemes.fadeSlide;
}

// Función para obtener animación por módulo (letras)
export const getAnimationByModule = (module: string) => {
  const moduleThemes: { [key: string]: any } = {
    'A': animationThemes.fadeSlide,     // Módulo A
    'B': animationThemes.scaleFade,     // Módulo B - Sistemas Gestión
    'C': animationThemes.slideRight,    // Módulo C
    'D': animationThemes.flip,          // Módulo D
    'E': animationThemes.bounce,        // Módulo E
    'F': animationThemes.rotate,        // Módulo F
    'G': animationThemes.zoom           // Módulo G
  }
  
  return moduleThemes[module] || animationThemes.fadeSlide;
}

// Animaciones para la página de inicio
export const homeAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }
}

// Añadir la exportación de pageTransition que falta
export const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5
};