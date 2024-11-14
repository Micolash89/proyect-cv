"use client";

import FormRegister from "@/components/FormRegister";
import MyDocumentPDF from "@/components/pdf/GeneratorPDF";
import PreviewCV from "@/components/PreviewCV";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import IARegister from "@/components/IARegister";
import TextZoom from "@/components/TextZoom";
import { User } from "@/app/user/[id]/page";

export default function Home({ user }: { user?: User }) {
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  );

  const [cvData, setCVData] = useState({
    name: "",
    lastName: "",
    email: "",
    fechaNacimiento: "",
    phone: "",
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
      setCVData(
          {
        ...cvData,
        name: user.nombre || "",
        lastName: user.apellido || "",
        email: user.email || "",
        fechaNacimiento: user.fechaNacimiento || "",
        phone: user.telefono || "",
        ciudad: user.ciudad || "",
        provincia: user.provincia || "",
        // education: user.education || [],
        // experience: user.experience || [],
        // cursos: user.cursos || [],
        // idiomas: user.idiomas || [],
        // licencia: user.licencia || "",
        // movilidad: user.movilidad || "",
        // incorporacion: user.incorporacion || "",
        // disponibilidad: user.disponibilidad || "",
        // office: user.office || "",
        // orientadoCV: user.orientadoCV || ""
      });
    }
  }, [user]);

  const [iaData, setIAData] = useState({
    profile: "",
    skills: "",
    descriptionWork: "",
  });

  const [contador, setContador] = useState(0);

  const updateCVData = (newData: any) => {
    setCVData((prevData) => ({ ...prevData, ...newData }));
  };
  const updateIAData = (newData: any) => {
    setIAData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <>
      <main className=" w-full">
        <FormRegister cvData={cvData} updateCVData={updateCVData} />

        <PreviewCV cvData={cvData} iaData={iaData} />
      </main>
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

      <TextZoom setContador={setContador} contador={contador} />

      <div className="max-w-4xl mx-auto h-full">
        {
          <PDFViewer width="100%" height="100%">
            <MyDocumentPDF
              cvData={cvData}
              iaData={iaData}
              contador={contador}
            />
            {/* <MyDocumentPDF data ={responseBack}/> */}
          </PDFViewer>
        }
      </div>
    </>
  );
}
