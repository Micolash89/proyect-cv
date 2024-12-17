"use server";

import {
  DisponibilidadEnum,
  EstudioEstadoEnum,
  EstudioTipoEnum,
  NivelIdiomaEnum,
  PrismaClient,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createResponse, JWTCreate } from "./utils";
import { cookies } from "next/headers";
import { comparePassword } from "./utilsBcrypt";
import {
  Curso,
  Educacion,
  generarItemsExperiencia,
  generarPerfilExperiencia,
  generarSkills,
  Idioma,
} from "./actionsIA";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

const CreateSchemaUsuario = z.object({
  id: z.coerce.number(),
  name: z
    .string({ message: "ingrese un nombre" })
    .min(4, "el nombre debe de tener al menos 4 caracteres"),
  lastName: z
    .string({ message: "ingrese un apellido" })
    .min(3, "el apellido debe tener al menos 3 caracter"),
  email: z
    .string({ message: "ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "el email debe tener al menos 6 caracteres"),
  fechaNacimiento: z.coerce.date({
    message: "seleccione una fecha de nacimiento",
  }),
  imagenPerfil: z.string().optional(),
  phone: z.string().min(6, "el telefono debe tener al menos 6 caracteres"),
  ciudad: z.string().min(4, "la ciudad debe de tener al menos 4 caracteres"),
  dni: z.string().optional(),
  provincia: z
    .string()
    .min(4, "la provincia debe de tener al menos 4 caracteres"),
  education: z.array(
    z.object({
      carrera: z
        .string()
        .min(4, "la carrera debe de tener al menos 4 caracteres"),
      estado: z.string({ message: "seleccione el estado" }),
      estudios: z
        .string()
        .min(4, "los estudios deben tener al menos 4 caracteres"),
      institucion: z
        .string()
        .min(3, "la institución deben tener al menos 3 caracteres"),
      zonaInstitucion: z
        .string()
        .min(4, "La ubicación debe de tener al menos 4 caracteres"),
      anioInicioEducacion: z
        .string()
        .min(
          4,
          "el a o de inicio de los estudios debe de tener al menos 4 caracteres"
        ),
      anioFinEducacion: z.string(),
    })
  ),
  experience: z.array(
    z.object({
      nombreEmpresa: z
        .string()
        .min(4, "el nombre de la empresa debe de tener al menos 4 caracteres"),
      puesto: z
        .string()
        .min(4, "el puesto debe de tener al menos 4 caracteres"),
      zonaEmpresa: z
        .string()
        .min(4, "La ubicación debe de tener al menos 4 caracteres"),
      anioInicioExperiencia: z
        .string()
        .min(
          4,
          "el año de inicio de la experiencia debe de tener al menos 4 caracteres"
        ),
      anioFinExperiencia: z
        .string()
        .min(
          4,
          "el año de fin de la experiencia debe de tener al menos 4 caracteres"
        ),
      descripcionExperiencia: z.string({
        message: "debe ingresar una descripción",
      }),
    })
  ),
  cursos: z.array(
    z.object({
      curso: z.string().min(4, "el curso debe de tener al menos 4 caracteres"),
      institucion: z
        .string()
        .min(4, "la instituci n debe de tener al menos 4 caracteres"),
      anioInicioCurso: z
        .string()
        .min(
          4,
          "el a o de inicio del curso debe de tener al menos 4 caracteres"
        ),
    })
  ),
  idiomas: z.array(
    z
      .object({
        idioma: z
          .string()
          .min(4, "el idiomas debe de tener al menos 4 caracteres"),
        nivel: z.string({ message: "seleccione el nivel" }),
      })
      .optional()
  ),
  licencia: z.string({ message: "seleccione una opción" }).optional(),
  movilidad: z.string({ message: "seleccione una opción" }).optional(),
  incorporacion: z.string({ message: "seleccione una opción" }).optional(),
  disponibilidad: z.string({ message: "seleccione una opción" }).optional(),
  office: z.string({ message: "seleccione una opción" }).optional(),
  orientadoCV: z.string({ message: "Ingrese una orientación" }).optional(),
  idCVTemplate: z.number({ message: "falta id del Template del CV" }),
  color: z.string({ message: "seleccione un color" }),
  template: z.coerce.number({
    message: "seleccione un template",
  }),
});

const CreateUsuario = CreateSchemaUsuario.omit({
  id: true,
  idCVTemplate: true,
});
const UpdateUsuario = CreateSchemaUsuario.omit({});

export interface Experiencia {
  puesto: string;
  nombreEmpresa: string;
  anioInicioExperiencia: string;
  anioFinExperiencia: string;
  descripcionExperiencia: string;
}

export async function postUsuarios(
  experience: Experiencia[],
  cursos1: any[],
  education: any[],
  idiomas: any[],
  imagenPerfil: string,
  formData: FormData
) {
  console.log("backend");
  console.log("experiencia", experience);
  console.log("cursos", cursos1);
  console.log("educacion", education);
  console.log("idiomas", idiomas);
  console.log("formData", formData.get("file"));
  console.log("formData", formData.get("template"));
  console.log("formData", formData.get("color"));

  const validatedFields = CreateUsuario.safeParse({
    ...Object.fromEntries(formData),
    education,
    cursos: cursos1,
    experience,
    idiomas,
    imagenPerfil,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return createResponse(
      false,
      [],
      "Error En Algun Campo",
      validatedFields.error?.flatten().fieldErrors
    );
  }

  const {
    data: {
      name: nombre,
      lastName: apellido,
      email,
      fechaNacimiento,
      phone: telefono,
      ciudad,
      provincia,
      education: educacion,
      experience: experiencia,
      cursos,
      idiomas: idiomas1,
      dni,
      licencia,
      movilidad,
      incorporacion,
      disponibilidad,
      office,
      orientadoCV,
      imagenPerfil: file,
      color,
      template,
    },
  } = validatedFields;

  try {
    const cvTemplate = await prisma.cVTemplate.create({
      data: {
        color: color as string,
        template: template as number,
      },
    });

    const user = await prisma.user.create({
      data: {
        nombre: (nombre.charAt(0).toUpperCase() +
          nombre.slice(1).toLowerCase()) as string,
        apellido: (apellido.charAt(0).toUpperCase() +
          apellido.slice(1).toLowerCase()) as string,
        telefono: telefono as string,
        fechaNacimiento: fechaNacimiento as Date,
        email: email as string,
        ciudad: ciudad as string,
        provincia: provincia as string,
        imagenPerfil: file as string,
        orientacionCV: orientadoCV as string,
        dni: dni as string,
        cvTemplateId: cvTemplate.id,
      },
    });

    if (educacion.length > 0) {
      educacion.forEach(async (educacion) => {
        await prisma.estudio.create({
          data: {
            carrera: educacion.carrera as string,
            estado: educacion.estado as EstudioEstadoEnum,
            tipo: educacion.estudios as EstudioTipoEnum,
            ubicacion: educacion.zonaInstitucion as string,
            fechaIngreso: educacion.anioInicioEducacion as string,
            institucion: educacion.institucion as string, //falta agregar institucion frontend
            fechaEgreso: educacion.anioFinEducacion as string,
            idUsuario: user.id,
          },
        });
      });
    }

    if (experiencia.length > 0) {
      experiencia.forEach(async (experiencia) => {
        await prisma.experiencia.create({
          data: {
            nombre: experiencia.nombreEmpresa as string,
            puesto: experiencia.puesto as string,
            ubicacion: experiencia.zonaEmpresa as string,
            fechaInicio: experiencia.anioInicioExperiencia as string,
            fechaFin: experiencia.anioFinExperiencia as string,
            descripcion: experiencia.descripcionExperiencia as string,
            idUsuario: user.id,
          },
        });
      });
    }

    if (cursos.length > 0) {
      cursos.forEach(async (cursos) => {
        await prisma.curso.create({
          data: {
            nombre: cursos.curso as string,
            institucion: cursos.institucion as string,
            fechaInicio: cursos.anioInicioCurso as string,
            idUsuario: user.id,
          },
        });
      });
    }

    if (idiomas1.length > 0) {
      idiomas1.forEach(async (idioma) => {
        await prisma.idiomas.create({
          data: {
            idioma: idioma?.idioma as string,
            nivel: idioma?.nivel as NivelIdiomaEnum,
            idUsuario: user.id,
          },
        });
      });
    }

    if (licencia || movilidad || incorporacion || disponibilidad || office) {
      await prisma.informacionAdicional.create({
        data: {
          licencia: licencia ? (licencia as string) : "",
          movilidad: movilidad ? (movilidad as string) : "",
          incorporacion: incorporacion ? (incorporacion as string) : "",
          office: office ? (office as string) : "",
          disponibilidad: disponibilidad as DisponibilidadEnum,
          idUsuario: user.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }

  return createResponse(true, [], `Registro de ${apellido} ${nombre} exitoso`);
}

const createSchemaLogin = z.object({
  email: z
    .string()
    .min(1, "el email es requerido")
    .email({ message: "debe ser un email valido" }),
  password: z
    .string()
    .min(1, "la contraseña es requerida")
    .min(6, "la contraseña debe de tener al menos 6 caracteres"),
});

export async function postLogin(formdata: FormData) {
  // const email = formdata.get("email");
  // const password = formdata.get("password");
  // console.log(formdata);

  const validatedFields = createSchemaLogin.safeParse({
    email: formdata.get("email"),
    password: formdata.get("password"),
  });

  if (!validatedFields.success) {
    return createResponse(
      false,
      [],
      "Error En Algun Campo",
      validatedFields.error?.flatten().fieldErrors
    );
  }

  const { email, password } = validatedFields.data;

  try {
    prisma.$connect();
    const administrador = await prisma.administrador.findFirst({
      where: {
        email: email as string,
      },
    });

    if (!administrador) {
      console.log("no existe el email");
      return createResponse(false, [], "no existe Email");
    }
    //validar password con bvrypt

    const comparePass = await comparePassword(password, administrador.password);

    if (!comparePass) {
      return createResponse(false, [], "Error Contraseña");
    }

    const { password: password_administrador, ...rest } = administrador;

    const token = await JWTCreate(rest);

    if (!token) {
      throw new Error("error en la generacion de token");
    }

    cookies().set({
      name: "token",
      value: token,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    cookies().set({
      name: "adminUser",
      value: administrador.email,
      maxAge: 2147483647,
      path: "/",
    });

    console.log(administrador);
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    prisma.$disconnect();
  }

  //guardar un cookie del admin

  revalidatePath("/"); //borrar el cache de la tabla
  //redirect("/"); // redirect

  //prisma.

  //  return user;
  return createResponse(true, [], "login correcto");
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/dashboard/users");
    return { message: "Deleted User." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete User.",
    };
  }
}

export async function updateUser(
  experience: Experiencia[],
  cursos1: any[],
  education: any[],
  idiomas: any[],
  imagenPerfil: string,
  idUser: number,
  idCVTemplate: number,
  formData: FormData
) {
  console.log("backend");
  console.log(imagenPerfil);
  console.log("idCVTemplate", idCVTemplate);

  const UpdateUserData = UpdateUsuario.safeParse({
    id: idUser,
    ...Object.fromEntries(formData),
    education,
    cursos: cursos1,
    experience,
    idiomas,
    imagenPerfil,
    idCVTemplate,
  });

  if (!UpdateUserData.success) {
    console.log(UpdateUserData.error?.flatten().fieldErrors);

    return createResponse(
      false,
      [],
      "Error En Algun Campo",
      UpdateUserData.error?.flatten().fieldErrors
    );
  }

  const {
    id,
    name: nombre,
    lastName: apellido,
    email,
    fechaNacimiento,
    phone: telefono,
    ciudad,
    provincia,
    education: educacion,
    experience: experiencia,
    cursos,
    idiomas: idiomas1,
    dni,
    licencia,
    movilidad,
    incorporacion,
    disponibilidad,
    office,
    orientadoCV,
    imagenPerfil: file,
    idCVTemplate: idTemplate,
    color,
    template,
  } = UpdateUserData.data;

  console.log("id", idTemplate);
  console.log("color", color);
  console.log("template", template);
  console.log("file", file);
  console.log("imagen Perfil", imagenPerfil);

  try {
    await prisma.cVTemplate.update({
      where: {
        id: idTemplate,
      },
      data: {
        color: color as string,
        template: template as number,
      },
    });

    const user = await prisma.user.update({
      where: { id },
      data: {
        nombre: (nombre.charAt(0).toUpperCase() +
          nombre.slice(1).toLowerCase()) as string,
        apellido: (apellido.charAt(0).toUpperCase() +
          apellido.slice(1).toLowerCase()) as string,
        telefono: telefono as string,
        fechaNacimiento: fechaNacimiento as Date,
        email: email as string,
        ciudad: ciudad as string,
        provincia: provincia as string,
        imagenPerfil: file as string,
        orientacionCV: orientadoCV as string,
        dni: dni as string,
      },
    });

    if (educacion.length > 0) {
      await prisma.estudio.deleteMany({
        where: {
          idUsuario: user.id,
        },
      });

      educacion.forEach(async (educacion) => {
        await prisma.estudio.create({
          data: {
            carrera: educacion.carrera as string,
            estado: educacion.estado as EstudioEstadoEnum,
            tipo: educacion.estudios as EstudioTipoEnum,
            ubicacion: educacion.zonaInstitucion as string,
            fechaIngreso: educacion.anioInicioEducacion as string,
            institucion: educacion.institucion as string, //falta agregar institucion frontend
            fechaEgreso: educacion.anioFinEducacion as string,
            idUsuario: user.id,
          },
        });
      });
    }

    if (experiencia.length > 0) {
      await prisma.experiencia.deleteMany({
        where: {
          idUsuario: user.id,
        },
      });

      experiencia.forEach(async (experiencia) => {
        await prisma.experiencia.create({
          data: {
            nombre: experiencia.nombreEmpresa as string,
            puesto: experiencia.puesto as string,
            ubicacion: experiencia.zonaEmpresa as string,
            fechaInicio: experiencia.anioInicioExperiencia as string,
            fechaFin: experiencia.anioFinExperiencia as string,
            descripcion: experiencia.descripcionExperiencia as string,
            idUsuario: user.id,
          },
        });
      });
    }

    if (cursos.length > 0) {
      await prisma.curso.deleteMany({
        where: {
          idUsuario: user.id,
        },
      });

      cursos.forEach(async (cursos) => {
        await prisma.curso.create({
          data: {
            nombre: cursos.curso as string,
            institucion: cursos.institucion as string,
            fechaInicio: cursos.anioInicioCurso as string,
            idUsuario: user.id,
          },
        });
      });
    }

    if (idiomas1.length > 0) {
      await prisma.idiomas.deleteMany({
        where: {
          idUsuario: user.id,
        },
      });

      idiomas1.forEach(async (idioma) => {
        await prisma.idiomas.create({
          data: {
            idioma: idioma?.idioma as string,
            nivel: idioma?.nivel as NivelIdiomaEnum,
            idUsuario: user.id,
          },
        });
      });
    }

    if (licencia || movilidad || incorporacion || disponibilidad || office) {
      await prisma.informacionAdicional.deleteMany({
        where: {
          idUsuario: user.id,
        },
      });

      await prisma.informacionAdicional.create({
        data: {
          licencia: licencia ? (licencia as string) : "",
          movilidad: movilidad ? (movilidad as string) : "",
          incorporacion: incorporacion ? (incorporacion as string) : "",
          office: office ? (office as string) : "",
          disponibilidad: disponibilidad as DisponibilidadEnum,
          idUsuario: user.id,
        },
      });
    }
    revalidatePath(`/dashboard/user/${user.id}`);
    revalidatePath(`/dashboard`);
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Update User.",
    };
  } finally {
    prisma.$disconnect();
  }

  return createResponse(true, [], `Usuario ${apellido} ${nombre} Actualizado`);
}

/*IA*/
export async function generatorProfileAI(
  experience: Experiencia[],
  educacion: Educacion[],
  idiomas: Idioma[],
  cursos: Curso[],
  orientadoCV: string,
  formData: FormData
) {
  const perfilDescripcion: string = await generarPerfilExperiencia(
    experience,
    educacion,
    cursos,
    idiomas,
    orientadoCV
  );

  return createResponse(
    true,
    { profile: perfilDescripcion },
    "creación de perfil exitoso"
  );
}
export async function generatorItemsWorkAI(
  experience: Experiencia[],
  formData: FormData
) {
  const perfilDescripcion: string = await generarItemsExperiencia(
    experience,
    1
  );

  return createResponse(
    true,
    { descriptionWork: perfilDescripcion },
    "creación de descripciones exitoso"
  );
}

export async function generatorSkillsAI(
  experience: Experiencia[],
  educacion: Educacion[],
  cursos: Curso[],
  idiomas: Idioma[],
  orientadoCV: string,
  formData: FormData
) {
  console.log(
    experience.length <= 4
      ? ` $ ${Math.floor(6 / experience.length)} de cada uno de los empleos`
      : " 6 palabras clave en total"
  );

  const perfilDescripcion: string = await generarSkills(
    experience,
    educacion,
    cursos,
    idiomas,
    orientadoCV,

    " 6 palabras clave en total"
  );

  return createResponse(
    true,
    { skills: perfilDescripcion },
    "creación de skills exitoso"
  );
}

const GetUserSchema = z.object({
  id: z.coerce.number({
    invalid_type_error: "El ID debe ser un número entero",
    message: "El ID debe ser un número entero",
  }),
});

export async function getOneUser(id: number) {
  const validatedFields = GetUserSchema.safeParse({
    id,
  });

  if (!validatedFields.success) {
    return createResponse(
      false,
      [],
      "Error En Algun Campo",
      validatedFields.error?.flatten().fieldErrors
    );
  }

  const { id: id_user } = validatedFields.data;

  const user = await prisma.user.findUnique({ where: { id: id_user } });
  return user;
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { url: "", error: "No se seleccionó ningún archivo" };
    }

    // Convertir el archivo a Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "cv-images",
    });

    return { url: result.secure_url };
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return { url: "", error: "Error al subir la imagen" };
  }
}

export async function uploadImageBack(file: File) {
  try {
    if (!file) {
      return { url: "", error: "No se seleccionó ningún archivo" };
    }

    // Convertir el archivo a Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "cv-images",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error al subir imagen:", error);
  }
  return { url: "", error: "Error al subir la imagen" };
}

export async function logoutAction() {
  cookies().delete("token");
  cookies().delete("adminUser");
}

export async function revalidateFunction(url: string) {
  revalidatePath(url);
  return "Cache Borrado";
}
