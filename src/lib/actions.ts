"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

export async function postUsuarios(formData: FormData) {
  const nombre = formData.get("nombre");
  const apellido = formData.get("apellido");
  const telefono = formData.get("telefono");
  const fechaNacimiento = formData.get("fechaNacimiento");
  const email = formData.get("email");
  const domicilio = formData.get("domicilio");
  const ciudad = formData.get("ciudad");
  const provincia = formData.get("provincia");
  const linkedin = formData.get("linkedin");
  const estudios = formData.get("estudios");
  const experiencia = formData.get("experiencia");

  try {
    prisma.$connect();
    const user = await prisma.user.create({
      data: {
        nombre: nombre as string,
        apellido: apellido as string,
        telefono: telefono as string,
        fechaNacimiento: fechaNacimiento as string,
        email: email as string,
        domicilio: domicilio as string,
        ciudad: ciudad as string,
        provincia: provincia as string,
        linkedin: linkedin as string,
        // estudios: estudios as string,
        // experiencia: experiencia as string
      },
    });

    console.log(user);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
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

export async function postLogin(formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  try {
    prisma.$connect();
    const user = await prisma.administrador.findFirst({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      console.log("no existe el email");
      return null;
    }
    //validar password con bvrypt

    console.log(user);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }

  //guardar un cookie del admin

  revalidatePath("/"); //borrar el cache de la tabla
  redirect("/");

  //prisma.

  //  return user;
}
