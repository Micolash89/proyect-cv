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

export interface ExperienceErrors{
  puesto: string;
  nombreEmpresa: string;
  anioInicioExperiencia: string;
  mesInicioExperiencia: string;
  anioFinExperiencia: string;
  descripcionExperiencia: string;
  zonaEmpresa: string;
}

export interface CursoErrors {
  curso: string;
  institucion: string;
  anioInicioCurso: string;
  mesInicioCurso: string;
}

export interface IdiomaErrors {
  idioma:string;
  nivel: string;
}

export interface ValidationErrors {
  [key: string]: string[];
}

export const REQUIRED_FIELDS_EDUCATION = [
  "carrera",
  "estudios",
  "estado",
  "anioInicioEducacion",
  "mesInicioEducacion",
  "anioFinEducacion",
] as const;

export const ERROR_MESSAGES_EDUCATION = {
  required: {
    carrera: "Ingrese nombre del titulo",
    estudios: "Seleccione nivel de estudios/carrera",
    estado: "Seleccione el estado",
    anioInicioEducacion: "Seleccione el año de inicio",
    mesInicioEducacion: "Seleccione el mes de inicio",
    anioFinEducacion: "Seleccione el año de fin",
  },
  length: {
    carrera: "El título debe tener menos de 60 caracteres",
    institucion: "la institución debe tener menos de 60 caracteres",
    zonaInstitucion: "la ubicación debe tener menos de 40 caracteres",
  },
} as const;

export const REQUIRED_FIELDS_EXPERIENCE = [
  "puesto",
  "anioInicioExperiencia",
  "mesInicioExperiencia",
  "anioFinExperiencia",
] as const;

export const ERROR_MESSAGES_EXPERIENCE = {
  required: {
    puesto: "Ingrese el nombre del puesto",
    anioInicioExperiencia: "Seleccione el año de inicio",
    mesInicioExperiencia: "Seleccione el mes de inicio",
    anioFinExperiencia: "Seleccione el año de fin",
  },
  length: {
    puesto: "El puesto debe tener menos de 40 caracteres",
    nombreEmpresa: "El nombre de la empresa debe tener menos de 35 caracteres",
    zonaEmpresa: "La ubicación debe tener menos de 40 caracteres",
    descripcionExperiencia: "La descripcion debe tener menos de 1000 caracteres",
  },
} as const;

export const REQUIRED_FIELDS_CURSOS = [
  "curso",
  "anioInicioCurso",
] as const;

export const ERROR_MESSAGES_CURSOS = {
  required: {
    curso:"Ingrese el nombre del curso",
    anioInicioCurso: "Seleccione el año de inicio",
  },
  length: {
    curso: "El curso debe tener menos de 60 caracteres",
    institucion: "La institución debe tener menos de 60 caracteres",
  },
} as const;

export const REQUIRED_FIELDS_IDIOMAS = [
  "idioma",
  "nivel",
] as const;

export const ERROR_MESSAGES_IDIOMAS = {
  required: {
    idioma:"Ingrese un idioma",
    nivel: "Seleccione un nivel",
  },
  length: {
    idioma: "El curso debe tener menos de 30 caracteres",
  },
  lengthMin:{
    idioma: "El curso debe tener al menos 2 caracteres",
  }
} as const;


