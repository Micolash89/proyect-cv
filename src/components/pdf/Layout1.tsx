import { CVDataPdf } from '@/lib/definitions';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { TypeIAData } from '../PreviewCV';
import { styles1 } from '@/lib/stylePdf/style1';

export const Layout1: React.FC<{
    cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: { color: string; spaceBetween: boolean; tipoPdf: number };
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
    return (
        <Document>
          <Page size="A4" style={styles1.page}>
            <View style={styles1.container}>
              {/* Sidebar */}
              <View style={styles1.sidebar}>
                {cvData.imagenPerfil && (
                  <Image
                    src={cvData.imagenPerfil}
                    style={styles1.profileImage}
                  />
                )}

                <Text style={styles1.name}>
                  {cvData.name} {cvData.lastName}
                </Text>

                {/* Contact Information */}
                <View style={{ marginTop: 20 }}>
                  <Text style={styles1.contactInfo} wrap={true}>{cvData.email}</Text>
                  <Text style={styles1.contactInfo}>{cvData.phone}</Text>
                  <Text style={styles1.contactInfo}>
                    {cvData.ciudad}, {cvData.provincia}
                  </Text>
                </View>

                {/* Skills Section */}
                {iaData.skills && (
                  <View>
                    <Text style={styles1.sidebarSectionTitle}>HABILIDADES</Text>
                    {iaData.skills.split("•").map((skill, index) => (
                      <Text key={index} style={styles1.skillItem}>
                        • {skill.trim()}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Languages */}
                {cvData.idiomas.length > 0 && (
                  <View>
                    <Text style={styles1.sidebarSectionTitle}>IDIOMAS</Text>
                    {cvData.idiomas.map((idioma, index) => (
                      <Text key={index} style={styles1.skillItem}>
                        • {idioma.idioma} - {idioma.nivel}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Additional Information */}
                <View>
                  <Text style={styles1.sidebarSectionTitle}>
                    INFORMACIÓN {"\n"} ADICIONAL
                  </Text>
                  {cvData.licencia && (
                    <Text style={styles1.additionalInfo}>
                      • Licencia de conducir
                    </Text>
                  )}
                  {cvData.movilidad && (
                    <Text style={styles1.additionalInfo}>
                      • Vehículo propio
                    </Text>
                  )}
                  {cvData.incorporacion && (
                    <Text style={styles1.additionalInfo}>
                      • Disponibilidad inmediata
                    </Text>
                  )}
                  {cvData.disponibilidad && (
                    <Text style={styles1.additionalInfo}>
                      • Jornada: {cvData.disponibilidad}
                    </Text>
                  )}
                </View>
              </View>

              {/* Main Content */}
              <View style={styles1.mainContent}>
                {/* Profile Summary */}
                {iaData.profile && (
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles1.sectionTitle}>PERFIL PROFESIONAL</Text>
                    <Text style={styles1.description}>{iaData.profile}</Text>
                  </View>
                )}

                {/* Experience */}
                {cvData.experience.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles1.sectionTitle}>
                      EXPERIENCIA PROFESIONAL
                    </Text>
                    {cvData.experience.map((exp, index) => (
                      <View key={index} style={styles1.experienceEntry}>
                        <Text style={styles1.companyName}>
                          {exp.nombreEmpresa}
                        </Text>
                        <Text style={styles1.jobTitle}>{exp.puesto}</Text>
                        <Text style={styles1.dateLocation}>
                          {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}{" "}
                          | {exp.zonaEmpresa}
                        </Text>
                        <Text style={styles1.description}>
                          • {iaData.descriptionWork.split("\n")[index]}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Education */}
                {cvData.education.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles1.sectionTitle}>EDUCACIÓN</Text>
                    {cvData.education.map((edu, index) => (
                      <View key={index} style={styles1.educationEntry}>
                        <Text style={styles1.institution}>
                          {edu.institucion}
                        </Text>
                        <Text style={styles1.degree}>
                          {edu.carrera} ({edu.estado})
                        </Text>
                        <Text style={styles1.dateLocation}>
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
                    <Text style={styles1.sectionTitle}>CERTIFICACIONES</Text>
                    {cvData.cursos.map((curso, index) => (
                      <View key={index} style={styles1.educationEntry}>
                        <Text style={styles1.institution}>{curso.curso}</Text>
                        <Text style={styles1.degree}>{curso.institucion}</Text>
                        <Text style={styles1.dateLocation}>
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
}