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
        await new Promise(resolve => setTimeout(resolve, delay));
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
    await new Promise(resolve =>
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
    let mensaje = experience
      .map(
        (e) =>
          `puesto: ${e.puesto}, empresa: ${e.nombreEmpresa}, año desde:${e.anioInicioExperiencia}, año hasta:${e.anioFinExperiencia}, descripción:${e.descripcionExperiencia};`
      )
      .join("\n");

    mensaje += educacion
      .map(
        (e) =>
          `carrera: ${e.carrera}, estado:${e.estado}, estudios:${e.estudios}, institucion:${e.institucion}, inicio:${e.anioInicioEducacion}, fin:${e.anioFinEducacion};`
      )
      .join("\n");

    mensaje += cursos
      .map((c) => `curso:${c.curso}, institucion:${c.institucion}, año:${c.anioInicioCurso};`)
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
              text: `Crea un perfil de ${orientadoCV} para un currículum vitae en un solo párrafo, en primera persona. Hazlo formal, solo con habilidades y experiencia aplicables al perfil de ${orientadoCV}. Ignora lo irrelevante.\n${mensaje}`,
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
              text: `Crea máximo ${max} párrafos con tareas laborales (1 por renglón) de manera formal para currículum. No uses títulos ni markdown, solo texto plano.\n${mensaje}`,
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
              text: `Genera una lista de palabras clave relevantes para ${orientadoCV}, máximo ${max}, en un solo renglón, separadas por '•'. Solo habilidades estrictamente alineadas con el perfil.\n${mensaje}`,
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