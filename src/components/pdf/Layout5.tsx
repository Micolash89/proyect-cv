import type React from "react"
import { Document, Page, Text, View, Image } from "@react-pdf/renderer"
import type { CVDataPdf, OptionsPDF } from "@/lib/definitions"
import type { TypeIAData } from "../PreviewCV"
import { styles5 } from "@/lib/stylePdf/style5"
import { getFontSize } from "@/lib/utils"

export const Layout5: React.FC<{
  cvData: CVDataPdf
  iaData: TypeIAData
  contador: number
  optionsPDF: OptionsPDF
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  const fullName = (
    <>
      <Text style={[styles5.name, { fontSize: getFontSize(40, contador) }]}>{cvData.name.toUpperCase()}</Text>
      <Text style={[styles5.lastName, { fontSize: getFontSize(40, contador) }]}>{cvData.lastName.toUpperCase()}</Text>
    </>
  )

  const shortName = (
    <>
      <Text style={[styles5.name, { fontSize: getFontSize(40, contador) }]}>{cvData.name.split(" ")[0].toUpperCase()}</Text>
      <Text style={[styles5.lastName, { fontSize: getFontSize(40, contador) }]}>{cvData.lastName.split(" ")[0].toUpperCase()}</Text>
    </>
  )

  const experiencia = cvData.experience.map((exp, index) => (
    <View key={`experiencia-${index}`} style={styles5.experienceEntry}>
      <Text style={[styles5.experienceDate, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
        {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} -{" "}
        {exp.anioFinExperiencia === "Actualidad" ? "Actualidad" : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
      </Text>
      <Text style={[styles5.experienceTitle, { fontSize: getFontSize(13, optionsPDF.contadorContent) }]}>
        {exp.puesto}
      </Text>
      {exp.nombreEmpresa && <Text style={[styles5.experienceCompany, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
        {exp.nombreEmpresa}
      </Text>}
      {iaData.descriptionWork && <Text style={[styles5.experienceDescription, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
        {iaData.descriptionWork.split("\n")[index]}
      </Text>}
    </View>
  ))

  const educacion = cvData.education.map((edu, index) => (
    <View key={`${edu.institucion}-{index}`} style={styles5.educationEntry}>
      <Text style={[styles5.educationTitle, { fontSize: getFontSize(13, optionsPDF.contadorContent) }]}>
        {edu.carrera}
      </Text>
      {edu.institucion && <Text style={[styles5.educationDetails, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
        {edu.institucion}
      </Text>}
      <Text style={[styles5.educationDate, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
        {edu.anioInicioEducacion} - {edu.anioFinEducacion}
      </Text>
    </View>
  ))

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={`${curso.curso}-${index}`} style={styles5.languageItem}>
      <Text style={[styles5.languageName, { fontSize: getFontSize(11, optionsPDF.contadorContent),lineHeight: 1,marginTop: 5 }]}>
        {curso.curso}
      </Text>
      {curso.institucion && <Text style={[styles5.languageLevel, { fontSize: getFontSize(10, optionsPDF.contadorContent), fontWeight: "medium" }]}>
        {curso.institucion}
      </Text>}
      <Text style={[styles5.languageLevel, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
      {curso.anioInicioCurso === "Actualidad" ? "Actualidad" : `${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
      </Text>
    </View>
  ))

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page size="A4" style={styles5.page}>
        <View style={styles5.header}>
          {cvData.imagenPerfil && <Image src={cvData.imagenPerfil} style={styles5.headerImage} />}
          <View style={styles5.headerContent}>
            {optionsPDF.fullName ? fullName : shortName}
            {( cvData.orientadoCV && optionsPDF.orientacionCVTitle) && (
              <Text style={[styles5.title, { fontSize: getFontSize(16, contador) }]}>{cvData.orientadoCV}</Text>
            )}
          </View>
        </View>

        <View style={[styles5.leftColumn, { backgroundColor: optionsPDF.color }]}>
          <View>
            <Text style={[styles5.sectionTitle, { fontSize: getFontSize(16, contador) }]}>INFORMACIÓN</Text>
            <View style={styles5.contactInfo}>
            <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
            {cvData.fechaNacimiento.split("-").reverse().join("/")}
              </Text>
            { cvData.dni && <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                DNI: {cvData.dni}
              </Text>}
              <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
               Tel: {cvData.phone}
              </Text>
              {cvData.email && <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent),lineHeight: 0.5 }]}>
                {cvData.email}
              </Text>}
              { (cvData.ciudad || cvData.provincia) && <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent), marginBottom: 0 }]}>
                {cvData.ciudad}, {cvData.provincia}
              </Text>}
            </View>
          </View>

          {iaData.skills && (
            <View style={styles5.skillsList}>
              <Text style={[styles5.sectionTitle, { fontSize: getFontSize(16, contador) }]}>HABILIDADES</Text>
              {iaData.skills.split("•").map((skill, index) => (
                <Text
                  key={`skill-${index}`}
                  style={[styles5.skillItem, { fontSize: getFontSize(11, optionsPDF.contadorContent), marginBottom: (iaData.skills.split("•").length - 1) === index ? 0 : 8 }]}
                >
                  {skill.trim()}
                </Text>
              ))}
            </View>
          )}

          {cvData.idiomas.length > 0 && (
            <View>
              <Text style={[styles5.sectionTitle, { fontSize: getFontSize(16, contador) }]}>IDIOMAS</Text>
              {cvData.idiomas.map((idioma, index) => (
                <View key={`${idioma.idioma}-${index}`} style={styles5.languageItem}>
                  <Text style={[styles5.languageName, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                    {idioma.idioma}
                  </Text>
                  <Text style={[styles5.languageLevel, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                    {idioma.nivel}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {cvData.cursos.length > 0 && (
            <View>
              <Text style={[styles5.sectionTitle, { fontSize: getFontSize(16, contador), marginTop: 10 }]}>CERTIFICACIONES</Text> 
              {optionsPDF.reverseCursos ? cursos.reverse() : cursos}
            </View>
          )}
        </View>

        <View
          style={[
            styles5.rightColumn,
            {
              justifyContent: optionsPDF.spaceBetween ? "space-between" : "flex-start",
            },
          ]}
        >
          <View style={{marginBottom: 5}}>
              <Text
                style={[
                  styles5.rightSectionTitle,
                  {
                    fontSize: getFontSize(16, contador),
                  },
                ]}
              >
                PERFIL
              </Text>
              {iaData.profile && <Text style={[styles5.experienceDescription, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
              {iaData.profile}
              </Text>}
            </View>

          {cvData.experience.length > 0 && (
            <View >
              <Text
                style={[
                  styles5.rightSectionTitle,
                  {
                    fontSize: getFontSize(16, contador),
                  },
                ]}
              >
                EXPERIENCIA PROFESIONAL
              </Text>
              {optionsPDF.reverseExperience ? experiencia.reverse() : experiencia}
            </View>
          )}

          {cvData.education.length > 0 && (
            <View>
              <Text
                style={[
                  styles5.rightSectionTitle,
                  {
                    fontSize: getFontSize(16, contador),
                  },
                ]}
              >
                EDUCACION
              </Text>
              {optionsPDF.reverseEducation ? educacion.reverse() : educacion}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

