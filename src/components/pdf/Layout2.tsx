import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { TypeIAData } from "../PreviewCV";
import { styles2 } from "@/lib/stylePdf/style2";
import { getFontSize } from "@/lib/utils";

export const Layout2: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={[
          styles2.page,
          {
            fontSize: getFontSize(
              11,
              getFontSize(12, optionsPDF.contadorContent)
            ),
          },
        ]}
      >
        {/* Left Column */}
        <View
          style={[styles2.leftColumn, { backgroundColor: optionsPDF.color }]}
        >
          {cvData.imagenPerfil && (
            <Image src={cvData.imagenPerfil} style={styles2.profileImage} />
          )}
          {(cvData.name || cvData.lastName) && (
            <Text
              style={[styles2.name, { fontSize: getFontSize(24, contador) }]}
            >
              {cvData.name.split(" ").join("\n")} {cvData.lastName}
            </Text>
          )}
          <View style={[styles2.contactInfo]}>
            {cvData.fechaNacimiento && (
              <Text
                style={[
                  styles2.contactItem,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                {cvData.fechaNacimiento.split("-").reverse().join("/")}
              </Text>
            )}
            {cvData.dni && (
              <Text
                style={[
                  styles2.contactItem,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                DNI: {cvData.dni}
              </Text>
            )}
            {cvData.phone && (
              <Text
                style={[
                  styles2.contactItem,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                Tel: {cvData.phone}
              </Text>
            )}
            {cvData.email && (
              <Text
                style={[
                  styles2.contactItem,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                {cvData.email}
              </Text>
            )}
            {cvData.ciudad && (
              <Text
                style={[
                  styles2.contactItem,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                {cvData.ciudad}, {cvData.provincia}
              </Text>
            )}
          </View>
          {iaData.skills && (
            <Text
              style={[
                styles2.sectionTitle,
                {
                  color: optionsPDF.color == "#34495E" ? "#a3a3a3" : "#FFFFFF",
                  borderBottom:
                    `1 solid ${optionsPDF.color == "#34495E"
                      ? "#A3A3A3"
                      : "#FFFFFF"}`,
                  fontSize: getFontSize(16, contador),
                },
              ]}
            >
              Habilidades
            </Text>
          )}
          {iaData.skills && (
            <View style={styles2.skills}>
              {iaData.skills.split("•").map((skill, index) => (
                <Text key={index} style={[styles2.skill,{backgroundColor: optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080"}]}>
                  {skill.trim()}
                </Text>
              ))}
            </View>
          )}
          {cvData.idiomas && (
            <Text
              style={[
                styles2.sectionTitle,
                {
                  color: optionsPDF.color == "#34495E" ? "#a3a3a3" : "#FFFFFF",
                  borderBottom:
                    `1 solid ${optionsPDF.color == "#34495E"
                      ? "#A3A3A3"
                      : "#FFFFFF"}`,
                  fontSize: getFontSize(16, contador),
                },
              ]}
            >
              Idiomas
            </Text>
          )}
          {cvData.idiomas.map((idioma, index) => (
            <Text
              key={index}
              style={[
                styles2.contactItem,
                { fontSize: getFontSize(10, contador) },
              ]}
            >
              {idioma.idioma.charAt(0).toUpperCase() +
                idioma.idioma.slice(1).toLowerCase()}{" "}
              -{" "}
              {idioma.nivel == "BASICO"
                ? "Básico"
                : idioma.nivel.charAt(0).toUpperCase() +
                  idioma.nivel.slice(1).toLowerCase()}
            </Text>
          ))}
          {(cvData.licencia ||
            cvData.movilidad ||
            cvData.incorporacion ||
            cvData.disponibilidad ||
            cvData.office) && (
            <Text
              style={[
                styles2.sectionTitle,
                {
                  color: optionsPDF.color == "#34495E" ? "#a3a3a3" : "#FFFFFF",
                  borderBottom:
                    `1 solid ${optionsPDF.color == "#34495E"
                      ? "#A3A3A3"
                      : "#FFFFFF"}`,
                  fontSize: getFontSize(16, contador),
                },
              ]}
            >
              Información Adicional
            </Text>
          )}
          {cvData.licencia && (
            <Text
              style={[
                styles2.contactItem,
                { fontSize: getFontSize(10, contador) },
              ]}
            >
              Licencia de conducir
            </Text>
          )}
          {cvData.movilidad && (
            <Text
              style={[
                styles2.contactItem,
                { fontSize: getFontSize(10, contador) },
              ]}
            >
              Vehículo propio
            </Text>
          )}
          {cvData.incorporacion && (
            <Text
              style={[
                styles2.contactItem,
                { fontSize: getFontSize(10, contador) },
              ]}
            >
              Disponibilidad inmediata
            </Text>
          )}
          {cvData.disponibilidad && (
            <Text
              style={[
                styles2.contactItem,
                { fontSize: getFontSize(10, contador) },
              ]}
            >
              Jornada: {cvData.disponibilidad}
            </Text>
          )}
          {cvData.office && (
            <Text
              style={[
                styles2.contactItem,
                { fontSize: getFontSize(10, contador) },
              ]}
            >
              Microsoft Office
            </Text>
          )}
        </View>

        {/* Right Column */}
        <View style={styles2.rightColumn}>
          {iaData.profile && (
            <View>
              <Text
                style={[
                  styles2.sectionTitle,
                  {
                    color:
                      optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                    borderBottom:
                      `1 solid ${optionsPDF.color == "#34495E"
                        ? "#A3A3A3"
                        : "#808080"}`,
                    fontSize: getFontSize(16, optionsPDF.contadorContent),
                  },
                ]}
              >
                Perfil
              </Text>
              <Text style={[styles2.description, { textAlign: "justify" }]}>
                {iaData.profile}
              </Text>
            </View>
          )}
          {cvData.experience.length > 0 && (
            <Text
              style={[
                styles2.sectionTitle,
                {
                  color: optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                  borderBottom:
                    `1 solid ${optionsPDF.color == "#34495E"
                      ? "#A3A3A3"
                      : "#808080"}`,
                  fontSize: getFontSize(16, optionsPDF.contadorContent),
                },
              ]}
            >
              Experiencia Profesional
            </Text>
          )}
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
          {cvData.education.length > 0 && (
            <Text
              style={[
                styles2.sectionTitle,
                {
                  color: optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                  borderBottom:
                    `1 solid ${optionsPDF.color == "#34495E"
                      ? "#A3A3A3"
                      : "#808080"}`,
                  fontSize: getFontSize(16, optionsPDF.contadorContent),
                },
              ]}
            >
              Educación
            </Text>
          )}
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

          {cvData.cursos.length > 0 && (
            <Text
              style={[
                styles2.sectionTitle,
                {
                  color: optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                  borderBottom:
                    `1 solid ${optionsPDF.color == "#34495E"
                      ? "#A3A3A3"
                      : "#808080"}`,
                  fontSize: getFontSize(16, optionsPDF.contadorContent),
                },
              ]}
            >
              Certificaciones
            </Text>
          )}
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
};
