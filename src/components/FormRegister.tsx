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
import CVTemplateSelector from "./CVTemplateSelector";
import CountArrayForm from "./user/[id]/CountArrayForm";
import ErrorComponent from "./user/[id]/ErrorComponent";
import clsx from "clsx";
import { Errors } from "@/lib/definitions";
import InputComponent from "./user/[id]/InputComponent";

type Section =
  | "personal"
  | "education"
  | "experience"
  | "cursos"
  | "idiomas"
  | "informacionA"
  | "orientacionCV"
  | "CVTemplateSelector";

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

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateCVData({ [name]: value });

    if (dataResponse.errors[name]?.length > 0) {
      setDataResponse({
        ...dataResponse,
        errors: {
          ...dataResponse.errors,
          [name]: [],
        },
      });
    }
  };

  const handleInputChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    console.log("name", name);
    console.log("checked", checked);
    console.log("value", value);

    updateCVData((prevData: any) => ({
      ...prevData,
      [name]: checked ? name : "", // Store the name if checked, empty string if unchecked
    }));

    console.log("cvData", cvData.incorporacion);
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
        CVTemplateSelector: "CVTemplateSelector",
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
    CVTemplateSelector: useRef<HTMLDivElement>(null),
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
    CVTemplateSelector: "",
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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
      name: [] as string[],
      lastName: [] as string[],
      phone: [] as string[],
      dni: [] as string[],
      fechaNacimiento: [] as string[],
      email: [] as string[],
      domicilio: [] as string[],
      ciudad: [] as string[],
      provincia: [] as string[],
      linkedin: [] as string[],
      color: [] as string[],
      template: [] as string[],
    } as Errors,
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
        .bind(null, result?.url || cvData.imagenPerfil)
        .bind(null, idUser)
        .bind(null, cvData.idCVTemplate);
    } else {
      newPost = postUsuarios
        .bind(null, cvData.experience)
        .bind(null, cvData.cursos)
        .bind(null, cvData.education)
        .bind(null, cvData.idiomas)
        .bind(null, result?.url || cvData.imagenPerfil);
    }

    const postPromise = newPost(e);

    toast.promise(postPromise, {
      loading: `${idUser ? "Actualizando " : "Registrando"} a ${cvData.name} ${
        cvData.lastName
      }`,
      success: (dato: any) => {
        if (!dato.success) {
          const newErrors = { ...dataResponse.errors, ...dato.errors };
          setDataResponse({
            message: dato.message,
            errors: newErrors,
          });
          throw new Error(dato.message);
        }

        router.push(idUser ? "/dashboard" : "/success");
        return `${dato.message}`;
      },
      error: (error) => {
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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M3 6H21V18H3V6ZM2 4C1.44772 4 1 4.44772 1 5V19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19V5C23 4.44772 22.5523 4 22 4H2ZM13 8H19V10H13V8ZM18 12H13V14H18V12ZM10.5 10C10.5 11.3807 9.38071 12.5 8 12.5C6.61929 12.5 5.5 11.3807 5.5 10C5.5 8.61929 6.61929 7.5 8 7.5C9.38071 7.5 10.5 8.61929 10.5 10ZM8 13.5C6.067 13.5 4.5 15.067 4.5 17H11.5C11.5 15.067 9.933 13.5 8 13.5Z"></path>
        </svg>
      ),
    },
    {
      id: "movilidad",
      label: "Movilidad propia",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V11L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 13H4V18H20V13ZM4.17594 11H19.8241L17.6812 6H6.31879L4.17594 11ZM6.5 17C5.67157 17 5 16.3284 5 15.5C5 14.6716 5.67157 14 6.5 14C7.32843 14 8 14.6716 8 15.5C8 16.3284 7.32843 17 6.5 17ZM17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5C19 16.3284 18.3284 17 17.5 17Z"></path>
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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M17 19H20V4.99997H17V2.99997H21C21.5523 2.99997 22 3.44769 22 3.99997V20C22 20.5523 21.5523 21 21 21H17V19ZM2.85858 2.87732L15.4293 1.0815C15.7027 1.04245 15.9559 1.2324 15.995 1.50577C15.9983 1.52919 16 1.55282 16 1.57648V22.4235C16 22.6996 15.7761 22.9235 15.5 22.9235C15.4763 22.9235 15.4527 22.9218 15.4293 22.9184L2.85858 21.1226C2.36593 21.0522 2 20.6303 2 20.1327V3.86727C2 3.36962 2.36593 2.9477 2.85858 2.87732ZM4 4.73457V19.2654L14 20.694V3.30599L4 4.73457ZM11 7.99997H13V16H11L9 14L7 16H5V7.99997H7L7.01083 13L9 11L11 12.989V7.99997Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 mb-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mt-4 text-gray-900 dark:text-white"
      >
        {idUser ? "Actualización de registro" : "Formulario de creación de CV"}
      </motion.h1>

      <form action={handleSubmit} className="flex flex-col">
        <AnimatePresence mode="sync">
          <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            className="w-full max-w-4xl mx-auto p-4"
          >
            <WrapperSection>
              <WrapperSectionInput>
                <WrapperH2Section
                  title="datos personales"
                  additionalMessage="* El asterisco indica que es obligatorio"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  {/* <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="name"
                      id="floating_first_name"
                      className={clsx(
                        "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 dark:text-white appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                        {
                          "border-red-500": dataResponse.errors.name.length,
                          " border-gray-300 dark:border-gray-600":
                            !dataResponse.errors.name.length,
                        }
                      )}
                      placeholder=" "
                      onKeyDown={handleKeyDown}
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
                  </div> */}
                  <InputComponent
                    name={"name"}
                    value={cvData.name}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id={"floating_first_name"}
                    responseError={dataResponse.errors.name.length}
                    content={"Nombres"}
                    requiered={true}
                  />

                  {/* <div className="relative z-0 w-full group">
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
                  </div> */}

                    <InputComponent
                      name={"lastName"}
                      value={cvData.lastName}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      id={"floating_last_name"}
                      responseError={dataResponse.errors.lastName.length}
                      content={"Apellido"}
                      requiered={true}
                    />

                  <div className="relative z-0 w-full group">
                    <input
                      type="date"
                      name="fechaNacimiento"
                      id="floating_fecha_nacimiento"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={cvData.fechaNacimiento}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="floating_fecha_nacimiento"
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

                  <div className="relative z-0 w-full mx-auto group row-span-2">
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

                {(dataResponse.errors.lastName ||
                  dataResponse.errors.name ||
                  dataResponse.errors.fechaNacimiento ||
                  dataResponse.errors.phone) && (
                  <>
                    <ErrorComponent arr={dataResponse.errors.lastName} />
                    <ErrorComponent arr={dataResponse.errors.name} />
                    <ErrorComponent arr={dataResponse.errors.fechaNacimiento} />
                    <ErrorComponent arr={dataResponse.errors.phone} />
                  </>
                )}
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
                  <WrapperH2Section
                    title="educación"
                    additionalMessage="Recomendado Incluye tu último nivel de estudios formales."
                  />

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
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Nombre del cargo
                      </label>
                    </div>

                    <div className="relative z-0 w-full group">
                      <input
                        type="text"
                        name="nombreEmpresa"
                        id="nombre_empresa"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                <div className=" bg-gray-50 dark:bg-gray-800/50">
                  <CountArrayForm cantidad={cvData.experience.length} />
                  <div className="flex gap-2 p-6 justify-between">
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
                <div className=" bg-gray-50 dark:bg-gray-800/50 ">
                  <CountArrayForm cantidad={cvData.cursos.length} />
                  <div className="flex gap-2 p-6 justify-between">
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
                <div className="bg-gray-50 dark:bg-gray-800/50">
                  <CountArrayForm cantidad={cvData.idiomas.length} />
                  <div className="flex gap-2 p-6 justify-between">
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
                                defaultChecked={
                                  cvData[item.id as keyof typeof cvData]
                                    .length > 0
                                }
                                onChange={handleInputChangeCheck}
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

                  <div className="grid grid-cols-1 ">
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
                          primer empleo, quieres resaltar experiencia en un
                          sector específico, aspiras a un puesto en particular o
                          un cv genérico?
                        </span>
                      </div>
                    </div>
                  </div>
                </WrapperSectionInput>
                {!idUser && moveToNextSection && (
                  <div className="flex flex-row justify-end p-6 bg-gray-50 dark:bg-gray-800/50">
                    <WrapperButton
                      title="siguiente"
                      moveToNextSection={() =>
                        moveToNextSection("orientacionCV", "CVTemplateSelector")
                      }
                      color="green"
                    />
                  </div>
                )}
              </WrapperSection>
            </motion.section>
          )}

          {sectionRefsStatus.CVTemplateSelector && (
            <div ref={sectionRefs.CVTemplateSelector}>
              <CVTemplateSelector cvData={cvData} updateCVData={updateCVData} />
            </div>
          )}
        </AnimatePresence>

        <div className="flex w-full  justify-center">
          <button
            type="submit"
            className={` mt-5 inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 
            active:bg-green-700 text-white font-medium rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 capitalize ${
                        sectionRefsStatus.experience != "" &&
                        sectionRefsStatus.cursos != "" &&
                        sectionRefsStatus.education != "" &&
                        sectionRefsStatus.idiomas != "" &&
                        sectionRefsStatus.informacionA != "" &&
                        sectionRefsStatus.orientacionCV != "" &&
                        sectionRefsStatus.CVTemplateSelector != ""
                          ? ""
                          : "hidden"
                      }`}
          >
            {idUser ? (
              <>
                {"Actualizar Datos"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M21 15.2426V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5511 3 20.9925V9H9C9.55228 9 10 8.55228 10 8V2H20.0017C20.5531 2 21 2.45531 21 2.9918V6.75736L12.0012 15.7562L11.995 19.995L16.2414 20.0012L21 15.2426ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761ZM3 7L8 2.00318V7H3Z"></path>
                </svg>
              </>
            ) : (
              <>
                {"Registrar Datos"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M1.94607 9.31543C1.42353 9.14125 1.4194 8.86022 1.95682 8.68108L21.043 2.31901C21.5715 2.14285 21.8746 2.43866 21.7265 2.95694L16.2733 22.0432C16.1223 22.5716 15.8177 22.59 15.5944 22.0876L11.9999 14L17.9999 6.00005L9.99992 12L1.94607 9.31543Z"></path>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormRegister;
