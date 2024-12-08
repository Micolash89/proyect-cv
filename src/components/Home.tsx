"use client";

import FormRegister from "@/components/FormRegister";
import MyDocumentPDF from "@/components/pdf/GeneratorPDF";
import PreviewCV from "@/components/PreviewCV";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import IARegister from "@/components/IARegister";
import {
  CursoDataBase,
  EstudioDataBase,
  ExperienciaDataBase,
  IdiomaDataBase,
  UserDataBase,
} from "@/app/user/[id]/page";
import { TextZoom } from "./TextZoom";

interface Estudio {
  estudios: string;
  estado: string;
  carrera: string;
  institucion: string;
  zonaInstitucion: string;
  anioInicioEducacion: string;
  anioFinEducacion: string;
}

export interface Experiencia {
  puesto: string;
  nombreEmpresa: string;
  zonaEmpresa: string;
  anioInicioExperiencia: string;
  anioFinExperiencia: string;
  descripcionExperiencia: string;
}

export interface Idioma {
  idioma: string;
  nivel: string;
}

export interface Curso {
  curso: string;
  institucion: string;
  anioInicioCurso: string;
}

export interface CVData {
  name: string;
  lastName: string;
  email: string;
  dni: string;
  fechaNacimiento: string;
  phone: string;
  ciudad: string;
  provincia: string;
  imagenPerfil: string;
  education: Estudio[];
  experience: Experiencia[];
  cursos: Curso[];
  idiomas: Idioma[];
  licencia: string;
  movilidad: string;
  incorporacion: string;
  disponibilidad: string;
  office: string;
  orientadoCV: string;
}

export default function Home({ user }: { user?: UserDataBase }) {
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  );

  const [showCompleteInputs, setShowCompleteInputs] = useState(0);

  const [cvData, setCVData] = useState<CVData>({
    name: "",
    lastName: "",
    email: "",
    dni: "",
    fechaNacimiento: "",
    phone: "",
    imagenPerfil: "",
    ciudad: "",
    provincia: "",
    education: [],
    experience: [],
    cursos: [],
    idiomas: [],
    licencia: "",
    movilidad: "",
    incorporacion: "",
    disponibilidad: "",
    office: "",
    orientadoCV: "",
  });

  useEffect(() => {
    if (user) {
      setShowCompleteInputs(user.id);

      const estudios: Estudio[] = user.estudios.map(
        (estudio: EstudioDataBase) => ({
          estado: estudio.estado,
          carrera: estudio.carrera,
          estudios: estudio.tipo,
          institucion: estudio.institucion,
          zonaInstitucion: estudio.ubicacion,
          anioInicioEducacion: estudio.fechaIngreso,
          anioFinEducacion: estudio.fechaEgreso,
        })
      );

      const experiencias: Experiencia[] = user.experiencias.map(
        (experiencia: ExperienciaDataBase) => ({
          puesto: experiencia.puesto,
          nombreEmpresa: experiencia.nombre,
          zonaEmpresa: experiencia.ubicacion,
          anioInicioExperiencia: experiencia.fechaInicio,
          anioFinExperiencia: experiencia.fechaFin,
          descripcionExperiencia: experiencia.descripcion,
        })
      );

      const cursos: Curso[] = user.cursos.map((curso: CursoDataBase) => ({
        curso: curso.nombre,
        institucion: curso.institucion,
        anioInicioCurso: curso.fechaInicio,
      }));

      const idiomas: Idioma[] = user.idiomas.map((idioma: IdiomaDataBase) => ({
        nivel: idioma.nivel,
        idioma: idioma.idioma,
      }));

      const fechaFormateada = `${user.fechaNacimiento.getFullYear()}-${String(
        user.fechaNacimiento.getMonth() + 1
      ).padStart(2, "0")}-${String(user.fechaNacimiento.getDate() + 1).padStart(
        2,
        "0"
      )}`;

      setCVData({
        ...cvData,
        name: user.nombre || "",
        lastName: user.apellido || "",
        email: user.email || "",
        dni: user.dni || "",
        fechaNacimiento: fechaFormateada || "",
        phone: user.telefono || "",
        ciudad: user.ciudad || "",
        provincia: user.provincia || "",
        imagenPerfil: user.imagenPerfil || "",
        education: estudios || [],
        experience: experiencias || [],
        cursos: cursos || [],
        idiomas: idiomas || [],
        licencia: user.informacionAdicional[0].licencia || "",
        movilidad: user.informacionAdicional[0].movilidad || "",
        incorporacion: user.informacionAdicional[0].incorporacion || "",
        disponibilidad: user.informacionAdicional[0].disponibilidad || "",
        office: user.informacionAdicional[0].office || "",
        orientadoCV: user.orientacionCV || "",
      });

      console.log(user);
    }
  }, [user]);

  const [iaData, setIAData] = useState({
    profile: "",
    skills: "",
    descriptionWork: "",
  });

  const [contador, setContador] = useState(0);
  const [optionsPDF, setOptionsPDF] = useState({
    color: "#000000",
    spaceBetween: false,
    tipoPdf: 0,
  });

  const updateCVData = (newData: any) => {
    setCVData((prevData) => ({ ...prevData, ...newData }));
  };
  const updateIAData = (newData: any) => {
    setIAData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <>
      <main className=" w-full">
        <FormRegister
          cvData={cvData}
          updateCVData={updateCVData}
          idUser={showCompleteInputs}
        />

        {showCompleteInputs ? (
          <div>
            <PreviewCV cvData={cvData} iaData={iaData} />

            <IARegister
              cvData={cvData}
              updateIAData={updateIAData}
              title={"generar perfil IA"}
              tipo={1}
              iaData={iaData.profile}
            />
            <IARegister
              cvData={cvData}
              updateIAData={updateIAData}
              title={"generar tareas IA"}
              tipo={2}
              iaData={iaData.descriptionWork}
            />
            <IARegister
              cvData={cvData}
              updateIAData={updateIAData}
              title={"generar skills IA"}
              tipo={3}
              iaData={iaData.skills}
            />

            <TextZoom
              setContador={setContador}
              contador={contador}
              optionsPDF={optionsPDF}
              setOptionsPDF={setOptionsPDF}
            />

            <div className="max-w-4xl mx-auto h-[900px]">
              <PDFViewer width="100%" height="100%">
                <MyDocumentPDF
                  cvData={cvData}
                  iaData={iaData}
                  contador={contador}
                  optionsPDF={optionsPDF}
                />
              </PDFViewer>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
