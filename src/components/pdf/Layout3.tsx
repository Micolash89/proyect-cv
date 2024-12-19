import { CVDataPdf, OptionsPDF } from '@/lib/definitions';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { TypeIAData } from '../PreviewCV';
import { styles3 } from '@/lib/stylePdf/style3';

export const Layout3: React.FC<{
    cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: OptionsPDF;
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
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
                    <Text style={styles3.title}>
                      {cvData.experience[0]?.puesto || "Professional"}
                    </Text>
                  </View>
                </View>
    
                {/* Main Content Container */}
                <View style={styles3.container}>
                  {/* Left Column */}
                  <View style={styles3.leftColumn}>
                    {/* Contact Information */}
                    <View style={styles3.section}>
                      <Text style={styles3.sectionTitle}>INFORMACIÓN</Text>
                      <View style={styles3.contactItem}>
                        <Text style={styles3.contactText}>
                          {cvData.fechaNacimiento.split("-").reverse().join("/")}
                        </Text>
                        {cvData.dni && (
                          <Text style={styles3.contactText}>DNI: {cvData.dni}</Text>
                        )}
                        <Text style={styles3.contactText}>Tel: {cvData.phone}</Text>
                        <Text style={styles3.contactText}>{cvData.email}</Text>
                        <Text style={styles3.contactText}>
                          {cvData.ciudad}, {cvData.provincia}
                        </Text>
                      </View>
                    </View>
    
                    {/* Skills Section */}
                    {iaData.skills && (
                      <View style={styles3.section}>
                        <Text style={styles3.sectionTitle}>HABILIDADES</Text>
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
                        <Text style={styles3.sectionTitle}>LENGUAJES</Text>
                        {cvData.idiomas.map((idioma, index) => (
                          <View key={index} style={styles3.languageItem}>
                            <Text style={styles3.languageName}>
                              {idioma.idioma}
                            </Text>
                            <Text style={styles3.languageLevel}>
                              {idioma.nivel}
                            </Text>
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
                        <Text style={styles3.sectionTitle}>PERFIL</Text>
                        <Text style={styles3.profileText}>{iaData.profile}</Text>
                      </View>
                    )}
    
                    {/* Experience Section */}
                    {cvData.experience.length > 0 && (
                      <View style={styles3.section}>
                        <Text style={styles3.sectionTitle}>EXPERIENCIA</Text>
                        {cvData.experience.map((exp, index) => (
                          <View key={index} style={styles3.experienceItem}>
                            <View style={styles3.experienceHeader}>
                              <Text style={styles3.companyName}>
                                {exp.nombreEmpresa}
                              </Text>
                              <Text style={styles3.dateLocation}>
                                {exp.anioInicioExperiencia} -{" "}
                                {exp.anioFinExperiencia}
                              </Text>
                            </View>
                            <Text style={styles3.jobTitle}>{exp.puesto}</Text>
                            <Text style={styles3.locationText}>
                              {exp.zonaEmpresa}
                            </Text>
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
                        <Text style={styles3.sectionTitle}>EDUCACIÓN</Text>
                        {cvData.education.map((edu, index) => (
                          <View key={index} style={styles3.educationItem}>
                            <View style={styles3.educationHeader}>
                              <Text style={styles3.institutionName}>
                                {edu.institucion}
                              </Text>
                              <Text style={styles3.dateLocation}>
                                {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                              </Text>
                            </View>
                            <Text style={styles3.degree}>
                              {edu.carrera} ({edu.estado})
                            </Text>
                            <Text style={styles3.locationText}>
                              {edu.zonaInstitucion}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
    
                    {/* Certifications Section */}
                    {cvData.cursos.length > 0 && (
                      <View style={styles3.section}>
                        <Text style={styles3.sectionTitle}>CURSOS</Text>
                        {cvData.cursos.map((curso, index) => (
                          <View key={index} style={styles3.certificationItem}>
                            <Text style={styles3.certificationName}>
                              {curso.curso}
                            </Text>
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
  }