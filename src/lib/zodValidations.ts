import { z } from "zod";

const CreateSchemaUsuario = z.object({
  id: z.coerce.number(),
  name: z
    .string({ message: "Ingrese un nombre" })
    .min(4, "El nombre debe de tener al menos 4 caracteres")
    .max(25, "El nombre puede contener hasta 25 caracteres")
    .regex(/^[a-zA-ZñÑ\s]+$/, {
      message: "Solo se permiten catacteres o espacios",
    }),
  lastName: z
    .string({ message: "ingrese un apellido" })
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .max(15, "El apellido puede contener hasta 25 caracteres")
    .regex(/^[a-zA-ZñÑ\s]+$/, "Solo se permiten catacteres o espacios"),
  email: z
    .string({ message: "Ingrese un Correo Electrónico" })
    .email("Debe ser un Correo Electrónico válido")
    .min(6, "El Correo Electrónico debe tener al menos 6 caracteres")
    .max(40, "El Correo Electrónico puede contener hasta 50 caracteres"),
  fechaNacimiento: z.coerce.date({
    message: "Seleccione una fecha de nacimiento",
  }),
  imagenPerfil: z.string({ message: "Seleccione una imagen" }).optional(),
  phone: z
    .string({ message: "Ingrese un teléfono" })
    .min(6, "El teléfono debe tener al menos 6 caracteres")
    .max(20, "El teléfono puede contener hasta 20 números")
      .regex(/^[0-9]+$/, "Solo se permiten numéros"),
  ciudad: z
    .string({ message: "Ingrese una ciudad" })
    .max(25, "La ciudad puede contener hasta 25 caracteres")
    .regex(/^[a-zA-ZñÑ\s]+$/, {
      message: "Solo se permiten catacteres o espacios",
    })
    .optional(),
  dni: z.string({ message: "Ingrese un DNI" })
  .max(8, "El DNI puede contener hasta 8 caracteres")
  .regex(/^[0-9]+$/, "Solo se permiten numéros").optional(),
  provincia: z
    .string({ message: "Seleccione una provincia" })
    
    .max(25, "La provincia puede contener hasta 25 caracteres")
    .regex(/^[a-zA-ZñÑ\s]+$/, {
      message: "Solo se permiten catacteres o espacios",
    }),
  education: z.array(
    z.object({
      carrera: z
        .string({ message: "seleccione la carrera" })
      
        .max(25, "la carrera puede contener hasta 25 caracteres")
        .regex(/^[a-zA-ZñÑ\s]+$/, {
            message: "Solo se permiten catacteres o espacios",
        }),
      estado: z.string({ message: "Seleccione el estado" }),
      estudios: z
        .string()
      
        .max(25, "Los estudios pueden contener hasta 25 caracteres"),
      institucion: z
        .string()
      
        .max(30, "La institución pueden contener hasta 25 caracteres"),
      zonaInstitucion: z
        .string()
        .min(4, "La ubicación debe de tener al menos 4 caracteres"),
      anioInicioEducacion: z
        .string()
        .min(
          4,
          "Seleccione el año de inicio de los estudios"
        ),
      anioFinEducacion: z.string({
        message:
          "Seleccione el año de fin de los estudios",
      }),
    })
  ),
  experience: z.array(
    z.object({
      nombreEmpresa: z
        .string()
      ,
      puesto: z
        .string()
      
        .max(25, "El puesto puede contener hasta 25 caracteres")
        .regex(/^[a-zA-ZñÑ\s]+$/, {
            message: "Solo se permiten catacteres o espacios",
        }),
      zonaEmpresa: z
        .string()
      
        .max(25, "El puesto puede contener hasta 25 caracteres")
        .regex(/^[a-zA-ZñÑ\s]+$/, {
            message: "Solo se permiten catacteres o espacios",
        }),
      anioInicioExperiencia: z
        .string()
        .min(
          4,
          "Seleccione el año de inicio de la experiencia"
        ),
      anioFinExperiencia: z
        .string()
        .min(
          4,
          "Seleccione el año de fin de la experiencia"
        ),
      descripcionExperiencia: z.string({
        message: "Debe ingresar una descripción",
      })
      ,
    })
  ),
  cursos: z.array(
    z.object({
      curso: z.string().min(4, "El curso debe de tener al menos 4 caracteres"),
      institucion: z
        .string()
        .min(4, "La institución debe de tener al menos 4 caracteres"),
      anioInicioCurso: z
        .string()
        .min(
          4,
          "Seleccione el año de inicio del curso"
        ),
    })
  ),
  idiomas: z.array(
    z
      .object({
        idioma: z
          .string()
          .min(4, "El idiomas debe de tener al menos 4 caracteres"),
        nivel: z.string({ message: "Seleccione el nivel" }),
      })
      .optional()
  ),
  licencia: z.string({ message: "Seleccione una opción" }).optional(),
  movilidad: z.string({ message: "Seleccione una opción" }).optional(),
  incorporacion: z.string({ message: "Seleccione una opción" }).optional(),
  disponibilidad: z.string({ message: "Seleccione una opción" }).optional(),
  office: z.string({ message: "Seleccione una opción" }).optional(),
  orientadoCV: z.string({ message: "Ingrese una orientación" }).optional(),
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
