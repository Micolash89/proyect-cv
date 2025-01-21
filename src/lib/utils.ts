import { envConfig } from "@/app/config/envConfig";
import { JWTPayload, SignJWT, jwtVerify } from "jose";


export async function JWTCreate(payload: any) {

  const secretKey = envConfig.secretKey;
  const encodedKey = new TextEncoder().encode(secretKey);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export function getJwtSecretKey() {
  const secret = envConfig.secretKey;

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

export const getPadding = (contador: number, baseSize: number = 45) => {
  const reduction = contador <= 5 ? contador * 5 : 25;
  return baseSize - reduction;
};

export const getFontSize = (baseSize: number, contador: number) =>
  baseSize + contador;

export const formatDate = (
  date: Date,
  locale: string,
  options?:any 
) => {

  return Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' }).format(date);

};