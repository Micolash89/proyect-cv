"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserNotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div
          className={`text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-5 transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="200"
            height="200"
            fill="currentColor"
            className="mx-auto text-gray-500 dark:text-white"
          >
            <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM19 17.5858L21.1213 15.4645L22.5355 16.8787L20.4142 19L22.5355 21.1213L21.1213 22.5355L19 20.4142L16.8787 22.5355L15.4645 21.1213L17.5858 19L15.4645 16.8787L16.8787 15.4645L19 17.5858Z"></path>
          </svg>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-500 ease-in-out delay-100 transform translate-y-0 opacity-100">
            Usuario no encontrado
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-all duration-500 ease-in-out delay-200 transform translate-y-0 opacity-100">
            Lo sentimos, no pudimos encontrar el usuario que estás buscando.
          </p>
          <div className="mt-6 transition-all duration-500 ease-in-out delay-300 transform translate-y-0 opacity-100">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Volver a la Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
