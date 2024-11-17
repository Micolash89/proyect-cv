/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

"use server";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { createResponse } from "./utils";
import { Experiencia } from "./actions";

 interface Curso {
  curso: string;
  institucion: string;
  anioInicioCurso: string;
}

 interface Idioma {
  idioma: string;
  nivel: string;
}

 interface Educacion {
  carrera: string;
  estado: string;
  estudios: string;
  institucion: string;
  zonaInstitucion: string;
  anioInicioEducacion: string;
  anioFinEducacion: string;
}

const apiKey: string = process.env.API_KEY_GEMINI || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function ActionIARun(formData: FormData) {
  const input = formData.get("input")?.toString();

  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Crea un perfil de currículum vitae en un solo párrafo. lo mas formal posible, solo mandame el parrafo nada mas",
          },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Claro, dime qué información quieres incluir en el perfil." },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(input as string);
  return createResponse(true, [result.response.text()], "se logro conectar");
}

export async function generarPerfilExperiencia(
  experience: Experiencia[],
  educacion: Educacion[],
  cursos: Curso[],
  idiomas: Idioma[],
  orientadoCV: string
) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Crea un perfil de ${orientadoCV} para un currículum vitae en un solo párrafo, en primera persona. Hazlo lo más formal posible. Incluye exclusivamente las habilidades y experiencia que sean directamente aplicables o beneficiosas para un perfil de ${orientadoCV}. Ignora toda información irrelevante, especialmente estudios, cursos, habilidades técnicas, o idiomas que no estén estrictamente relacionados con el perfil de ${orientadoCV}. Si no se especifican habilidades técnicas, no asumas ni añadas ninguna formación técnica adicional. Solo quiero un máximo de un párrafo con la información más relevante y específica para ${orientadoCV}.
`,
            // text: `Crea un perfil de ${orientadoCV} para un currículum vitae en un solo párrafo, en primera persona. lo mas formal posible, solo mandame el parrafo nada mas, yo te paso toda la información sobre el perfil y tu solo utiliza lo que sea relevante para crear un perfil relacionado con ${orientadoCV}, no es necesario que utilices todo solo lo relevante para ${orientadoCV}, solo quiero maximo un parrafo`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Claro, dime qué información quieres incluir en el perfil." },
        ],
      },
    ],
  });

  let mensaje = experience
    .map((e) => {
      return `puesto: ${e.puesto} , empresa: ${e.nombreEmpresa}, año desde:${e.anioInicioExperiencia}, año hasta:${e.anioFinExperiencia}, descripción de tareas realizadas:${e.descripcionExperiencia};`;
    })
    .join("\n");

  mensaje += educacion
    .map((e) => {
      return `carrera: ${e.carrera}, estado:${e.estado}, estudios:${e.estudios}, institucion:${e.institucion}, inicio:${e.anioInicioEducacion}, fin:${e.anioFinEducacion};`;
    })
    .join("\n");

  mensaje += cursos
    .map((c) => {
      return `curso:${c.curso}, institucion:${c.institucion}, año:${c.anioInicioCurso};`;
    })
    .join("\n");

  mensaje += idiomas
    .map((i) => {
      return `idioma:${i.idioma}, nivel:${i.nivel};`;
    })
    .join("\n");

  const result = await chatSession.sendMessage(mensaje);

  return result.response.text();
}
export async function generarItemsExperiencia(
  experience: Experiencia[],
  max: number
) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: `creame las tareas que desempeñaria en un trabajo en un renglón máximo en solo ${max} renglon${
              max < 1 ? "nes" : ""
            } de la tarea que con la descripcion de las tareas que te voy a indicar.solo quiero los renglones de las tareas desarrolladas por ti nada mas, es para copiar y pegar asi como esta, no quiero titulo ni que me lo marques de cual es cada una , yo me guio por el orden en que te lo fui dando, no quiero que me lo des con codigo markdown solo texto, solo separamelo con saltos de linea.escribilo para un curriculum asi que sea de manera formal`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Claro, dime qué información quieres incluir para la creación de tareas.",
          },
        ],
      },
    ],
  });

  let mensaje = "";
  experience.map((e) => {
    mensaje += `puesto: ${e.puesto} , empresa: ${e.nombreEmpresa}, descripción de tareas realizadas:${e.descripcionExperiencia};`;
  });

  const result = await chatSession.sendMessage(mensaje);

  return result.response.text();
}
export async function generarSkills(
  experience: Experiencia[],
  educacion: Educacion[],
  cursos: Curso[],
  idiomas: Idioma[],
  orientadoCV: string,
  max: string
) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Genera una lista de palabras clave exclusivamente relevantes para el perfil orientado a ${orientadoCV}, basada en las experiencias que voy a mencionar. Limítate a las habilidades, competencias, conocimientos, o tareas directamente relacionadas con ${orientadoCV}. Excluye cualquier término o habilidad que no esté estrictamente alineado con este perfil. No uses código markdown ni títulos, solo escribe las palabras clave de forma continua en un renglón, separadas por '•'. Asegúrate de que las palabras clave tengan un tono formal, adaptado para un currículum, solo palabras clave estritamente relacionadas con ${orientadoCV} o soft skills necesario para ${orientadoCV} que tengan que ver con el perfil de la persona, como maximo ${max},`,
            // text: `me puedes hacer palabras clave relacionado con ${orientadoCV} de las siguientes experiencias que te voy a mencionar lo quiero en un renglón, como maximo ${max}, las palabras desarrolladas por ti nada más, es para copiar y pegar asi como esta, no quiero titulo ni que me lo marques de cual es cada una , no quiero que me des solo el texto (no quiero que utilices codigo markdown), solo separamelo con '•' cada una de las palabras clave.escribilo para un curriculum asi que sea de manera formal, yo te voy a dar todo lo relacionado con el perfil de la persona y tu tomas lo necesario para generar palabras clave orientado a ${orientadoCV}`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Claro, dime qué información quieres incluir para la creación de habilidades.",
          },
        ],
      },
    ],
  });

  let mensaje = experience
    .map(
      (e) =>
        `puesto: ${e.puesto} , empresa: ${e.nombreEmpresa}, descripción de tareas realizadas:${e.descripcionExperiencia};`
    )
    .join("\n");

  mensaje += educacion
    .map(
      (e) => `carrera: ${e.carrera}, estado:${e.estado}, estudios:${e.estudios}`
    )
    .join("\n");

  mensaje += cursos
    .map((c) => `curso:${c.curso}, institucion:${c.institucion}`)
    .join("\n");

  mensaje += idiomas
    .map((i) => {
      return `idioma:${i.idioma}, nivel:${i.nivel};`;
    })
    .join("\n");

  const result = await chatSession.sendMessage(mensaje);

  return result.response.text();
}
