"use client"

import AnimatedCounter from "@/components/AnimatedCounter";
import FormRegister from "@/components/FormRegister";
import MyDocumentPDF from "@/components/pdf/GeneratorPDF";
import PreviewCV from "@/components/PreviewCV";
import { PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

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

  const updateCVData = (newData:any) => {
    setCVData((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <>
      {/* <FormUser /> */}

      <main className="grid grid-cols-2 w-full">
      <FormRegister cvData={cvData} updateCVData={updateCVData}/>

      <PreviewCV cvData={cvData}/>

      {/* <Link href={"/"}>
        Generar PDF
      </Link> */}



      </main>
      {<PDFViewer width="100%" height="100%">
        
      <MyDocumentPDF cvData={cvData}/>
        {/* <MyDocumentPDF data ={responseBack}/> */}
        
      
    </PDFViewer>}
    </>
  );
}
