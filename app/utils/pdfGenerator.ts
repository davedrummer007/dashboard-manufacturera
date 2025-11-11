// utils/pdfGenerator.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Genera y descarga el documento justificativo en PDF con múltiples páginas
 */
export const downloadJustificativoPDF = async () => {
  try {
    // Crear elementos separados para cada página
    const pages = [
      // PÁGINA 1: Header y Antecedentes
      `
      <div style="font-family: 'Arial', sans-serif; padding: 25px; background: white; color: black; min-height: 1100px;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 25px; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin-bottom: 15px; font-size: 28px; font-weight: bold;">
            DASHBOARD - ENCUESTA ANUAL DE UNIDADES ECONÓMICAS
          </h1>
          <p style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #374151;">
            Sistema de Análisis Estadístico del Sector Manufacturero
          </p>
          <p style="color: #6b7280; font-size: 16px;">Viceministerio de Políticas de Industrialización</p>
        </div>

        <!-- Sección 1: Antecedentes -->
        <div style="margin-bottom: 30px; padding: 20px; border-left: 4px solid #3b82f6; background-color: #f8fafc;">
          <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 20px;">1. ANTECEDENTES</h2>
          <p style="line-height: 1.6; color: #374151; margin-bottom: 15px;">
            El presente dashboard ha sido desarrollado como una herramienta de análisis estadístico para la 
            observación y seguimiento de las empresas del sector manufacturero. Su objetivo principal es 
            visualizar información clave sobre la estructura, desempeño y distribución de las unidades 
            económicas, a partir de una base de datos preliminar levantada mediante Encuesta Anual de 
            Unidades Económicas para el sector de la industria manufacturera.
          </p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #d97706; margin: 15px 0;">
            <strong style="color: #92400e;">⚠️ ETAPA PILOTO:</strong> 
            <span style="color: #92400e;">
              Esta versión se encuentra en etapa piloto, lo que implica que los datos presentados no son 
              definitivos ni consistenciados, y su función es validar la pertinencia de las variables, 
              los mecanismos de captura y los modelos de visualización aplicados.
            </span>
          </div>
        </div>

        <!-- Sección 2: Entidad Responsable -->
        <div style="margin-bottom: 30px; padding: 20px; border-left: 4px solid #10b981; background-color: #f8fafc;">
          <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 20px;">2. ENTIDAD RESPONSABLE</h2>
          <p style="line-height: 1.6; color: #374151;">
            El Viceministerio de Políticas de Industrialización, a través de la Dirección General de 
            Análisis Productiva Industrial y Economía Plural del Ministerio de Desarrollo Productivo 
            y Economía Plural.
          </p>
        </div>

        <!-- Sección 3: Objetivos -->
        <div style="margin-bottom: 30px; padding: 20px; border-left: 4px solid #8b5cf6; background-color: #f8fafc;">
          <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 20px;">3. OBJETIVOS DEL DASHBOARD PILOTO</h2>
          <p style="line-height: 1.6; color: #374151; margin-bottom: 15px;">
            Proveer una herramienta interactiva que permita explorar y analizar la información del 
            sector manufacturero a nivel de empresas, apoyando la toma de decisiones y la validación 
            metodológica del proceso estadístico.
          </p>
          <h3 style="color: #374151; margin-bottom: 10px;">Objetivos Específicos:</h3>
          <ul style="line-height: 1.6; color: #374151; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Validar la estructura de variables y su consistencia interna.</li>
            <li style="margin-bottom: 8px;">Identificar tendencias preliminares en tamaño, localización, rubro y desempeño económico de las empresas.</li>
            <li style="margin-bottom: 8px;">Evaluar la funcionalidad técnica y visual del dashboard.</li>
            <li style="margin-bottom: 8px;">Servir como base para el diseño de la versión definitiva del sistema estadístico sectorial.</li>
          </ul>
        </div>

        <!-- Footer Página 1 -->
        <div style="position: absolute; bottom: 30px; left: 0; right: 0; text-align: center; font-size: 12px; color: #64748b;">
          Página 1 de 3 - Continúa...
        </div>
      </div>
      `,

      // PÁGINA 2: Tabla de Datos Técnicos
      `
      <div style="font-family: 'Arial', sans-serif; padding: 25px; background: white; color: black; min-height: 1100px;">
        <!-- Header Página 2 -->
        <div style="text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 25px; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin-bottom: 15px; font-size: 28px; font-weight: bold;">
            DATOS TÉCNICOS - PRESENTACIÓN PRELIMINAR
          </h1>
          <p style="color: #6b7280; font-size: 16px;">Dashboard Encuesta Anual - Versión Piloto</p>
        </div>

        <!-- Tabla de Datos Técnicos -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px; font-size: 20px;">4. RESULTADOS PRELIMINARES POR GESTIÓN</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
            <thead>
              <tr style="background-color: #1e40af; color: white;">
                <th style="padding: 15px; border: 2px solid #374151; text-align: left; font-weight: bold; width: 40%;">INDICADOR</th>
                <th style="padding: 15px; border: 2px solid #374151; text-align: center; font-weight: bold; width: 20%;">2022</th>
                <th style="padding: 15px; border: 2px solid #374151; text-align: center; font-weight: bold; width: 20%;">2023</th>
                <th style="padding: 15px; border: 2px solid #374151; text-align: center; font-weight: bold; width: 20%;">2024</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #1e40af;">Unidades Económicas (Base Empresarial)</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">10.778</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">10.581</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">10.239</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #059669;">Completaron la Encuesta</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">4.037</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">7.905</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">5.036</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #dc2626;">Declararon con Movimiento (Ingresos)</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">2.939</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">5.129</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">3.092</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #d97706;">Declararon sin Movimiento</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">1.098</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">2.776</td>
                <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">1.944</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <p style="color: #0369a1; margin: 0; font-style: italic;">
              <strong>Nota:</strong> La información correspondiente al cierre contable 2024 continúa en proceso de recolección. 
              Los datos presentados son preliminares y sujetos a validación.
            </p>
          </div>
        </div>

        <!-- Análisis de Tendencias -->
        <div style="margin-bottom: 30px; padding: 20px; border-left: 4px solid #f59e0b; background-color: #f8fafc;">
          <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 20px;">TENDENCIAS OBSERVADAS</h2>
          <ul style="line-height: 1.6; color: #374151; padding-left: 20px;">
            <li style="margin-bottom: 8px;"><strong>Crecimiento 2022-2023:</strong> Incremento significativo en unidades que completaron la encuesta (+95.7%)</li>
            <li style="margin-bottom: 8px;"><strong>Estabilidad 2024:</strong> Consolidación del proceso de recolección con 5,036 encuestas completadas</li>
            <li style="margin-bottom: 8px;"><strong>Representatividad:</strong> 30.2% de la base empresarial completó la encuesta en 2024</li>
            <li style="margin-bottom: 8px;"><strong>Calidad de datos:</strong> 61.4% de las encuestas declararon movimiento económico</li>
          </ul>
        </div>

        <!-- Footer Página 2 -->
        <div style="position: absolute; bottom: 30px; left: 0; right: 0; text-align: center; font-size: 12px; color: #64748b;">
          Página 2 de 3 - Continúa...
        </div>
      </div>
      `,

      // PÁGINA 3: Metodología y Cierre
      `
      <div style="font-family: 'Arial', sans-serif; padding: 25px; background: white; color: black; min-height: 1100px;">
        <!-- Header Página 3 -->
        <div style="text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 25px; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin-bottom: 15px; font-size: 28px; font-weight: bold;">
            METODOLOGÍA Y CONSIDERACIONES FINALES
          </h1>
          <p style="color: #6b7280; font-size: 16px;">Aspectos Técnicos del Proceso Estadístico</p>
        </div>

        <!-- Sección 5: Metodología -->
        <div style="margin-bottom: 30px; padding: 20px; border-left: 4px solid #ef4444; background-color: #f8fafc;">
          <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 20px;">5. METODOLOGÍA</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">📋 Aspectos Temáticos</h3>
            <p style="line-height: 1.6; color: #374151;">
              Cuestionario e instrumento de recolección de información estructurado para capturar variables 
              económicas, financieras y operativas del sector manufacturero.
            </p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">🗺️ Cobertura Geográfica</h3>
            <p style="line-height: 1.6; color: #374151;">
              <strong>Alcance:</strong> Nacional<br>
              <strong>Población:</strong> Empresas inscritas en el Servicio Plurinacional de Registro de Comercio (SEPREC)<br>
              <strong>Distribución:</strong> Por departamento y sector económico
            </p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">📅 Periodo de Referencia</h3>
            <p style="line-height: 1.6; color: #374151;">
              <strong>Gestiones cubiertas:</strong> 2022 - 2024<br>
              <strong>2022:</strong> Periodo contable inicial<br>
              <strong>2023:</strong> Periodo contable completo<br>
              <strong>2024:</strong> En proceso de recolección (corte al mes de agosto 2025)
            </p>
          </div>

          <div style="margin-bottom: 15px;">
            <h3 style="color: #374151; margin-bottom: 10px;">🔍 Etapa de Consistencia</h3>
            <p style="line-height: 1.6; color: #374151;">
              <strong>Estado actual:</strong> En revisión<br>
              <strong>Consideración:</strong> Los datos pueden contener omisiones o inconsistencias propias del proceso de prueba
            </p>
          </div>
        </div>

        <!-- Advertencia Importante -->
        <div style="margin-bottom: 30px; padding: 20px; border: 2px solid #dc2626; background-color: #fef2f2; border-radius: 8px;">
          <h2 style="color: #dc2626; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚨 CONSIDERACIÓN TÉCNICA IMPORTANTE</h2>
          <p style="line-height: 1.6; color: #7f1d1d; margin-bottom: 10px;">
            <strong>Los resultados presentados en este dashboard NO deben ser interpretados como cifras oficiales.</strong>
          </p>
          <p style="line-height: 1.6; color: #7f1d1d;">
            Su función principal es exploratoria y de ajuste metodológico para validar la pertinencia de variables, 
            mecanismos de captura y modelos de visualización aplicados en esta etapa piloto.
          </p>
        </div>

        <!-- Footer Final -->
        <div style="margin-top: 40px; padding: 25px; background: #f8fafc; border-radius: 8px; text-align: center;">
          <p style="margin-bottom: 10px; font-weight: bold; color: #1e40af;">
            Ministerio de Desarrollo Productivo y Economía Plural
          </p>
          <p style="margin-bottom: 8px; color: #374151;">
            Viceministerio de Políticas de Industrialización
          </p>
          <p style="margin-bottom: 8px; color: #374151;">
            Dirección General de Análisis Productiva Industrial y Economía Plural
          </p>
          <p style="margin-bottom: 15px; color: #6b7280; font-size: 14px;">
            Resolución Ministerial MDPyEP/DESPACHO/Nº 056/2023 de 17 de mayo de 2023
          </p>
          <p style="color: #64748b; font-size: 12px;">
            Documento generado el ${new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}<br>
            Sistema de Dashboard - Versión Piloto 1.0
          </p>
        </div>

        <!-- Footer Página 3 -->
        <div style="position: absolute; bottom: 30px; left: 0; right: 0; text-align: center; font-size: 12px; color: #64748b;">
          Página 3 de 3 - Final del documento
        </div>
      </div>
      `
    ];

    // Crear PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const element = document.createElement('div');
      element.innerHTML = pages[i];
      element.style.position = 'fixed';
      element.style.left = '-9999px';
      element.style.top = '0';
      element.style.width = '800px';
      element.style.background = 'white';
      element.style.color = 'black';
      document.body.appendChild(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      document.body.removeChild(element);
    }

    // Descargar PDF final
    pdf.save(`Antecedentes_Justificativo_Dashboard_${new Date().toISOString().split('T')[0]}.pdf`);

  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Error al generar el PDF. Por favor, intente nuevamente.');
  }
};