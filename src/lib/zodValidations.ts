import { z } from "zod";

const CreateSchemaUsuario = z.object({
  id: z.coerce.number({
    invalid_type_error: "El ID debe ser un número entero",
    message: "El ID debe ser un número entero",
  }),
  name: z
    .string({ message: "Ingrese un nombre" })
    .min(3, "Nombre: debe de tener al menos 3 caracteres")
    .max(25, "Nombre: puede contener hasta 25 caracteres")
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s\-\/]+$/, {
      message: "Nombre: solo se permiten caracteres o espacios",
    }),
  lastName: z
    .string({ message: "Ingrese un apellido" })
    .min(3, "Apellido: debe tener al menos 3 caracteres")
    .max(20, "Apellido: puede contener hasta 20 caracteres")
    .regex(
      /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s\-\/]+$/,
      "Apellido: solo se permiten caracteres o espacios"
    ),
  email: z
    .string({ message: "Ingrese un Correo Electrónico" })
    .max(40, "Correo Electrónico: puede contener hasta 40 caracteres")
    .refine((val) => val === "" || z.string().email().safeParse(val).success, {
      message: "Correo Electrónico: Debe ser válido",
    })
    .optional(),
  fechaNacimiento: z.coerce.date({
    message: "Seleccione una fecha de nacimiento",
  }),
  imagenPerfil: z.string({ message: "Seleccione una imagen" }).optional(),
  phone: z
    .string({ message: "Ingrese un teléfono" })
    .min(6, "Teléfono: debe tener al menos 6 caracteres")
    .max(20, "Teléfono: puede contener hasta 20 números")
    .regex(/^(?:[0-9]+)?$/, "Teléfono: solo se permiten numéros"),
  ciudad: z
    .string({ message: "Ingrese una ciudad" })
    .max(25, "Ciudad: puede contener hasta 25 caracteres")
    .regex(/^(?:[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\-\/\.]*)?$/, {
      message: "Solo se permiten caracteres o espacios",
    })
    .optional(),
  dni: z
    .string({ message: "Ingrese un DNI" })
    .max(8, "DNI: puede contener hasta 8 caracteres")
    .regex(/^(?:[0-9]+)?$/, "DNI: solo se permiten numéros")
    .optional(),
  provincia: z
    .string({ message: "Seleccione una provincia" })
    .max(25, "Provincia: puede contener hasta 25 caracteres")
    .regex(/^(?:[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\-\/\.]*)?$/, {
      message: "Solo se permiten caracteres o espacios",
    }),
  education: z.array(
    z.object({
      carrera: z
        .string({ message: "Ingrese el nombre de la carrera/titulo" })
        .max(60, "la carrera puede contener hasta 60 caracteres"),
      estado: z.string({ message: "Seleccione el estado" }),
      institucion: z
        .string()
        .max(60, "La institución pueden contener hasta 60 caracteres"),
      zonaInstitucion: z
        .string()
        .min(4, "La ubicación debe de tener al menos 4 caracteres")
        .max(40, "La ubicación puede contener hasta 40 caracteres"),
      estudios: z.string({ message: "Ingrese el nivel del estudio" }),
      anioInicioEducacion: z
        .string()
        .min(4, "Seleccione el año de inicio de los estudios"),
      anioFinEducacion: z.string({
        message: "Seleccione el año de fin de los estudios",
      }),
      mesInicioEducacion: z
        .string({ message: "Seleccione el mes de inicio de los estudios" })
        .max(
          2,
          "El mes de inicio de los estudios puede contener hasta 2 caracteres"
        )
        .optional(),
      mesFinEducacion: z
        .string({ message: "Seleccione el mes de fin de los estudios" })
        .max(
          2,
          "El mes de fin de los estudios puede contener hasta 2 caracteres"
        )
        .optional(),
    })
  ),
  experience: z.array(
    z.object({
      puesto: z
        .string()
        .max(40, "El puesto puede contener hasta 40 caracteres"),
      nombreEmpresa: z
        .string()
        .max(35, "El nombre de la empresa puede contener hasta 35 caracteres")
        .optional(),
      zonaEmpresa: z
        .string()
        .max(40, "El puesto puede contener hasta 40 caracteres")
        .optional(),
      anioInicioExperiencia: z
        .string()
        .min(4, "Seleccione el año de inicio de la experiencia"),
      mesInicioExperiencia: z
        .string()
        .max(
          2,
          "El mes de inicio de la experiencia puede contener hasta 2 caracteres"
        ),
      anioFinExperiencia: z
        .string()
        .min(4, "Seleccione el año de fin de la experiencia"),
      mesFinExperiencia: z
        .string()
        .max(
          2,
          "El mes de fin de la experiencia puede contener hasta 2 caracteres"
        )
        .optional(),
      descripcionExperiencia: z
        .string({
          message: "Debe ingresar una descripción",
        })
        .max(1000, "La descripción puede contener hasta 1000 caracteres")
        .optional(),
    })
  ),
  cursos: z.array(
    z.object({
      curso: z.string().max(60, "El curso puede contener hasta 60 caracteres"),
      institucion: z
        .string()
        .max(60, "La institución puede contener hasta 60 caracteres")
        .optional(),
      anioInicioCurso: z
        .string()
        .min(4, "Seleccione el año de inicio del curso"),
      mesInicioCurso: z
        .string()
        .max(2, "El mes de inicio del curso puede contener hasta 2 caracteres")
        .optional(),
    })
  ),
  idiomas: z.array(
    z
      .object({
        idioma: z
          .string({ message: "Seleccione el idioma" })
          .min(2, "El idiomas debe de tener al menos 2 caracteres")
          .max(30, "El idiomas puede contener hasta 30 caracteres"),
        nivel: z.string({ message: "Seleccione el nivel" }),
      })
      .optional()
  ),
  licencia: z.string({ message: "Seleccione una opción" }).optional(),
  movilidad: z.string({ message: "Seleccione una opción" }).optional(),
  incorporacion: z.string({ message: "Seleccione una opción" }).optional(),
  disponibilidad: z.string({ message: "Seleccione una opción" }).optional(),
  office: z.string({ message: "Seleccione una opción" }).optional(),
  orientadoCV: z.string({ message: "Ingrese una orientación" }).max(1000, "La orientación puede contener hasta 1000 caracteres").optional(),
  idCVTemplate: z.number({ message: "Falta ID del Template del CV" }),
  color: z.string({ message: "Seleccione un color" }),
  template: z.coerce.number({
    message: "Seleccione un template",
  }),
});

export const CreateUsuario = CreateSchemaUsuario.omit({
  id: true,
  idCVTemplate: true,
});

export const UpdateUsuario = CreateSchemaUsuario.omit({});

export const GetUsuario = CreateSchemaUsuario.omit({
  name: true,
  lastName: true,
  idCVTemplate: true,
  email: true,
  imagenPerfil: true,
  fechaNacimiento: true,
  dni: true,
  phone: true,
  ciudad: true,
  provincia: true,
  education: true,
  experience: true,
  cursos: true,
  idiomas: true,
  licencia: true,
  movilidad: true,
  incorporacion: true,
  disponibilidad: true,
  office: true,
  orientadoCV: true,
  color: true,
  template: true,
});

export const createSchemaLogin = z.object({
  email: z
    .string()
    .min(1, "el email es requerido")
    .email({ message: "debe ser un email valido" }),
  password: z
    .string()
    .min(1, "la contraseña es requerida")
    .min(6, "la contraseña debe de tener al menos 6 caracteres"),
});
