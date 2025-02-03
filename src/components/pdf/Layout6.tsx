import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { TypeIAData } from "../PreviewCV";
import { styles6 } from "@/lib/stylePdf/style6";
import { getFontSize } from "@/lib/utils";

export const Layout6: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {

  const experiencia = (cvData.experience.map((exp, index) => (
    <View key={index} style={styles6.timelineEntry}>
      {exp.nombreEmpresa &&<Text
        style={[
          styles6.timelineSubtitle,
          {
            fontSize: getFontSize(
              10,
              optionsPDF.contadorContent
            ),
            width: 150,
          },
        ]}
      >
        {exp.nombreEmpresa}
      </Text>}
      <View style={styles6.timelineDot} />
      <View style={styles6.timelineContent}>
        <Text
          style={[
            styles6.timelineTitle,
            {
              fontSize: getFontSize(
                11,
                optionsPDF.contadorContent
              ),
            },
          ]}
        >
          {exp.puesto} | {exp.mesFinExperiencia}/{exp.anioInicioExperiencia} -{" "}
          {exp.anioFinExperiencia=="Actualidad"?"Actualidad":`${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
        </Text>
        {iaData.descriptionWork &&<Text
          style={[
            styles6.timelineDescription,
            {
              fontSize: getFontSize(
                10,
                optionsPDF.contadorContent
              ),
            },
          ]}
        >
          {iaData.descriptionWork.split("\n")[index]}
        </Text>}
      </View>
    </View>
  )));

  const educacion = (cvData.education.map((edu, index) => (
    <View key={index} style={styles6.timelineEntry}>
      <Text
        style={[
          styles6.timelineDate,
          {
            fontSize: getFontSize(10, optionsPDF.contadorContent),
            width: 150,
          },
        ]}
      >
        {edu.mesInicioEducacion}/{edu.anioInicioEducacion} - {edu.mesFinEducacion}/{edu.anioFinEducacion}
      </Text>
      <View style={styles6.timelineDot} />
      <View style={styles6.timelineContent}>
        <Text
          style={[
            styles6.timelineTitle,
            {
              fontSize: getFontSize(11, optionsPDF.contadorContent),
            },
          ]}
        >
          {edu.carrera}
        </Text>
        {edu.institucion && <Text
          style={[
            styles6.timelineSubtitle,
            {
              fontSize: getFontSize(10, optionsPDF.contadorContent),
            },
          ]}
        >
          {edu.institucion}
        </Text>}
      </View>
    </View>
  )));

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={`curso-${index}`} style={styles6.timelineEntry}>
      <Text
        style={[
          styles6.timelineDate,
          {
            fontSize: getFontSize(10, optionsPDF.contadorContent),
            width: 150,
          },
        ]}
      >
        {curso.anioInicioCurso=="Actualidad"?"Actualidad":`${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
      </Text>
      <View style={styles6.timelineDot} />
      <View style={styles6.timelineContent}>
        <Text
          style={[
            styles6.timelineTitle,
            {
              fontSize: getFontSize(11, optionsPDF.contadorContent),
            },
          ]}
        >
          {curso.curso}
        </Text>
        {curso.institucion && <Text
          style={[
            styles6.timelineSubtitle,
            {
              fontSize: getFontSize(10, optionsPDF.contadorContent),
            },
          ]}
        >
          {curso.institucion}
        </Text>}
      </View>
    </View>
  ));

  const cutName = ( <Text
    style={[styles6.name, { fontSize: getFontSize(24, contador) }]}
  >
    {cvData.name.split(" ")[0]} {cvData.lastName.split(" ")[0]}
  </Text>);

  const fullName = ( <Text
    style={[styles6.name, { fontSize: getFontSize(24, contador) }]}
  >
    {cvData.name} {cvData.lastName}
  </Text>);

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page
        size="A4"
        style={[styles6.page, { fontSize: getFontSize(11, contador) }]}
      >
        <View style={styles6.header}>
          <View style={styles6.headerLeft}>
            {cvData.imagenPerfil && (
              <Image src={cvData.imagenPerfil} style={styles6.profileImage} />
            )}
          </View>
          <View style={styles6.headerColumn}>
            {(cvData.name || cvData.lastName) && (
            optionsPDF.fullName ? fullName : cutName
            )}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles6.headerCenter}>
                {cvData.fechaNacimiento && (
                  <Text
                    style={[
                      styles6.contactLabel,
                      {
                        marginTop: "auto",
                        fontSize: getFontSize(10, contador),
                      },
                    ]}
                  >
                    Fecha de Nacimiento:
                  </Text>
                )}
                {cvData.fechaNacimiento && (
                  <Text
                    style={[
                      styles6.contactValue,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    {cvData.fechaNacimiento.split("-").reverse().join("/")}
                  </Text>
                )}

                {cvData.phone && (
                  <Text
                    style={[
                      styles6.contactLabel,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    Teléfono:
                  </Text>
                )}
                {cvData.phone && (
                  <Text
                    style={[
                      styles6.contactValue,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    {cvData.phone}
                  </Text>
                )}

                {cvData.dni && (
                  <Text
                    style={[
                      styles6.contactLabel,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    DNI:
                  </Text>
                )}
                {cvData.dni && (
                  <Text
                    style={[
                      styles6.contactValue,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    {cvData.dni}
                  </Text>
                )}
              </View>
              <View style={styles6.headerRight}>
                {cvData.email && (
                  <Text
                    style={[
                      styles6.contactLabel,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    Correo electrónico:
                  </Text>
                )}
                {cvData.email && (
                  <Text
                    style={[
                      styles6.contactValue,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                    wrap={true}
                  >
                    {cvData.email}
                  </Text>
                )}

                {cvData.ciudad && (
                  <Text
                    style={[
                      styles6.contactLabel,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    Dirección:
                  </Text>
                )}
                {(cvData.ciudad || cvData.provincia) && (
                  <Text
                    style={[
                      styles6.contactValue,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                    wrap={true}
                  >
                    {cvData.ciudad}, {cvData.provincia}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View
          style={[
            styles6.content,
            {
              justifyContent: optionsPDF.spaceBetween
                ? "space-between"
                : "flex-start",
            },
          ]}
        >
          <View>
            {iaData.profile && (
              <View>
                <Text
                  style={[
                    styles6.sectionTitle,
                    { fontSize: getFontSize(16, optionsPDF.contadorContent) },
                  ]}
                >
                  Perfil profesional
                </Text>
                <Text
                  style={[
                    styles6.profileText,
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
                    styles6.sectionTitle,
                    { fontSize: getFontSize(16, optionsPDF.contadorContent) },
                  ]}
                >
                  Experiencia de trabajo
                </Text>
                <View style={styles6.timelineContainer}>
                  {optionsPDF.reverseExperience? experiencia.reverse() : experiencia}
                </View>
              </View>
            )}
          </View>

          <View>
            {cvData.education.length > 0 && (
              <Text
                style={[
                  styles6.sectionTitle,
                  { fontSize: getFontSize(16, optionsPDF.contadorContent) },
                ]}
              >
                Educación
              </Text>
            )}
            <View style={styles6.timelineContainer}>
              {optionsPDF.reverseEducation? educacion.reverse() : educacion}
              {cvData.cursos.length > 0 && (
                <Text
                  style={[
                    styles6.sectionTitle,
                    { fontSize: getFontSize(16, optionsPDF.contadorContent) },
                  ]}
                >
                  Cursos
                </Text>
              )}
              {optionsPDF.reverseCursos? cursos.reverse() : cursos}
            </View>
          </View>

          {iaData.skills && (
            <View style={{ width: "100%" }}>
              <Text
                style={[
                  styles6.sectionTitle,
                  { fontSize: getFontSize(16, optionsPDF.contadorContent) },
                ]}
              >
                Habilidades
              </Text>
              <View style={styles6.skills}>
                {iaData.skills.split("•").map((skill, index) => (
                  <Text
                    key={index}
                    style={[
                      {
                        fontSize: getFontSize(10, contador),
                        textAlign: "center",
                      },
                    ]}
                  >
                    {skill.trim()}
                    <Text style={{ color: "#EAEAEA" }}>{" • "}</Text>
                  </Text>
                ))}
              </View>
            </View>
          )}

          <View style={styles6.twoColumnSection}>
            {(cvData.licencia ||
              cvData.movilidad ||
              cvData.incorporacion ||
              cvData.disponibilidad ||
              cvData.office) && (
              <View style={styles6.column}>
                <Text
                  style={[
                    styles6.sectionTitle,
                    {
                      borderTop: "none",
                      fontSize: getFontSize(16, optionsPDF.contadorContent),
                      marginTop: 0,
                    },
                  ]}
                >
                  Información adicional
                </Text>
                <Text
                  style={[
                    styles6.profileText,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  {[
                    cvData.licencia && "Licencia de conducir",
                    cvData.movilidad && "Vehículo propio",
                    cvData.incorporacion && "Disponibilidad inmediata",
                    cvData.disponibilidad && cvData.disponibilidad!="NINGUNO" &&
                      `${cvData.disponibilidad=="FULLTIME"?"jornada completa":"jornada parcial"}`,
                    cvData.office && "Microsoft Office",
                  ]
                    .filter(Boolean)
                    .join("\n")}
                </Text>
              </View>
            )}
            {cvData.idiomas.length > 0 && (
              <View
                style={[
                  styles6.column,
                  {
                    borderLeft:
                      cvData.licencia ||
                      cvData.movilidad ||
                      cvData.incorporacion ||
                      cvData.disponibilidad ||
                      cvData.office
                        ? "1 solid #EAEAEA"
                        : "none",
                    paddingLeft:
                      cvData.licencia ||
                      cvData.movilidad ||
                      cvData.incorporacion ||
                      cvData.disponibilidad ||
                      cvData.office
                        ? 15
                        : 0,
                  },
                ]}
              >
                <Text
                  style={[
                    styles6.sectionTitle,
                    {
                      borderTop: "none",
                      fontSize: getFontSize(16, optionsPDF.contadorContent),
                      marginTop: 0,
                    },
                  ]}
                >
                  Idiomas
                </Text>
                {cvData.idiomas.map((idioma, index) => (
                  <View key={index} style={styles6.languageItem}>
                    <Text
                      style={[
                        styles6.languageName,
                        {
                          fontSize: getFontSize(10, optionsPDF.contadorContent),
                        },
                      ]}
                    >
                      {idioma.idioma}:
                    </Text>
                    <Text
                      style={[
                        styles6.languageLevel,
                        {
                          fontSize: getFontSize(10, optionsPDF.contadorContent),
                        },
                      ]}
                    >
                      {idioma.nivel === "BASICO"
                        ? "Básico"
                        : idioma.nivel.charAt(0).toLocaleUpperCase() +
                          idioma.nivel.slice(1)}
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
};
