"use client";

import { postLogin } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from 'framer-motion';

function FormLogin() {
  const [dataResponse, setDataResponse] = useState({
    message: "" as string,
    errors: {
      email: [],
      password: [],
    },
  });

  const actionLogin = async (e:FormData)=>{

    try {
      const data = await postLogin(e);
  
      if (data && !data.success) {
        const newErrors = { ...dataResponse.errors, ...data.errors };
  
        setDataResponse({
          message: data.message,
          errors: newErrors, // Usamos los nuevos errores si existen, si no mantenemos los antiguos
        });
        
        throw data
      }

      return data
    } catch (data) {

      throw data;
    }
  }
  
 const handleSubmit = async (e: FormData) => {
    
    const postPromise = actionLogin(e); // Tu promesa original
  
     const data = toast.promise(postPromise, {
      loading: 'Loading...',
      success: (dato) => `${dato?.message}`, // Ajusta este mensaje según la respuesta que esperas
      error: (error)=>`${error.message}`,
    });

  };

  return (
    <>
     <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 duration-500">
      <div className="max-w-md w-full ">
        <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}        
        className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden duration-500">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
              Iniciar sesión
            </h2>
            <form action={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-500"
                  placeholder="Correo electrónico"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-500"
                  placeholder="Contraseña"
                />
              </div>

              {(dataResponse.errors?.email?.length > 0 || dataResponse.errors?.password?.length > 0) && (
                <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Se encontraron errores en su envío
                      </h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        <ul className="list-disc pl-5 space-y-1">
                          {dataResponse.errors?.email?.map((error, index) => (
                            <li key={`email-error-${index}`}>{error}</li>
                          ))}
                          {dataResponse.errors?.password?.map((error, index) => (
                            <li key={`password-error-${index}`}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
              <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          Iniciar sesión
        </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}

export default FormLogin;
