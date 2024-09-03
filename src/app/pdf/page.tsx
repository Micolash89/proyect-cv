"use client"
import { MyDocumentPDF } from "@/components/pdf/GeneratorPDF";
import { getUser } from "@/database/database";
// import { PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), { ssr: false });




function Page() {
  
  const [responseBack, setResponseBack]= useState( null  )

  const getData = async ()=>{
  
    try {
      const data:any = await getUser();

      setResponseBack(data);

      console.log(data)
      
    } catch (error) {

      console.log(error)
    }
  }

  useEffect(()=>{

    if(responseBack == null)
    getData();
  console.log("data: ",responseBack)

  },[responseBack])

  return (
    <>
      {responseBack && <PDFViewer width="100%" height="100%">
        
          <MyDocumentPDF data ={responseBack}/>
        
      </PDFViewer>}
    </>
  );
}

export default Page;
