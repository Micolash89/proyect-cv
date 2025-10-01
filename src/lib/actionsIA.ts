"use server";

import { GoogleGenAI } from "@google/genai";
import {
  Experiencia,
  EducacionIA as Educacion,
  CursoIA as Curso,
  IdiomaIA as Idioma,
} from "./definitions";
import { envConfig } from "@/config/envConfig";

const apiKey: string = envConfig.api_key_gemini || "";
const ai = new GoogleGenAI({ apiKey });

// Modelo actualizado (flash es más rápido y tiene mejor disponibilidad)
const model = "gemini-2.0-flash-exp";

// Configuración de generación
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

// Función auxiliar para reintentos con backoff exponencial
async function generateWithRetry(
  promptConfig: any,
  maxRetries = 3,
  baseDelay = 1000
): Promise<string> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Agregar delay entre requests para evitar rate limiting
      if (attempt > 0) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Reintento ${attempt + 1} después de ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const response = await ai.models.generateContent(promptConfig);
      return response.text || "";
    } catch (error: any) {
      lastError = error;
      console.error(`Error en intento ${attempt + 1}:`, error);

      // Si es error 503 (overloaded) y no es el último intento, reintentar
      if (error.status === 503 && attempt < maxRetries - 1) {
        continue;
      }

      // Si es otro tipo de error, lanzarlo inmediatamente
      if (error.status !== 503) {
        throw error;
      }
    }
  }

  // Si llegamos aquí, todos los reintentos fallaron
  throw new Error(
    `Gemini API sobrecargada después de ${maxRetries} intentos. Por favor intenta nuevamente en unos momentos.`
  );
}

// Rate limiting simple: controlar tiempo entre requests
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 500; // 500ms entre requests

async function rateLimitedRequest(promptConfig: any): Promise<string> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();
  return await generateWithRetry(promptConfig);
}

export async function generarPerfilExperiencia(
  experience: Experiencia[],
  educacion: Educacion[],
  cursos: Curso[],
  idiomas: Idioma[],
  orientadoCV: string
) {
  try {
    // let mensaje = experience
    //   .map(
    //     (e) =>
    //       `puesto: ${e.puesto}, empresa: ${e.nombreEmpresa}, año desde:${e.anioInicioExperiencia}, año hasta:${e.anioFinExperiencia}, descripción:${e.descripcionExperiencia};`
    //   )
    //   .join("\n");

    // mensaje += educacion
    //   .map(
    //     (e) =>
    //       `carrera: ${e.carrera}, estado:${e.estado}, estudios:${e.estudios}, institucion:${e.institucion}, inicio:${e.anioInicioEducacion}, fin:${e.anioFinEducacion};`
    //   )
    //   .join("\n");

    // mensaje += cursos
    //   .map((c) => `curso:${c.curso}, institucion:${c.institucion}, año:${c.anioInicioCurso};`)
    //   .join("\n");

    const response = await rateLimitedRequest({
      model,
      config: generationConfig,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Redacta un perfil profesional para un currículum vitae orientado a ${orientadoCV}. 

              REQUISITOS ESTRICTOS:
              - Escribe UN SOLO párrafo en primera persona
              - Tono formal, profesional y NATURAL (evita frases robóticas o genéricas típicas de IA)
              - Incluye palabras clave y términos técnicos específicos del sector ${orientadoCV} para optimizar ATS (Applicant Tracking Systems)
              - Varía la estructura de las oraciones para sonar más humano y auténtico
              - Incluye ÚNICAMENTE habilidades, experiencia y formación directamente relevantes para ${orientadoCV}
              - EXCLUYE completamente: estudios, cursos, certificaciones, habilidades técnicas o idiomas que NO estén relacionados con ${orientadoCV}
              - NO inventes ni agregues información técnica si no se proporciona
              - NO uses frases cliché como "profesional dinámico", "apasionado por", "orientado a resultados" a menos que sea genuino
              - NO repitas palabras innecesariamente
              - Enfócate en logros concretos y valor agregado para el puesto de ${orientadoCV}
              - Máximo: 120-150 palabras
                          
              El resultado debe ser conciso, impactante, con lenguaje natural y estratégicamente optimizado con keywords relevantes para ${orientadoCV} que mejoren la visibilidad en sistemas de reclutamiento automatizados.`,
            },
          ],
        },
      ],
    });

    return response;
  } catch (error: any) {
    console.error("Error en generarPerfilExperiencia:", error);

    // Devolver mensaje de error amigable en lugar de fallar
    if (error.message?.includes("sobrecargada")) {
      return "El servicio de IA está temporalmente ocupado. Por favor, intenta nuevamente en unos momentos.";
    }

    throw error;
  }
}

export async function generarItemsExperiencia(
  experience: Experiencia[],
  max: number
) {
  try {
    let mensaje = experience
      .map(
        (e) =>
          `puesto: ${e.puesto}, empresa: ${e.nombreEmpresa}, descripción:${e.descripcionExperiencia};`
      )
      .join("\n");

    const response = await rateLimitedRequest({
      model,
      config: generationConfig,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Redacta las tareas realizadas en el trabajo descrito a continuación. Genera exactamente ${max} tarea${
                max <= 1 ? "" : "s"
              }.
               REQUISITOS ESTRICTOS:
              - Cada tarea debe ser UN SOLO RENGLÓN (máximo 2 líneas si es absolutamente necesario)
              - Separa cada tarea con "\\n" al final
              - NO incluyas títulos, numeración, viñetas, ni formato markdown
              - NO identifiques ni marques cuál es cada tarea
              - Escribe en tono formal y profesional para currículum vitae
              - Usa verbos de acción en pasado (primera persona) para transmitir experiencia y logros concretos
              - Lenguaje NATURAL y auténtico, evita frases robóticas o genéricas de IA
              - Incluye resultados medibles cuando sea posible (cifras, porcentajes, alcance, impacto)
              - Varía los verbos de inicio para cada tarea, NO repitas el mismo verbo
              - Enfócate en logros y responsabilidades específicas del puesto
              - Optimiza con palabras clave relevantes para el sector del empleo

              VERBOS DE ACCIÓN RECOMENDADOS:
              - Liderazgo: Lideré, coordiné, supervisé, dirigí, gestioné, organicé, planifiqué, ejecuté, administré
              - Comunicación: Presenté, redacté, negocié, coordiné, facilité, documenté, persuadí, colaboré
              - Técnico: Desarrollé, diseñé, optimicé, programé, implementé, mantuve, automaticé, actualicé
              - Analítico: Analicé, evalué, identifiqué, investigué, mejoré, resolví, diagnostiqué
              - Resultados: Logré, incrementé, reduje, optimicé, superé, alcancé, obtuve, maximicé
              - Organizacional: Procesé, organicé, coordiné, controlé, implementé, simplifiqué, gestioné

              FORMATO DE SALIDA:
              Solo texto plano. Cada tarea en un renglón separado por "\\n". Sin introducción, sin explicación adicional. Listo para copiar y pegar directamente en un CV.

              Descripción del trabajo y tareas a desarrollar:
              ${mensaje}`,
            },
          ],
        },
      ],
    });

    return response;
  } catch (error: any) {
    console.error("Error en generarItemsExperiencia:", error);

    if (error.message?.includes("sobrecargada")) {
      return "El servicio de IA está temporalmente ocupado. Por favor, intenta nuevamente en unos momentos.";
    }

    throw error;
  }
}

