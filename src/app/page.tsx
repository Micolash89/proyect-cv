"use client";

import FormRegister from "@/components/FormRegister";
import MyDocumentPDF from "@/components/pdf/GeneratorPDF";
import PreviewCV from "@/components/PreviewCV";
import { useState } from "react";
import dynamic from "next/dynamic";
import IARegister from "@/components/IARegister";
import TextZoom from "@/components/TextZoom";
import Navigation from "@/components/Navigation";

export default function Home() {
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
    licencia:"",
    movilidad:"",
    incorporacion:"",
    disponibilidad:"",
    office:"",
    orientadoCV:""
  });

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
        <FormRegister cvData={cvData} updateCVData={updateCVData}  />

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

      <TextZoom setContador={setContador} contador={contador}/>

      {
        <PDFViewer width="100%" height="100%">
          <MyDocumentPDF cvData={cvData} iaData={iaData} contador={contador} />
          {/* <MyDocumentPDF data ={responseBack}/> */}
        </PDFViewer>
      }
    </>
  );
}
