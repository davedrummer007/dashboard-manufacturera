/**
 * Utilidades para formatear datos en gráficas
 */

/**
 * Formatea valores en millones con 5 cifras significativas y separadores
 * @param value - Valor numérico a formatear
 * @returns String formateado con separadores de miles
 */
export const formatMillions = (value: number): string => {
  const valueInMillions = value / 1000000;
  
  if (valueInMillions >= 1) {
    // Limitar a 5 cifras significativas y luego formatear
    const fiveDigitValue = parseFloat(valueInMillions.toPrecision(5));
    
    return fiveDigitValue.toLocaleString('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5
    });
  } else {
    return value.toLocaleString('de-DE');
  }
}

/**
 * Formatea valores monetarios para tooltips
 * @param value - Valor numérico a formatear  
 * @returns String formateado para tooltips
 */
export const formatTooltipMillions = (value: number): string => {
  return formatMillions(value);
}