import { CVDataPdf, OptionsPDF } from '@/lib/definitions';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { TypeIAData } from '../PreviewCV';
import { styles2 } from '@/lib/stylePdf/style2';

export const Layout2: React.FC<{
    cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: OptionsPDF;
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
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
                    <Text style={styles2.contactItem}>
                      {cvData.fechaNacimiento.split("-").reverse().join("/")}
                    </Text>
                    {cvData.dni && (
                      <Text style={styles2.contactItem}>DNI: {cvData.dni}</Text>
                    )}
                    <Text style={styles2.contactItem}>Tel: {cvData.phone}</Text>
                    <Text style={styles2.contactItem}>{cvData.email}</Text>
                    <Text style={styles2.contactItem}>
                      {cvData.ciudad}, {cvData.provincia}
                    </Text>
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
  }