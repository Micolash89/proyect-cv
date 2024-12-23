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
}
