import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CVData } from './Home';

export type TypeIAData = {
  profile: string;
  skills: string;
  descriptionWork: string;
}

// interface CVData {
//   name: string;
//   lastName: string;
//   email: string;
//   fechaNacimiento: string;
//   phone: string;
//   ciudad: string;
//   provincia: string;
//   education: Array<{
//     carrera: string;
//     estado: string;
//     estudios: string;
//     institucion: string;
//     zonaInstitucion: string;
//     anioInicioEducacion: string;
//     anioFinEducacion: string;
//   }>;
//   experience: Array<{
//     nombreEmpresa: string;
//     puesto: string;
//     zonaEmpresa: string;
//     anioInicioExperiencia: string;
//     anioFinExperiencia: string;
//     descripcionExperiencia: string;
//   }>;
//   cursos: Array<{
//     curso: string;
//     institucion: string;
//     anioInicioCurso: string;
//   }>;
//   idiomas: Array<{
//     idioma: string;
//     nivel: string;
//   }>;
//   licencia: string;
//   movilidad: string;
//   incorporacion: string;
//   disponibilidad: string;
//   office: string;
// }

export default function PreviewCV({ cvData, iaData }: { cvData: CVData; iaData: TypeIAData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl overflow-auto"
      initial={{ width: "300px", height: "200px" }}
      animate={{
        width: isHovered ? "600px" : "300px",
        height: isHovered ? "80vh" : "200px",
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6 font-serif">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            {cvData.name} {cvData.lastName}
          </h1>
          <p className="text-sm text-gray-600 italic mt-2">
            {cvData.ciudad}, {cvData.provincia} • {cvData.phone}
            {cvData.email && ` • ${cvData.email}`}
          </p>
        </div>

        {/* Profile */}
        {iaData.profile && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
              Perfil
            </h2>
            <p className="text-sm leading-relaxed">{iaData.profile}</p>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
              Educación
            </h2>
            {cvData.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{edu.institucion}</span>
                  <span className="text-sm italic text-gray-600">{edu.zonaInstitucion}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm italic">
                    {edu.carrera} ({edu.estado.toLowerCase()})
                  </span>
                  <span className="text-sm italic">
                    {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
              Experiencia Profesional
            </h2>
            {cvData.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{exp.nombreEmpresa}</span>
                  <span className="text-sm italic text-gray-600">{exp.zonaEmpresa}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm italic">{exp.puesto}</span>
                  <span className="text-sm italic">
                    {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                  </span>
                </div>
                <p className="text-sm mt-1 ml-4">
                  {iaData.descriptionWork.split('\n')[index]}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {iaData.skills && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
              Habilidades
            </h2>
            <p className="text-sm">{iaData.skills}</p>
          </div>
        )}

        {/* Additional Information */}
        {(cvData.licencia ||
          cvData.movilidad ||
          cvData.incorporacion ||
          cvData.disponibilidad ||
          cvData.office ||
          cvData.idiomas.length > 0) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
              Información Adicional
            </h2>
            <p className="text-sm italic">
              {[
                cvData.licencia && "Licencia de conducir",
                cvData.movilidad && "Vehículo propio",
                cvData.incorporacion && "Disponibilidad inmediata",
                cvData.disponibilidad && `Jornada: ${cvData.disponibilidad}`,
                cvData.office && "Microsoft Office",
                ...cvData.idiomas.map(
                  (idioma) => `${idioma.idioma} - ${idioma.nivel.toLowerCase()}`
                ),
              ]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>
        )}

        {/* Certifications */}
        {cvData.cursos.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
              Certificaciones
            </h2>
            {cvData.cursos.map((curso, index) => (
              <div key={index} className="text-sm mb-2">
                • {curso.curso}, {curso.institucion} ({curso.anioInicioCurso})
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}