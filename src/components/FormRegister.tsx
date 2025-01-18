"use client";

import { postUsuarios, updateUser, uploadImage } from "@/lib/actions";
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
import { Errors, Section } from "@/lib/definitions";
import InputComponent from "./user/[id]/InputComponent";
import {
  educacionEstadoSelect,
  educacionNivelSelect,
  idiomasSelect,
} from "@/lib/constFormRegister";
import SelectInputComponent from "./user/[id]/SelectInputComponent";
import DateInput from "./user/[id]/DateInputComponent";
import YearSelect from "./user/[id]/YearSelectComponent";
import MonthSelect from "./user/[id]/SelectInputMouthComponent";
import {
  validateCursos,
  validateEducation,
  validateExperience,
  validateIdiomas,
} from "@/lib/libs";
import clsx from "clsx";

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

    updateCVData((prevData: any) => ({
      ...prevData,
      [name]: checked ? name : "",
    }));
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

  const currentYear = new Date().getFullYear();

  const [newEducation, setNewEducation] = useState({
    estudios: "",
    estado: "",
    carrera: "",
    institucion: "",
    zonaInstitucion: "",
    anioInicioEducacion: "",
    mesInicioEducacion: "",
    anioFinEducacion: "",
    mesFinEducacion: "",
  });

  const [dataNewEducation, setDataNewEducation] = useState({
    estudios: [] as string[],
    estado: [] as string[],
    carrera: [] as string[],
    institucion: [] as string[],
    zonaInstitucion: [] as string[],
    anioInicioEducacion: [] as string[],
    mesInicioEducacion: [] as string[],
    anioFinEducacion: [] as string[],
    mesFinEducacion: [] as string[],
  });

  const [newCursos, setNewCursos] = useState({
    curso: "",
    institucion: "",
    anioInicioCurso: "",
    mesInicioCurso: "",
  });
  const [dataNewCursos, setDataNewCursos] = useState({
    curso: [] as string[],
    institucion: [] as string[],
    anioInicioCurso: [] as string[],
    mesInicioCurso: [] as string[],
  });

  const [newIdioma, setNewIdioma] = useState({
    idioma: "",
    nivel: "",
  });

  const [dataNewIdioma, setDataNewIdioma] = useState({
    idioma: [] as string[],
    nivel: [] as string[],
  });

  const [newExperience, setNewExperience] = useState({
    puesto: "",
    nombreEmpresa: "",
    zonaEmpresa: "",
    anioInicioExperiencia: "",
    mesInicioExperiencia: "",
    anioFinExperiencia: "",
    mesFinExperiencia: "",
    descripcionExperiencia: "",
  });

  const [dataNewExperience, setDataNewExperience] = useState({
    puesto: [] as string[],
    nombreEmpresa: [] as string[],
    zonaEmpresa: [] as string[],
    anioInicioExperiencia: [] as string[],
    mesInicioExperiencia: [] as string[],
    anioFinExperiencia: [] as string[],
    descripcionExperiencia: [] as string[],
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
    setDataNewEducation({
      ...dataNewEducation,
      [name]: [],
    });
  };

  const addEducation = () => {
    const errors = validateEducation(newEducation);

    if (Object.keys(errors).length === 0) {
      updateCVData({ education: [...cvData.education, newEducation] });
      setNewEducation({
        carrera: "",
        estudios: "",
        estado: "",
        institucion: "",
        zonaInstitucion: "",
        anioInicioEducacion: "",
        anioFinEducacion: "",
        mesInicioEducacion: "",
        mesFinEducacion: "",
      });
    } else {
      setDataNewEducation({
        ...dataNewEducation,
        ...errors,
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

    setDataNewExperience({
      ...dataNewExperience,
      [name]: [],
    });
  };

  const handleIdiomaChange = (e: any) => {
    const { name, value } = e.target;
    setNewIdioma((prev) => ({ ...prev, [name]: value }));

    setDataNewIdioma({
      ...dataNewIdioma,
      [name]: [],
    });
  };

  const handleCursoChange = (e: any) => {
    const { name, value } = e.target;
    setNewCursos((prev) => ({ ...prev, [name]: value }));
    setDataNewCursos({
      ...dataNewCursos,
      [name]: [],
    });
  };

  const addExperience = () => {
    const error = validateExperience(newExperience);

    if (Object.keys(error).length === 0) {
      updateCVData({ experience: [...cvData.experience, newExperience] });
      setNewExperience({
        puesto: "",
        nombreEmpresa: "",
        anioInicioExperiencia: "",
        mesInicioExperiencia: "",
        anioFinExperiencia: "",
        mesFinExperiencia: "",
        descripcionExperiencia: "",
        zonaEmpresa: "",
      });
    } else {
      setDataNewExperience({
        ...dataNewExperience,
        ...error,
      });
    }
  };

  const addCursos = () => {
    const error = validateCursos(newCursos);

    if (Object.keys(error).length === 0) {
      updateCVData({ cursos: [...cvData.cursos, newCursos] });
      setNewCursos({
        curso: "",
        institucion: "",
        anioInicioCurso: "",
        mesInicioCurso: "",
      });
    } else {
      setDataNewCursos({
        ...dataNewCursos,
        ...error,
      });
    }
  };

  const addIdiomas = () => {
    const error = validateIdiomas(newIdioma);
    if (Object.keys(error).length === 0) {
      updateCVData({ idiomas: [...cvData.idiomas, newIdioma] });
      setNewIdioma({ idioma: "", nivel: "" });
    } else {
      setDataNewIdioma({
        ...dataNewIdioma,
        ...error,
      });
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
      education: [] as string[],
      experience: [] as string[],
      cursos: [] as string[],
      idiomas: [] as string[],
      color: [] as string[],
      template: [] as string[],
      orientadoCV: [] as string[],
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
        sectionRefs["personal"].current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
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
            ref={sectionRefs.personal}
          >
            <WrapperSection>
              <WrapperSectionInput>
                <WrapperH2Section
                  title="datos personales"
                  additionalMessage="* El asterisco indica que es obligatorio"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <InputComponent
                    name={"name"}
                    value={cvData.name}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id={"floating_first_name"}
                    responseError={dataResponse.errors.name.length != 0}
                    content={"Nombres"}
                    requiered={true}
                    type="text"
                  />

                  <InputComponent
                    name={"lastName"}
                    value={cvData.lastName}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id={"floating_last_name"}
                    responseError={dataResponse.errors.lastName.length != 0}
                    content={"Apellido"}
                    requiered={true}
                    type="text"
                  />

                  <DateInput
                    name="fechaNacimiento"
                    id="floating_fecha_nacimiento"
                    value={cvData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                  />

                  <InputComponent
                    name="dni"
                    value={cvData.dni}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="floating_dni"
                    responseError={dataResponse.errors.dni.length != 0}
                    content="DNI"
                    requiered={false}
                    type="text"
                  />

                  <InputComponent
                    name="phone"
                    value={cvData.phone}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="floating_phone"
                    responseError={dataResponse.errors.phone.length != 0}
                    content="Teléfono"
                    requiered={true}
                    type="tel"
                  />

                  <InputComponent
                    name="email"
                    value={cvData.email}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="floating_email"
                    responseError={dataResponse.errors.email.length != 0}
                    content="Correo electrónico"
                    requiered={false}
                    type="email"
                  />

                  <InputComponent
                    name="provincia"
                    value={cvData.provincia}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="floating_provincia"
                    responseError={false}
                    content="Provincia"
                    requiered={false}
                    type="text"
                  />

                  <InputComponent
                    name="ciudad"
                    value={cvData.ciudad}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="floating_ciudad"
                    responseError={false}
                    content="Ciudad"
                    requiered={false}
                    type="text"
                  />

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
                  dataResponse.errors.phone ||
                  dataResponse.errors.dni ||
                  dataResponse.errors.email) && (
                  <>
                    <ErrorComponent arr={dataResponse.errors.lastName} />
                    <ErrorComponent arr={dataResponse.errors.name} />
                    <ErrorComponent arr={dataResponse.errors.fechaNacimiento} />
                    <ErrorComponent arr={dataResponse.errors.phone} />
                    <ErrorComponent arr={dataResponse.errors.dni} />
                    <ErrorComponent arr={dataResponse.errors.email} />
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
                    additionalMessage="Recomendado: incluye tu último nivel de estudio formal."
                  />

                  {cvData.education.map((edu: any, index: number) => (
                    <InfoCard
                      key={`${index}-educacion`}
                      title={edu.institucion}
                      subtitle={edu.estudios}
                      details={[
                        edu.zonaInstitucion,
                        `${edu.carrera}, ${edu.estado}`,
                        `${edu.mesInicioEducacion}/${edu.anioInicioEducacion} - ${edu.mesFinEducacion}/${edu.anioFinEducacion}`,
                      ]}
                      onDelete={() => removeEducation(index)}
                    />
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <InputComponent
                      name="carrera"
                      value={newEducation.carrera}
                      onChange={handleEducationChange}
                      onKeyDown={handleKeyDown}
                      id="carrera_titulo"
                      responseError={dataNewEducation.carrera.length != 0}
                      content="Nombre del titulo"
                      requiered={true}
                      type="text"
                    />
                    <InputComponent
                      name="institucion"
                      value={newEducation.institucion}
                      onChange={handleEducationChange}
                      onKeyDown={handleKeyDown}
                      id="floating_institucion"
                      responseError={dataNewEducation.institucion.length != 0}
                      content="Nombre de la institución"
                      requiered={false}
                      type="text"
                    />
                    <InputComponent
                      name="zonaInstitucion"
                      value={newEducation.zonaInstitucion}
                      onChange={handleEducationChange}
                      onKeyDown={handleKeyDown}
                      id="zonaInstitucion"
                      responseError={
                        dataNewEducation.zonaInstitucion.length != 0
                      }
                      content="Ubicación de la institución"
                      requiered={true}
                      type="text"
                      fullColInput={true}
                    />
                    <SelectInputComponent
                      onChange={handleEducationChange}
                      value={newEducation.estudios}
                      arrOptions={educacionNivelSelect}
                      id="nivel_estudio"
                      name="estudios"
                      label="Nivel de estudios"
                      responseError={dataNewEducation.estudios.length == 0}
                      requiered={true}
                    />
                    <SelectInputComponent
                      onChange={handleEducationChange}
                      value={newEducation.estado}
                      arrOptions={educacionEstadoSelect}
                      id="estado_estudio"
                      name="estado"
                      label="Estado"
                      responseError={dataNewEducation.estado.length == 0}
                      requiered={true}
                    />

                    <div className="flex gap-2">
                      <MonthSelect
                        name="mesInicioEducacion"
                        label="Mes de inicio"
                        value={newEducation.mesInicioEducacion}
                        onChange={handleEducationChange}
                        disabled={false}
                        required={true}
                        responseError={
                          dataNewEducation.mesInicioEducacion.length == 0
                        }
                      />
                      <YearSelect
                        name="anioInicioEducacion"
                        label="Año de inicio"
                        value={newEducation.anioInicioEducacion}
                        onChange={handleEducationChange}
                        startYear={currentYear - 50}
                        endYear={currentYear}
                        required={true}
                        responseError={
                          dataNewEducation.anioInicioEducacion.length == 0
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <MonthSelect
                        name="mesFinEducacion"
                        label="Mes de finalización"
                        value={newEducation.mesFinEducacion}
                        onChange={handleEducationChange}
                        disabled={newEducation.anioInicioEducacion === ""}
                        required={false}
                        responseError={true}
                      />

                      <YearSelect
                        name="anioFinEducacion"
                        label="Año de finalización/previsto"
                        value={newEducation.anioFinEducacion}
                        onChange={handleEducationChange}
                        startYear={
                          parseInt(newEducation.anioInicioEducacion) ||
                          currentYear - 50
                        }
                        endYear={currentYear + 10}
                        disabled={newEducation.anioInicioEducacion === ""}
                        includeActualidad={newEducation.estado === "PROCESO"}
                        required={true}
                        responseError={
                          dataNewEducation.anioFinEducacion.length == 0
                        }
                      />
                    </div>
                  </div>

                  {(dataNewEducation.estudios.length > 0 ||
                    dataNewEducation.carrera.length > 0 ||
                    dataNewEducation.estado.length > 0 ||
                    dataNewEducation.zonaInstitucion.length > 0 ||
                    dataNewEducation.institucion.length > 0 ||
                    dataNewEducation.anioInicioEducacion.length > 0 ||
                    dataNewEducation.mesInicioEducacion.length > 0 ||
                    dataNewEducation.anioFinEducacion.length > 0) && (
                    <>
                      <ErrorComponent arr={dataNewEducation.carrera} />
                      <ErrorComponent arr={dataNewEducation.institucion} />
                      <ErrorComponent arr={dataNewEducation.zonaInstitucion} />
                      <ErrorComponent arr={dataNewEducation.estudios} />
                      <ErrorComponent arr={dataNewEducation.estado} />
                      <ErrorComponent
                        arr={dataNewEducation.anioInicioEducacion}
                      />
                      <ErrorComponent
                        arr={dataNewEducation.mesInicioEducacion}
                      />
                      <ErrorComponent arr={dataNewEducation.anioFinEducacion} />
                    </>
                  )}
                </WrapperSectionInput>

                <div className="bg-gray-50 dark:bg-gray-800/50">
                  <CountArrayForm cantidad={cvData.education.length} />

                  <div className="flex justify-between p-6 gap-2">
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
                  <WrapperH2Section
                    title="experiencia laboral"
                    additionalMessage="Recomendado: Incluir la experiencia más reciente a la más antigua"
                  />

                  {cvData.experience.map((exp: any, index: number) => (
                    <InfoCard
                      key={`${index}-experience`}
                      title={exp.puesto}
                      subtitle={exp.nombreEmpresa}
                      details={[
                        exp.zonaEmpresa,
                        exp.descripcionExperiencia,
                        `${exp.mesInicioExperiencia}/${exp.anioInicioExperiencia} - ${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`,
                      ]}
                      onDelete={() => removeExperience(index)}
                    />
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <InputComponent
                      name="puesto"
                      value={newExperience.puesto}
                      onChange={handleExperienceChange}
                      onKeyDown={handleKeyDown}
                      id="puesto"
                      responseError={dataNewExperience.puesto.length != 0}
                      content="Nombre del cargo"
                      requiered={true}
                      type="text"
                    />
                    <InputComponent
                      name="nombreEmpresa"
                      value={newExperience.nombreEmpresa}
                      onChange={handleExperienceChange}
                      onKeyDown={handleKeyDown}
                      id="nombre_empresa"
                      responseError={
                        dataNewExperience.nombreEmpresa.length != 0
                      }
                      content="Nombre de la empresa"
                      requiered={false}
                      type="text"
                    />
                    <InputComponent
                      name="zonaEmpresa"
                      value={newExperience.zonaEmpresa}
                      onChange={handleExperienceChange}
                      onKeyDown={handleKeyDown}
                      id="zona_empresa"
                      responseError={dataNewExperience.zonaEmpresa.length != 0}
                      content="Ubicación de la empresa"
                      requiered={false}
                      type="text"
                      fullColInput={true}
                    />

                    <div className="flex gap-2">
                      <MonthSelect
                        name="mesInicioExperiencia"
                        label="Mes de inicio"
                        value={newExperience.mesInicioExperiencia}
                        onChange={handleExperienceChange}
                        required={true}
                        responseError={
                          dataNewExperience.mesInicioExperiencia.length == 0
                        }
                      />

                      <YearSelect
                        name="anioInicioExperiencia"
                        label="Año de inicio"
                        value={newExperience.anioInicioExperiencia}
                        onChange={handleExperienceChange}
                        startYear={currentYear - 50}
                        endYear={currentYear}
                        required={true}
                        responseError={
                          dataNewExperience.anioInicioExperiencia.length == 0
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <MonthSelect
                        name="mesFinExperiencia"
                        label="Mes de finalización"
                        value={newExperience.mesFinExperiencia}
                        onChange={handleExperienceChange}
                        disabled={newExperience.anioInicioExperiencia === ""}
                      />
                      <YearSelect
                        name="anioFinExperiencia"
                        label="Año de finalización"
                        value={newExperience.anioFinExperiencia}
                        onChange={handleExperienceChange}
                        startYear={
                          parseInt(newExperience.anioInicioExperiencia) ||
                          currentYear - 50
                        }
                        endYear={currentYear}
                        disabled={newExperience.anioInicioExperiencia === ""}
                        includeActualidad={true}
                        required={true}
                        responseError={
                          dataNewExperience.anioFinExperiencia.length == 0
                        }
                      />
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
                        className={clsx(
                          "w-full px-3 py-2 border  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white rounded-md",
                          {
                            "border-red-500 dark:border-red-500":
                              dataNewExperience.descripcionExperiencia.length !=
                              0,
                            "border-gray-300 dark:border-gray-500": !(
                              dataNewExperience.descripcionExperiencia.length !=
                              0
                            ),
                          }
                        )}
                        placeholder="Descripción de tareas"
                        onChange={handleExperienceChange}
                        value={newExperience.descripcionExperiencia}
                      ></textarea>
                    </div>
                  </div>
                  {(dataNewExperience.puesto.length > 0 ||
                    dataNewExperience.descripcionExperiencia.length > 0 ||
                    dataNewExperience.nombreEmpresa.length > 0 ||
                    dataNewExperience.anioInicioExperiencia.length > 0 ||
                    dataNewExperience.mesInicioExperiencia.length > 0 ||
                    dataNewExperience.anioFinExperiencia.length > 0) && (
                    <>
                      <ErrorComponent arr={dataNewExperience.puesto} />
                      <ErrorComponent arr={dataNewExperience.nombreEmpresa} />
                      <ErrorComponent arr={dataNewExperience.zonaEmpresa} />
                      <ErrorComponent
                        arr={dataNewExperience.anioInicioExperiencia}
                      />
                      <ErrorComponent
                        arr={dataNewExperience.mesInicioExperiencia}
                      />
                      <ErrorComponent
                        arr={dataNewExperience.anioFinExperiencia}
                      />
                      <ErrorComponent
                        arr={dataNewExperience.descripcionExperiencia}
                      />
                    </>
                  )}
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
                      details={[
                        curso.institucion,
                        `${curso.mesInicioCurso}/${curso.anioInicioCurso}`,
                      ]}
                      onDelete={() => removeCursos(index)}
                    />
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <InputComponent
                      name="curso"
                      value={newCursos.curso}
                      onChange={handleCursoChange}
                      onKeyDown={handleKeyDown}
                      id="curso"
                      responseError={dataNewCursos.curso.length != 0}
                      content="Nombre del curso"
                      requiered={true}
                      type="text"
                    />
                    <InputComponent
                      name="institucion"
                      value={newCursos.institucion}
                      onChange={handleCursoChange}
                      onKeyDown={handleKeyDown}
                      id="institucion_nombre_curso"
                      responseError={dataNewCursos.institucion.length != 0}
                      content="Nombre de la institución"
                      requiered={false}
                      type="text"
                    />

                    <div className="flex gap-2">
                      <MonthSelect
                        name="mesInicioCurso"
                        label="Mes de inicio"
                        value={newCursos.mesInicioCurso}
                        onChange={handleCursoChange}
                      />
                      <YearSelect
                        name="anioInicioCurso"
                        label="Año de inicio"
                        value={newCursos.anioInicioCurso}
                        onChange={handleCursoChange}
                        startYear={currentYear - 50}
                        endYear={currentYear}
                        required={true}
                        includeActualidad={true}
                        responseError={
                          dataNewCursos.anioInicioCurso.length == 0
                        }
                      />
                    </div>
                  </div>

                  {(dataNewCursos.curso ||
                    dataNewCursos.anioInicioCurso ||
                    dataNewCursos.institucion) && (
                    <>
                      <ErrorComponent arr={dataNewCursos.curso} />
                      <ErrorComponent arr={dataNewCursos.institucion} />
                      <ErrorComponent arr={dataNewCursos.anioInicioCurso} />
                    </>
                  )}
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
                    <InputComponent
                      name="idioma"
                      value={newIdioma.idioma}
                      onChange={handleIdiomaChange}
                      onKeyDown={handleKeyDown}
                      id="floating_idioma"
                      responseError={dataNewIdioma.idioma.length != 0}
                      content="¿Qué idioma dominas?"
                      requiered={true}
                      type="text"
                    />
                    <SelectInputComponent
                      onChange={handleIdiomaChange}
                      value={newIdioma.nivel}
                      arrOptions={idiomasSelect}
                      id="idioma_nivel"
                      name="nivel"
                      label="Nivel"
                      responseError={dataNewIdioma.nivel.length == 0}
                      requiered={true}
                    />
                  </div>

                  {(dataNewIdioma.idioma || dataNewIdioma.nivel) && (
                    <>
                      <ErrorComponent arr={dataNewIdioma.idioma} />
                      <ErrorComponent arr={dataNewIdioma.nivel} />
                    </>
                  )}
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
                          <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-700 ">
                            <div className="flex items-center h-5 ">
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
                  <WrapperH2Section
                    title="Orientación Laboral del Currículum Vitae"
                    additionalMessage="*(opcional) Indica el propósito del CV: ¿Buscas tu
                          primer empleo, quieres resaltar experiencia en un
                          sector específico, aspiras a un puesto en particular o
                          un cv genérico?"
                  />

                  <div className="grid grid-cols-1 ">
                    <InputComponent
                      name="orientadoCV"
                      value={cvData.orientadoCV}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      id="floating_orientado"
                      responseError={
                        dataResponse.errors.orientadoCV.length != 0
                      }
                      content="Orientado a empleo"
                      requiered={false}
                      type="text"
                    />
                  </div>

                  {dataResponse.errors.orientadoCV && (
                    <ErrorComponent arr={dataResponse.errors.orientadoCV} />
                  )}
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
