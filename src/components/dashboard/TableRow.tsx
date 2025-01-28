"use client";

import { UserTable } from "@/lib/definitions";
import Image from "next/image";
import AnimationDot from "../AnimationDot";
import Update from "./Update";
import DeleteButton from "./DeleteButton";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

export default function TableRow({ users }: { users: UserTable[] }) {
  const tableRowVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <table className="hidden min-w-full text-gray-900 dark:text-white lg:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th
              scope="col"
              className="px-4 py-5 font-medium capitalize sm:pl-6"
            >
              Imagen
            </th>
            <th scope="col" className="px-3 py-5 font-medium capitalize">
              apellido, nombre
            </th>
            <th scope="col" className="px-3 py-5 font-medium capitalize">
              Correo Electrónico
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              DNI
            </th>
            <th scope="col" className="px-3 py-5 font-medium capitalize">
              fecha de nacimiento
            </th>
            <th scope="col" className="px-3 py-5 font-medium capitalize">
              teléfono
            </th>
            <th scope="col" className="px-3 py-5 font-medium capitalize">
              visto
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Delete</span>
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <motion.tr
              key={`${user.id}-${index}`}
              variants={tableRowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg odd:bg-white even:bg-gray-100 dark:odd:bg-gray-500 dark:even:md:bg-gray-600"
            >
              <td className="whitespace-nowrap">
                <div className="flex items-center justify-center h-[45px] overflow-hidden">
                  {user.imagenPerfil ? (
                    <Image
                      src={user.imagenPerfil}
                      className="rounded-lg overflow-hidden w-10 h-[45px] object-cover"
                      width={40}
                      height={45}
                      alt={`${user.nombre}'s profile picture`}
                    />
                  ) : (
                    <div className="mr-2 rounded-full w-10 h-10 bg-gray-300" />
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {user.apellido}, {user.nombre}
              </td>
              <td className="whitespace-nowrap px-3 py-3">{user.email}</td>
              <td className="whitespace-nowrap px-3 py-3">{user.dni}</td>
              <td className="whitespace-nowrap px-3 py-3">
                {formatDate(user.fechaNacimiento, "es", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="whitespace-nowrap px-3 py-3">{user.telefono}</td>
              <td className="whitespace-nowrap px-3 py-3 relative">
                <AnimationDot state={user.visto} />
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <Update id={user.id} />
                  <DeleteButton
                    id={user.id}
                    mensajeEliminar={`Eliminar a ${user.nombre.split(" ")[0]} ${
                      user.apellido.split(" ")[0]
                    }`}
                  />
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
