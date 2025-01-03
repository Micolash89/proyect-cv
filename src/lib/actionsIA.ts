"use server";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { createResponse } from "./utils";
import { Experiencia } from "./definitions";

export interface Curso {
  curso: string;
  institucion: string;
  anioInicioCurso: string;
}

export interface Idioma {
  idioma: string;
  nivel: string;
}

export interface Educacion {
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
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function ActionIARun(formData: FormData) {
  const input = formData.get("input")?.toString();

  const chatSession = model.startChat({
    generationConfig,
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
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Crea un perfil de ${orientadoCV} para un currículum vitae en un solo párrafo, en primera persona. Hazlo lo más formal posible. Incluye exclusivamente las habilidades y experiencia que sean directamente aplicables o beneficiosas para un perfil de ${orientadoCV}. Ignora toda información irrelevante, especialmente estudios, cursos, habilidades técnicas, o idiomas que no estén estrictamente relacionados con el perfil de ${orientadoCV}. Si no se especifican habilidades técnicas, no asumas ni añadas ninguna formación técnica adicional. Solo quiero un máximo de un párrafo con la información más relevante y específica para ${orientadoCV}.
`,
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
    history: [
      {
        role: "user",
        parts: [
          {
            text: `creame las tareas que desempeñaria en un trabajo en un renglón máximo en solo ${max} renglon${
              max < 1 ? "nes" : ""
            } de la tarea que con la descripción de las tareas que te voy a indicar.solo quiero los párrafos de las tareas desarrolladas por ti nada más, es para copiar y pegar asi como esta, no quiero titulo ni que me lo marques de cual es cada una , yo me guio por el orden en que te lo fui dando, no quiero que me lo des con codigo markdown solo texto. escribelo para un curriculum asi que sea de manera formal,que este separados en parrafos para cada una de las tareas al final de cada parrafo con un "\n", los verbos de acción que se recomiendan para un currículum
            
Liderazgo
Logré, alcancé, contraté, coordiné, manejé, lideré, organicé, supervisé, regulé, reorganicé, administré, delegé, impacté, planifiqué, revisé, analicé, desarrollé, mejoré, predije, programé, asigné, dirigí, incrementé, prioricé, encabezé, obtuve, gané, lideré, produje, fortalezcí, presidí, evalué, dominé, comprobé, supervisé, consolidé, ejecuté, orquesté, recomendé y superé.

Comunicación
Dirigí, arbitré, desarrollé, dirigí, influí, interpreté, presenté, promocioné, sugerí, sinteticé, arreglé, documenté, dicté, publiqué, traduje, autoricé, redacté, coordiné, reconcilié, verbalicé, colaboré, edité, medié, recuté, escribí, convencí, energicé, moderé, reporté, correspondí, alisté, negocié, reescribí, entregué, formulé, persuadí y hablé.

Investigación
Aclaré, diagnosticé, interpreté, encuesté, recopilé, descubrí, entrevisté, sistematicé, concluí, evalué, investigué, probé, realicé, examiné, modelé, construí, extraje, organicé, critiqué, formé, resolví, derivé, identifiqué, revisé, determiné, inspeccioné y resumí.

Técnico
Armé, instalé, resolví, construí, mantuve, estandaricé, calculé, operé, optimice, computé, optimice, actualicé, diseñé, reacondicioné, ideé, programé, diseñé, remodelé, fabriqué y reparé.

Enseñanza
Adapté, habilité, persuadí, aconsejé, animé, establecí metas, aclaré, evalué, estimulé, entrené, expliqué, estudié, comuniqué, facilité, enseñé, coordiné, guíe, entrené, desmitifiqué, informé, desarrollé e instruí.

Cuantitativo
Administré, asigné, computé, desarrollé, proyecté, investigué, analicé, pronostiqué, evalué, manejé, audité, mercadeé, balanceé, maximicé, presupuesté, minimicé, calculé y planifiqué.

Creativo
Actué, dirigí, introduje, revitalicé, compuse, establecí, inventé, moldeé, concebí, formé, originé, visualicé, conceptualicé, fundé, realicé, creé, ilustré, planifiqué, personalicé, inicié, publiqué, diseñé, instituí, rediseñé, desarrollé, integré y revisé.

Ayuda
Evalué, mejoré, provee, asistí, aceleré, referí, aclaré, facilité, rehabilité, entrené, familiaricé, representé, aconsejé, guíe, serví, demostré, motivé, apoyé, diagnosticé, participé, eduqué y propuse.

Organizacional
Aprobé, aceleré, clasifiqué, recopilé, expandió, gané, operé, organicé, recuperé, filtré, sistematicé, tabulé, añadí, compilé, recopilé, preparé, seleccioné, unifiqué, arranqué, completé, generé, procesé, simplifiqué, actualicé, amplié, controlé, implementé, compré, vendí, utilicé, catalogué, definí, inspeccioné, registré, especifiqué, validé, centralicé, despaché, lancé, reduje, dirigí y verifiqué.
            `,
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
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Genera una lista de palabras clave exclusivamente relevantes para el perfil orientado a ${orientadoCV}, basada en las experiencias que voy a mencionar. Limítate a las habilidades, competencias, conocimientos, o tareas directamente relacionadas con ${orientadoCV}. Excluye cualquier término o habilidad que no esté estrictamente alineado con este perfil. No uses código markdown ni títulos, solo escribe las palabras clave de forma continua en un renglón, separadas por '•'. Asegúrate de que las palabras clave tengan un tono formal, adaptado para un currículum, solo palabras clave estritamente relacionadas con ${orientadoCV} o soft skills necesario para ${orientadoCV} que tengan que ver con el perfil de la persona, como maximo ${max},`,
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
