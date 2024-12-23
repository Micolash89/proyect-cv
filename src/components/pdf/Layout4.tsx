import { CVDataPdf, OptionsPDF } from '@/lib/definitions';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { TypeIAData } from '../PreviewCV';
import { styles4 } from '@/lib/stylePdf/style4';
import { componentStyles } from '@/lib/stylePdf/component4';

export const Layout4: React.FC<{
    cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: OptionsPDF;
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
     return (
            <Document title={`Currículum Vitae - ${cvData.name}`}>
              <Page size="A4" style={styles4.page}>
                {/* Header Background with Accent */}
                <View style={componentStyles.headerBackground} />
                <View style={componentStyles.headerAccent} />
    
                {/* Profile Section */}
                <View style={componentStyles.profileContainer}>
                  {cvData.imagenPerfil && (
                    <Image
                      src={cvData.imagenPerfil}
                      style={componentStyles.profileImage}
                    />
                  )}
                  <View style={componentStyles.nameContainer}>
                    <Text style={componentStyles.name}>
                      {cvData.name} {cvData.lastName}
                    </Text>
                    <Text style={componentStyles.title}>
                      {cvData.experience[0]?.puesto || "Profesional"}
                    </Text>
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
                        <Text style={componentStyles.contactText}>
                          {cvData.email}
                        </Text>
                      </View>
                      <View style={componentStyles.contactItem}>
                        <Text style={componentStyles.contactText}>
                          {cvData.phone}
                        </Text>
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
                        <Text style={componentStyles.sectionTitle}>
                          Habilidades
                        </Text>
                        <View style={componentStyles.skillContainer}>
                          {iaData.skills.split("•").map(
                            (skill, index) =>
                              skill.trim() && (
                                <Text key={index} style={componentStyles.skillItem}>
                                  {skill.trim()}
                                </Text>
                              )
                          )}
                        </View>
                      </View>
                    )}
    
                    {/* Idiomas */}
                    {cvData.idiomas.length > 0 && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>Idiomas</Text>
                        {cvData.idiomas.map((idioma, index) => (
                          <View key={index} style={componentStyles.languageItem}>
                            <Text style={componentStyles.languageName}>
                              {idioma.idioma}
                            </Text>
                            <Text style={componentStyles.languageLevel}>
                              {idioma.nivel}
                            </Text>
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
                        <Text style={componentStyles.sectionTitle}>
                          Perfil Profesional
                        </Text>
                        <Text style={componentStyles.profileText}>
                          {iaData.profile}
                        </Text>
                      </View>
                    )}
    
                    {/* Experiencia */}
                    {cvData.experience.length > 0 && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>
                          Experiencia Profesional
                        </Text>
                        {cvData.experience.map((exp, index) => (
                          <View key={index} style={componentStyles.experienceItem}>
                            <View style={componentStyles.experienceHeader}>
                              <Text style={componentStyles.companyName}>
                                {exp.nombreEmpresa}
                              </Text>
                              <Text style={componentStyles.jobTitle}>
                                {exp.puesto}
                              </Text>
                              <Text style={componentStyles.dateLocation}>
                                {exp.anioInicioExperiencia} -{" "}
                                {exp.anioFinExperiencia} | {exp.zonaEmpresa}
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
                        <Text style={componentStyles.sectionTitle}>
                          Formación Académica
                        </Text>
                        {cvData.education.map((edu, index) => (
                          <View key={index} style={componentStyles.educationItem}>
                            <Text style={componentStyles.institutionName}>
                              {edu.institucion}
                            </Text>
                            <Text style={componentStyles.degree}>
                              {edu.carrera} ({edu.estado})
                            </Text>
                            <Text style={componentStyles.dateLocation}>
                              {edu.anioInicioEducacion} - {edu.anioFinEducacion} |{" "}
                              {edu.zonaInstitucion}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
    
                    {/* Certificaciones */}
                    {cvData.cursos.length > 0 && (
                      <View style={styles4.section}>
                        <Text style={componentStyles.sectionTitle}>
                          Certificaciones
                        </Text>
                        {cvData.cursos.map((curso, index) => (
                          <View
                            key={index}
                            style={componentStyles.certificationItem}
                          >
                            <Text style={componentStyles.certificationName}>
                              {curso.curso}
                            </Text>
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
  }