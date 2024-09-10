"use client";

import { postLogin } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";

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
      <div className="bg-gray-100 p-4">
        <div className="mx-auto max-w-sm">
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full ring-0 border-0 border-b-2 border-gray-300 appearance-none bg-transparent py-1 px-2 focus:ring-0 focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                  <div
                    id="customer-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {dataResponse.errors?.email &&
                      dataResponse.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className="block w-full ring-0 border-0 border-b-2 border-gray-300 appearance-none bg-transparent py-1 px-2 focus:ring-0 focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                  <div
                    id="customer-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {dataResponse.errors?.password &&
                      dataResponse.errors.password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <button onClick={() => toast('This is a sonner toast')}>Render my toast</button>
        </div>
      </div>
    </>
  );
}

export default FormLogin;
