import { CVDataPdf, OptionsPDF } from '@/lib/definitions';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { TypeIAData } from '../PreviewCV';
import { styles as stylesDefault } from "@/lib/stylePdf/styleDefault";

export const Layout0: React.FC<{
    cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: OptionsPDF;
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
    return (
            <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
              <Page
                size="A4"
                style={[
                  stylesDefault.page,
                  { padding: 45 - (contador <= 5 ? contador * 5 : 25) },
                ]}
              >
                {/* Header */}
                <View style={stylesDefault.header}>
                  <Text
                    style={[
                      stylesDefault.name,
                      {
                        fontSize: 24 + contador,
                        marginTop: 20,
                        marginBottom: contador <= 2 ? contador * 5 : 15,
                      },
                    ]}
                  >
                    {cvData.name} {cvData.lastName}
                  </Text>
                  <Text
                    style={[stylesDefault.contactInfo, { fontSize: 11 + contador }]}
                  >
                    {cvData.ciudad}, {cvData.provincia}{" "}
                    {cvData.dni && `• DNI:${cvData.dni}`} •{" "}
                    {cvData.fechaNacimiento.split("-").reverse().join("/")} • Tel.:
                    {cvData.phone}
                    {cvData.email && ` • ${cvData.email}`}
                  </Text>
                </View>
                {cvData.imagenPerfil && (
                  <Image
                    src={cvData.imagenPerfil}
                    style={{
                      position: "absolute",
                      top: 5,
                      left: 10,
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                    }}
                  />
                )}
    
                {/* Profile Summary */}
                {iaData.profile && (
                  <View>
                    <Text
                      style={[
                        stylesDefault.description,
                        {
                          fontSize: 10.5 + contador,
                          fontStyle: "italic",
                          textAlign: "justify",
                        },
                      ]}
                    >
                      {iaData.profile}
                    </Text>
                  </View>
                )}
    
                {/* Education */}
                {cvData.education.length > 0 && (
                  <View>
                    <Text
                      style={[
                        stylesDefault.sectionTitle,
                        { fontSize: 14 + contador },
                      ]}
                    >
                      EDUCACIÓN
                    </Text>
                    {cvData.education.map((edu, index) => (
                      <View key={index} style={stylesDefault.entryContainer}>
                        <View style={stylesDefault.entryHeader}>
                          <Text
                            style={[
                              stylesDefault.institution,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {edu.institucion}
                          </Text>
                          <Text
                            style={[
                              stylesDefault.location,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {edu.zonaInstitucion}
                          </Text>
                        </View>
                        <View style={stylesDefault.entryHeader}>
                          <Text
                            style={[
                              stylesDefault.degree,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {edu.carrera} ({edu.estado.toLowerCase()})
                          </Text>
                          <Text
                            style={[
                              stylesDefault.dates,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
    
                {/* Experience */}
                {cvData.experience.length > 0 && (
                  <View>
                    <Text
                      style={[
                        stylesDefault.sectionTitle,
                        { fontSize: 14 + contador },
                      ]}
                    >
                      EXPERIENCIA PROFESIONAL
                    </Text>
                    {cvData.experience.map((exp, index) => (
                      <View key={index} style={stylesDefault.entryContainer}>
                        <View style={stylesDefault.entryHeader}>
                          <Text
                            style={[
                              stylesDefault.institution,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {exp.nombreEmpresa}
                          </Text>
                          <Text
                            style={[
                              stylesDefault.location,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {exp.zonaEmpresa}
                          </Text>
                        </View>
                        <View style={stylesDefault.entryHeader}>
                          <Text
                            style={[
                              stylesDefault.degree,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {exp.puesto}
                          </Text>
                          <Text
                            style={[
                              stylesDefault.dates,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                          </Text>
                        </View>
                        <Text
                          style={[
                            stylesDefault.description,
                            { fontSize: 11 + contador },
                          ]}
                        >
                          • {iaData.descriptionWork.split("\n")[index]}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
    
                {/* Certifications */}
                {cvData.cursos.length > 0 && (
                  <View>
                    <Text
                      style={[
                        stylesDefault.sectionTitle,
                        { fontSize: 14 + contador },
                      ]}
                    >
                      CERTIFICACIONES
                    </Text>
                    {cvData.cursos.map((curso, index) => (
                      <View key={index} style={stylesDefault.entryContainer}>
                        <View style={stylesDefault.entryHeader}>
                          <Text
                            style={[
                              stylesDefault.institution,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            • {curso.curso}
                          </Text>
                          <Text
                            style={[
                              stylesDefault.location,
                              { fontSize: 11 + contador, fontStyle: "italic" },
                            ]}
                          >
                            {curso.anioInicioCurso}
                          </Text>
                        </View>
    
                        <View style={stylesDefault.entryHeader}>
                          <Text
                            style={[
                              stylesDefault.degree,
                              { fontSize: 11 + contador },
                            ]}
                          >
                            {curso.institucion}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
    
                {/* Skills */}
                {iaData.skills && (
                  <View>
                    <Text
                      style={[
                        stylesDefault.sectionTitle,
                        { fontSize: 14 + contador },
                      ]}
                    >
                      HABILIDADES
                    </Text>
                    <View
                      style={[stylesDefault.description, { textAlign: "center" }]}
                    >
                      <Text wrap={true} style={{ fontSize: 11 + contador }}>
                        {iaData.skills.split("•").map((skill, index) => (
                          <React.Fragment key={index}>
                            {" • " + skill}
                          </React.Fragment>
                        ))}
                      </Text>
                    </View>
                  </View>
                )}
    
                {/* Additional Information */}
                {(cvData.licencia ||
                  cvData.movilidad ||
                  cvData.incorporacion ||
                  cvData.disponibilidad ||
                  cvData.office ||
                  cvData.idiomas.length > 0) && (
                  <View>
                    <Text
                      style={[
                        stylesDefault.sectionTitle,
                        { fontSize: 14 + contador },
                      ]}
                    >
                      INFORMACIÓN ADICIONAL
                    </Text>
                    <Text
                      style={[
                        stylesDefault.description,
                        { fontSize: 11 + contador, textAlign: "center" },
                      ]}
                    >
                      {[
                        cvData.licencia && "Licencia de conducir",
                        cvData.movilidad && "Vehículo propio",
                        cvData.incorporacion && "Disponibilidad inmediata",
                        cvData.disponibilidad &&
                          `Jornada: ${cvData.disponibilidad}`,
                        cvData.office && "Microsoft Office",
                        ...cvData.idiomas.map(
                          (idioma) =>
                            `${idioma.idioma} - ${idioma.nivel.toLowerCase()}`
                        ),
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </Text>
                  </View>
                )}
              </Page>
            </Document>
          );
  }


