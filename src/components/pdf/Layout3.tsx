import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { TypeIAData } from "../PreviewCV";
import { styles3 } from "@/lib/stylePdf/style3";
import { getFontSize } from "@/lib/utils";

export const Layout3: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  const experiencia = cvData.experience.map((exp, index) => (
    <View key={index} style={styles3.experienceItem}>
      <View style={styles3.experienceHeader}>
        {exp.nombreEmpresa && <Text
          style={[
            styles3.companyName,
            { fontSize: getFontSize(12, optionsPDF.contadorContent) },
          ]}
        >
          {exp.nombreEmpresa}
        </Text>}
        <Text style={styles3.dateLocation}>
          {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} -{" "}
          {exp.anioFinExperiencia == "Actualidad"
            ? "Actualidad"
            : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
        </Text>
      </View>
      <Text
        style={[
          styles3.jobTitle,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {exp.puesto}
      </Text>
      {exp.zonaEmpresa && <Text
        style={[
          styles3.locationText,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {exp.zonaEmpresa}
      </Text>}
      {iaData.descriptionWork && <Text
        style={[
          styles3.description,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        • {iaData.descriptionWork.split("\n")[index]}
      </Text>}
    </View>
  ));

  const educacion = cvData.education.map((edu, index) => (
    <View key={index} style={[styles3.educationItem, { marginBottom: index === (cvData.education.length - 1) ? 0 : 10 }]}>
      <View style={styles3.educationHeader}>
        {edu.institucion && <Text
          style={[
            styles3.institutionName,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {edu.institucion}
        </Text>}
        <Text style={styles3.dateLocation}>
          {edu.mesInicioEducacion}/{edu.anioInicioEducacion} -{" "}
          {edu.anioFinEducacion == "Actualidad"
            ? "Actualidad"
            : `${edu.mesFinEducacion}/${edu.anioFinEducacion}`}
        </Text>
      </View>
      <Text
        style={[
          styles3.degree,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {edu.carrera} ({edu.estado})
      </Text>
      {edu.zonaInstitucion && <Text
        style={[
          styles3.locationText,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {edu.zonaInstitucion}
      </Text>}
    </View>
  ));

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={index} style={styles3.languageItem}>
      <Text
        style={[
          styles3.languageName,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {curso.curso}
      </Text>
      {curso.institucion && <Text
        style={[
          styles3.languageLevel,
          { fontSize: getFontSize(9, optionsPDF.contadorContent) },
        ]}
      >
        {curso.institucion}
      </Text>}
      <Text
        style={[
          styles3.languageLevel,
          { fontSize: getFontSize(9, optionsPDF.contadorContent) },
        ]}
      >
        {curso.anioInicioCurso == "Actualidad"
          ? "Actualidad"
          : `${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
      </Text>
    </View>
  ));

  const cutName = (
    <Text style={[styles3.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name.split(" ")[0]} {cvData.lastName.split(" ")[0]}
    </Text>
  );

  const fullName = (
    <Text style={[styles3.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name} {cvData.lastName}
    </Text>
  );

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page size="A4" style={styles3.page}>
        <View style={styles3.header}>
          {cvData.imagenPerfil && (
            <Image src={cvData.imagenPerfil} style={styles3.profileImage} />
          )}
          <View style={styles3.headerContent}>
            {optionsPDF.fullName ? fullName : cutName}
            <Text
              style={[styles3.title, { fontSize: getFontSize(16, contador) }]}
            >
              {optionsPDF.orientacionCVTitle ? cvData.orientadoCV : ""}
            </Text>
          </View>
        </View>

        <View style={[styles3.container, { paddingVertical: 0 }]}>
          <View style={styles3.leftColumn}>
            <View style={styles3.section}>
              <Text
                style={[
                  styles3.sectionTitle,
                  { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                ]}
              >
                INFORMACIÓN
              </Text>
              <View style={styles3.contactItem}>
                <Text
                  style={[
                    styles3.contactText,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  {cvData.fechaNacimiento.split("-").reverse().join("/")}
                </Text>
                {cvData.dni && (
                  <Text
                    style={[
                      styles3.contactText,
                      { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                    ]}
                  >
                    DNI: {cvData.dni}
                  </Text>
                )}
                <Text
                  style={[
                    styles3.contactText,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  Tel: {cvData.phone}
                </Text>
                {cvData.email && (
                  <Text
                    style={[
                      styles3.contactText,
                      { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                    ]}
                  >
                    {cvData.email}
                  </Text>
                )}
                {(cvData.ciudad || cvData.provincia) && (
                  <Text
                    style={[
                      styles3.contactText,
                      { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                    ]}
                  >
                    {cvData.ciudad}, {cvData.provincia}
                  </Text>
                )}
              </View>
            </View>

            {iaData.skills && (
              <View style={styles3.section}>
                <Text
                  style={[
                    styles3.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  HABILIDADES
                </Text>
                {iaData.skills.split("•").map((skill, index) => (
                  <Text
                    key={index}
                    style={[
                      styles3.skillItem,
                      { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                    ]}
                  >
                    • {skill.trim()}
                  </Text>
                ))}
              </View>
            )}

            {cvData.idiomas.length > 0 && (
              <View style={styles3.section}>
                <Text
                  style={[
                    styles3.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  LENGUAJES
                </Text>
                {cvData.idiomas.map((idioma, index) => (
                  <View key={index} style={styles3.languageItem}>
                    <Text
                      style={[
                        styles3.languageName,
                        {
                          fontSize: getFontSize(10, optionsPDF.contadorContent),
                        },
                      ]}
                    >
                      {idioma.idioma}
                    </Text>
                    <Text
                      style={[
                        styles3.languageLevel,
                        {
                          fontSize: getFontSize(9, optionsPDF.contadorContent),
                        },
                      ]}
                    >
                      {idioma.nivel}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {cvData.cursos.length > 0 && (
              <View style={styles3.section}>
                <Text
                  style={[
                    styles3.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  CURSOS
                </Text>
                {optionsPDF.reverseCursos ? cursos.reverse() : cursos}
              </View>
            )}
          </View>

          <View style={styles3.rightColumn}>
            {iaData.profile && (
              <View style={styles3.section}>
                <Text
                  style={[
                    styles3.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  PERFIL
                </Text>
                <Text
                  style={[
                    styles3.profileText,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  {iaData.profile}
                </Text>
              </View>
            )}

            {cvData.experience.length > 0 && (
              <View style={styles3.section}>
                <Text
                  style={[
                    styles3.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  EXPERIENCIA
                </Text>
                {optionsPDF.reverseExperience
                  ? experiencia.reverse()
                  : experiencia}
              </View>
            )}

            {cvData.education.length > 0 && (
              <View style={[styles3.section, {marginBottom: 0}]}>
                <Text
                  style={[
                    styles3.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  EDUCACIÓN
                </Text>
                {optionsPDF.reverseEducation ? educacion.reverse() : educacion}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
