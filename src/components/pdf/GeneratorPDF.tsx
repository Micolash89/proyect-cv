import { Document, Page, Text, View, Image, Svg, Circle } from "@react-pdf/renderer";
import { TypeIAData } from "../PreviewCV";
import React from "react";
import { styles as stylesDefault } from "@/lib/stylePdf/styleDefault";
import { CVDataPdf as CVData } from "@/lib/definitions";
import { styles2 } from "@/lib/stylePdf/style2";
import { styles1 } from "@/lib/stylePdf/style1";
import { styles3 } from "@/lib/stylePdf/style3";
import { styles4 } from "@/lib/stylePdf/style4";
import { componentStyles } from "@/lib/stylePdf/component4";
import { styles5 } from "@/lib/stylePdf/style5";
import { styles6 } from "@/lib/stylePdf/style6";

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

      case 3:
        return (
          <Document>
            <Page size="A4" style={styles3.page}>
              {/* Header Section */}
              <View style={styles3.header}>
                {cvData.imagenPerfil && (
                  <Image src={cvData.imagenPerfil} style={styles3.profileImage} />
                )}
                <View style={styles3.headerContent}>
                  <Text style={styles3.name}>
                    {cvData.name} {cvData.lastName}
                  </Text>
                  <Text style={styles3.title}>{cvData.experience[0]?.puesto || "Professional"}</Text>
                </View>
              </View>
      
              {/* Main Content Container */}
              <View style={styles3.container}>
                {/* Left Column */}
                <View style={styles3.leftColumn}>
                  {/* Contact Information */}
                  <View style={styles3.section}>
                    <Text style={styles3.sectionTitle}>CONTACT</Text>
                    <View style={styles3.contactItem}>
                      <Text style={styles3.contactText}>{cvData.email}</Text>
                      <Text style={styles3.contactText}>{cvData.phone}</Text>
                      <Text style={styles3.contactText}>
                        {cvData.ciudad}, {cvData.provincia}
                      </Text>
                    </View>
                  </View>
      
                  {/* Skills Section */}
                  {iaData.skills && (
                    <View style={styles3.section}>
                      <Text style={styles3.sectionTitle}>SKILLS</Text>
                      {iaData.skills.split("•").map((skill, index) => (
                        <Text key={index} style={styles3.skillItem}>
                          • {skill.trim()}
                        </Text>
                      ))}
                    </View>
                  )}
      
                  {/* Languages Section */}
                  {cvData.idiomas.length > 0 && (
                    <View style={styles3.section}>
                      <Text style={styles3.sectionTitle}>LANGUAGES</Text>
                      {cvData.idiomas.map((idioma, index) => (
                        <View key={index} style={styles3.languageItem}>
                          <Text style={styles3.languageName}>{idioma.idioma}</Text>
                          <Text style={styles3.languageLevel}>{idioma.nivel}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
      
                {/* Right Column */}
                <View style={styles3.rightColumn}>
                  {/* Profile Summary */}
                  {iaData.profile && (
                    <View style={styles3.section}>
                      <Text style={styles3.sectionTitle}>PROFILE</Text>
                      <Text style={styles3.profileText}>{iaData.profile}</Text>
                    </View>
                  )}
      
                  {/* Experience Section */}
                  {cvData.experience.length > 0 && (
                    <View style={styles3.section}>
                      <Text style={styles3.sectionTitle}>EXPERIENCE</Text>
                      {cvData.experience.map((exp, index) => (
                        <View key={index} style={styles3.experienceItem}>
                          <View style={styles3.experienceHeader}>
                            <Text style={styles3.companyName}>{exp.nombreEmpresa}</Text>
                            <Text style={styles3.dateLocation}>
                              {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                            </Text>
                          </View>
                          <Text style={styles3.jobTitle}>{exp.puesto}</Text>
                          <Text style={styles3.locationText}>{exp.zonaEmpresa}</Text>
                          <Text style={styles3.description}>
                            • {iaData.descriptionWork.split("\n")[index]}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
      
                  {/* Education Section */}
                  {cvData.education.length > 0 && (
                    <View style={styles3.section}>
                      <Text style={styles3.sectionTitle}>EDUCATION</Text>
                      {cvData.education.map((edu, index) => (
                        <View key={index} style={styles3.educationItem}>
                          <View style={styles3.educationHeader}>
                            <Text style={styles3.institutionName}>{edu.institucion}</Text>
                            <Text style={styles3.dateLocation}>
                              {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                            </Text>
                          </View>
                          <Text style={styles3.degree}>
                            {edu.carrera} ({edu.estado})
                          </Text>
                          <Text style={styles3.locationText}>{edu.zonaInstitucion}</Text>
                        </View>
                      ))}
                    </View>
                  )}
      
                  {/* Certifications Section */}
                  {cvData.cursos.length > 0 && (
                    <View style={styles3.section}>
                      <Text style={styles3.sectionTitle}>CERTIFICATIONS</Text>
                      {cvData.cursos.map((curso, index) => (
                        <View key={index} style={styles3.certificationItem}>
                          <Text style={styles3.certificationName}>{curso.curso}</Text>
                          <Text style={styles3.certificationInstitution}>
                            {curso.institucion} | {curso.anioInicioCurso}
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
        case 4:
          return (
            <Document>
              <Page size="A4" style={styles4.page}>
                {/* Header Background with Accent */}
                <View style={componentStyles.headerBackground} />
                <View style={componentStyles.headerAccent} />
        
                {/* Profile Section */}
                <View style={componentStyles.profileContainer}>
                  {cvData.imagenPerfil && (
                    <Image src={cvData.imagenPerfil} style={componentStyles.profileImage} />
                  )}
                  <View style={componentStyles.nameContainer}>
                    <Text style={componentStyles.name}>
                      {cvData.name} {cvData.lastName}
                    </Text>
                    <Text style={componentStyles.title}>{cvData.experience[0]?.puesto || "Profesional"}</Text>
                  </View>
                </View>
        
                {/* Main Content */}
                <View style={componentStyles.mainContent}>
                  {/* Left Column */}
                  <View style={componentStyles.leftColumn}>
                    {/* Contacto */}
                    <View style={styles4.section}>
                      <Text style={componentStyles.sectionTitle}>Contacto</Text>
                      <View style={componentStyles.contactItem}>
                        <Text style={componentStyles.contactText}>{cvData.email}</Text>
                      </View>
                      <View style={componentStyles.contactItem}>
                        <Text style={componentStyles.contactText}>{cvData.phone}</Text>
                      </View>
                      <View style={componentStyles.contactItem}>
                        <Text style={componentStyles.contactText}>
                          {cvData.ciudad}, {cvData.provincia}
                        </Text>
                      </View>
                    </View>
        
                    {/* Habilidades */}
                    {iaData.skills && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>Habilidades</Text>
                        <View style={componentStyles.skillContainer}>
                          {iaData.skills.split("•").map((skill, index) => (
                            skill.trim() && (
                              <Text key={index} style={componentStyles.skillItem}>
                                {skill.trim()}
                              </Text>
                            )
                          ))}
                        </View>
                      </View>
                    )}
        
                    {/* Idiomas */}
                    {cvData.idiomas.length > 0 && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>Idiomas</Text>
                        {cvData.idiomas.map((idioma, index) => (
                          <View key={index} style={componentStyles.languageItem}>
                            <Text style={componentStyles.languageName}>{idioma.idioma}</Text>
                            <Text style={componentStyles.languageLevel}>{idioma.nivel}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
        
                  {/* Right Column */}
                  <View style={componentStyles.rightColumn}>
                    {/* Perfil */}
                    {iaData.profile && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>Perfil Profesional</Text>
                        <Text style={componentStyles.profileText}>{iaData.profile}</Text>
                      </View>
                    )}
        
                    {/* Experiencia */}
                    {cvData.experience.length > 0 && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>Experiencia Profesional</Text>
                        {cvData.experience.map((exp, index) => (
                          <View key={index} style={componentStyles.experienceItem}>
                            <View style={componentStyles.experienceHeader}>
                              <Text style={componentStyles.companyName}>{exp.nombreEmpresa}</Text>
                              <Text style={componentStyles.jobTitle}>{exp.puesto}</Text>
                              <Text style={componentStyles.dateLocation}>
                                {exp.anioInicioExperiencia} - {exp.anioFinExperiencia} | {exp.zonaEmpresa}
                              </Text>
                            </View>
                            <Text style={componentStyles.description}>
                              {iaData.descriptionWork.split("\n")[index]}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
        
                    {/* Educación */}
                    {cvData.education.length > 0 && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>Formación Académica</Text>
                        {cvData.education.map((edu, index) => (
                          <View key={index} style={componentStyles.educationItem}>
                            <Text style={componentStyles.institutionName}>{edu.institucion}</Text>
                            <Text style={componentStyles.degree}>
                              {edu.carrera} ({edu.estado})
                            </Text>
                            <Text style={componentStyles.dateLocation}>
                              {edu.anioInicioEducacion} - {edu.anioFinEducacion} | {edu.zonaInstitucion}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
        
                    {/* Certificaciones */}
                    {cvData.cursos.length > 0 && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>Certificaciones</Text>
                        {cvData.cursos.map((curso, index) => (
                          <View key={index} style={componentStyles.certificationItem}>
                            <Text style={componentStyles.certificationName}>{curso.curso}</Text>
                            <Text style={componentStyles.certificationInstitution}>
                              {curso.institucion} | {curso.anioInicioCurso}
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
          case 5:
            return (
              <Document>
                <Page size="A4" style={styles5.page}>
                  {/* Header */}
                  <View style={styles5.header}>
                    <View style={styles5.headerLeft}>
                      <Text style={styles5.name}>{cvData.name} {cvData.lastName}</Text>
                      <Text style={styles5.title}>{cvData.experience[0]?.puesto || "Profesional"}</Text>
                    </View>
                    <View style={styles5.headerRight}>
                      {cvData.imagenPerfil && (
                        <Image src={cvData.imagenPerfil} style={styles5.profileImage} />
                      )}
                    </View>
                  </View>
          
                  {/* Contact Information */}
                  <View style={styles5.contactInfo}>
                    <View style={styles5.contactItem}>
                      <Svg style={styles5.contactIcon}>
                        <Circle cx="7.5" cy="7.5" r="7.5" fill="#6C5CE7" />
                      </Svg>
                      <Text style={styles5.contactText}>{cvData.email}</Text>
                    </View>
                    <View style={styles5.contactItem}>
                      <Svg style={styles5.contactIcon}>
                        <Circle cx="7.5" cy="7.5" r="7.5" fill="#6C5CE7" />
                      </Svg>
                      <Text style={styles5.contactText}>{cvData.phone}</Text>
                    </View>
                    <View style={styles5.contactItem}>
                      <Svg style={styles5.contactIcon}>
                        <Circle cx="7.5" cy="7.5" r="7.5" fill="#6C5CE7" />
                      </Svg>
                      <Text style={styles5.contactText}>{cvData.ciudad}, {cvData.provincia}</Text>
                    </View>
                  </View>
          
                  {/* Profile */}
                  {iaData.profile && (
                    <View style={styles5.section}>
                      <Text style={styles5.sectionTitle}>Perfil</Text>
                      <Text style={styles5.description}>{iaData.profile}</Text>
                    </View>
                  )}
          
                  {/* Experience */}
                  <View style={styles5.section}>
                    <Text style={styles5.sectionTitle}>Experiencia Profesional</Text>
                    {cvData.experience.map((exp, index) => (
                      <View key={index} style={styles5.entryContainer}>
                        <View style={styles5.entryHeader}>
                          <Text style={styles5.institution}>{exp.nombreEmpresa}</Text>
                          <Text style={styles5.location}>{exp.zonaEmpresa}</Text>
                        </View>
                        <View style={styles5.entryHeader}>
                          <Text style={styles5.degree}>{exp.puesto}</Text>
                          <Text style={styles5.dates}>
                            {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                          </Text>
                        </View>
                        <Text style={styles5.description}>
                          • {iaData.descriptionWork.split("\n")[index]}
                        </Text>
                      </View>
                    ))}
                  </View>
          
                  {/* Education */}
                  <View style={styles5.section}>
                    <Text style={styles5.sectionTitle}>Educación</Text>
                    {cvData.education.map((edu, index) => (
                      <View key={index} style={styles5.entryContainer}>
                        <View style={styles5.entryHeader}>
                          <Text style={styles5.institution}>{edu.institucion}</Text>
                          <Text style={styles5.location}>{edu.zonaInstitucion}</Text>
                        </View>
                        <View style={styles5.entryHeader}>
                          <Text style={styles5.degree}>
                            {edu.carrera} ({edu.estado.toLowerCase()})
                          </Text>
                          <Text style={styles5.dates}>
                            {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
          
                  {/* Skills */}
                  <View style={styles5.section}>
                    <Text style={styles5.sectionTitle}>Habilidades</Text>
                    <View style={styles5.skills}>
                      {iaData.skills.split("•").map((skill, index) => (
                        <Text key={index} style={styles5.skill}>
                          {skill.trim()}
                        </Text>
                      ))}
                    </View>
                  </View>
          
                  {/* Certifications */}
                  <View style={styles5.section}>
                    <Text style={styles5.sectionTitle}>Certificaciones</Text>
                    {cvData.cursos.map((curso, index) => (
                      <View key={index} style={styles5.entryContainer}>
                        <View style={styles5.entryHeader}>
                          <Text style={styles5.institution}>{curso.curso}</Text>
                          <Text style={styles5.dates}>{curso.anioInicioCurso}</Text>
                        </View>
                        <Text style={styles5.degree}>{curso.institucion}</Text>
                      </View>
                    ))}
                  </View>
          
                  {/* Languages */}
                  <View style={styles5.section}>
                    <Text style={styles5.sectionTitle}>Idiomas</Text>
                    <View style={styles5.skills}>
                      {cvData.idiomas.map((idioma, index) => (
                        <Text key={index} style={styles5.skill}>
                          {idioma.idioma} - {idioma.nivel}
                        </Text>
                      ))}
                    </View>
                  </View>
          
                  {/* Additional Information */}
                  <View style={styles5.section}>
                    <Text style={styles5.sectionTitle}>Información Adicional</Text>
                    <View style={styles5.additionalInfo}>
                      {cvData.licencia && <Text style={styles5.additionalInfoItem}>Licencia de conducir</Text>}
                      {cvData.movilidad && <Text style={styles5.additionalInfoItem}>Vehículo propio</Text>}
                      {cvData.incorporacion && <Text style={styles5.additionalInfoItem}>Disponibilidad inmediata</Text>}
                      {cvData.disponibilidad && <Text style={styles5.additionalInfoItem}>Jornada: {cvData.disponibilidad}</Text>}
                      {cvData.office && <Text style={styles5.additionalInfoItem}>Microsoft Office</Text>}
                    </View>
                  </View>
                </Page>
              </Document>
            );
            break;

            case 6:
              return (
                <Document>
                  <Page size="A4" style={styles6.page}>
                    {/* Header */}
                    <View style={styles6.header}>
                      <View style={styles6.headerLeft}>
                        {cvData.imagenPerfil && (
                          <Image src={cvData.imagenPerfil} style={styles6.profileImage} />
                        )}
                      </View>
                      <View style={styles6.headerCenter}>
                        <Text style={styles6.name}>{cvData.name} {cvData.lastName}</Text>
                        <View>
                          <Text style={styles6.contactLabel}>Correo:</Text>
                          <Text style={styles6.contactValue}>{cvData.email}</Text>
                          
                          <Text style={styles6.contactLabel}>Teléfono:</Text>
                          <Text style={styles6.contactValue}>{cvData.phone}</Text>
                          
                          <Text style={styles6.contactLabel}>Dirección:</Text>
                          <Text style={styles6.contactValue}>{cvData.ciudad}, {cvData.provincia}</Text>
                        </View>
                      </View>
                      <View style={styles6.headerRight}>
                        <Text style={styles6.profileText}>{iaData.profile}</Text>
                      </View>
                    </View>
            
                    {/* Professional Profile */}
                    <View>
                      <Text style={styles6.sectionTitle}>Perfil profesional</Text>
                      <Text style={styles6.profileText}>{iaData.profile}</Text>
                    </View>
            
                    {/* Experience */}
                    <View>
                      <Text style={styles6.sectionTitle}>Experiencia de trabajo</Text>
                      <View style={styles6.timelineContainer}>
                        {cvData.experience.map((exp, index) => (
                          <View key={index} style={styles6.timelineEntry}>
                            <View style={styles6.timelineDot} />
                            <View style={styles6.timelineContent}>
                              <Text style={styles6.timelineTitle}>{exp.puesto}</Text>
                              <Text style={styles6.timelineSubtitle}>
                                {exp.nombreEmpresa} | {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                              </Text>
                              <Text style={styles6.timelineDescription}>
                                {iaData.descriptionWork.split("\n")[index]}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
            
                    {/* Education */}
                    <View>
                      <Text style={styles6.sectionTitle}>Educación</Text>
                      <View style={styles6.timelineContainer}>
                        {cvData.education.map((edu, index) => (
                          <View key={index} style={styles6.timelineEntry}>
                            <View style={styles6.timelineDot} />
                            <View style={styles6.timelineContent}>
                              <Text style={styles6.timelineTitle}>{edu.carrera}</Text>
                              <Text style={styles6.timelineSubtitle}>
                                {edu.institucion}
                              </Text>
                              <Text style={styles6.timelineDate}>
                                {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                              </Text>
                            </View>
                          </View>
                        ))}
                        {cvData.cursos.map((curso, index) => (
                          <View key={`curso-${index}`} style={styles6.timelineEntry}>
                            <View style={styles6.timelineDot} />
                            <View style={styles6.timelineContent}>
                              <Text style={styles6.timelineTitle}>{curso.curso}</Text>
                              <Text style={styles6.timelineSubtitle}>
                                {curso.institucion}
                              </Text>
                              <Text style={styles6.timelineDate}>{curso.anioInicioCurso}</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
            
                    {/* Additional Info and Languages */}
                    <View style={styles6.twoColumnSection}>
                      <View style={styles6.column}>
                        <Text style={styles6.sectionTitle}>Información adicional</Text>
                        <Text style={styles6.profileText}>
                          {[
                            cvData.licencia && "Licencia de conducir",
                            cvData.movilidad && "Vehículo propio",
                            cvData.incorporacion && "Disponibilidad inmediata",
                            cvData.disponibilidad && `Jornada: ${cvData.disponibilidad}`,
                            cvData.office && "Microsoft Office",
                          ]
                            .filter(Boolean)
                            .join("\n")}
                        </Text>
                      </View>
                      <View style={[styles6.column,{borderLeft: '1 solid #EAEAEA', paddingLeft: 15}]}>
                        <Text style={styles6.sectionTitle}>Idiomas</Text>
                        {cvData.idiomas.map((idioma, index) => (
                          <View key={index} style={styles6.languageItem}>
                            <Text style={styles6.languageName}>{idioma.idioma}:</Text>
                            <Text style={styles6.languageLevel}>{idioma.nivel}</Text>
                          </View>
                        ))}
                      </View>
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
