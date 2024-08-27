//ejecutar una query usando prima en una funcion en postgre

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getAllUsers() {
  try {
    prisma.$connect();

    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
}

//export default prisma;
