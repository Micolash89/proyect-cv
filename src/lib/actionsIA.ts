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

export async function generarPerfilExperiencia(experience:Experiencia[]){
  
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Crea un perfil de currículum vitae en un solo párrafo, en primera persona. lo mas formal posible, maximo un parrafo",
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

  let mensaje = "";
  experience.map(e=>{
    mensaje+=`puesto: ${e.puesto} , empresa: ${e.nombreEmpresa}, año desde:${e.anioInicioExperiencia}, año hasta:${e.anioFinExperiencia}, descripción de tareas realizadas:${e.descripcionExperiencia};`
  })

  const result = await chatSession.sendMessage(mensaje);

  return result.response.text();
}
export async function generarItemsExperiencia(experience:Experiencia[], max : number){
  
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: `creame las tareas que desempeñaria en un trabajo en un renglón máximo ${max} renglon${max<1?"nes":""} de la tarea que con la descripcion de las tareas que te voy a indicar.solo quiero los renglones de las tareas desarrolladas por ti nada mas, es para copiar y pegar asi como esta, no quiero titulo ni que me lo marques de cual es cada una , yo me guio por el orden en que te lo fui dando, no quiero que me lo des con codigo markdown solo texto, solo separamelo con saltos de linea.escribilo para un curriculum asi que sea de manera formal`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Claro, dime qué información quieres incluir para la creación de tareas." },
        ],
      },
    ],
  });

  let mensaje = "";
  experience.map(e=>{
    mensaje+=`puesto: ${e.puesto} , empresa: ${e.nombreEmpresa}, descripción de tareas realizadas:${e.descripcionExperiencia};`
  })

  const result = await chatSession.sendMessage(mensaje);

  return result.response.text();
}
export async function generarSkills(experience:Experiencia[], max : string){

  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: `me puedes hacer palabras clave de las siguientes experiencias que te voy a mencionar lo quiero en un renglón, como maximo ${max}, las palbras desarrolladas por ti nada más, es para copiar y pegar asi como esta, no quiero titulo ni que me lo marques de cual es cada una , no quiero que me lo des con codigo markdown solo texto, solo separamelo con '|' cada una.escribilo para un curriculum asi que sea de manera formal `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Claro, dime qué información quieres incluir para la creación de habilidades." },
        ],
      },
    ],
  });

  let mensaje = "";
  experience.map(e=>{
    mensaje+=`puesto: ${e.puesto} , empresa: ${e.nombreEmpresa}, descripción de tareas realizadas:${e.descripcionExperiencia};`
  })

  const result = await chatSession.sendMessage(mensaje);

  return result.response.text();
}
