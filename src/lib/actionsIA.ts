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
            text: "Crea un perfil de currículum vitae en un solo párrafo, en primera persona. lo mas formal posible, solo maximo un parrafo",
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
    mensaje+=`puesto: ${e.puesto} , empresa: ${e.nombreEmpresa}, año desde:${e.anioInicioExperiencia}, año hasta:${e.anioFinExperiencia};`
  })

  const result = await chatSession.sendMessage(mensaje);
  //return createResponse(true, [result.response.text()], "se logro conectar");

  return result.response.text();
}
