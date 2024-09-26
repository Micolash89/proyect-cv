"use client";

import { postUsuarios } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";

function FormRegister({
  cvData,
  updateCVData,
}: {
  cvData: any;
  updateCVData: any;
}) {
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    updateCVData({ [name]: value });
  };

  const max = new Date().getFullYear();
  const min = max - 50;

  const arr: string[] = [];

  for (let i = max; i >= min; i--) {
    arr.push(i.toString());
  }

  const [newEducation, setNewEducation] = useState({
    estudios: "",
    estado: "",
    carrera: "",
    anioInicioEducacion: "",
    anioFinEducacion: "",
  });

  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleEducationChange = (e: any) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  

  const addEducation = () => {
    console.log("dentre");
    // updateCVData({ education: [...cvData.education, newEducation] });
    // setNewEducation({
    //   estudios: "",
    //   estado: "",
    //   carrera: "",
    //   nombreTitulo: "",
    //   anioInicioEducacion: "",
    //   anioFinEducacion: "",
    // });

    console.log(   (newEducation.estudios&& newEducation.carrera  && newEducation.estado)    );
    console.log(   newEducation.estudios  , newEducation.estado, newEducation.carrera    );

    if (newEducation.estudios  && newEducation.estado && newEducation.carrera) {
      updateCVData({ education: [...cvData.education, newEducation] })
      setNewEducation({
        estudios: "",
        estado: "",
        carrera: "",
        anioInicioEducacion: "",
        anioFinEducacion: "",
      });
    }
  };

  const removeEducation = (index: any) => {
    const updatedEducation = cvData.education.filter(
      (_: any, i: any) => i !== index
    );
    updateCVData({ education: updatedEducation });
  };

  const [newAward, setNewAward] = useState({ title: "", year: "" });

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

  type InvoiceForm = {
    id: string;
  };


  const handleSubmit = async (e: FormData) => {
    const postPromise = postUsuarios(e); // Tu promesa original

    toast.promise(postPromise, {
      loading: "Loading...",
      success: (dato: any) => {
        console.log(dato);
        return `${dato.message}`;
      },
      error: (error) => {
        const newErrors = { ...dataResponse.errors, ...error.errors };
        setDataResponse({
          message: error.message,
          errors: newErrors, // Usamos los nuevos errores si existen, si no mantenemos los antiguos
        });
        return `${error.message}`;
      },
    });
  };

  return (
    <>
      <form
        action={handleSubmit}
        className="max-w-md mx-auto py-14 flex flex-col gap-9 "
      >
        <div className="border-gray-200 rounded-lg border-2 p-10 shadow-lg">
          <h2 className="capitalize text-lg text-nowrap mx-auto w-full text-center text-gray-700 dark:text-gray-400">
            datos personales
          </h2>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={cvData.name}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombres
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="lastName"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              defaultValue={cvData.lastName}
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Apellido
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="fechaNacimiento"
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              defaultValue={cvData.fechaNacimiento}
            />
            <label
              htmlFor="floating_company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fecha de nacimiento
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              //caracteristica segun region
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              pattern="[0-9]{15}"
              name="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={cvData.phone}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              N° Contacto (Celular/WhatsApp)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={cvData.email}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          {/* hacerlo con una appi que se despliegue la ciudad */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="provincia"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              defaultValue={cvData.provincia}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Provincia
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="ciudad"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              defaultValue={cvData.ciudad}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ciudad
            </label>
          </div>
        </div>

        <div className="border-gray-200 rounded-lg border-2 p-10 shadow-lg">
          <h2 className="capitalize text-lg text-nowrap mx-auto w-full text-center text-gray-700 dark:text-gray-400">
            educación
          </h2>

          {cvData.education.map((edu: any, index: any) => (
            <div
              key={index}
              className=" mb-4 p-3 border rounded-lg text-black w-full "
            >
              <div className="flex flex-col justify-center items-center">

              <h3 className="font-bold">{edu.estudios}</h3>
              <p>
                {edu.carrera}, {edu.estado}
              </p>
              <p>
                {edu.anioInicioEducacion}, {edu.anioFinEducacion}
              </p>
              </div>
              <button
                type="button"
                className="mt-2 flex flex-row gap-2 items-center justify-center text-red-500 hover:bg-red-50 transition-colors duration-700 hover:border-red-500 border-2 p-2 rounded-lg  deleteButton"
                onClick={() => removeEducation(index)}
              >
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                 Eliminar
              </button>
            </div>
          ))}

          <div className="mb-4">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Estudios:
            </label>
            <select
              id="countries"
              name="estudios"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // defaultValue={newEducation.estudios}
              onChange={handleEducationChange}
              value={newEducation.estudios}
            >
              <option value={""} hidden>
                seleccione nivel
              </option>
              <option>Primario</option>
              <option>Secundario</option>
              <option>Terceario</option>
              <option>Universitario</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              estado:
            </label>
            <select
              id="countries"
              name="estado"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // defaultValue={newEducation.estado}
              value={newEducation.estado}
              onChange={handleEducationChange}
            >
              <option value={""} hidden>
                seleccione un estado
              </option>
              <option value={"COMPLETADO"}>completado</option>
              <option value={"PROCESO"}>proceso</option>
              <option value={"ABANDONADO"}>incompleto</option>
            </select>
          </div>

          <div className="relative z-0 w-full mb-5 group ">
            <input
              type="text"
              name="carrera"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              // defaultValue={newEducation.carrera}
              value={newEducation.carrera}
              onChange={handleEducationChange}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre del titulo
            </label>

            <div className="grid grid-cols-2 gap-x-6 h-fit">
              <div className="max-w-sm mx-auto">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  año inicio
                </label>
                <select
                  name="anioInicioEducacion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  // defaultValue={newEducation.anioInicioEducacion}
                  value={newEducation.anioInicioEducacion}
                  onChange={handleEducationChange}
                >
                  <option value={""} hidden>
                    seleccione año
                  </option>

                  {arr.map((e, i) => {
                    return (
                      <option key={`${e}-${i}`} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="max-w-sm mx-auto">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  año fin
                </label>
                <select
                  disabled={newEducation.estado == "ABANDONADO"}
                  name="anioFinEducacion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={newEducation.anioFinEducacion}
                  onChange={handleEducationChange}
                >
                  <option value={""} hidden>
                    seleccione año
                  </option>

                  {arr.map((e, i) => {
                    return (
                      <option key={`${e}-${i}`} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            
            <button type="button" className="border-2 px-4 py-2 mt-5 flex flex-row rounded-lg text-blue-400 hover:bg-blue-100 border-gray-200 transition-colors duration-700 hover:border-blue-400" onClick={addEducation}>
            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
              <span>
              agregar
              </span>
            </button>
          </div>
        </div>

        <div className="border-gray-200 rounded-lg border-2 p-10 shadow-lg">
          <h2 className="capitalize text-lg text-nowrap mx-auto w-full text-center text-gray-700 dark:text-gray-400">
            Experiencia Laboral
          </h2>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="puesto"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre del puesto
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="nombreEmpresa"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre de la Empresa
            </label>
          </div>

          <div className="max-w-sm mx-auto mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Tareas
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-white dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="breve descripcion de las tareas"
            ></textarea>
          </div>

          {/* cambiar nombres de name solo para el frnt */}

          <div className="grid grid-cols-2 gap-x-6 h-fit">
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400 capitalize"
              >
                año inicio
              </label>
              <select
                id="countries"
                name="anioInicio"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={""}
              >
                <option value={""} hidden>
                  seleccione año
                </option>

                {arr.map((e, i) => {
                  return (
                    <option key={`${e}-${i}`} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="max-w-sm mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400 capitalize"
              >
                año fin
              </label>
              <select
                id="countries"
                name="anioFin"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={""}
              >
                <option value={""} hidden>
                  seleccione año
                </option>

                {arr.map((e, i) => {
                  return (
                    <option key={`${e}-${i}`} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button>agregar</button>
        </div>
        <div className="border-gray-200 rounded-lg border-2 p-10 shadow-lg">
          <h2 className="capitalize text-lg text-nowrap mx-auto w-full text-center text-gray-700 dark:text-gray-400">
            Cursos/Certificaciones
          </h2>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="curso"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre del curso
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="institucion"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre del la institución
            </label>
          </div>

          {/* cambiar nombres de name solo para el frnt */}

          <div className="grid grid-cols-2 gap-x-6 h-fit">
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400 capitalize"
              >
                año inicio
              </label>
              <select
                id="countries"
                name="anioInicioCurso"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={""}
              >
                <option value={""} hidden>
                  seleccione año
                </option>

                {arr.map((e, i) => {
                  return (
                    <option key={`${e}-${i}`} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="max-w-sm mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400 capitalize"
              >
                año fin
              </label>
              <select
                id="countries"
                name="anioFinCurso"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={""}
              >
                <option value={""} hidden>
                  seleccione año
                </option>

                {arr.map((e, i) => {
                  return (
                    <option key={`${e}-${i}`} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button>agregar</button>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default FormRegister;
