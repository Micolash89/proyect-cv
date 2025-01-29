import type React from "react"
import { Document, Page, Text, View } from "@react-pdf/renderer"
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
  const fullName = `${cvData.name} ${cvData.lastName}`
  const shortName = `${cvData.name.split(" ")[0]} ${cvData.lastName.split(" ")[0]}`

  return (
    <Document title={`Currículum Vitae - ${fullName}`}>
      <Page size="A4" style={styles5.page}>
        {/* Header Section */}
        <View style={styles5.header}>
          <Text style={[styles5.name, { fontSize: getFontSize(32, contador) }]}>
            {optionsPDF.fullName ? fullName : shortName}
          </Text>
          {optionsPDF.orientacionCVTitle && (
            <Text style={[styles5.title, { fontSize: getFontSize(16, contador) }]}>{cvData.orientadoCV}</Text>
          )}
          <Text style={[styles5.summary, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
            {iaData.profile}
          </Text>
        </View>

        {/* Skills Section */}
        <View>
          <Text style={[styles5.sectionTitle, { fontSize: getFontSize(14, contador) }]}>SKILLS</Text>
          <View style={styles5.skillsList}>
            {iaData.skills.split("•").map((skill, index) => (
              <Text key={index} style={[styles5.skillItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                • {skill.trim()}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles5.divider} />

        {/* Education Section */}
        <View>
          <Text style={[styles5.sectionTitle, { fontSize: getFontSize(14, contador) }]}>EDUCATION</Text>
          {(optionsPDF.reverseEducation ? [...cvData.education].reverse() : cvData.education).map((edu, index) => (
            <View key={index} style={styles5.educationEntry}>
              <Text style={[styles5.educationTitle, { fontSize: getFontSize(12, optionsPDF.contadorContent) }]}>
                {edu.carrera}
              </Text>
              <Text style={[styles5.educationSubtitle, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {edu.institucion}
              </Text>
              <Text style={[styles5.educationDetails, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {edu.mesInicioEducacion}/{edu.anioInicioEducacion} - {edu.mesFinEducacion}/{edu.anioFinEducacion}
              </Text>
            </View>
          ))}

          {(optionsPDF.reverseCursos ? [...cvData.cursos].reverse() : cvData.cursos).map((curso, index) => (
            <View key={index} style={styles5.educationEntry}>
              <Text style={[styles5.educationTitle, { fontSize: getFontSize(12, optionsPDF.contadorContent) }]}>
                {curso.curso}
              </Text>
              <Text style={[styles5.educationSubtitle, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {curso.institucion}
              </Text>
              <Text style={[styles5.educationDetails, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {curso.anioInicioCurso === "Actualidad"
                  ? "Actualidad"
                  : `${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles5.divider} />

        {/* Experience Section */}
        <View>
          <Text style={[styles5.sectionTitle, { fontSize: getFontSize(14, contador) }]}>EXPERIENCE</Text>
          {(optionsPDF.reverseExperience ? [...cvData.experience].reverse() : cvData.experience).map((exp, index) => (
            <View key={index} style={styles5.experienceEntry}>
              <Text style={[styles5.experienceTitle, { fontSize: getFontSize(12, optionsPDF.contadorContent) }]}>
                {exp.puesto}
              </Text>
              <Text style={[styles5.experienceCompany, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {exp.nombreEmpresa} | {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} -{" "}
                {exp.anioFinExperiencia === "Actualidad"
                  ? "Actualidad"
                  : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
              </Text>
              <Text style={[styles5.experienceDescription, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
                {iaData.descriptionWork.split("\n")[index]}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles5.divider} />

        {/* Contact Section */}
        <View>
          <Text style={[styles5.sectionTitle, { fontSize: getFontSize(14, contador) }]}>CONTACT</Text>
          <View style={styles5.contactInfo}>
            <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
              {cvData.email}
            </Text>
            <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
              {cvData.ciudad}, {cvData.provincia}
            </Text>
            <Text style={[styles5.contactItem, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>
              {cvData.phone}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