export async function generarSkills(
  experience: Experiencia[],
  educacion: Educacion[],
  cursos: Curso[],
  idiomas: Idioma[],
  orientadoCV: string,
  max: string
) {
  try {
    let mensaje = experience
      .map(
        (e) =>
          `puesto: ${e.puesto}, empresa: ${e.nombreEmpresa}, descripción:${e.descripcionExperiencia};`
      )
      .join("\n");

    mensaje += educacion
      .map(
        (e) =>
          `carrera:${e.carrera}, estado:${e.estado}, estudios:${e.estudios};`
      )
      .join("\n");

    mensaje += cursos
      .map((c) => `curso:${c.curso}, institucion:${c.institucion};`)
      .join("\n");

    mensaje += idiomas
      .map((i) => `idioma:${i.idioma}, nivel:${i.nivel};`)
      .join("\n");

    const response = await rateLimitedRequest({
      model,
      config: generationConfig,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Genera una lista de palabras clave y habilidades soft skills estratégicamente seleccionadas para un currículum orientado a ${orientadoCV}.

            REQUISITOS ESTRICTOS:
            - Máximo ${max} palabras clave/habilidades en total
            - SOLO incluye habilidades y competencias estrictamente relevantes para ${orientadoCV}
            - Combina habilidades técnicas específicas del sector con soft skills aplicables al perfil de ${orientadoCV}
            - Las soft skills deben ser genuinas y coherentes con la experiencia de la persona, NO genéricas ni cliché
            - Excluye cualquier término que no esté directamente alineado con ${orientadoCV}
            - Prioriza palabras clave que optimicen la búsqueda en sistemas ATS (Applicant Tracking Systems)
            - Usa terminología actual y profesional del sector ${orientadoCV}
            - Evita repeticiones o sinónimos innecesarios
                        
            SOFT SKILLS VALORADAS (solo si aplican al perfil):
            Liderazgo, trabajo en equipo, resolución de problemas, comunicación efectiva, adaptabilidad, pensamiento crítico, gestión del tiempo, orientación a resultados, toma de decisiones, creatividad, negociación, análisis, organización, proactividad, empatía, colaboración interdisciplinaria
                        
            FORMATO DE SALIDA:
            Un solo renglón con las palabras clave separadas por ' • ' (espacio-punto-espacio). Sin markdown, sin títulos, sin numeración. Solo texto plano listo para copiar y pegar.
                        
            Ejemplo de formato: Gestión de proyectos • Análisis de datos • Liderazgo de equipos • Excel avanzado • Comunicación estratégica
                        
            Información de la persona:
            ${mensaje}`,
            },
          ],
        },
      ],
    });

    return response;
  } catch (error: any) {
    console.error("Error en generarSkills:", error);

    if (error.message?.includes("sobrecargada")) {
      return "El servicio de IA está temporalmente ocupado. Por favor, intenta nuevamente en unos momentos.";
    }

    throw error;
  }
}
