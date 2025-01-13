import { Education, ERROR_MESSAGES, REQUIRED_FIELDS, ValidationErrors } from "./constFormRegister";

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

  // Validar campos requeridos
  REQUIRED_FIELDS.forEach(field => {
    if (education[field].length === 0) {
      errors[field] = [ERROR_MESSAGES.required[field]];
    }
  });

  // Validaciones adicionales
  if (education.carrera.length > 60) {
    errors.carrera = errors.carrera || [];
    errors.carrera.push(ERROR_MESSAGES.length.carrera);
  }

  // Aquí puedes agregar más validaciones personalizadas
  // Por ejemplo, validar que la fecha de fin sea posterior a la de inicio
  // if (education.anioFinEducacion && education.anioInicioEducacion) {
  //   const startYear = parseInt(education.anioInicioEducacion);
  //   const endYear = parseInt(education.anioFinEducacion);
  //   if (endYear < startYear) {
  //     errors.anioFinEducacion = errors.anioFinEducacion || [];
  //     errors.anioFinEducacion.push('El año de fin debe ser posterior al año de inicio');
  //   }
  // }

  return errors;
};