import type React from "react"
import { Document, Page, Text, View, Image } from "@react-pdf/renderer"
import type { CVDataPdf, OptionsPDF } from "@/lib/definitions"
import type { TypeIAData } from "../PreviewCV"
import { styles4 } from "@/lib/stylePdf/style4"
import { getFontSize } from "@/lib/utils"

export const Layout4: React.FC<{
  cvData: CVDataPdf
  iaData: TypeIAData
  contador: number
  optionsPDF: OptionsPDF
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  const experiencia = cvData.experience.map((exp, index) => (
    <View key={index} style={styles4.experienceEntry}>
      <Text style={[styles4.companyName, { fontSize: getFontSize(12, optionsPDF.contadorContent) }]}>
        {exp.nombreEmpresa}
      </Text>
      <Text style={[styles4.jobTitle, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>{exp.puesto}</Text>
      <Text style={[styles4.dateLocation, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
        {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} -{" "}
        {exp.anioFinExperiencia === "Actualidad" ? "Actualidad" : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}{" "}
        | {exp.zonaEmpresa}
      </Text>
      <Text style={[styles4.description, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
        • {iaData.descriptionWork.split("\n")[index]}
      </Text>
    </View>
  ))

  const educacion = cvData.education.map((edu, index) => (
    <View key={index} style={styles4.educationEntry}>
      <Text style={[styles4.institution, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
        {edu.institucion}
      </Text>
      <Text style={[styles4.degree, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
        {edu.carrera} ({edu.estado})
      </Text>
      <Text style={[styles4.dateLocation, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
        {edu.mesInicioEducacion}/{edu.anioInicioEducacion} - {edu.mesFinEducacion}/{edu.anioFinEducacion} |{" "}
        {edu.zonaInstitucion}
      </Text>
    </View>
  ))

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={index} style={styles4.educationEntry}>
      <Text style={[styles4.institution, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
        {curso.curso}
      </Text>
      <Text style={[styles4.degree, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
        {curso.institucion}
      </Text>
      <Text style={[styles4.dateLocation, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
        {curso.anioInicioCurso === "Actualidad" ? "Actualidad" : `${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
      </Text>
    </View>
  ))

  const cutname = (
    <Text style={[styles4.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name.split(" ")[0]} {cvData.lastName.split(" ")[0]}
    </Text>
  )

  const fullname = (
    <Text style={[styles4.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name} {cvData.lastName}
    </Text>
  )

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page size="A4" style={styles4.page}>
        <View style={styles4.container}>
          {/* Left Column */}
          <View style={styles4.leftColumn}>
            <View style={styles4.header}>
              <Text style={[styles4.sectionTitle, { fontSize: getFontSize(14, contador) }]}>CONTACT</Text>
              <Text style={[styles4.contactItem, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                {cvData.phone}
              </Text>
              <Text style={[styles4.contactItem, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                {cvData.email}
              </Text>
              <Text style={[styles4.contactItem, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                {cvData.ciudad}, {cvData.provincia}
              </Text>
            </View>

            <View>
              <Text style={[styles4.sectionTitle, { fontSize: getFontSize(14, contador) }]}>EDUCATION</Text>
              {optionsPDF.reverseEducation ? educacion.reverse() : educacion}
            </View>

            {iaData.skills && (
              <View>
                <Text style={[styles4.sectionTitle, { fontSize: getFontSize(14, contador) }]}>SKILLS</Text>
                {iaData.skills.split("•").map((skill, index) => (
                  <Text
                    key={index}
                    style={[styles4.skillItem, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}
                  >
                    • {skill.trim()}
                  </Text>
                ))}
              </View>
            )}

            {cvData.idiomas.length > 0 && (
              <View>
                <Text style={[styles4.sectionTitle, { fontSize: getFontSize(14, contador) }]}>LANGUAGES</Text>
                {cvData.idiomas.map((idioma, index) => (
                  <Text
                    key={index}
                    style={[styles4.languageItem, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}
                  >
                    • {idioma.idioma}: {idioma.nivel}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles4.rightColumn}>
            <View style={styles4.header}>
              {optionsPDF.fullName ? fullname : cutname}
              {optionsPDF.orientacionCVTitle && (
                <Text style={[styles4.title, { fontSize: getFontSize(14, contador) }]}>{cvData.orientadoCV}</Text>
              )}
            </View>

            {iaData.profile && (
              <View>
                <Text style={[styles4.sectionTitle, { fontSize: getFontSize(14, contador) }]}>PROFILE SUMMARY</Text>
                <Text style={[styles4.profileSummary, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                  {iaData.profile}
                </Text>
              </View>
            )}

            {cvData.experience.length > 0 && (
              <View>
                <Text style={[styles4.sectionTitle, { fontSize: getFontSize(14, contador) }]}>WORK EXPERIENCE</Text>
                {optionsPDF.reverseExperience ? experiencia.reverse() : experiencia}
              </View>
            )}

            {cvData.cursos.length > 0 && (
              <View>
                <Text style={[styles4.sectionTitle, { fontSize: getFontSize(14, contador) }]}>CERTIFICATIONS</Text>
                {optionsPDF.reverseCursos ? cursos.reverse() : cursos}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

