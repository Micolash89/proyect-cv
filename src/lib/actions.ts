"use server";

import {
  DisponibilidadEnum,
  EstudioEstadoEnum,
  EstudioTipoEnum,
  NivelIdiomaEnum,
  PrismaClient,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
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
import {
  createSchemaLogin,
  CreateUsuario,
  GetUsuario,
  UpdateUsuario,
} from "./zodValidations";
import { Experiencia } from "./definitions";

const prisma = new PrismaClient();

export async function postUsuarios(
  experience: Experiencia[],
  cursos1: any[],
  education: any[],
  idiomas: any[],
  imagenPerfil: string,
  formData: FormData
) {
  // console.log(education);
  // console.log(cursos1);
  // console.log(experience);
  // console.log(idiomas);

  console.log(Object.fromEntries(formData));

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
      "Error en algún campo",
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
            institucion: educacion.institucion as string,
            fechaIngreso: educacion.anioInicioEducacion as string,
            mesIngreso: educacion.mesInicioEducacion as string,
            fechaEgreso: educacion.anioFinEducacion as string,
            mesEgreso: educacion.mesFinEducacion as string,
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
            mesInicio: experiencia.mesInicioExperiencia as string,
            fechaFin: experiencia.anioFinExperiencia as string,
            mesFin: experiencia.mesFinExperiencia as string,
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
            mesInicio: cursos.mesInicioCurso as string,
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
          disponibilidad: disponibilidad
            ? (disponibilidad as DisponibilidadEnum)
            : "NINGUNO",
          idUsuario: user.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
    return createResponse(false, [], "Error en la base de datos");
  } finally {
    prisma.$disconnect();
  }

  return createResponse(true, [], `Registro de ${apellido} ${nombre} exitoso`);
}

export async function postLogin(formdata: FormData) {
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
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    prisma.$disconnect();
  }

  revalidatePath("/");

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

  const UpdateUserData = UpdateUsuario.safeParse({
    id: idUser,
    ...Object.fromEntries(formData),
    education,
    cursos: cursos1,
    experience,
    idiomas,
    imagenPerfil: imagenPerfil ? imagenPerfil : "",
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
            mesIngreso: educacion.mesInicioEducacion as string,
            institucion: educacion.institucion as string,
            fechaEgreso: educacion.anioFinEducacion as string,
            mesEgreso: educacion.mesFinEducacion as string,
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
            mesInicio: experiencia.mesInicioExperiencia as string,
            fechaFin: experiencia.anioFinExperiencia as string,
            mesFin: experiencia.mesFinExperiencia as string,
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
            mesInicio: cursos.mesInicioCurso as string,
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
          disponibilidad: disponibilidad
            ? (disponibilidad as DisponibilidadEnum)
            : "NINGUNO",
          idUsuario: user.id,
        },
      });
    }
    revalidatePath(`/dashboard/user/${user.id}`);
    revalidatePath(`/dashboard`);
  } catch (error) {
    console.error(error);
    return createResponse(
      false,
      [],
      `Error al actualizar a ${nombre} ${apellido}`
    );
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

export async function getOneUser(id: number) {
  const validatedFields = GetUsuario.safeParse({
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

export async function deleteOneUser(id: number,formData: FormData) {
  
  const validatedFields = GetUsuario.safeParse({
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

  try {
    await prisma.$connect();

    const user = await prisma.user.findUnique({ where: { id: id_user } });
    if (!user) {
      return createResponse(false, [], "El usuario no existe");
    }

    await prisma.estudio.deleteMany({
      where: {
        idUsuario: user.id,
      },
    });

    await prisma.experiencia.deleteMany({
      where: {
        idUsuario: user.id,
      },
    });

    await prisma.curso.deleteMany({
      where: {
        idUsuario: user.id,
      },
    });

    await prisma.idiomas.deleteMany({
      where: {
        idUsuario: user.id,
      },
    });

    await prisma.informacionAdicional.deleteMany({
      where: {
        idUsuario: user.id,
      },
    });

    await prisma.user.delete({
      where: { id },
    });

    if (user.cvTemplateId) {
      await prisma.cVTemplate.deleteMany({
        where: {
          id: user.cvTemplateId,
        },
      });
    }

    revalidatePath("/dashboard");
  } catch (error) {
    return createResponse(false, [], "Error al borrar el usuario");
  } finally {
    prisma.$disconnect();
  }

  return createResponse(true, [], "Usuario Borrado");
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

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
