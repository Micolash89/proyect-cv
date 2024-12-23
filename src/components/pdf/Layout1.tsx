import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { TypeIAData } from "../PreviewCV";
import { styles1 } from "@/lib/stylePdf/style1";
import { getFontSize, getPadding } from "@/lib/utils";

export const Layout1: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  return (
    <Document>
      <Page size="A4" style={styles1.page}>
        <View style={styles1.container}>
          {/* Sidebar */}
          <View
            style={[
              styles1.sidebar,
              {
                backgroundColor: optionsPDF.color,
              },
            ]}
          >
            {cvData.imagenPerfil && (
              <Image src={cvData.imagenPerfil} style={styles1.profileImage} />
            )}

            <Text
              style={[styles1.name, { fontSize: getFontSize(20, contador) }]}
            >
              {cvData.name.split(" ").join("\n")}{cvData.lastName}
            </Text>

            {optionsPDF.orientacionCVTitle &&<Text
              style={[styles1.profession, { fontSize: getFontSize(14, contador) }]}
            >
              {cvData.orientadoCV}
            </Text>}

            {/* Contact Information */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                 {cvData.fechaNacimiento.split("-").reverse().join("/")}
              </Text>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                DNI: {cvData.dni}
              </Text>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                Tel: {cvData.phone}
              </Text>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
                wrap={true}
              >
                {cvData.email}
              </Text>
         
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                {cvData.ciudad}, {cvData.provincia}
              </Text>
            </View>

            {/* Skills Section */}
            {iaData.skills && (
              <View>
                <Text
                  style={[
                    styles1.sidebarSectionTitle,
                    { fontSize: getFontSize(14, contador) },
                  ]}
                >
                  HABILIDADES
                </Text>
                {iaData.skills.split("•").map((skill, index) => (
                  <Text key={index} style={[styles1.skillItem, { fontSize: getFontSize(10, contador) }]}>
                    • {skill.trim()}
                  </Text>
                ))}
              </View>
            )}

            {/* Languages */}
            {cvData.idiomas.length > 0 && (
              <View>
                <Text
                  style={[
                    styles1.sidebarSectionTitle,
                    { fontSize: getFontSize(14, contador) },
                  ]}
                >
                  IDIOMAS
                </Text>
                {cvData.idiomas.map((idioma, index) => (
                  <Text key={index} style={[styles1.skillItem, { fontSize: getFontSize(10, contador) }]}>
                    • {idioma.idioma.charAt(0).toUpperCase() + idioma.idioma.slice(1).toLowerCase()} - {idioma.nivel=="BASICO"?"Básico": idioma.nivel.charAt(0).toUpperCase() + idioma.nivel.slice(1).toLowerCase()}
                  </Text>
                ))}
              </View>
            )}

            {/* Additional Information */}
            <View>
              <Text
                style={[
                  styles1.sidebarSectionTitle,
                  { fontSize: getFontSize(14, contador) },
                ]}
              >
                INFORMACIÓN{"\n"}ADICIONAL
              </Text>
              {cvData.licencia && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  • Licencia de conducir
                </Text>
              )}
              {cvData.movilidad && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  • Vehículo propio
                </Text>
              )}
              {cvData.incorporacion && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  • Disponibilidad inmediata
                </Text>
              )}
              {cvData.disponibilidad && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  • {cvData.disponibilidad=="FULLTIME"?"jornada completa":"jornada parcial"}
                </Text>
              )}
            </View>
          </View>

          {/* Main Content */}
          <View style={[styles1.mainContent, {justifyContent: optionsPDF.spaceBetween ? 'space-between':'flex-start'}]}>
            {/* Profile Summary */}
            {iaData.profile && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[styles1.sectionTitle, { color: optionsPDF.color, fontSize: getFontSize(16, optionsPDF.contadorContent) }]}
                >
                  PERFIL PROFESIONAL
                </Text>
                <Text style={[styles1.description, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>{iaData.profile}</Text>
              </View>
            )}

            {/* Experience */}
            {cvData.experience.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[styles1.sectionTitle, { color: optionsPDF.color, fontSize: getFontSize(16, optionsPDF.contadorContent) }]}
                >
                  EXPERIENCIA PROFESIONAL
                </Text>
                {cvData.experience.map((exp, index) => (
                  <View key={index} style={styles1.experienceEntry}>
                    <Text style={[styles1.companyName, { fontSize: getFontSize(12, optionsPDF.contadorContent) }]}>{exp.nombreEmpresa}</Text>
                    <Text style={[styles1.jobTitle, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>{exp.puesto}</Text>
                    <Text style={[styles1.dateLocation, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                      {exp.anioInicioExperiencia} - {exp.anioFinExperiencia} |{" "}
                      {exp.zonaEmpresa}
                    </Text>
                    <Text style={[styles1.description, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                      • {iaData.descriptionWork.split("\n")[index]}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[styles1.sectionTitle, { color: optionsPDF.color, fontSize: getFontSize(16, optionsPDF.contadorContent) }]}
                >
                  EDUCACIÓN
                </Text>
                {cvData.education.map((edu, index) => (
                  <View key={index} style={styles1.educationEntry}>
                    <Text style={[styles1.institution,{ fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>{edu.institucion}</Text>
                    <Text style={[styles1.degree, { fontSize: getFontSize(10, optionsPDF.contadorContent) }]}>
                      {edu.carrera} ({edu.estado})
                    </Text>
                    <Text style={[styles1.dateLocation,{fontSize: getFontSize(10, optionsPDF.contadorContent)}]}>
                      {edu.anioInicioEducacion} - {edu.anioFinEducacion} |{" "}
                      {edu.zonaInstitucion}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {cvData.cursos.length > 0 && (
              <View>
                <Text
                  style={[styles1.sectionTitle, { color: optionsPDF.color, fontSize: getFontSize(16, optionsPDF.contadorContent) }]}
                >
                  CERTIFICACIONES
                </Text>
                {cvData.cursos.map((curso, index) => (
                  <View key={index} style={styles1.educationEntry}>
                    <Text style={[styles1.institution,{ fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>{curso.curso}</Text>
                    <Text style={[styles1.degree, { fontSize: getFontSize(11, optionsPDF.contadorContent) }]}>{curso.institucion}</Text>
                    <Text style={[styles1.dateLocation,{fontSize: getFontSize(10, optionsPDF.contadorContent)}]}>
                      {curso.anioInicioCurso}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
