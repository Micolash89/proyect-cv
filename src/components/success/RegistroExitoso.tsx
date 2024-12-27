"use client";

import { useRouter } from "next/navigation";

interface RegistroExitosoProps {
  mensaje: string;
}

export default function RegistroExitoso({ mensaje }: RegistroExitosoProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col items-center justify-between">
          <div className="flex justify-center">
            <svg
              className="h-16 w-16 text-green-500 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-center text-gray-900 dark:text-white">
            ¡Registro Exitoso!
          </h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            {mensaje}
          </p>
          <div className="mt-6 ">
            <button
              onClick={() => router.push("/")}
              className="w-fit bg-blue-500 rounded-lg px-4 py-2 text-white flex items-center gap-2 hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z"></path>
              </svg>

              <span className="hidden sm:block">Volver al Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
