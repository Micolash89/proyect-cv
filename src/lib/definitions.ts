export interface CVDataPdf {
  name: string;
  lastName: string;
  email: string;
  fechaNacimiento: string;
  dni: string;
  phone: string;
  ciudad: string;
  provincia: string;
  imagenPerfil: string;
  orientadoCV: string;
  education: Array<{
    carrera: string;
    estado: string;
    estudios: string;
    institucion: string;
    zonaInstitucion: string;
    anioInicioEducacion: string;
    mesInicioEducacion: string;
    anioFinEducacion: string;
    mesFinEducacion:string;
  }>;
  experience: Array<{
    nombreEmpresa: string;
    puesto: string;
    zonaEmpresa: string;
    anioInicioExperiencia: string;
    mesInicioExperiencia: string;
    anioFinExperiencia: string;
    mesFinExperiencia: string;
    descripcionExperiencia: string;
  }>;
  cursos: Array<{
    curso: string;
    institucion: string;
    anioInicioCurso: string;
    mesInicioCurso: string;
  }>;
  idiomas: Array<{
    idioma: string;
    nivel: string;
  }>;
  licencia: string;
  movilidad: string;
  incorporacion: string;
  disponibilidad: string;
  office: string;
}

export interface CVData {
  name: string;
  lastName: string;
  email: string;
  fechaNacimiento: string;
  dni: string;
  phone: string;
  ciudad: string;
  provincia: string;
  imagenPerfil: string;
  education: Array<{
    carrera: string;
    estado: string;
    estudios: string;
    institucion: string;
    zonaInstitucion: string;
    anioInicioEducacion: string;
    anioFinEducacion: string;
  }>;
  experience: Array<{
    nombreEmpresa: string;
    puesto: string;
    zonaEmpresa: string;
    anioInicioExperiencia: string;
    anioFinExperiencia: string;
    descripcionExperiencia: string;
  }>;
  cursos: Array<{
    curso: string;
    institucion: string;
    anioInicioCurso: string;
  }>;
  idiomas: Array<{
    idioma: string;
    nivel: string;
  }>;
  licencia: string;
  movilidad: string;
  incorporacion: string;
  disponibilidad: string;
  office: string;
}

export interface TypeIAData {
  profile: string;
  skills: string;
  descriptionWork: string;
}

export interface Template {
  id: number;
  image: string;
  colors: string[];
}

export interface OptionsPDF {
  color: string;
  spaceBetween: boolean;
  orientacionCVTitle:boolean;
  tipoPdf: number;
  contadorContent: number;
  reverseExperience:boolean;
  reverseEducation:boolean;
  reverseCursos:boolean;
  fullName:boolean;
}

export interface Experiencia {
  puesto: string;
  nombreEmpresa: string;
  anioInicioExperiencia: string;
  anioFinExperiencia: string;
  descripcionExperiencia: string;
}

export interface Errors {
  [key: string]: string[];
}

 export interface EducationErrors {
  estudios: string[];
  estado: string[];
  carrera: string[];
  anioInicioEducacion: string[];
  mesInicioEducacion: string[];
  anioFinEducacion: string[];
}

export interface ArraySelectInput{
  value: string;
  name: string;
}

export interface UserTable{
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento: Date;
  email: string;
  ciudad: string;
  imagenPerfil: string;
  provincia: string;
  linkedin: string;
  dni: string;
  visto: boolean;
  orientacionCV: string;
  cvTemplateId: number | null;
}

export type Section =
  | "personal"
  | "education"
  | "experience"
  | "cursos"
  | "idiomas"
  | "informacionA"
  | "orientacionCV"
  | "CVTemplateSelector";

  export interface CVDataTemplateSelector {
    template: number;
    color: string;
  }