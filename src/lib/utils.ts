import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
export const generateHash = async (cad: string) => {
  //   const salt = await bcrypt.genSalt();
  const hashedCad = await bcrypt.hash(`${cad}`, 10);
  return hashedCad;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function JWTCreate(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function JWTValidate(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Falló la validacion del JWT");
    return null;
  }
}

export function createResponse(
  success: boolean,
  data: any[any],
  message: string,
  errors?: {}
) {
  //   if (!errors) {
  //     errors = {
  //       nombre: [""],
  //       apellido: [""],
  //       telefono: [""],
  //       fechaNacimiento: [""],
  //       email: [""],
  //       domicilio: [""],
  //       ciudad: [""],
  //       provincia: [""],
  //       linkedin: [""],
  //     };
  //   }

  return {
    success,
    data,
    message,
    errors,
  };
}
