"use client";

import { postUsuarios } from "@/lib/actions";
import { useState } from "react";

type Data = {
  success: boolean;
};

function FormUser() {
  const [dataResponse, setDataResponse] = useState({
    // success: null,
    // data: [] as any,
    message: "" as string,
    errors: {
      nombre: [],
      apellido: [],
      telefono: [],
      fechaNacimiento: [],
      email: [],
      domicilio: [],
      ciudad: [],
      provincia: [],
      linkedin: [],
    },
  });

  const handleSubmit = async (e: FormData) => {
    const data = await postUsuarios(e);

    if (data && !data.success) {
      // console.log(data.message);

      // Mantenemos el mensaje pero actualizamos errores si existen.
      // setDataResponse((prevState) => ({
      //   //...prevState,
      //   ...data,//{message : data.message, errors:data.errors}
      //   //       errors: data.errors || prevState.errors, // Usamos errores recibidos o mantenemos los existentes.
      // }));
      // setDataResponse(data);

      const newErrors = { ...dataResponse.errors, ...data.errors };

      setDataResponse({
        message: data.message,
        errors: newErrors, // Usamos los nuevos errores si existen, si no mantenemos los antiguos
      });

      console.log("soy io", dataResponse.message);

    }
  };

  return (
    <>
      <form
        action={handleSubmit}
        className="flex flex-col max-w-md mx-auto p-4 space-y-4 border border-gray-300 rounded-lg"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="nombre" className="text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.nombre &&
              dataResponse.errors.nombre.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="apellido" className="text-gray-700">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {dataResponse.errors?.apellido &&
            dataResponse.errors.apellido.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="telefono" className="text-gray-700">
            Telefono:
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.telefono &&
              dataResponse.errors.telefono.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="fechaNacimiento" className="text-gray-700">
            Fecha de nacimiento:
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.fechaNacimiento &&
              dataResponse.errors.fechaNacimiento.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.email &&
              dataResponse.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="domicilio" className="text-gray-700">
            Domicilio:
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.domicilio &&
              dataResponse.errors.domicilio.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="ciudad" className="text-gray-700">
            Ciudad:
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.ciudad &&
              dataResponse.errors.ciudad.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="provincia" className="text-gray-700">
            Provincia:
          </label>
          <input
            type="text"
            id="provincia"
            name="provincia"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.provincia &&
              dataResponse.errors.provincia.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="linkedin" className="text-gray-700">
            Linkedin:
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {dataResponse.errors?.linkedin &&
              dataResponse.errors.linkedin.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700">Estudios:</label>
          <select
            name="estudios"
            id="estudios"
            className="border border-gray-300 rounded-lg px-4 py-2"
            multiple
          >
            <option value="PRIMARIO">Primario</option>
            <option value="SECUNDARIO">Secundario</option>
            <option value="UNIVERSITARIO">Universitario</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-gray-700">Experiencia:</label>
          <textarea
            name="experiencia"
            id="experiencia"
            className="border border-gray-300 rounded-lg px-4 py-2"
            rows={4}
          ></textarea>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Registrar
        </button>
      </form>
    </>
  );
}

export default FormUser;
