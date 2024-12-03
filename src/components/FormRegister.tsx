"use client";

import { postUsuarios, updateUser, uploadImage, uploadImageBack } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import ImageUpload from "./ImageUpload";
import { InfoCard } from "./InfoCard";
import { useRouter } from "next/navigation";

type Section =
  | "personal"
  | "education"
  | "experience"
  | "cursos"
  | "idiomas"
  | "informacionA"
  | "orientacionCV";

function FormRegister({
  cvData,
  updateCVData,
  idUser,
}: {
  cvData: any;
  updateCVData: any;
  idUser: number;
}) {

  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    updateCVData({ [name]: value });
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    cvData.imagenPerfil || null
  );

  useEffect(() => {
    if (idUser) {
      setSectionRefsStatus({
        education: "education",
        cursos: "cursos",
        experience: "experience",
        idiomas: "idiomas",
        informacionA: "informacionA",
        orientacionCV: "orientacionCV",
      });
      setImagePreview(cvData.imagenPerfil);
    }
  }, [idUser]);

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
    orientacionCV: useRef<HTMLDivElement>(null),
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
    orientacionCV: "",
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
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const result = await uploadImage(formData);
      updateCVData({ ...cvData, imagenPerfil: result.url });
    }

    let newPost;

    if (idUser) {
      
      newPost = updateUser
      .bind(null, cvData.experience)
      .bind(null, cvData.cursos)
      .bind(null, cvData.education)
      .bind(null, cvData.idiomas)
      .bind(null, cvData.imagenPerfil)
      .bind(null, idUser);
    }else{
      
      newPost = postUsuarios
      .bind(null, cvData.experience)
      .bind(null, cvData.cursos)
      .bind(null, cvData.education)
      .bind(null, cvData.idiomas)
      .bind(null, cvData.imagenPerfil);
    }

    const postPromise = newPost(e); // Tu promesa original

    toast.promise(postPromise, {
      loading: `${idUser ? "Actualizando " : "Registrando"} a ${cvData.name} ${cvData.lastName}`,
      success: (dato: any) => {
        router.push(idUser ? "/dashboard" : "/");
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
    sectionRefs[nextSection].current?.scrollIntoView({ behavior: "smooth",
      block: "center", 
      
    });
  };

  useEffect(() => {
    if (activeSection && sectionRefs[activeSection].current) {
      sectionRefs[activeSection].current.scrollIntoView({ behavior: "smooth",
        block: "center",
       });
    }
  }, [activeSection]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <form action={handleSubmit} className="flex flex-col">
        <AnimatePresence mode="sync">
          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            className="bg-white dark:bg-gray-900 duration-500 p-6 rounded-lg shadow-md transition-colors mt-8"
          >
            <h2 className="text-3xl font-semibold  capitalize text-gray-900 dark:text-white">
              Datos personales
            </h2>
              <span className="text-xs  text-gray-600 dark:text-gray-400"> * El asterisco indica que es obligatorio</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.name}
                  required
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombres<sup>*</sup>
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
                  Apellido<sup>*</sup>
                </label>
              </div>
              {/* Desde aca cambiar color fuente y icono del Date*/}

              <div className="relative z-0 w-full group">
                <input
                  type="date"
                  name="fechaNacimiento"
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={cvData.fechaNacimiento}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_company"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Fecha de nacimiento<sup>*</sup>
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="string"
                  name="dni"
                  id="floating_dni"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.dni}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_dni"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  DNI
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="tel"
                  name="phone"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.phone}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Teléfono<sup>*</sup>
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.email}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize"
                >
                  Correo electrónico
                </label>
              </div>
              {/* hacerlo con una appi que se despliegue la ciudad */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="provincia"
                  id="floating_provincia"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.provincia}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_provincia"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Provincia
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="ciudad"
                  id="floating_ciudad"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={cvData.ciudad}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_ciudad"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ciudad
                </label>
              </div>

              <div className="relative z-0 w-full group row-span-2">
                <ImageUpload
                  value={imageFile}
                  previewUrl={imagePreview}
                  onChange={(file) => {
                    setImageFile(file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                        updateCVData({
                          ...cvData,
                          imagenPerfil: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  onRemove={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    updateCVData({ ...cvData, imagenPerfil: null });
                  }}
                />
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

          {sectionRefsStatus.education && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.education}
              className={`bg-white dark:bg-gray-900 duration-500 p-6 rounded-lg shadow-md mt-8 `}
            >
              <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-white">
                Educación
              </h2>

              {cvData.education.map((edu: any, index: number) => (
                <InfoCard
                  key={`${index}-educacion`}
                  title={edu.institucion}
                  subtitle={edu.estudios}
                  details={[
                    edu.zonaInstitucion,
                    `${edu.carrera}, ${edu.estado}`,
                    `${edu.anioInicioEducacion} - ${edu.anioFinEducacion}`,
                  ]}
                  onDelete={() => removeEducation(index)}
                />
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative z-0 w-full group ">
                  <input
                    type="text"
                    name="institucion"
                    id="floating_institucion"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={newEducation.institucion}
                    onChange={handleEducationChange}
                  />
                  <label
                    htmlFor="floating_institucion"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nombre de la institución
                  </label>
                </div>

                <div className="relative z-0 w-full  group ">
                  <input
                    type="text"
                    name="carrera"
                    id="carrera_titulo"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={newEducation.carrera}
                    onChange={handleEducationChange}
                  />
                  <label
                    htmlFor="carrera_titulo"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nombre del titulo
                  </label>
                </div>
                <div className="relative z-0 w-full md:col-span-2  group">
                  <input
                    type="text"
                    name="zonaInstitucion"
                    id="zonaInstitucion"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={newEducation.zonaInstitucion}
                    onChange={handleEducationChange}
                  />
                  <label
                    htmlFor="zonaInstitucion"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ubicación de la institución
                  </label>
                </div>
                <div className="">
                  <label
                    htmlFor="nivel_estudio"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
                  >
                    Nivel de Estudios:
                  </label>
                  <select
                    id="nivel_estudio"
                    name="estudios"
                    className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleEducationChange}
                    value={newEducation.estudios}
                  >
                    <option value={""} hidden>
                      Seleccione nivel
                    </option>
                    <option value={"PRIMARIO"}>Primario</option>
                    <option value={"SECUNDARIO"}>Secundario</option>
                    <option value={"TERCIARIO"}>Terciario</option>
                    <option value={"UNIVERSITARIO"}>Universitario</option>
                  </select>
                </div>

                <div className="">
                  <label
                    htmlFor="estado_estudio"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
                  >
                    Estado:
                  </label>
                  <select
                    id="estado_estudio"
                    name="estado"
                    className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newEducation.estado}
                    onChange={handleEducationChange}
                  >
                    <option value={""} hidden>
                      Seleccione un estado
                    </option>
                    <option value={"COMPLETO"}>Completo</option>
                    <option value={"PROCESO"}>En proceso</option>
                    <option value={"INCOMPLETO"}>Incompleto</option>
                  </select>
                </div>

                <div className=" ">
                  <label
                    htmlFor="anioInicioEducacion"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400 capitalize"
                  >
                    Año de inicio
                  </label>

                  <select
                    name="anioInicioEducacion"
                    className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newEducation.anioInicioEducacion}
                    onChange={handleEducationChange}
                  >
                    <option value={""} hidden>
                      Seleccione año
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
                    htmlFor="anioFinEducacion"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400 capitalize"
                  >
                    Año de finalización o fecha prevista
                  </label>
                  <select
                    disabled={newEducation.anioInicioEducacion == ""}
                    name="anioFinEducacion"
                    className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newEducation.anioFinEducacion}
                    onChange={handleEducationChange}
                  >
                    <option value={""} hidden>
                      Seleccione año
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
                  <span>Agregar</span>
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
            </motion.section>
          )}

          {sectionRefsStatus.experience && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.experience}
              className={`bg-white dark:bg-gray-900 duration-500 p-6 rounded-lg shadow-md mt-8 `}
            >
              <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-white">
                Experiencia Laboral
              </h2>

              {cvData.experience.map((exp: any, index: number) => (
                <InfoCard
                  key={`${index}-experience`}
                  title={exp.puesto}
                  subtitle={exp.nombreEmpresa}
                  details={[
                    exp.zonaEmpresa,
                    exp.descripcionExperiencia,
                    `${exp.anioInicioExperiencia} - ${exp.anioFinExperiencia}`,
                  ]}
                  onDelete={() => removeExperience(index)}
                />
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="puesto"
                    id="puesto"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={newExperience.puesto}
                    onChange={handleExperienceChange}
                  />
                  <label
                    htmlFor="puesto"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nombre del cargo
                  </label>
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="nombreEmpresa"
                    id="nombre_empresa"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={newExperience.nombreEmpresa}
                    onChange={handleExperienceChange}
                  />
                  <label
                    htmlFor="nombre_empresa"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nombre de la empresa
                  </label>
                </div>

                <div className="relative z-0 w-full group md:col-span-2">
                  <input
                    type="text"
                    name="zonaEmpresa"
                    id="zona_empresa"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={newExperience.zonaEmpresa}
                    onChange={handleExperienceChange}
                  />
                  <label
                    htmlFor="zona_empresa"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ubicación de la empresa
                  </label>
                </div>

                {/* cambiar nombres de name solo para el frnt */}
                <div className="">
                  <label
                    htmlFor="anioInicioExperiencia"
                    className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-400 capitalize"
                  >
                    Año de inicio
                  </label>
                  <select
                    id="anioInicioExperiencia"
                    name="anioInicioExperiencia"
                    className="w-full px-3 text-sm py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleExperienceChange}
                    value={newExperience.anioInicioExperiencia}
                  >
                    <option value={""} hidden>
                      Seleccione año
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
                    htmlFor="anioFinExperiencia"
                    className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-400 capitalize"
                  >
                    Año de finalización*
                  </label>
                  <select
                    id="anioFinExperiencia"
                    name="anioFinExperiencia"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleExperienceChange}
                    value={newExperience.anioFinExperiencia}
                    disabled={newExperience.anioInicioExperiencia === ""}
                  >
                    <option value={""} hidden>
                      Seleccione año
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
                    htmlFor="descripcionExperiencia"
                    className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcionExperiencia"
                    rows={4}
                    name="descripcionExperiencia"
                    className="w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white rounded-md"
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
                  <span>Agregar</span>
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
          )}

          {sectionRefsStatus.cursos && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.cursos}
              className={`bg-white dark:bg-gray-900 duration-500 p-6 rounded-lg shadow-md mt-8`}
            >
              <h2 className="capitalize text-2xl font-semibold mb-4 text-black dark:text-white">
                Cursos/Certificaciones
              </h2>

              {cvData.cursos.map((curso: any, index: number) => (
                <InfoCard
                  key={`${index}-cursos`}
                  title={curso.curso}
                  details={[curso.institucion, curso.anioInicioCurso]}
                  onDelete={() => removeCursos(index)}
                />
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="curso"
                    id="nombre_curso"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={newCursos.curso}
                    onChange={handleCursoChange}
                  />
                  <label
                    htmlFor="nombre_curso"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                  >
                    Nombre del curso
                  </label>
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="institucion"
                    id="institucion_nombre_curso"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    onChange={handleCursoChange}
                    value={newCursos.institucion}
                  />
                  <label
                    htmlFor="institucion_nombre_curso"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nombre de la institución
                  </label>
                </div>

                {/* cambiar nombres de name solo para el frnt */}
                <div className="">
                  <label
                    htmlFor="anioInicioCurso"
                    className="block text-xs mb-1 font-medium text-gray-900 dark:text-gray-400 capitalize"
                  >
                    Año de inicio
                  </label>
                  <select
                    id="anioInicioCurso"
                    name="anioInicioCurso"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newCursos.anioInicioCurso}
                    onChange={handleCursoChange}
                  >
                    <option value={""} hidden>
                      Seleccione año
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
                  <span>Agregar</span>
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
            </motion.section>
          )}

          {sectionRefsStatus.idiomas && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.idiomas}
              className={`bg-white dark:bg-gray-900  duration-500 p-6 rounded-lg shadow-md mt-8`}
            >
              <h2 className="capitalize text-2xl font-semibold mb-4 text-black dark:text-white">
                Idiomas
              </h2>

              {cvData.idiomas.map((idioma: any, index: number) => (
                <InfoCard
                  key={`${index}-idiomas`}
                  title={idioma.idioma}
                  details={[idioma.nivel]}
                  onDelete={() => removeIdiomas(index)}
                />
              ))}

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="idioma"
                    id="floating_idioma"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={newIdioma.idioma}
                    onChange={handleIdiomaChange}
                  />
                  <label
                    htmlFor="floating_idioma"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    ¿Qué idioma dominas?
                  </label>
                </div>

                <div className="">
                  <label
                    htmlFor="idioma_nivel"
                    className="block text-xs mb-1 font-medium text-gray-900 dark:text-gray-400 capitalize"
                  >
                    Nivel{" "}
                  </label>
                  <select
                    id="idioma_nivel"
                    name="nivel"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newIdioma.nivel}
                    onChange={handleIdiomaChange}
                  >
                    <option value={""} hidden>
                      Seleccione nivel
                    </option>

                    <option value={"BASICO"}>Básico</option>
                    <option value={"INTERMEDIO"}>Intermedio</option>
                    <option value={"AVANZADO"}>Avanzado</option>
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
                  <span>Agregar</span>
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
            </motion.section>
          )}

          {sectionRefsStatus.informacionA && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.informacionA}
              className={`bg-white dark:bg-gray-900 duration-500 p-6 rounded-lg shadow-md  mt-8`}
            >
              <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-white">
                Información Adicional
              </h2>

              <div className="grid grid-cols-1  gap-4">
                <div className="flex gap-2 relative z-0 w-full group">
                  <input
                    type="checkbox"
                    name="licencia"
                    id="licencia"
                    checked={cvData.licencia.length > 0}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="licencia"
                    className="block  text-sm font-medium text-gray-900 dark:text-white 
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
                    checked={cvData.movilidad.length > 0}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="movilidad"
                    className="block  text-sm font-medium text-gray-900 dark:text-white 
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
                    checked={cvData.incorporacion.length > 0}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="incorporacion"
                    className="block  text-sm font-medium text-gray-900 dark:text-white 
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
                    checked={cvData.office.length > 0}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="office"
                    className="block  text-sm font-medium text-gray-900 dark:text-white 
              "
                  >
                    Microsoft Office.
                  </label>
                </div>

                <div className="">
                  <label
                    htmlFor="disponibilidad"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white  capitalize"
                  >
                    Disponibilidad Horaria
                  </label>
                  <select
                    id="disponibilidad"
                    name="disponibilidad"
                    value={cvData.disponibilidad}
                    className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200"
                    onChange={handleInputChange}
                  >
                    <option value={""} hidden>
                      Seleccione disponibilidad
                    </option>
                    <option value={"FULLTIME"}>Full Time</option>
                    <option value={"PARTTIME"}>Part Time</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() =>
                    moveToNextSection("informacionA", "orientacionCV")
                  }
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
          )}
        </AnimatePresence>

        {sectionRefsStatus.orientacionCV && (
          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            ref={sectionRefs.orientacionCV}
            className={`bg-white dark:bg-gray-900 duration-500 p-6 rounded-lg shadow-md  mt-8`}
          >
            <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-white">
              CV Orientado a empleo
            </h2>

            <div className="grid grid-cols-1  gap-4">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  className="block py-2.5  px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                  name="orientadoCV"
                  id="floating_orientado"
                  placeholder=" "
                  value={cvData.orientadoCV}
                  required
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="floating_orientado"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Orientado a empleo
                </label>
                <div className="mt-5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    *Tipo de empleo que desea orientar el CV por ejemplo: <br />
                    sin experiencia, trabajo el cual desenpeña o puesto de
                    trabajo que deseen aspirar.
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        <button
          type="submit"
          className={`w-full capitalize px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-8 ${
            sectionRefsStatus.experience != "" &&
            sectionRefsStatus.cursos != "" &&
            sectionRefsStatus.education != "" &&
            sectionRefsStatus.idiomas != "" &&
            sectionRefsStatus.informacionA != "" &&
            sectionRefsStatus.orientacionCV != ""
              ? ""
              : "hidden"
          }`}
        >
          {
            idUser
              ? "Actualizar Datos"
              : "Registrar Datos"
          }
        </button>
      </form>
    </div>
  );
}

export default FormRegister;
