import { JWTPayload, SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function JWTCreate(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // .setExpirationTime("7d")
    .setExpirationTime("30s")
    .sign(encodedKey);
}

// export async function JWTValidate(session: string) {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload;
//   } catch (error) {
//     console.log("Falló la validacion del JWT");
//     return null;
//   }
// }

export function getJwtSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

export async function verifyJwtToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function createResponse(
  success: boolean,
  data: any[any],
  message: string,
  errors?: {}
) {
  return {
    success,
    data,
    message,
    errors,
  };
}
