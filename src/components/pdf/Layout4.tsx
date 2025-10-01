import type React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import type { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import type { TypeIAData } from "../PreviewCV";
import { styles4 } from "@/lib/stylePdf/style4";
import { getFontSize } from "@/lib/utils";

export const Layout4: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  const experiencia = cvData.experience.map((exp, index) => (
    <View
      key={`${index}-expericiance-`}
      style={[
        styles4.experienceEntry,
        { marginBottom: cvData.experience.length - 1 === index ? 15 : 10 },
      ]}
    >
      {exp.nombreEmpresa && (
        <Text
          style={[
            styles4.companyName,
            { fontSize: getFontSize(12, optionsPDF.contadorContent) },
          ]}
        >
          {exp.nombreEmpresa}
        </Text>
      )}
      <Text
        style={[
          styles4.jobTitle,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {exp.puesto}
      </Text>
      <Text
        style={[
          styles4.dateLocation,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} -{" "}
        {exp.anioFinExperiencia === "Actualidad"
          ? "Actualidad"
          : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}{" "}
        | {exp.zonaEmpresa}
      </Text>
      {iaData.descriptionWork && (
        <Text
          style={[
            styles4.description,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          • {iaData.descriptionWork.split("\n")[index]}
        </Text>
      )}
    </View>
  ));

  const educacion = cvData.education.map((educacion, index) => (
    <View
      key={`${index}-educacion-`}
      style={[
        styles4.educationEntry,
        { marginBottom: cvData.education.length - 1 === index ? 0 : 5 },
      ]}
    >
      <Text
        style={[
          styles4.institution,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {educacion.carrera} ({educacion.estado})
      </Text>
      {educacion.institucion && (
        <Text
          style={[
            styles4.degree,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          {educacion.institucion}
        </Text>
      )}
      <Text
        style={[
          styles4.dateLocation,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {`${educacion.mesInicioEducacion}/${educacion.anioInicioEducacion} - ${educacion.mesFinEducacion}/${educacion.anioFinEducacion}`}
      </Text>
    </View>
  ));

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={`curso-${index}`} style={styles4.educationEntry}>
      <Text
        style={[
          styles4.institution,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {curso.curso}
      </Text>
      {curso.institucion && (
        <Text
          style={[
            styles4.degree,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          {curso.institucion}
        </Text>
      )}
      <Text
        style={[
          styles4.dateLocation,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {curso.anioInicioCurso === "Actualidad"
          ? "Actualidad"
          : `${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
      </Text>
    </View>
  ));

  const cutname = (
    <Text
      style={[
        styles4.name,
        {
          fontSize: getFontSize(24, contador),
          marginBottom: optionsPDF.orientacionCVTitle ? 0 : 20,
        },
      ]}
    >
      {cvData.name.split(" ")[0]} {cvData.lastName.split(" ")[0]}
    </Text>
  );

  const fullname = (
    <Text
      style={[
        styles4.name,
        {
          fontSize: getFontSize(24, contador),
          marginBottom: optionsPDF.orientacionCVTitle ? 0 : 20,
        },
      ]}
    >
      {cvData.name} {cvData.lastName}
    </Text>
  );

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page
        size="A4"
        style={[
          styles4.page,
          { paddingBottom: optionsPDF.contadorContent > 1 ? 0 : 30 },
        ]}
      >
        <View>
          <Text style={styles4.nameBack}>{cvData.lastName}</Text>
        </View>
        <View style={styles4.container}>
          <View style={styles4.leftColumn}>
            {cvData.imagenPerfil && (
              <Image src={cvData.imagenPerfil} style={styles4.profileImage} />
            )}

            <View style={styles4.header}>
              <Text
                style={[
                  styles4.sectionTitle,
                  { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                ]}
              >
                DATOS
              </Text>
              <Text
                style={[
                  styles4.contactItem,
                  { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                ]}
              >
                {cvData.fechaNacimiento.split("-").reverse().join("/")}
              </Text>
              {cvData.dni && (
                <Text
                  style={[
                    styles4.contactItem,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  DNI: {cvData.dni}
                </Text>
              )}
              <Text
                style={[
                  styles4.contactItem,
                  { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                ]}
              >
                Tel: {cvData.phone}
              </Text>
              {cvData.email && (
                <Text
                  style={[
                    styles4.contactItem,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  {cvData.email}
                </Text>
              )}
              <Text
                style={[
                  styles4.contactItem,
                  {
                    fontSize: getFontSize(10, optionsPDF.contadorContent),
                    marginBottom: 0,
                  },
                ]}
              >
                {cvData.ciudad}, {cvData.provincia}
              </Text>
            </View>

            {cvData.cursos.length > 0 && (
              <View>
                <Text
                  style={[
                    styles4.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  CURSOS
                </Text>
                {optionsPDF.reverseEducation ? cursos.reverse() : cursos}
              </View>
            )}

            {iaData.skills && (
              <View>
                <Text
                  style={[
                    styles4.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  HABILIDADES
                </Text>
                {iaData.skills.split("•").map((skill, index) => (
                  <Text
                    key={index}
                    style={[
                      styles4.skillItem,
                      { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                    ]}
                  >
                    • {skill.trim()}
                  </Text>
                ))}
              </View>
            )}

            {cvData.idiomas.length > 0 && (
              <View>
                <Text
                  style={[
                    styles4.sectionTitle,
                    {
                      fontSize: getFontSize(14, optionsPDF.contadorContent),
                      marginVertical: 10,
                    },
                  ]}
                >
                  IDIOMAS
                </Text>
                {cvData.idiomas.map((idioma, index) => (
                  <Text
                    key={index}
                    style={[
                      styles4.languageItem,
                      { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                    ]}
                  >
                    •{" "}
                    {idioma.idioma.toLocaleLowerCase() == "ingles"
                      ? "inglés"
                      : idioma.idioma.charAt(0).toLocaleUpperCase() +
                        idioma.idioma.slice(1).toLocaleLowerCase()}
                    :{" "}
                    {idioma.nivel == "BASICO"
                      ? "Básico"
                      : idioma.nivel.charAt(0).toUpperCase() +
                        idioma.nivel.slice(1).toLowerCase()}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <View
            style={[
              styles4.rightColumn,
              {
                justifyContent: optionsPDF.spaceBetween
                  ? "space-between"
                  : "flex-start",
              },
            ]}
          >
            <View style={styles4.header}>
              {optionsPDF.fullName ? fullname : cutname}
              {cvData.orientadoCV && optionsPDF.orientacionCVTitle && (
                <Text
                  style={[
                    styles4.title,
                    { fontSize: getFontSize(14, contador), marginBottom: 0 },
                  ]}
                >
                  {cvData.orientadoCV}
                </Text>
              )}
            </View>

            {iaData.profile && (
              <View>
                <Text
                  style={[
                    styles4.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  PERFIL
                </Text>
                <Text
                  style={[
                    styles4.profileSummary,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  {iaData.profile}
                </Text>
              </View>
            )}

            {cvData.experience.length > 0 && (
              <View>
                <Text
                  style={[
                    styles4.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  EXPERIENCIA LABORAL
                </Text>
                {optionsPDF.reverseExperience
                  ? experiencia.reverse()
                  : experiencia}
              </View>
            )}

            {cvData.education.length > 0 && (
              <View>
                <Text
                  style={[
                    styles4.sectionTitle,
                    { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                  ]}
                >
                  EDUCACIÓN
                </Text>
                {optionsPDF.reverseCursos ? educacion.reverse() : educacion}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
