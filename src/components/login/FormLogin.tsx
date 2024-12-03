"use client";

import { postLogin, revalidateFunction } from "@/lib/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

interface FormDataError {
  message: string;
  errors: FormDataErrorErrors;
}

interface FormDataErrorErrors {
  [key: string]: string[];
}

function FormLogin() {

  const router = useRouter();

  const searchParams = useSearchParams();
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const error = params.get("error");
    const url = params.get("url");
    if (error === "auth_required") {
      toast.error("Inicie sesión para acceder a esta página");
      revalidateFunction(url?.replace("%2","/") || "/");
    } else if (error === "session_expired") {
      toast.error("Su sesión ha expirado. Por favor, inicie sesión nuevamente");
    }
  }, [searchParams]);

  const [dataResponse, setDataResponse] = useState<FormDataError>({
    message: "" as string,
    errors: {
      email: [],
      password: [],
    },
  });

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (dataResponse.errors[e.target.name].length > 0) {
      setDataResponse({
        ...dataResponse,
        errors: { ...dataResponse.errors, [e.target.name]: [] },
      });
    }
  };

  const actionLogin = async (e: FormData) => {
    try {
      const data = await postLogin(e);

      if (data && !data.success) {
        const newErrors = { ...dataResponse.errors, ...data.errors };

        setDataResponse({
          message: data.message,
          errors: newErrors, // Usamos los nuevos errores si existen, si no mantenemos los antiguos
        });

        throw data;
      }

      return data;
    } catch (data) {
      throw data;
    }
  };

  const handleSubmit = async (e: FormData) => {
    const postPromise = actionLogin(e); // Tu promesa original

    const data = toast.promise(postPromise, {
      loading: "Iniciando sesión...",
      success: (dato) => {
        router.refresh();
        router.push("/dashboard");
        return `${dato?.message}`}, // Ajusta este mensaje según la respuesta que esperas
      error: (error) => `${error.message}`,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 duration-500">
        <div className="max-w-md w-full ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden duration-500"
          >
            <div className="px-6 py-8">
              <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
                Iniciar sesión
              </h2>
              <form action={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={clsx(
                      "mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-500",
                      {
                        "border-red-500 dark:border-red-500":
                          dataResponse.errors.email?.length > 0,
                        "border-gray-300 dark:border-gray-600":
                          dataResponse.errors.email?.length == 0,
                      }
                    )}
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={clsx(
                      "mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-500",
                      {
                        "border-red-500":
                          dataResponse.errors.password?.length > 0,
                        "border-gray-300 dark:border-gray-600":
                          dataResponse.errors.password?.length == 0,
                      }
                    )}
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </motion.div>

                {(dataResponse.errors?.email?.length > 0 ||
                  dataResponse.errors?.password?.length > 0) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-md bg-red-50 dark:bg-red-900 p-4"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                          Se encontraron errores en su envío
                        </h3>
                        <motion.ul
                          initial={{ opacity: 0, y: 20, display: "none" }}
                          animate={{ opacity: 1, y: 0, display: "flex" }}
                          transition={{ delay: 0.5 }}
                          className="mt-2 text-sm text-red-700 dark:text-red-300"
                        >
                          <ul className="list-disc pl-5 space-y-1">
                            {dataResponse.errors?.email?.map((error, index) => (
                              <motion.li
                                initial={{ opacity: 0, y: 20, display: "none" }}
                                animate={{ opacity: 1, y: 0, display: "block" }}
                                transition={{ delay: index * 0.1 }}
                                key={`email-error-${index}`}
                              >
                               • {error}
                              </motion.li>
                            ))}
                            {dataResponse.errors?.password?.map(
                              (error, index) => (
                                <motion.li
                                  initial={{
                                    opacity: 0,
                                    y: 20,
                                    display: "none",
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    display: "block",
                                  }}
                                  transition={{ delay: index * 0.1 }}
                                  key={`password-error-${index}`}
                                >
                                 • {error}
                                </motion.li>
                              )
                            )}
                          </ul>
                        </motion.ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Iniciar sesión
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default FormLogin;
