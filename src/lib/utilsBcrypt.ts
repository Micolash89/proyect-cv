import bcryptjs from "bcryptjs";

export const generateHash = async (cad: string) => {
  //   const salt = await bcryptjs.genSalt();
  const hashedCad = await bcryptjs.hash(`${cad}`, 10);
  return hashedCad;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcryptjs.compare(password, hashedPassword);
};
