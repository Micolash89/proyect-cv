import { CursoErrors, Education, ERROR_MESSAGES_CURSOS, ERROR_MESSAGES_EDUCATION, ERROR_MESSAGES_EXPERIENCE, ERROR_MESSAGES_IDIOMAS, ExperienceErrors, IdiomaErrors, REQUIRED_FIELDS_CURSOS, REQUIRED_FIELDS_EDUCATION, REQUIRED_FIELDS_EXPERIENCE, REQUIRED_FIELDS_IDIOMAS, ValidationErrors } from "./constFormRegister";

export const generatePagination = (currentPage: number, totalPages: number) => {

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let pages: (number | string)[] = [];

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  let rangeStart = Math.max(2, currentPage - 1);
  let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    rangeEnd = 4;
  } else if (currentPage >= totalPages - 2) {
    rangeStart = totalPages - 3;
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const validateEducation = (education: Education): ValidationErrors => {
  const errors: ValidationErrors = {};

  REQUIRED_FIELDS_EDUCATION.forEach(field => {
    if (education[field].length === 0) {
      errors[field] = [ERROR_MESSAGES_EDUCATION.required[field]];
    }
  });

  if (education.carrera.length > 80) {
    errors.carrera = errors.carrera || [];
    errors.carrera.push(ERROR_MESSAGES_EDUCATION.length.carrera);
  }

  if (education.institucion.length > 60) {
    errors.institucion = errors.institucion || [];
    errors.institucion.push(ERROR_MESSAGES_EDUCATION.length.institucion);
  }
  
  if (education.zonaInstitucion.length > 40) {
    errors.zonaInstitucion = errors.zonaInstitucion || [];
    errors.zonaInstitucion.push(ERROR_MESSAGES_EDUCATION.length.zonaInstitucion);
  }

  return errors;
};
export const validateExperience = (experience: ExperienceErrors): ValidationErrors => {
  const errors: ValidationErrors = {};

  REQUIRED_FIELDS_EXPERIENCE.forEach(field => {
    if (experience[field].length === 0) {
      errors[field] = [ERROR_MESSAGES_EXPERIENCE.required[field]];
    }
  });

  if (experience.puesto.length > 60) {
    errors.puesto = errors.puesto || [];
    errors.puesto.push(ERROR_MESSAGES_EXPERIENCE.length.puesto);
  }

  if (experience.nombreEmpresa.length > 35) {
    errors.nombreEmpresa = errors.nombreEmpresa || [];
    errors.nombreEmpresa.push(ERROR_MESSAGES_EXPERIENCE.length.nombreEmpresa);
  }

  if (experience.zonaEmpresa.length > 40) {
    errors.zonaEmpresa = errors.zonaEmpresa || [];
    errors.zonaEmpresa.push(ERROR_MESSAGES_EXPERIENCE.length.zonaEmpresa);
  }

  if (experience.descripcionExperiencia.length > 1000) {
    errors.descripcionExperiencia = errors.descripcionExperiencia || [];
    errors.descripcionExperiencia.push(ERROR_MESSAGES_EXPERIENCE.length.descripcionExperiencia);
  }

  return errors;
};

export const validateCursos = (curso: CursoErrors): ValidationErrors => {
  const errors: ValidationErrors = {};

  REQUIRED_FIELDS_CURSOS.forEach(field => {
    if (curso[field].length === 0) {
      errors[field] = [ERROR_MESSAGES_CURSOS.required[field]];
    }
  });

  if (curso.curso.length > 60) {
    errors.curso = errors.curso || [];
    errors.curso.push(ERROR_MESSAGES_CURSOS.length.curso);
  }

  if (curso.institucion.length > 60) {
    errors.institucion = errors.institucion || [];
    errors.institucion.push(ERROR_MESSAGES_CURSOS.length.institucion);
  }

  return errors;
};

export const validateIdiomas = (idioma: IdiomaErrors): ValidationErrors => {
  const errors: ValidationErrors = {};

  REQUIRED_FIELDS_IDIOMAS.forEach(field => {
    if (idioma[field].length === 0) {
      errors[field] = [ERROR_MESSAGES_IDIOMAS.required[field]];
    }
  });

  if (idioma.idioma.length > 30) {
    errors.idioma = errors.idioma || [];
    errors.idioma.push(ERROR_MESSAGES_IDIOMAS.length.idioma);
  }

  if (idioma.idioma.length < 2) {
    errors.idioma = errors.idioma || [];
    errors.idioma.push(ERROR_MESSAGES_IDIOMAS.lengthMin.idioma);
  }

  return errors;
};