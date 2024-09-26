"use client"

import AnimatedCounter from "@/components/AnimatedCounter";
import FormRegister from "@/components/FormRegister";
import PreviewCV from "@/components/PreviewCV";
import { useState } from "react";

export default function Home() {

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

      </main>
    </>
  );
}
