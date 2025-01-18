import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { TypeIAData } from "../PreviewCV";
import { styles as stylesDefault } from "@/lib/stylePdf/styleDefault";

export const Layout0: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {

  const experiencia = cvData.experience.map((exp, index) => (
    <View key={index} style={stylesDefault.entryContainer}>
      <View style={stylesDefault.entryHeader}>
        <Text
          style={[
            stylesDefault.institution,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {exp.nombreEmpresa}
        </Text>
        <Text
          style={[
            stylesDefault.location,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {exp.zonaEmpresa}
        </Text>
      </View>
      <View style={stylesDefault.entryHeader}>
        <Text
          style={[
            stylesDefault.degree,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {exp.puesto}
        </Text>
        <Text
          style={[
            stylesDefault.dates,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {exp.mesInicioExperiencia}/{ exp.anioInicioExperiencia} - {exp.anioFinExperiencia === "Actualidad" ? "Actualidad" : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
        </Text>
      </View>
      <Text
        style={[
          stylesDefault.description,
          { fontSize: 11 + optionsPDF.contadorContent },
        ]}
      >
        • {iaData.descriptionWork.split("\n")[index]}
      </Text>
    </View>
  ));

  const educacion = cvData.education.map((edu, index) => (
    <View key={index} style={stylesDefault.entryContainer}>
      <View style={stylesDefault.entryHeader}>
        <Text
          style={[
            stylesDefault.institution,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {edu.institucion}
        </Text>
        <Text
          style={[
            stylesDefault.location,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {edu.zonaInstitucion}
        </Text>
      </View>
      <View style={stylesDefault.entryHeader}>
        <Text
          style={[
            stylesDefault.degree,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {edu.carrera} ({edu.estado.toLowerCase()})
        </Text>
        <Text
          style={[
            stylesDefault.dates,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {edu.mesInicioEducacion}/{ edu.anioInicioEducacion} - {edu.mesFinEducacion}/{edu.anioFinEducacion}
        </Text>
      </View>
    </View>
  ));

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={index} style={stylesDefault.entryContainer}>
      <View style={stylesDefault.entryHeader}>
        <Text
          style={[
            stylesDefault.institution,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          • {curso.curso}
        </Text>
        <Text
          style={[
            stylesDefault.location,
            {
              fontSize: 11 + optionsPDF.contadorContent,
              fontStyle: "italic",
            },
          ]}
        >
          {curso.anioInicioCurso=="Actualidad"?"Actualidad":`${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
          
        </Text>
      </View>

      <View style={stylesDefault.entryHeader}>
        <Text
          style={[
            stylesDefault.degree,
            { fontSize: 11 + optionsPDF.contadorContent },
          ]}
        >
          {curso.institucion}
        </Text>
      </View>
    </View>
  ));

  const cutName = (
    <Text
      style={[
        stylesDefault.name,
        {
          fontSize: 24 + contador,
          marginTop: 10,
          marginBottom: 15,
        },
      ]}
    >
      {cvData.name.split(" ")[0]} {cvData.lastName.split(" ")[0]}
    </Text>
  );

  const fullName = (
    <Text
      style={[
        stylesDefault.name,
        {
          fontSize: 24 + contador,
          marginTop: 10,
          marginBottom: 15,
        },
      ]}
    >
      {cvData.name} {cvData.lastName}
    </Text>
  );

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page
        size="A4"
        style={[
          stylesDefault.page,
          { padding: 45 - (contador <= 5 ? contador * 5 : 25) },
        ]}
      >
        {/* Header */}
        <View style={stylesDefault.header}>
          {optionsPDF.fullName ? fullName : cutName}

          <Text
            style={[stylesDefault.contactInfo, { fontSize: 11 + contador }]}
          >
            {cvData.ciudad}, {cvData.provincia}{" "}
            {cvData.dni && `• DNI:${cvData.dni}`} •{" "}
            {cvData.fechaNacimiento.split("-").reverse().join("/")} • Tel.:
            {cvData.phone}
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
                  fontSize: 10.5 + optionsPDF.contadorContent,
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
                { fontSize: 14 + optionsPDF.contadorContent },
              ]}
            >
              EDUCACIÓN
            </Text>
            {optionsPDF.reverseEducation ? educacion.reverse() : educacion}
          </View>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <View>
            <Text
              style={[
                stylesDefault.sectionTitle,
                { fontSize: 14 + optionsPDF.contadorContent },
              ]}
            >
              EXPERIENCIA PROFESIONAL
            </Text>
            {optionsPDF.reverseExperience ? experiencia.reverse() : experiencia}
          </View>
        )}

        {/* Certifications */}
        {cvData.cursos.length > 0 && (
          <View>
            <Text
              style={[
                stylesDefault.sectionTitle,
                { fontSize: 14 + optionsPDF.contadorContent },
              ]}
            >
              CERTIFICACIONES
            </Text>
            {optionsPDF.reverseCursos ? cursos.reverse() : cursos}
          </View>
        )}

        {/* Skills */}
        {iaData.skills && (
          <View>
            <Text
              style={[
                stylesDefault.sectionTitle,
                { fontSize: 14 + optionsPDF.contadorContent },
              ]}
            >
              HABILIDADES
            </Text>
            <View style={[stylesDefault.description, { textAlign: "center" }]}>
              <Text
                wrap={true}
                style={{ fontSize: 11 + optionsPDF.contadorContent }}
              >
                {iaData.skills.split("•").map((skill, index) => (
                  <React.Fragment key={index}>{" • " + skill}</React.Fragment>
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
                { fontSize: 14 + optionsPDF.contadorContent },
              ]}
            >
              INFORMACIÓN ADICIONAL
            </Text>
            <Text
              style={[
                stylesDefault.description,
                {
                  fontSize: 11 + optionsPDF.contadorContent,
                  textAlign: "center",
                },
              ]}
            >
              {[
                cvData.licencia && "Licencia de conducir",
                cvData.movilidad && "Vehículo propio",
                cvData.incorporacion && "Disponibilidad inmediata",
                cvData.disponibilidad && cvData.disponibilidad!="NINGUNO" && `Jornada: ${cvData.disponibilidad}`,
                cvData.office && "Microsoft Office",
                ...cvData.idiomas.map(
                  (idioma) => `${idioma.idioma} - ${idioma.nivel.toLowerCase()}`
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
};
