import React from 'react'

export type  TypeIAData = {
  profile:string;
  skills:string;
  descriptionWork:string;
}

export default function PreviewCV({cvData, iaData}:{cvData:any, iaData:TypeIAData} ) {
  return (
    <>
     <div id="cv-preview" className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-serif">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase">{cvData.name} {cvData.lastName}</h1>
        <p className="text-sm">{cvData.ciudad} | {cvData.provincia} | {cvData.phone} | {cvData.email}</p>
      </div>
      <div className="my-3 text-left">
        <p className="text-base">{iaData.profile}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">EDUCACIÓN</h2>
        {cvData.education.map((edu:any, index:any) => (
          <div key={index} className="mb-2">
            <p className="font-bold">{edu.carrera}</p>
            <p>({edu.estado}), {edu.estudios}</p>
            <p>{edu.anioInicioEducacion}, {edu.anioFinEducacion}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">EXPERIENCIA PROFESIONAL</h2>
        {cvData.experience.map((exp:any, index:number) => (
          <div key={index} className="mb-4">
            <p className="font-bold">{exp.puesto}</p>
            <p className="italic">{exp.nombreEmpresa}</p>
            <p>{exp.anioInicioExperiencia} - {exp.anioFinExperiencia}</p>
            <p>{iaData.descriptionWork.split('\n')[index]}</p>
          </div>
        ))}
      </div>

      {cvData.cursos.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">CURSOS</h2>
          {cvData.cursos.map((award:any, index:any) => (
            <div key={index} className="mb-2">
              <p><span className="font-bold">{award.curso}</span>, {award.institucion}</p>
              <p>{award.anioInicioCurso}</p>
            </div>
          ))}
        </div>
      )}
      {iaData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">HABILIDADES</h2>
            <div  className="mb-2">
              <p>{iaData.skills}</p>
            </div>
          
        </div>
      )}
     

      
    </div> 
    </>
  )
}