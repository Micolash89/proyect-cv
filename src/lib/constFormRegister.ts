import { ArraySelectInput } from "@/lib/definitions";

export const idiomasSelect: ArraySelectInput[] = [
  { value: "", name: "Seleccione nivel" },
  { value: "BASICO", name: "Básico" },
  { value: "INTERMEDIO", name: "Intermedio" },
  { value: "AVANZADO", name: "Avanzado" },
  { value: "NATIVO", name: "Nativo" },
];

export const educacionEstadoSelect: ArraySelectInput[] = [
  { value: "", name: "Seleccione un estado" },
  { value: "COMPLETO", name: "Completo" },
  { value: "PROCESO", name: "En proceso" },
  { value: "INCOMPLETO", name: "Incompleto" },
];

export const educacionNivelSelect: ArraySelectInput[] = [
  { value: "", name: "Seleccione nivel" },
  { value: "UNIVERSIDAD", name: "Universidad" },
  { value: "SECUNDARIO", name: "Secundaria" },
  { value: "PRIMARIO", name: "Primaria" },
];

export interface Education {
  estudios: string;
  estado: string;
  carrera: string;
  institucion: string;
  zonaInstitucion: string;
  anioInicioEducacion: string;
  anioFinEducacion: string;
  mesInicioEducacion: string;
  mesFinEducacion: string;
}

export interface ValidationErrors {
  [key: string]: string[];
}

export const REQUIRED_FIELDS = [
  "carrera",
  "estudios",
  "estado",
  "anioInicioEducacion",
  "mesInicioEducacion",
  "anioFinEducacion",
] as const;

export const ERROR_MESSAGES = {
  required: {
    carrera: "ingrese nombre del titulo",
    estudios: "seleccione nivel de estudios/carrera",
    estado: "seleccione el estado",
    anioInicioEducacion: "seleccione el año de inicio",
    mesInicioEducacion: "seleccione el mes de inicio",
    anioFinEducacion: "seleccione el año de fin",
  },
  length: {
    carrera: "el título debe tener menos de 60 caracteres",
  },
} as const;
