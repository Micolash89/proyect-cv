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

// Modelo actualizado
const model = "gemini-2.5-flash";

// Configuración de generación
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export async function generarPerfilExperiencia(
  experience: Experiencia[],
  educacion: Educacion[],
  cursos: Curso[],
  idiomas: Idioma[],
  orientadoCV: string
) {
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

  const response = await ai.models.generateContent({
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

  return response.text || "";
}

export async function generarItemsExperiencia(
  experience: Experiencia[],
  max: number
) {
  let mensaje = experience
    .map(
      (e) =>
        `puesto: ${e.puesto}, empresa: ${e.nombreEmpresa}, descripción:${e.descripcionExperiencia};`
    )
    .join("\n");

  const response = await ai.models.generateContent({
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

  return response.text || "";
}

export async function generarSkills(
  experience: Experiencia[],
  educacion: Educacion[],
  cursos: Curso[],
  idiomas: Idioma[],
  orientadoCV: string,
  max: string
) {
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

  const response = await ai.models.generateContent({
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

  return response.text || "";
}
