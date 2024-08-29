"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

import { z } from "zod";
import { createResponse, JWTCreate } from "./utils";
import { cookies } from "next/headers";
import { comparePassword } from "./utilsBcrypt";

const CreateSchemaUsuario = z.object({
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(4, "el nombre debe de tener al menos 4 caracteres"),
  apellido: z
    .string({ message: "ingrese un apellido" })
    .min(3, "el apellido debe tener al menos 3 caracter"),
  email: z
    .string({ message: "ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "el email debe tener al menos 6 caracteres"),
  telefono: z.string().min(6, "el telefono debe tener al menos 6 caracteres"),
  fechaNacimiento: z.coerce.date({
    message: "se requiere una fecha de nacimiento",
  }),
  domicilio: z
    .string()
    .min(4, "el domicilio debe de tener al menos 4 caracteres"),
  ciudad: z.string().min(4, "la ciudad debe de tener al menos 4 caracteres"),
  provincia: z
    .string()
    .min(4, "la provincia debe de tener al menos 4 caracteres"),
  linkedin: z.string().url({ message: "debe ser una url valida" }),
  estudios: z.string().min(4, "los estudios deben tener al menos 4 caracteres"),
  experiencia: z
    .string()
    .min(4, "la experiencia deben tener al menos 4 caracteres"),
});

const CreateUsuario = CreateSchemaUsuario.omit({
  estudios: true,
  experiencia: true,
  linkedin: true,
});

// export const validateUser = (formData: FormData) => {
//   const user = CreateSchemaEstudiante.parse(formData);
//   console.log(user);
//   return user;
// };

export async function postUsuarios(formData: FormData) {
  const validatedFields = CreateUsuario.safeParse({
    nombre: formData.get("nombre"),
    apellido: formData.get("apellido"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    fechaNacimiento: formData.get("fechaNacimiento"),
    domicilio: formData.get("domicilio"),
    ciudad: formData.get("ciudad"),
    provincia: formData.get("provincia"),
    //linkedin: formData.get("linkedin"),
  });

  // const nombre = formData.get("nombre");
  // const apellido = formData.get("apellido");
  // const telefono = formData.get("telefono");
  // const fechaNacimiento = formData.get("fechaNacimiento");
  // const email = formData.get("email");
  // const domicilio = formData.get("domicilio");
  // const ciudad = formData.get("ciudad");
  // const provincia = formData.get("provincia");
  // const linkedin = formData.get("linkedin");
  // const estudios = formData.get("estudios");
  // const experiencia = formData.get("experiencia");

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
      nombre,
      apellido,
      telefono,
      fechaNacimiento,
      email,
      domicilio,
      ciudad,
      provincia,
    },
  } = validatedFields;

  console.log(
    nombre,
    apellido,
    telefono,
    fechaNacimiento,
    email,
    domicilio,
    ciudad,
    provincia
  );

  try {
    // const user = await prisma.user.create({
    //   data: {
    //     nombre: nombre as string,
    //     apellido: apellido as string,
    //     telefono: telefono as string,
    //     fechaNacimiento: fechaNacimiento as Date,
    //     email: email as string,
    //     domicilio: domicilio as string,
    //     ciudad: ciudad as string,
    //     provincia: provincia as string,
    //     linkedin: linkedin as string,
    //     // estudios: estudios as string,
    //     // experiencia: experiencia as string
    //   },
    // });
    // console.log(user);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }

  return createResponse(true, [], "Usuario Creado Correctamente");
}

// export async function getAllUsers() {
//   try {
//     prisma.$connect();

//     const users = await prisma.user.findMany();
//     return users;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     prisma.$disconnect();
//   }
// }

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

    // const administrador = await prisma.administrador.findUnique({
    //   where: { email: email },
    // });

    console.log(administrador);

    if (!administrador) {
      console.log("no existe el email");
      return;
      createResponse(false, [], "no existe Email");
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
      httpOnly: true,
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
  redirect("/"); // redirect

  //prisma.

  //  return user;
}
