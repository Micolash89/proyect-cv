import { CVDataPdf } from '@/lib/definitions';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { TypeIAData } from '../PreviewCV';
import { styles7 } from '@/lib/stylePdf/style7';

export const Layout7: React.FC<{
    cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: { color: string; spaceBetween: boolean; tipoPdf: number };
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
    return (
        <Document>
          <Page
            size="A4"
            style={[
              styles7.page,
              { padding: contador <= 5 ? 45 - contador * 5 : 20 },
            ]}
          >
            {/* Header */}
            {cvData.name && (
              <View style={styles7.header}>
                <Text style={styles7.name}>{cvData.name} {cvData.lastName}</Text>
              </View>
            )}
            {/* Left Column */}
            <View style={styles7.leftColumn}>
              {cvData.imagenPerfil && (
                <Image src={cvData.imagenPerfil} style={styles7.profileImage} />
              )}
              <View style={styles7.contactInfo}>
                <Text>{cvData.email}</Text>
                <Text>{cvData.phone}</Text>
                <Text>{cvData.ciudad}, {cvData.provincia}</Text>
              </View>
    
              <Text style={styles7.sectionTitle}>Habilidades</Text>
              {iaData.skills &&
                iaData.skills.split("•").map((skill, index) => (
                  <Text key={index} style={styles7.skillItem}>
                    • {skill.trim()}
                  </Text>
                ))}
    
              <Text style={styles7.sectionTitle}>Idiomas</Text>
              {cvData.idiomas.map((idioma, index) => (
                <Text key={index} style={styles7.skillItem}>
                  • {idioma.idioma}: {idioma.nivel}
                </Text>
              ))}
    
              <Text style={styles7.sectionTitle}>Información Adicional</Text>
              {cvData.licencia && (
                <Text style={styles7.skillItem}>• Licencia de conducir</Text>
              )}
              {cvData.movilidad && (
                <Text style={styles7.skillItem}>• Vehículo propio</Text>
              )}
              {cvData.incorporacion && (
                <Text style={styles7.skillItem}>• Disponibilidad inmediata</Text>
              )}
              {cvData.disponibilidad && (
                <Text style={styles7.skillItem}>• Jornada: {cvData.disponibilidad}</Text>
              )}
              {cvData.office && <Text style={styles7.skillItem}>• Microsoft Office</Text>}
            </View>
    
            {/* Right Column */}
            <View style={styles7.rightColumn}>
              <Text style={styles7.sectionTitle}>Perfil</Text>
              <Text>{iaData.profile}</Text>
    
              <Text style={styles7.sectionTitle}>Experiencia Profesional</Text>
              {cvData.experience.map((exp, index) => (
                <View key={index} style={styles7.entryContainer}>
                  <Text style={styles7.entryTitle}>{exp.puesto}</Text>
                  <Text style={styles7.entrySubtitle}>
                    {exp.nombreEmpresa}, {exp.zonaEmpresa}
                  </Text>
                  <Text style={styles7.entryDates}>
                    {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                  </Text>
                  <Text>• {iaData.descriptionWork.split("\n")[index]}</Text>
                </View>
              ))}
    
              <Text style={styles7.sectionTitle}>Educación</Text>
              {cvData.education.map((edu, index) => (
                <View key={index} style={styles7.entryContainer}>
                  <Text style={styles7.entryTitle}>{edu.carrera}</Text>
                  <Text style={styles7.entrySubtitle}>
                    {edu.institucion}, {edu.zonaInstitucion}
                  </Text>
                  <Text style={styles7.entryDates}>
                    {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                  </Text>
                  <Text>Estado: {edu.estado}</Text>
                </View>
              ))}
    
              <Text style={styles7.sectionTitle}>Certificaciones</Text>
              {cvData.cursos.map((curso, index) => (
                <View key={index} style={styles7.entryContainer}>
                  <Text style={styles7.entryTitle}>{curso.curso}</Text>
                  <Text style={styles7.entrySubtitle}>{curso.institucion}</Text>
                  <Text style={styles7.entryDates}>{curso.anioInicioCurso}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      );
  }