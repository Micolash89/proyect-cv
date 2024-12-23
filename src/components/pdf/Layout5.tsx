import { CVDataPdf, OptionsPDF } from '@/lib/definitions';
import { Circle, Document, Image, Page, Svg, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { TypeIAData } from '../PreviewCV';
import { styles5 } from '@/lib/stylePdf/style5';

export const Layout5: React.FC<{
    cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: OptionsPDF;
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
    return (
            <Document title={`Currículum Vitae - ${cvData.name}`}>
              <Page size="A4" style={styles5.page}>
                {/* Header */}
                <View style={styles5.header}>
                  <View style={styles5.headerLeft}>
                    <Text style={styles5.name}>
                      {cvData.name} {cvData.lastName}
                    </Text>
                    <Text style={styles5.title}>
                      {cvData.experience[0]?.puesto || "Profesional"}
                    </Text>
                  </View>
                  <View style={styles5.headerRight}>
                    {cvData.imagenPerfil && (
                      <Image
                        src={cvData.imagenPerfil}
                        style={styles5.profileImage}
                      />
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
                    <Text style={styles5.contactText}>
                      {cvData.ciudad}, {cvData.provincia}
                    </Text>
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
                    {cvData.licencia && (
                      <Text style={styles5.additionalInfoItem}>
                        Licencia de conducir
                      </Text>
                    )}
                    {cvData.movilidad && (
                      <Text style={styles5.additionalInfoItem}>
                        Vehículo propio
                      </Text>
                    )}
                    {cvData.incorporacion && (
                      <Text style={styles5.additionalInfoItem}>
                        Disponibilidad inmediata
                      </Text>
                    )}
                    {cvData.disponibilidad && (
                      <Text style={styles5.additionalInfoItem}>
                        Jornada: {cvData.disponibilidad}
                      </Text>
                    )}
                    {cvData.office && (
                      <Text style={styles5.additionalInfoItem}>
                        Microsoft Office
                      </Text>
                    )}
                  </View>
                </View>
              </Page>
            </Document>
          );
  }