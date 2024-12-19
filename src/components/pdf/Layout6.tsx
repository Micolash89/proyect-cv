import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { TypeIAData } from "../PreviewCV";
import { styles6 } from "@/lib/stylePdf/style6";
import { getFontSize } from "@/lib/utils";

export const Layout6: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
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
          <View style={styles6.headerColumn}>
            <Text
              style={[styles6.name, { fontSize: getFontSize(30, contador) }]}
            >
              {cvData.name} {cvData.lastName}
            </Text>
            
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <View style={styles6.headerCenter}>
           
                <Text
                  style={[
                    styles6.contactLabel,
                    { marginTop: "auto", fontSize: getFontSize(10, contador) },
                  ]}
                >
                  Fecha de Nacimiento:
                </Text>
                <Text
                  style={[
                    styles6.contactValue,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  {cvData.fechaNacimiento.split("-").reverse().join("/")}
                </Text>

                <Text
                  style={[
                    styles6.contactLabel,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  Teléfono:
                </Text>
                <Text
                  style={[
                    styles6.contactValue,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  {cvData.phone}
                </Text>
            
            </View>
            <View style={styles6.headerRight}>
              {/* <Text style={styles6.profileText}>{iaData.profile}</Text> */}

              <Text
                style={[
                  styles6.contactLabel,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                Correo electrónico:
              </Text>
              <Text
                style={[
                  styles6.contactValue,
                  { fontSize: getFontSize(10, contador) },
                ]}
                wrap={true}
              >
                {cvData.email}
              </Text>

              <Text
                style={[
                  styles6.contactLabel,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                Dirección:
              </Text>
              <Text
                style={[
                  styles6.contactValue,
                  { fontSize: getFontSize(10, contador) },
                ]}
                wrap={true}
              >
                {cvData.ciudad}, {cvData.provincia}
              </Text>
            </View>
            </View>
          </View>
        </View>

        {/* Professional Profile */}
        <View
          style={[
            styles6.content,
            {
              justifyContent: optionsPDF.spaceBetween
                ? 'space-between'
                : 'flex-start',
            },
          ]}
        >
          <View>
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
                  <Text style={[styles6.timelineSubtitle, { width: 150 }]}>
                    {exp.nombreEmpresa}
                  </Text>
                  <View style={styles6.timelineDot} />
                  <View style={styles6.timelineContent}>
                    <Text style={styles6.timelineTitle}>
                      {exp.puesto} | {exp.anioInicioExperiencia} -{" "}
                      {exp.anioFinExperiencia}
                    </Text>
                    <Text style={styles6.timelineDescription}>
                      {iaData.descriptionWork.split("\n")[index]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          </View>

          {/* Education */}
          <View>
            <Text style={styles6.sectionTitle}>Educación</Text>
            <View style={styles6.timelineContainer}>
              {cvData.education.map((edu, index) => (
                <View key={index} style={styles6.timelineEntry}>
                  <Text style={[styles6.timelineDate, { width: 150 }]}>
                    {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                  </Text>
                  <View style={styles6.timelineDot} />
                  <View style={styles6.timelineContent}>
                    <Text style={styles6.timelineTitle}>{edu.carrera}</Text>
                    <Text style={styles6.timelineSubtitle}>
                      {edu.institucion}
                    </Text>
                  </View>
                </View>
              ))}
              <Text style={styles6.sectionTitle}>Cursos</Text>
              {cvData.cursos.map((curso, index) => (
                <View key={`curso-${index}`} style={styles6.timelineEntry}>
                  <Text style={[styles6.timelineDate, { width: 150 }]}>
                    {curso.anioInicioCurso}
                  </Text>
                  <View style={styles6.timelineDot} />
                  <View style={styles6.timelineContent}>
                    <Text style={styles6.timelineTitle}>{curso.curso}</Text>
                    <Text style={styles6.timelineSubtitle}>
                      {curso.institucion}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Additional Info and Languages */}
          <View style={styles6.twoColumnSection}>
            <View style={styles6.column}>
              <Text style={[styles6.sectionTitle, { borderTop: "none" }]}>
                Información adicional
              </Text>
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
            <View
              style={[
                styles6.column,
                { borderLeft: "1 solid #EAEAEA", paddingLeft: 15 },
              ]}
            >
              <Text style={[styles6.sectionTitle, { borderTop: "none" }]}>
                Idiomas
              </Text>
              {cvData.idiomas.map((idioma, index) => (
                <View key={index} style={styles6.languageItem}>
                  <Text style={styles6.languageName}>{idioma.idioma}:</Text>
                  <Text style={styles6.languageLevel}>
                    {idioma.nivel === "BASICO"
                      ? "Básico"
                      : idioma.nivel.charAt(0).toLocaleUpperCase() +
                        idioma.nivel.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
