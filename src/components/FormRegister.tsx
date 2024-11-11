"use client";

import { postUsuarios } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

type Section =
  | "personal"
  | "education"
  | "experience"
  | "cursos"
  | "idiomas"
  | "informacionA";

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
    institucion: "",
    zonaInstitucion: "",
    anioInicioEducacion: "",
    anioFinEducacion: "",
  });

  const [newCursos, setNewCursos] = useState({
    curso: "",
    institucion: "",
    anioInicioCurso: "",
  });

  const [newIdioma, setNewIdioma] = useState({
    idioma: "",
    nivel: "",
  });

  const [newDisponibilidad, setNewDisponibilidad] = useState({
    disponibilidad: "",
  });

  const [newExperience, setNewExperience] = useState({
    puesto: "",
    nombreEmpresa: "",
    zonaEmpresa: "",
    anioInicioExperiencia: "",
    anioFinExperiencia: "",
    descripcionExperiencia: "",
  });

  const [activeSection, setActiveSection] = useState<Section>("personal");
  const sectionRefs = {
    personal: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    cursos: useRef<HTMLDivElement>(null),
    idiomas: useRef<HTMLDivElement>(null),
    informacionA: useRef<HTMLDivElement>(null),
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const [sectionRefsStatus, setSectionRefsStatus] = useState({
    education: "",
    experience: "",
    cursos: "",
    idiomas: "",
    informacionA: "",
  });

  const handleEducationChange = (e: any) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    if (newEducation.estudios && newEducation.estado && newEducation.carrera) {
      updateCVData({ education: [...cvData.education, newEducation] });
      setNewEducation({
        estudios: "",
        estado: "",
        carrera: "",
        institucion: "",
        zonaInstitucion: "",
        anioInicioEducacion: "",
        anioFinEducacion: "",
      });
    }
  };

  const handleExperienceChange = (e: any) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdiomaChange = (e: any) => {
    const { name, value } = e.target;
    setNewIdioma((prev) => ({ ...prev, [name]: value }));
  };

  const handleCursoChange = (e: any) => {
    const { name, value } = e.target;
    setNewCursos((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisponibilidadChange = (e: any) => {
    const { name, value } = e.target;
    setNewDisponibilidad((prev) => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    if (newExperience.nombreEmpresa && newExperience.puesto) {
      updateCVData({ experience: [...cvData.experience, newExperience] });
      setNewExperience({
        puesto: "",
        nombreEmpresa: "",
        anioInicioExperiencia: "",
        anioFinExperiencia: "",
        descripcionExperiencia: "",
        zonaEmpresa: "",
      });
    }
  };
  const addCursos = () => {
    if (newCursos.curso && newCursos.institucion) {
      updateCVData({ cursos: [...cvData.cursos, newCursos] });
      setNewCursos({ curso: "", institucion: "", anioInicioCurso: "" });
    }
  };

  const addIdiomas = () => {
    if (newIdioma.nivel && newIdioma.idioma) {
      updateCVData({ idiomas: [...cvData.idiomas, newIdioma] });
      setNewIdioma({ idioma: "", nivel: "" });
    }
  };

  const removeExperience = (index: any) => {
    const updatedExperience = cvData.experience.filter(
      (_: any, i: any) => i !== index
    );
    updateCVData({ experience: updatedExperience });
  };

  const removeEducation = (index: any) => {
    const updatedEducation = cvData.education.filter(
      (_: any, i: any) => i !== index
    );
    updateCVData({ education: updatedEducation });
  };

  const removeCursos = (index: any) => {
    const updatedCursos = cvData.cursos.filter((_: any, i: any) => i !== index);
    updateCVData({ cursos: updatedCursos });
  };

  const removeIdiomas = (index: any) => {
    const updatedIdiomas = cvData.idiomas.filter(
      (_: any, i: any) => i !== index
    );
    updateCVData({ idiomas: updatedIdiomas });
  };

  const [dataResponse, setDataResponse] = useState({
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
    const newpost = postUsuarios
      .bind(null, cvData.experience)
      .bind(null, cvData.cursos)
      .bind(null, cvData.education)
      .bind(null, cvData.idiomas);

    const postPromise = newpost(e); // Tu promesa original

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

  const moveToNextSection = (currentSection: Section, nextSection: Section) => {
    setActiveSection(nextSection);
    setSectionRefsStatus((prev) => ({
      ...prev,
      [nextSection]: currentSection,
    }));
    sectionRefs[nextSection].current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeSection && sectionRefs[activeSection].current) {
      sectionRefs[activeSection].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSection]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <form action={handleSubmit} className="space-y-8">
        <AnimatePresence mode="sync">
          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200"
          >
            <h2 className="text-3xl font-semibold mb-4 capitalize text-gray-900 dark:text-white">
              datos personales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.name}
                  required
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombres
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="lastName"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={cvData.lastName}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Apellido
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="date"
                  name="fechaNacimiento"
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={cvData.fechaNacimiento}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_company"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Fecha de nacimiento
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="tel"
                  name="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.phone}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Teléfono
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.email}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize"
                >
                  correo electrónico
                </label>
              </div>
              {/* hacerlo con una appi que se despliegue la ciudad */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="provincia"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.provincia}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Provincia
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="ciudad"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.ciudad}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ciudad
                </label>
              </div>
            </div>

            <div className="flex justify-end ">
              <button
                type="button"
                onClick={() => moveToNextSection("personal", "education")}
                className="mt-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 flex items-center gap-1"
              >
                <span>Siguiente</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </motion.section>

        { sectionRefsStatus.education &&

          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            ref={sectionRefs.education}
            className={`bg-white p-6 rounded-lg shadow-md  `}
          >
            <h2 className="text-2xl font-semibold mb-4 capitalize">
              educación
            </h2>

            {cvData.education.map((edu: any, index: any) => (
              <div
                key={index}
                className=" mb-4 p-3 border rounded-lg text-black w-full"
              >
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-bold">{edu.institucion}</h3>
                  <h3 className="font-bold">{edu.estudios}</h3>
                  <h4 className="font-bold">{edu.zonaInstitucion}</h4>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  Eliminar
                </button>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative z-0 w-full group ">
                <input
                  type="text"
                  name="institucion"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={newEducation.institucion}
                  onChange={handleEducationChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre de la institución
                </label>
              </div>

              <div className="relative z-0 w-full  group ">
                <input
                  type="text"
                  name="carrera"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={newEducation.carrera}
                  onChange={handleEducationChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre del titulo
                </label>
              </div>
              <div className="relative z-0 w-full md:col-span-2  group ">
                <input
                  type="text"
                  name="zonaInstitucion"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={newEducation.zonaInstitucion}
                  onChange={handleEducationChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ubicación de la institución
                </label>
              </div>
              <div className="">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Estudios:
                </label>
                <select
                  id="countries"
                  name="estudios"
                  className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md"
                  onChange={handleEducationChange}
                  value={newEducation.estudios}
                >
                  <option value={""} hidden>
                    seleccione nivel
                  </option>
                  <option value={"PRIMARIO"}>Primario</option>
                  <option value={"SECUNDARIO"}>Secundario</option>
                  <option value={"TERCEARIO"}>Terceario</option>
                  <option value={"UNIVERSITARIO"}>Universitario</option>
                </select>
              </div>

              <div className="">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  estado:
                </label>
                <select
                  id="countries"
                  name="estado"
                  className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md"
                  value={newEducation.estado}
                  onChange={handleEducationChange}
                >
                  <option value={""} hidden>
                    seleccione un estado
                  </option>
                  <option value={"COMPLETO"}>completo</option>
                  <option value={"PROCESO"}>en proceso</option>
                  <option value={"INCOMPLETO"}>incompleto</option>
                </select>
              </div>

              <div className=" ">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  año inicio
                </label>
                <select
                  name="anioInicioEducacion"
                  className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md"
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

              <div className="">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  año fin
                </label>
                <select
                  disabled={newEducation.anioInicioEducacion == ""}
                  name="anioFinEducacion"
                  className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md"
                  value={newEducation.anioFinEducacion}
                  onChange={handleEducationChange}
                >
                  <option value={""} hidden>
                    seleccione año
                  </option>

                  {newEducation.estado == "PROCESO" && (
                    <option value={"Actualidad"}>Actualidad</option>
                  )}

                  {arr.map((e, i) => {
                    return newEducation.anioInicioEducacion <= e ? (
                      <option key={`${e}-${i}`} value={e}>
                        {e}
                      </option>
                    ) : (
                      ""
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex justify-between ">
              <button
                type="button"
                className=" flex flex-row gap-2 capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={addEducation}
              >
                <svg
                  width={24}
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                <span>agregar</span>
              </button>

              <button
                type="button"
                onClick={() => moveToNextSection("education", "experience")}
                className="ml-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 justify-self-end flex items-center gap-1"
              >
                <span>Siguiente</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </motion.section>}
          

         {sectionRefsStatus.experience &&
          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            ref={sectionRefs.experience}
            className={`bg-white  p-6 rounded-lg shadow-md `}
          >
            <h2 className="text-2xl font-semibold mb-4 capitalize">
              Experiencia Laboral
            </h2>

            {cvData.experience.map((edu: any, index: any) => (
              <div
                key={index}
                className="max-w-sm mb-4 p-3 border rounded-lg text-black w-full "
              >
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-bold">{edu.puesto}</h3>
                  <h3 className="font-bold">{edu.nombreEmpresa}</h3>
                  <h3 className="font-bold">{edu.zonaEmpresa}</h3>
                  <p className="">{edu.descripcionExperiencia}</p>
                  <p>
                    {edu.anioInicioExperiencia}, {edu.anioFinExperiencia}
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-2 flex flex-row gap-2 items-center justify-center text-red-500 hover:bg-red-50 transition-colors duration-700 hover:border-red-500 border-2 p-2 rounded-lg  deleteButton"
                  onClick={() => removeExperience(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  Eliminar
                </button>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="puesto"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={newExperience.puesto}
                  onChange={handleExperienceChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre del puesto
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="nombreEmpresa"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={newExperience.nombreEmpresa}
                  onChange={handleExperienceChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre de la empresa
                </label>
              </div>

              <div className="relative z-0 w-full group md:col-span-2">
                <input
                  type="text"
                  name="zonaEmpresa"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={newExperience.zonaEmpresa}
                  onChange={handleExperienceChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ubicación de la empresa
                </label>
              </div>

              {/* cambiar nombres de name solo para el frnt */}
              <div className="">
                <label
                  htmlFor="countries"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  año inicio
                </label>
                <select
                  id="countries"
                  name="anioInicioExperiencia"
                  className="w-full px-3 text-sm py-2 border border-gray-300 rounded-md"
                  // defaultValue={""}
                  onChange={handleExperienceChange}
                  value={newExperience.anioInicioExperiencia}
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

              <div className="">
                <label
                  htmlFor="countries"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  año fin
                </label>
                <select
                  id="countries"
                  name="anioFinExperiencia"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  onChange={handleExperienceChange}
                  value={newExperience.anioFinExperiencia}
                  disabled={newExperience.anioInicioExperiencia === ""}
                >
                  <option value={""} hidden>
                    seleccione año
                  </option>

                  <option value={"Actualidad"}>Actualidad</option>

                  {arr.map((e, i) => {
                    return newExperience.anioInicioExperiencia <= e ? (
                      <option key={`${e}-${i}`} value={e}>
                        {e}
                      </option>
                    ) : (
                      ""
                    );
                  })}
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Descripción
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="descripcionExperiencia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Descripción de tareas"
                  onChange={handleExperienceChange}
                  value={newExperience.descripcionExperiencia}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between ">
              <button
                type="button"
                className="flex flex-row gap-2 capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={addExperience}
              >
                <svg
                  width={24}
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                <span>agregar</span>
              </button>

              <button
                type="button"
                onClick={() => moveToNextSection("experience", "cursos")}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
              >
                <span>Siguiente</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </motion.section>

          }
          
          { sectionRefsStatus.cursos &&

            <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            ref={sectionRefs.cursos}
            className={`bg-white p-6 rounded-lg shadow-md `}
          >
            <h2 className="capitalize text-2xl font-semibold mb-4">
              Cursos/Certificaciones
            </h2>

            {cvData.cursos.map((edu: any, index: any) => (
              <div
                key={index}
                className=" mb-4 p-3 border rounded-lg text-black w-full "
              >
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-bold">{edu.curso}</h3>
                  <p>{edu.institucion}</p>
                  <p>{edu.anioInicioExperiencia}</p>
                </div>
                <button
                  type="button"
                  className="mt-2 flex flex-row gap-2 items-center justify-center text-red-500 hover:bg-red-50 transition-colors duration-700 hover:border-red-500 border-2 p-2 rounded-lg  deleteButton"
                  onClick={() => removeCursos(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  Eliminar
                </button>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="curso"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={newCursos.curso}
                  onChange={handleCursoChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre del curso
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="institucion"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  onChange={handleCursoChange}
                  value={newCursos.institucion}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre de la institución
                </label>
              </div>

              {/* cambiar nombres de name solo para el frnt */}
              <div className="">
                <label
                  htmlFor="countries"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  año inicio
                </label>
                <select
                  id="countries"
                  name="anioInicioCurso"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  value={newCursos.anioInicioCurso}
                  onChange={handleCursoChange}
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
            <div className="flex justify-between ">
              <button
                type="button"
                className="flex flex-row gap-2 capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={addCursos}
              >
                <svg
                  width={24}
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                <span>agregar</span>
              </button>
              <button
                type="button"
                onClick={() => moveToNextSection("cursos", "idiomas")}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
              >
                <span>Siguiente</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </motion.section>}

         {
          sectionRefsStatus.idiomas &&

          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            ref={sectionRefs.idiomas}
            className={`bg-white p-6 rounded-lg shadow-md `}
          >
            <h2 className="capitalize text-2xl font-semibold mb-4">Idiomas</h2>

            {cvData.idiomas.map((edu: any, index: any) => (
              <div
                key={index}
                className=" mb-4 p-3 border rounded-lg text-black w-full "
              >
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-bold">{edu.idioma}</h3>
                  <p>{edu.nivel}</p>
                </div>
                <button
                  type="button"
                  className="mt-2 flex flex-row gap-2 items-center justify-center text-red-500 hover:bg-red-50 transition-colors duration-700 hover:border-red-500 border-2 p-2 rounded-lg  deleteButton"
                  onClick={() => removeIdiomas(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                  </svg>
                  Eliminar
                </button>
              </div>
            ))}

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="idioma"
                  id="floating_idioma"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={newIdioma.idioma}
                  onChange={handleIdiomaChange}
                />
                <label
                  htmlFor="floating_idioma"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre de idioma
                </label>
              </div>

              <div className="">
                <label
                  htmlFor="idioma_nivel"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-400 capitalize"
                >
                  nivel{" "}
                </label>
                <select
                  id="idioma_nivel"
                  name="nivel"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  value={newIdioma.nivel}
                  onChange={handleIdiomaChange}
                >
                  <option value={""} hidden>
                    seleccione nivel
                  </option>

                  <option value={"BASICO"}>básico</option>
                  <option value={"INTERMEDIO"}>intermedio</option>
                  <option value={"AVANZADO"}>avanzado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="flex flex-row gap-2 capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={addIdiomas}
              >
                <svg
                  width={24}
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                <span>agregar</span>
              </button>

              <button
                type="button"
                onClick={() => moveToNextSection("idiomas", "informacionA")}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
              >
                <span>Siguiente</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </motion.section>}

         { sectionRefsStatus.informacionA &&
          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            ref={sectionRefs.informacionA}
            className={`bg-white p-6 rounded-lg shadow-md  `}
          >
            <h2 className="text-2xl font-semibold mb-4 capitalize">
              Información adicional
            </h2>

            <div className="grid grid-cols-1  gap-4">
              <div className="flex gap-2 relative z-0 w-full group">
                <input
                  type="checkbox"
                  name="licencia"
                  id="licencia"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="licencia"
                  className="block  text-sm font-medium text-gray-900 
                capitalize"
                >
                  Licencia de conducir.
                </label>
              </div>

              <div className="flex gap-2 relative z-0 w-full group">
                <input
                  type="checkbox"
                  name="movilidad"
                  id="movilidad"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="movilidad"
                  className="block  text-sm font-medium text-gray-900 
              "
                >
                  Movilidad propia.
                </label>
              </div>

              <div className="flex gap-2 relative z-0 w-full group">
                <input
                  type="checkbox"
                  name="incorporacion"
                  id="incorporacion"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="incorporacion"
                  className="block  text-sm font-medium text-gray-900 
              "
                >
                  Incorporación inmediata.
                </label>
              </div>

              <div className="flex gap-2 relative z-0 w-full group">
                <input
                  type="checkbox"
                  name="office"
                  id="office"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="office"
                  className="block  text-sm font-medium text-gray-900 
              "
                >
                  Microsoft Office.
                </label>
              </div>

              <div className="">
                <label
                  htmlFor="disponibilidad"
                  className="block mb-2 text-sm font-medium text-gray-900  capitalize"
                >
                  disponibilidad horaria
                </label>
                <select
                  id="disponibilidad"
                  name="disponibilidad"
                  className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md"
                  onChange={handleInputChange}
                >
                  <option value={""} hidden>
                    seleccione disponibilidad
                  </option>
                  <option value={"FULLTIME"}>full time</option>
                  <option value={"PARTTIME"}>part time</option>
                </select>
              </div>
            </div>
          </motion.section>}
        </AnimatePresence>

        <button
          type="submit"
          className={`w-full capitalize px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
            sectionRefsStatus.experience != "" &&
            sectionRefsStatus.cursos != "" &&
            sectionRefsStatus.education != "" &&
            sectionRefsStatus.idiomas != "" &&
            sectionRefsStatus.informacionA != ""
              ? ""
              : "hidden"
          }`}
        >
          Registrar Datos
        </button>
      </form>
    </div>
  );
}

export default FormRegister;
