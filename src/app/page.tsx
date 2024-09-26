"use client"

import AnimatedCounter from "@/components/AnimatedCounter";
import FormRegister from "@/components/FormRegister";
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
    cusos: [],
  })

  const updateCVData = (newData:any) => {
    setCVData((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <>
      {/* <FormUser /> */}

      <FormRegister cvData={cvData} updateCVData={updateCVData}/>
    </>
  );
}
