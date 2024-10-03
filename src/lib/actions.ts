"use server";

import { EstudioEstadoEnum, EstudioTipoEnum, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

import { z } from "zod";
import { createResponse, JWTCreate } from "./utils";
import { cookies } from "next/headers";
import { comparePassword } from "./utilsBcrypt";

const CreateSchemaUsuario = z.object({
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
    fechaNacimiento: z.string({
      message: "seleccione una fecha de nacimiento",
    }),
  phone: z.string().min(6, "el telefono debe tener al menos 6 caracteres"),
  ciudad: z.string().min(4, "la ciudad debe de tener al menos 4 caracteres"),
  provincia: z
    .string()
    .min(4, "la provincia debe de tener al menos 4 caracteres"),
  education: z
    .array(
      z.object({
        carrera: z.string().min(4, "la carrera debe de tener al menos 4 caracteres"),
        estado: z.string({message:"seleccione el estado"}),
        estudios: z.string().min(4, "los estudios deben tener al menos 4 caracteres"),
        //falta la insitucion
        anioInicioEducacion: z.string().min(4, "el a o de inicio de los estudios debe de tener al menos 4 caracteres"),
        anioFinEducacion: z.string(),
      })
    ),
  experience: z.array(
    z.object({
      nombreEmpresa: z.string().min(4, "el nombre de la empresa debe de tener al menos 4 caracteres"),
      puesto: z.string().min(4, "el puesto debe de tener al menos 4 caracteres"),
      anioInicioExperiencia: z.string().min(4, "el a o de inicio de la experiencia debe de tener al menos 4 caracteres"),
      anioFinExperiencia: z.string().min(4, "el a o de fin de la experiencia debe de tener al menos 4 caracteres"),
      descripcionExperiencia: z.string().min(5, "la descripci n de la experiencia debe de tener al menos 5 caracteres"),
    }),

  ),
  cursos: z.array(
    z.object({
      curso: z.string().min(4, "el curso debe de tener al menos 4 caracteres"),
      institucion: z.string().min(4, "la instituci n debe de tener al menos 4 caracteres"),
      anioInicioCurso: z.string().min(4, "el a o de inicio del curso debe de tener al menos 4 caracteres"),
    }),
  ),
});

const CreateUsuario = CreateSchemaUsuario.omit({});

export  interface Experiencia{
  puesto:string;
  nombreEmpresa:string;
  anioInicioExperiencia:string;
  anioFinExperiencia:string;
  descripcionExperiencia:string;
}

export async function postUsuarios(experience:Experiencia[],cursos1:any[], education:any[] ,formData: FormData) {

  console.log(Object.fromEntries(formData));
  console.log("experiencia",experience)
  console.log("cursos",cursos1)
  console.log("educacion",education)

  const validatedFields = CreateUsuario.safeParse({
    ...Object.fromEntries(formData),
    education,
    cursos:cursos1,
    experience
  });

  if (!validatedFields.success) {
    return createResponse(
      false,
      [],
      "Error En Algun Campo",
      validatedFields.error?.flatten().fieldErrors
    );
  }

  const {
    data: {
      
      name: nombre ,
      lastName: apellido ,
      email,
      fechaNacimiento,
      phone: telefono ,
       ciudad ,
       provincia ,
       education:educacion,
       experience:experiencia,
       cursos,
    },
  } = validatedFields;

  console.log(
    nombre,
    apellido,
    telefono,
    email,
    fechaNacimiento,
    ciudad,
    provincia
  );

  try {
    const user = await prisma.user.create({
      data: {
        nombre: nombre as string,
        apellido: apellido as string,
        telefono: telefono as string,
        fechaNacimiento: fechaNacimiento as string,
        email: email as string,
        ciudad: ciudad as string,
        provincia: provincia as string,
      },
    });
    
    if(educacion.length>0){
      
      
      educacion.forEach(async (educacion) => {
        await prisma.estudio.create({
          data: {
            carrera: educacion.carrera as string,
            estado: educacion.estado as EstudioEstadoEnum,
            tipo: educacion.estudios as EstudioTipoEnum,
            fechaIngreso: educacion.anioInicioEducacion as string,
            institucion:"",//falta agregar institucion frontend
            fechaEgreso: educacion.anioFinEducacion as string,
            idUsuario: user.id,
          },
        });
      });

    }

    if(experiencia.length>0){
      experiencia.forEach(async (experiencia) => {
        await prisma.experiencia.create({
          data: {
            nombre: experiencia.nombreEmpresa as string,
            puesto: experiencia.puesto as string,
            fechaInicio: experiencia.anioInicioExperiencia as string,
            fechaFin: experiencia.anioFinExperiencia as string,
            descripcion: experiencia.descripcionExperiencia as string,
            idUsuario: user.id,
          },
        });
      });
    }

    if(cursos.length>0){

      cursos.forEach(async (cursos) => {(
        await prisma.curso.create({
          data: {
            nombre: cursos.curso as string,
            institucion: cursos.institucion as string,
            fechaInicio: cursos.anioInicioCurso as string,
            idUsuario: user.id,
          },
        })
      )

      })
    }
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
  
  return createResponse(true, [], "Registro Satisfactorio");
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

const UpdateUserSchema = z.object({
  id: z.coerce.number({
    invalid_type_error: "El ID debe ser un número entero",
    message: "El ID debe ser un número entero",
  }),
  nombre: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  apellido: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  telefono: z.string().min(6, "El teléfono debe tener al menos 6 caracteres"),
  // fechaNacimiento: z.date("La fecha de nacimiento debe ser una fecha válida"),
  email: z
    .string()
    .email("Debe ser un email válido")
    .min(6, "El email debe tener al menos 6 caracteres"),
  domicilio: z.string().min(1, "El domicilio no puede estar vacío"),
  ciudad: z.string().min(1, "La ciudad no puede estar vacía"),
  provincia: z.string().min(1, "La provincia no puede estar vacía"),
  linkedin: z.string().optional(),
});

export async function updateUser(formData: FormData, params: { id: string }) {
  const UpdateUserData = UpdateUserSchema.safeParse({
    id: params.id,
    nombre: formData.get("nombre"),
    apellido: formData.get("apellido"),
    telefono: formData.get("telefono"),
    // fechaNacimiento: z.date().safeParse(formData.get("fechaNacimiento")),
    email: formData.get("email"),
    domicilio: formData.get("domicilio"),
    ciudad: formData.get("ciudad"),
    provincia: formData.get("provincia"),
    linkedin: formData.get("linkedin"),
  });

  if (!UpdateUserData.success) {
    return createResponse(
      false,
      [],
      "Error En Algun Campo",
      UpdateUserData.error?.flatten().fieldErrors
    );
  }

  const {
    id,
    nombre,
    apellido,
    telefono,
    email,
    domicilio,
    ciudad,
    provincia,
    linkedin,
  } = UpdateUserData.data;

  try {
    await prisma.user.update({
      where: { id },
      data: {
        nombre,
        apellido,
        telefono,
        email,
      
        ciudad,
        provincia,
        linkedin,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update User.",
    };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}
