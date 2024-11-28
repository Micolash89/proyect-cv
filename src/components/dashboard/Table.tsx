import Image from "next/image";
// import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredUsers } from "@/database/database";
import { formatDateToLocal } from "@/lib/libs";
import Update from "./Update";
import AnimationDot from "../AnimationDot";

export default async function UserTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800 text-black dark:text-white  md:pt-0 duration-500">
          <div className="lg:hidden">
            {users?.map((user, index) => (
              <div
                key={`${user.id}-${index}`}
                className="mb-2 w-full rounded-lg  odd:bg-white even:bg-gray-100 dark:odd:bg-gray-500 dark:even:bg-gray-600 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4 relative">
                  <div className="absolute top-0 right-0">
                    {user.visto ? (
                      <AnimationDot state={user.visto} />
                    ) : (
                      <AnimationDot state={user.visto} />
                    )}
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      {user.imagenPerfil ? (
                        <Image
                          src={user.imagenPerfil}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${user.nombre}'s profile picture`}
                        />
                      ) : (
                        <>
                          <div className="mr-2 rounded-full w-7 h-7 bg-gray-300"></div>
                        </>
                      )}
                      <div className="flex items-center">
                        <p>
                          {user.apellido}, {user.nombre}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{user.telefono}</p>
                    <p className="text-xl font-medium">{user.telefono}</p>
                    <p>
                      {formatDateToLocal(user.fechaNacimiento.toDateString())}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Update id={user.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-white  lg:table">
            <thead className="rounded-lg text-left text-sm font-normal ">
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
                <th scope="col" className="px-3 py-5 font-medium ">
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
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={`${user.id}-${index}`}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg odd:bg-white even:bg-gray-100 dark:odd:bg-gray-500 dark:even:md:bg-gray-600"
                >
                  <td className="whitespace-nowrap  ">
                    <div className="flex items-center justify-center ">
                      {user.imagenPerfil ? (
                        <Image
                          src={user.imagenPerfil}
                          className="rounded-full"
                          width={40}
                          height={45}
                          alt={`${user.nombre}'s profile picture`}
                        />
                      ) : (
                        <>
                          <div className="mr-2 rounded-full w-10 h-10 bg-gray-300"></div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    {user.apellido}, {user.nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">{user.dni}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatDateToLocal(user.fechaNacimiento)} */}
                    {formatDateToLocal(user.fechaNacimiento.toDateString())}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <userstatus status={user.status} /> */}
                    {user.telefono}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 relative">
                    {/* <userstatus status={user.status} /> */}
                    {user.visto ? (
                      <AnimationDot state={user.visto} />
                    ) : (
                      <AnimationDot state={user.visto} />
                    )}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Update id={user.id} />
                      {/* <Updateuser id={user.id} />
                      <Deleteuser id={user.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
