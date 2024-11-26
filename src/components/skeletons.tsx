export function TableUserSkeleton() {
    return (
      <div className="mt-6 flow-root animate-pulse">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-100 dark:bg-gray-600 p-2 md:pt-0">
            <div className="lg:hidden">
              <MobileSkeleton />
              <MobileSkeleton />
              <MobileSkeleton />
              <MobileSkeleton />
              <MobileSkeleton />
              <MobileSkeleton />
            </div>
            <table className="hidden min-w-full text-gray-900 dark:text-white lg:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium capitalize">
                    Apellido, Nombre
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium capitalize">
                    Correo Electrónico
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium capitalize">
                    DNI
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium capitalize">
                    Fecha de nacimiento
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium capitalize">
                    Telefono
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium capitalize">
                    estado
                  </th>
                  <th
                    scope="col"
                    className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                  >
                    <span className="sr-only">Editar</span> 
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  export function TableRowSkeleton() {
    return (
      <tr className="w-full  odd:bg-white even:bg-gray-100 dark:odd:bg-gray-500 dark:even:md:bg-gray-600 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg animate-pulse">
        {/*Apellido, Nombre */}
        <td className="whitespace-nowrap px-3 py-5">
          <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-400"></div>
        </td>
        {/* Correo Electrónico */}
        <td className="whitespace-nowrap px-3 py-5">
          <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-400"></div>
        </td>
        {/* DNI */}
        <td className="whitespace-nowrap px-3 py-5">
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-400"></div>
        </td>
        {/* Fecha de nacimiento */}
        <td className="whitespace-nowrap px-3 py-5">
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-400"></div>
        </td>
        {/* Telefono */}
        <td className="whitespace-nowrap px-3 py-5">
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-400"></div>
        </td>
        {/* estado */}
        <td className="whitespace-nowrap px-3 py-5">
          <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-400"></div>
        </td>
        {/* actions */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end gap-3">
            <div className="h-[20px] w-[20px] rounded bg-white dark:bg-gray-700"></div>
          </div>
        </td>
      </tr>
    );
  }

  export function MobileSkeleton() {
    return (
      <div className="mb-2 w-full rounded-md odd:bg-white even:bg-gray-100 dark:odd:bg-gray-500 dark:even:md:bg-gray-600  p-4 animate-pulse">
        <div className="flex items-center justify-between  border-gray-100 pb-2">
          <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-600"></div>
            <div className="h-5 w-32 rounded bg-gray-100 dark:bg-gray-600"></div>
          </div>
          <div className="h-5 w-32 rounded bg-gray-100 dark:bg-gray-600"></div>
        </div>
        <div className="flex w-full items-center justify-between ">
          <div>
            <div className="h-6 w-20 rounded bg-gray-100 dark:bg-gray-600"></div>
            <div className="mt-2 h-6 w-44 rounded bg-gray-100 dark:bg-gray-600"></div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="h-5 w-5 rounded bg-gray-100 dark:bg-gray-600"></div>
            <div className="h-5 w-5 rounded bg-gray-100 dark:bg-gray-600"></div>
            <div className="h-5 w-5 rounded bg-gray-100 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    );
  }