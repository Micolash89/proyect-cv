"use client";

import { ActionIARun } from "@/lib/actionsIA";
import { useEffect, useState } from "react";


function FormGenerator() {
  const [responseBack, setResponseBack] = useState("");
  const [response, setResponse] = useState(false);
  const handleSubmit = async (e: FormData) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget)

    const data = await ActionIARun(e);

    if (!data.success) {
      console.log(data);
      return;
    }

    setResponse(true);
    console.log(data);
    setResponseBack(data.data[0]);
  };

  //   useEffect(() => {
  //     if (response) {
  //       setResponse(false);
  //     }
  //   }, [response]);

  return (
    <>
      <form
        className="flex flex-col w-full max-w-md mx-auto px-4 py-8 md:p-6 lg:p-8 "
        action={handleSubmit}
      >
        <label className="block mb-2" htmlFor="nombre">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            input
          </span>
          <input
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            type="text"
            name="input"
            id="nombre"
            required
          />
        </label>
        <button
          className="mt-4 w-full px-4 py-2 font-bold text-black bg-primary-500 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-2  border-black"
          type="submit"
        >
          Enviar
        </button>
      </form>

      <div className="flex justify-center align-middle">
        <p className="text-base text-black text-center">{responseBack}</p>
      </div>
    </>
  );
}

export default FormGenerator;
