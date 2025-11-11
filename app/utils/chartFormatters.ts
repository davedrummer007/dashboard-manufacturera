export const formatMillions = (value: number): string => {
  const valueInMillions = value / 1000000;
  
  if (valueInMillions >= 1) {
    // Truncar a número entero (eliminar decimales sin redondear)
    const integerValue = Math.trunc(valueInMillions);
    
    return integerValue.toLocaleString('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  } else {
    // Para valores menores a 1 millón
    return Math.trunc(value).toLocaleString('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
}