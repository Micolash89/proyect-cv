"use client";

import {
  postUsuarios,
  updateUser,
  uploadImage,
  uploadImageBack,
} from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import ImageUpload from "./ImageUpload";
import { InfoCard } from "./InfoCard";
import { useRouter } from "next/navigation";
import WrapperH2Section from "./user/[id]/WrapperH2Section";
import WrapperButton from "./user/[id]/WrapperButton";
import WrapperSectionInput from "./user/[id]/WrapperSectionInput";
import WrapperSection from "./user/[id]/WrapperSection";

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

  // const handleInputChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;

  //   console.log("name", name)
  //   console.log("checked", checked)

  //   updateCVData((prevData:any) => ({
  //     ...prevData,
  //     [name]: checked ? name : '' // Guarda el nombre del campo si está checked, sino string vacío
  //   }));

  //   // e.target.checked = checked?false:true;

  // };

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
    let result: any;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      result = await uploadImage(formData);

      updateCVData({ ...cvData, imagenPerfil: result.url });
    }

    let newPost;

    if (idUser) {
      newPost = updateUser
        .bind(null, cvData.experience)
        .bind(null, cvData.cursos)
        .bind(null, cvData.education)
        .bind(null, cvData.idiomas)
        .bind(null, result?.url || "")
        .bind(null, idUser);
    } else {
      newPost = postUsuarios
        .bind(null, cvData.experience)
        .bind(null, cvData.cursos)
        .bind(null, cvData.education)
        .bind(null, cvData.idiomas)
        .bind(null, cvData.imagenPerfil);
    }

    const postPromise = newPost(e); // Tu promesa original

    toast.promise(postPromise, {
      loading: `${idUser ? "Actualizando " : "Registrando"} a ${cvData.name} ${
        cvData.lastName
      }`,
      success: (dato: any) => {
        router.push(idUser ? "/dashboard" : "/success");
        return `${dato.message}`;
      },
      error: (error) => {
        const newErrors = { ...dataResponse.errors, ...error.errors };
        setDataResponse({
          message: error.message,
          errors: newErrors,
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
    sectionRefs[nextSection].current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    if (activeSection && sectionRefs[activeSection].current) {
      sectionRefs[activeSection].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeSection]);

  const checkboxItems = [
    {
      id: "licencia",
      label: "Licencia de conducir",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
    },
    {
      id: "movilidad",
      label: "Movilidad propia",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      id: "incorporacion",
      label: "Incorporación inmediata",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "office",
      label: "Microsoft Office",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form action={handleSubmit} className="flex flex-col">
        <AnimatePresence mode="sync">
          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            className="w-full max-w-4xl mx-auto p-4"
          >
            {/* <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transition-all duration-200"></div>
            <div className="p-6 border-b dark:border-gray-700"></div> */}
            {/* <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize flex items-center gap-3">
                Datos personales
                <div className="h-8 w-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
                  svg
                </div>
              </h2>
              <span className="text-xs  text-gray-600 dark:text-gray-400">
                {" "}
                * El asterisco indica que es obligatorio
              </span>
            </div> */}
            <WrapperSection>
              <WrapperSectionInput>
                {/* falta lo del asterisco */}
                <WrapperH2Section title="datos personales" />

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
              </WrapperSectionInput>

              {idUser ? (
                ""
              ) : (
                <div className="flex justify-end p-6 bg-gray-50 dark:bg-gray-800/50">
                  <WrapperButton
                    title="Siguiente"
                    moveToNextSection={() =>
                      moveToNextSection("personal", "education")
                    }
                    color="green"
                  />
                </div>
              )}
            </WrapperSection>
          </motion.section>

          {sectionRefsStatus.education && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.education}
              className={`w-full max-w-4xl mx-auto p-4 `}
            >
              <WrapperSection>
                <WrapperSectionInput>
                  <WrapperH2Section title="educación" />
                  {/* <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-white">
                Educación
              </h2> */}

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
                </WrapperSectionInput>

                <div className="flex justify-between p-6 bg-gray-50 dark:bg-gray-800/50">
                  <WrapperButton
                    title="agregar"
                    moveToNextSection={addEducation}
                    color="blue"
                  />
                  {idUser ? (
                    ""
                  ) : (
                    <WrapperButton
                      title="Siguiente"
                      moveToNextSection={() =>
                        moveToNextSection("education", "experience")
                      }
                      color="green"
                    />
                  )}
                </div>
              </WrapperSection>
            </motion.section>
          )}

          {sectionRefsStatus.experience && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.experience}
              className={`w-full max-w-4xl mx-auto p-4 `}
            >
              <WrapperSection>
                <WrapperSectionInput>
                  <WrapperH2Section title="experiencia laboral" />

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
                </WrapperSectionInput>
                <div className="flex justify-between p-6 bg-gray-50 dark:bg-gray-800/50">
                  <WrapperButton
                    title="Agregar"
                    moveToNextSection={addExperience}
                    color="blue"
                  />

                  {idUser ? (
                    ""
                  ) : (
                    <WrapperButton
                      title="Siguiente"
                      moveToNextSection={() =>
                        moveToNextSection("experience", "cursos")
                      }
                      color="green"
                    />
                  )}
                </div>
              </WrapperSection>
            </motion.section>
          )}

          {sectionRefsStatus.cursos && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.cursos}
              className={`w-full max-w-4xl mx-auto p-4`}
            >
              {/* <h2 className="capitalize text-2xl font-semibold mb-4 text-black dark:text-white">
                Cursos/Certificaciones
              </h2> */}

              <WrapperSection>
                <WrapperSectionInput>
                  <WrapperH2Section title="cursos/certificaciones" />

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
                </WrapperSectionInput>
                <div className="flex justify-between p-6 bg-gray-50 dark:bg-gray-800/50 ">
                  <WrapperButton
                    title="Agregar"
                    moveToNextSection={addCursos}
                    color="blue"
                  />
                  {idUser ? (
                    ""
                  ) : (
                    <WrapperButton
                      title="Siguiente"
                      moveToNextSection={() =>
                        moveToNextSection("cursos", "idiomas")
                      }
                      color="green"
                    />
                  )}
                </div>
              </WrapperSection>
            </motion.section>
          )}

          {sectionRefsStatus.idiomas && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.idiomas}
              className={`w-full max-w-4xl mx-auto p-4`}
            >
              <WrapperSection>
                <WrapperSectionInput>
                  <WrapperH2Section title="idiomas" />

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
                        <option value={"NATIVO"}>Nativo</option>
                      </select>
                    </div>
                  </div>
                </WrapperSectionInput>

                <div className="flex justify-between p-6 bg-gray-50 dark:bg-gray-800/50">
                  <WrapperButton
                    title="agregar"
                    moveToNextSection={addIdiomas}
                    color="blue"
                  />
                  {idUser ? (
                    ""
                  ) : (
                    <WrapperButton
                      title="Siguiente"
                      moveToNextSection={() =>
                        moveToNextSection("idiomas", "informacionA")
                      }
                      color="green"
                    />
                  )}
                </div>
              </WrapperSection>
            </motion.section>
          )}

          {sectionRefsStatus.informacionA && (
            <motion.section
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              ref={sectionRefs.informacionA}
              className="w-full max-w-4xl mx-auto p-4"
            >
              <WrapperSection>
                <WrapperSectionInput>
                  <WrapperH2Section title="información adicional" />

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {checkboxItems.map((item) => (
                        <div key={item.id} className="relative">
                          <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                name={item.id}
                                id={item.id}
                                checked={
                                  cvData[item.id as keyof typeof cvData]
                                    .length > 0
                                }
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                {item.icon}
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.label}
                              </span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Disponibilidad Horaria
                      </label>
                      <div className="relative">
                        <select
                          id="disponibilidad"
                          name="disponibilidad"
                          value={cvData.disponibilidad}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        appearance-none transition-colors duration-200"
                        >
                          <option value="" hidden>
                            Seleccione disponibilidad
                          </option>
                          <option value="FULLTIME">Full Time</option>
                          <option value="PARTTIME">Part Time</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </WrapperSectionInput>

                {!idUser && moveToNextSection && (
                  <div className="flex flex-row justify-end p-6 bg-gray-50 dark:bg-gray-800/50">
                    <WrapperButton
                      title="siguiente"
                      moveToNextSection={() =>
                        moveToNextSection("informacionA", "orientacionCV")
                      }
                      color="green"
                    />
                  </div>
                )}
              </WrapperSection>
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
            className={`w-full max-w-4xl mx-auto p-4`}
          >
            <WrapperSection>
              <WrapperSectionInput>
                <WrapperH2Section title="Orientación Laboral del Currículum Vitae" />

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
                        *(opcional) Indica el propósito del CV: ¿Buscas tu
                        primer empleo, quieres resaltar experiencia en un sector
                        específico, o aspiras a un puesto en particular?
                      </span>
                    </div>
                  </div>
                </div>
              </WrapperSectionInput>
            </WrapperSection>
          </motion.section>
        )}

        <button
          type="submit"
          className={`w-full capitalize mb-5 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-8 ${
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
          {idUser ? "Actualizar Datos" : "Registrar Datos"}
        </button>
      </form>
    </div>
  );
}

export default FormRegister;
