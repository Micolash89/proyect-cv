"use client"

import AnimatedCounter from "@/components/AnimatedCounter";
import FormRegister from "@/components/FormRegister";
import MyDocumentPDF from "@/components/pdf/GeneratorPDF";
import PreviewCV from "@/components/PreviewCV";
import { PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import IARegister from "@/components/IARegister";

export default function Home() {

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), { ssr: false });

  const [cvData, setCVData] = useState({
    name: '',
    lastName: '',
    email: '',
    fechaNacimiento:"",
    phone: '',
    ciudad: '',
    provincia: '',
    education: [],
    experience: [],
    cursos: [],
  })

  const [iaData, setIAData]= useState({
    profile:"",
    skills:"",
    descriptionWork:""
  })

  const updateCVData = (newData:any) => {
    setCVData((prevData) => ({ ...prevData, ...newData }))
  }
  const updateIAData = (newData:any) => {
    setIAData((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <>
      {/* <FormUser /> */}

      <main className="grid grid-cols-2 w-full">
      <FormRegister cvData={cvData} updateCVData={updateCVData}/>


      <PreviewCV cvData={cvData} iaData={iaData}/>



      {/* <Link href={"/"}>
        Generar PDF
        </Link> */}



      </main>
        <IARegister cvData={cvData} updateIAData={updateIAData}/>
      {<PDFViewer width="100%" height="100%">
        
      <MyDocumentPDF cvData={cvData} iaData={iaData}/>
        {/* <MyDocumentPDF data ={responseBack}/> */}
        
      
    </PDFViewer>}
    </>
  );
}
