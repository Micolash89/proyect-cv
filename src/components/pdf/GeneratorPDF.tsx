import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { TypeIAData } from "../PreviewCV";
import React from "react";
import { styles as stylesDefault } from "@/lib/stylePdf/styleDefault";
import { CVDataPdf as CVData } from "@/lib/definitions";
import { styles2 } from "@/lib/stylePdf/style2";
import { styles1 } from "@/lib/stylePdf/style1";

const MyDocumentPDF: React.FC<{
  cvData: CVData;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: { color: string; spaceBetween: boolean; tipoPdf: number };
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  switch (optionsPDF.tipoPdf) {
    case 0:
      return (
        <Document>
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
                {cvData.dni && `• DNI:${cvData.dni}`} • {cvData.fechaNacimiento}{" "}
                • Tel.:{cvData.phone}
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
                    {iaData.skills.split(" •").map((skill, index) => (
                      <React.Fragment key={index}>• {skill} </React.Fragment>
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
      break;

    case 1:
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
                  <Text style={styles1.contactInfo}>{cvData.email}</Text>
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
                    INFORMACIÓN ADICIONAL
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
      break;

    case 2:
      return (
        <Document>
          <Page size="A4" style={styles2.page}>
            {/* Left Column */}
            <View style={styles2.leftColumn}>
              {cvData.imagenPerfil && (
                <Image src={cvData.imagenPerfil} style={styles2.profileImage} />
              )}
              <Text style={styles2.name}>
                {cvData.name} {cvData.lastName}
              </Text>
              <View style={styles2.contactInfo}>
                <Text style={styles2.contactItem}>{cvData.email}</Text>
                <Text style={styles2.contactItem}>{cvData.phone}</Text>
                <Text style={styles2.contactItem}>
                  {cvData.ciudad}, {cvData.provincia}
                </Text>
                <Text style={styles2.contactItem}>
                  {cvData.fechaNacimiento}
                </Text>
                {cvData.dni && (
                  <Text style={styles2.contactItem}>DNI: {cvData.dni}</Text>
                )}
              </View>
              <Text style={styles2.sectionTitle}>Habilidades</Text>
              <View style={styles2.skills}>
                {iaData.skills.split("•").map((skill, index) => (
                  <Text key={index} style={styles2.skill}>
                    {skill.trim()}
                  </Text>
                ))}
              </View>
              <Text style={styles2.sectionTitle}>Idiomas</Text>
              {cvData.idiomas.map((idioma, index) => (
                <Text key={index} style={styles2.contactItem}>
                  {idioma.idioma} - {idioma.nivel}
                </Text>
              ))}
              <Text style={styles2.sectionTitle}>Información Adicional</Text>
              {cvData.licencia && (
                <Text style={styles2.contactItem}>Licencia de conducir</Text>
              )}
              {cvData.movilidad && (
                <Text style={styles2.contactItem}>Vehículo propio</Text>
              )}
              {cvData.incorporacion && (
                <Text style={styles2.contactItem}>
                  Disponibilidad inmediata
                </Text>
              )}
              {cvData.disponibilidad && (
                <Text style={styles2.contactItem}>
                  Jornada: {cvData.disponibilidad}
                </Text>
              )}
              {cvData.office && (
                <Text style={styles2.contactItem}>Microsoft Office</Text>
              )}
            </View>

            {/* Right Column */}
            <View style={styles2.rightColumn}>
              {iaData.profile && (
                <View>
                  <Text style={styles2.sectionTitle}>Perfil</Text>
                  <Text style={[styles2.description, { textAlign: "justify" }]}>
                    {iaData.profile}
                  </Text>
                </View>
              )}

              <Text style={styles2.sectionTitle}>Experiencia Profesional</Text>
              {cvData.experience.map((exp, index) => (
                <View key={index} style={styles2.entryContainer}>
                  <View style={styles2.entryHeader}>
                    <Text style={styles2.institution}>{exp.nombreEmpresa}</Text>
                    <Text style={styles2.location}>{exp.zonaEmpresa}</Text>
                  </View>
                  <View style={styles2.entryHeader}>
                    <Text style={styles2.degree}>{exp.puesto}</Text>
                    <Text style={styles2.dates}>
                      {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                    </Text>
                  </View>
                  <Text style={styles2.description}>
                    • {iaData.descriptionWork.split("\n")[index]}
                  </Text>
                </View>
              ))}

              <Text style={styles2.sectionTitle}>Educación</Text>
              {cvData.education.map((edu, index) => (
                <View key={index} style={styles2.entryContainer}>
                  <View style={styles2.entryHeader}>
                    <Text style={styles2.institution}>{edu.institucion}</Text>
                    <Text style={styles2.location}>{edu.zonaInstitucion}</Text>
                  </View>
                  <View style={styles2.entryHeader}>
                    <Text style={styles2.degree}>
                      {edu.carrera} ({edu.estado.toLowerCase()})
                    </Text>
                    <Text style={styles2.dates}>
                      {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                    </Text>
                  </View>
                </View>
              ))}

              <Text style={styles2.sectionTitle}>Certificaciones</Text>
              {cvData.cursos.map((curso, index) => (
                <View key={index} style={styles2.entryContainer}>
                  <View style={styles2.entryHeader}>
                    <Text style={styles2.institution}>{curso.curso}</Text>
                    <Text style={styles2.dates}>{curso.anioInicioCurso}</Text>
                  </View>
                  <Text style={styles2.degree}>{curso.institucion}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      );
      break;
  }

  //style1

  //estilo 2
};

export default MyDocumentPDF;
