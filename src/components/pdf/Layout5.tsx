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
      <Text style={[styles5.name, { fontSize: getFontSize(40, contador) }]}>{cvData.name}</Text>
      <Text style={[styles5.lastName, { fontSize: getFontSize(40, contador) }]}>{cvData.lastName}</Text>
    </>
  )

  const shortName = (
    <>
      <Text style={[styles5.name, { fontSize: getFontSize(40, contador) }]}>{cvData.name.split(" ")[0]}</Text>
      <Text style={[styles5.lastName, { fontSize: getFontSize(40, contador) }]}>{cvData.lastName.split(" ")[0]}</Text>
    </>
  )

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page size="A4" style={styles5.page}>
        {/* Header with photo and name */}
        <View style={styles5.header}>
          {cvData.imagenPerfil && <Image src={cvData.imagenPerfil} style={styles5.headerImage} />}
          <View style={styles5.headerContent}>
            {optionsPDF.fullName ? fullName : shortName}
            {optionsPDF.orientacionCVTitle && (
              <Text style={[styles5.title, { fontSize: getFontSize(16, contador) }]}>{cvData.orientadoCV}</Text>
            )}
          </View>
        </View>

        {/* Left Column */}
        <View style={[styles5.leftColumn, { backgroundColor: optionsPDF.color }]}>
          <View>
            <Text style={[styles5.sectionTitle, { fontSize: getFontSize(16, contador) }]}>CONTACTO</Text>
            <View style={styles5.contactInfo}>
              <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {cvData.phone}
              </Text>
              <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {cvData.email}
              </Text>
              <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {cvData.ciudad}, {cvData.provincia}
              </Text>
            </View>
          </View>

          {iaData.skills && (
            <View style={styles5.skillsList}>
              <Text style={[styles5.sectionTitle, { fontSize: getFontSize(16, contador) }]}>HABILIDADES</Text>
              {iaData.skills.split("•").map((skill, index) => (
                <Text
                  key={index}
                  style={[styles5.skillItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}
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
                <View key={index} style={styles5.languageItem}>
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
        </View>

        {/* Right Column */}
        <View
          style={[
            styles5.rightColumn,
            {
              justifyContent: optionsPDF.spaceBetween ? "space-between" : "flex-start",
            },
          ]}
        >
          {cvData.experience.length > 0 && (
            <View style={{ marginBottom: 40 }}>
              <Text
                style={[
                  styles5.rightSectionTitle,
                  {
                    fontSize: getFontSize(16, contador),
                    color: optionsPDF.color,
                  },
                ]}
              >
                EXPERIENCIA PROFESIONAL
              </Text>
              {(optionsPDF.reverseExperience ? [...cvData.experience].reverse() : cvData.experience).map(
                (exp, index) => (
                  <View key={index} style={styles5.experienceEntry}>
                    <Text style={[styles5.experienceDate, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                      {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} -{" "}
                      {exp.anioFinExperiencia === "Actualidad"
                        ? "Actualidad"
                        : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
                    </Text>
                    <Text style={[styles5.experienceTitle, { fontSize: getFontSize(13, optionsPDF.contadorContent) }]}>
                      {exp.puesto}
                    </Text>
                    <Text
                      style={[styles5.experienceCompany, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}
                    >
                      {exp.nombreEmpresa}
                    </Text>
                    <Text
                      style={[styles5.experienceDescription, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}
                    >
                      {iaData.descriptionWork.split("\n")[index]}
                    </Text>
                  </View>
                ),
              )}
            </View>
          )}

          {cvData.education.length > 0 && (
            <View>
              <Text
                style={[
                  styles5.rightSectionTitle,
                  {
                    fontSize: getFontSize(16, contador),
                    color: optionsPDF.color,
                  },
                ]}
              >
                EDUCACIÓN
              </Text>
              {(optionsPDF.reverseEducation ? [...cvData.education].reverse() : cvData.education).map((edu, index) => (
                <View key={index} style={styles5.educationEntry}>
                  <Text style={[styles5.educationTitle, { fontSize: getFontSize(13, optionsPDF.contadorContent) }]}>
                    {edu.carrera}
                  </Text>
                  <Text style={[styles5.educationDetails, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                    {edu.institucion}
                  </Text>
                  <Text style={[styles5.educationDate, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                    {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {cvData.cursos.length > 0 && (
            <View>
              <Text
                style={[
                  styles5.rightSectionTitle,
                  {
                    fontSize: getFontSize(16, contador),
                    color: optionsPDF.color,
                  },
                ]}
              >
                CERTIFICACIONES
              </Text>
              {(optionsPDF.reverseCursos ? [...cvData.cursos].reverse() : cvData.cursos).map((curso, index) => (
                <View key={index} style={styles5.educationEntry}>
                  <Text style={[styles5.educationTitle, { fontSize: getFontSize(13, optionsPDF.contadorContent) }]}>
                    {curso.curso}
                  </Text>
                  <Text style={[styles5.educationDetails, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                    {curso.institucion}
                  </Text>
                  <Text style={[styles5.educationDate, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                    {curso.anioInicioCurso === "Actualidad"
                      ? "Actualidad"
                      : `${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

