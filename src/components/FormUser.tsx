"use client";

import { postUsuarios } from "@/lib/actions";

function FormUser() {
  return (
    <>
      <form
        action={postUsuarios}
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
