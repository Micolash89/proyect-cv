//ejecutar una query usando prima en una funcion en postgre

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

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

export async function fetchInvoicesPages(query: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { nombre: { contains: query, mode: "insensitive" } },
          { apellido: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { telefono: { contains: query, mode: "insensitive" } },
          { domicilio: { contains: query, mode: "insensitive" } },
          { ciudad: { contains: query, mode: "insensitive" } },
          { provincia: { contains: query, mode: "insensitive" } },
          { linkedin: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    //   `SELECT COUNT(*)
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    // `;

    const totalPages = Math.ceil(Number(users.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

//export default prisma;

export async function fetchFilteredUsers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { nombre: { contains: query } },
          { apellido: { contains: query } },
          { telefono: { contains: query } },
          { email: { contains: query } },
          { domicilio: { contains: query } },
          { ciudad: { contains: query } },
          { provincia: { contains: query } },
          { linkedin: { contains: query } },
        ],
      },
      orderBy: { fechaNacimiento: "desc" },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}
