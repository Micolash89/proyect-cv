'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function UserNotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className={`text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-5 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-7xl sm:text-9xl font-extrabold text-gray-900 dark:text-gray-100 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
            ERROR!
          </h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-500 ease-in-out delay-100 transform translate-y-0 opacity-100">
            Usuario no encontrado
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-all duration-500 ease-in-out delay-200 transform translate-y-0 opacity-100">
            Lo sentimos, no pudimos encontrar el usuario que estás buscando.
          </p>
          <div className="mt-6 transition-all duration-500 ease-in-out delay-300 transform translate-y-0 opacity-100">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Volver a la página principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
