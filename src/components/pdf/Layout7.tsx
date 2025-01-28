import {
  AnioCurso,
  AnioEducacion,
  AnioExperiencia,
  CVDataPdf,
  OptionsPDF,
} from "@/lib/definitions";
import { TypeIAData } from "../PreviewCV";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles7 } from "@/lib/stylePdf/style7";
import { getFontSize, getPadding } from "@/lib/utils";

export const Layout7: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {

  const experiencia = cvData.experience.map((exp, index) => (
    <View key={index} style={styles7.entryContainer}>
      <View style={styles7.entryHeader}>
        <Text
          style={[
            styles7.institution,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {exp.nombreEmpresa}
        </Text>
        <Text
          style={[
            styles7.dates,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} -{" "}
          {exp.anioFinExperiencia == "Actualidad"
            ? "Actualidad"
            : `${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
        </Text>
      </View>
      <Text
        style={[
          styles7.jobTitle,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {exp.puesto}
      </Text>
      <Text
        style={[
          styles7.location,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {exp.zonaEmpresa}
      </Text>
      <Text
        style={[
          styles7.description,
          {
            fontSize: getFontSize(11, optionsPDF.contadorContent),
            marginBottom: 10,
          },
        ]}
      >
        • {iaData.descriptionWork.split("\n")[index]}
      </Text>
    </View>
  ));

  const anioEdu = ({ edu }: { edu: AnioEducacion }) => {
    return (
      <Text
        style={[
          styles7.dates,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {edu.mesInicioEducacion}/{edu.anioInicioEducacion} -{" "}
        {edu.mesFinEducacion}/{edu.anioFinEducacion}
      </Text>
    );
  };

  const educacion = cvData.education.map((edu: any, index: number) => (
    <View key={index} style={styles7.entryContainer}>
      <View style={styles7.entryHeader}>
        <Text
          style={[
            styles7.institution,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {edu.institucion}
        </Text>
        {edu.institucion.length > 23 ? "" : anioEdu({ edu })}
      </View>
      <Text
        style={[
          styles7.degree,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {edu.carrera} ({edu.estado.toLowerCase()})
      </Text>
      <Text
        style={[
          styles7.location,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {edu.zonaInstitucion} {edu.zonaInstitucion && " "}
        {edu.institucion.length < 23 ? "" : anioEdu({ edu })}
      </Text>
    </View>
  ));

  const cursos = cvData.cursos.map((exp, index) => (
    <View key={index} style={[styles7.entryContainer, { marginBottom: 10 }]}>
      <View style={styles7.entryHeader}>
        <Text
          style={[
            styles7.institution,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {exp.curso}
        </Text>
        <Text
      style={[
        styles7.dates,
        { fontSize: getFontSize(11, optionsPDF.contadorContent) },
      ]}
    >
      {exp.anioInicioCurso == "Actualidad"
        ? "Actualidad"
        : `${exp.mesInicioCurso}/${exp.anioInicioCurso}`}
    </Text>
      </View>
      <Text
        style={[
          styles7.jobTitle,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {exp.institucion}
      </Text>
    </View>
  ));

  const cutName = (
    <Text style={[styles7.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name.split(" ")[0]} {cvData.lastName.split(" ")[0]}
    </Text>
  );

  const fullName = (
    <Text style={[styles7.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name} {cvData.lastName}
    </Text>
  );

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page size="A4" style={[styles7.page]}>
        {/* Header Section */}
        <View style={styles7.headerContainer}>
          {cvData.imagenPerfil && (
            <Image src={cvData.imagenPerfil} style={styles7.profileImage} />
          )}
          <View style={styles7.headerContent}>
            {optionsPDF.fullName ? fullName : cutName}
            <Text
              style={[
                styles7.contactInfo,
                { fontSize: getFontSize(11, contador) },
              ]}
            >
              {cvData.dni && ` • DNI: ${cvData.dni}`} •{" "}
              {cvData.fechaNacimiento.split("-").reverse().join("/")} • Tel.:{" "}
              {cvData.phone}
              {cvData.email && ` • ${cvData.email}`}
              {(cvData.ciudad || cvData.provincia) &&
                ` • ${cvData.ciudad}, ${cvData.provincia}`}
            </Text>
          </View>
        </View>

        {/* Profile Summary */}
        <View
          style={{
            paddingHorizontal: getPadding(optionsPDF.contadorContent, 40),
            paddingBottom: getPadding(optionsPDF.contadorContent, 40),
          }}
        >
          {iaData.profile && (
            <View style={[]}>
              <Text
                style={[
                  styles7.profileText,
                  { fontSize: getFontSize(10.5, optionsPDF.contadorContent) },
                ]}
              >
                {iaData.profile}
              </Text>
            </View>
          )}

          {/* Main Content Grid */}
          <View style={styles7.mainContent}>
            {/* Left Column */}
            <View style={styles7.leftColumn}>
              {/* Education Section */}
              {cvData.education.length > 0 && (
                <View style={styles7.section}>
                  <Text
                    style={[
                      styles7.sectionTitle,
                      { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                    ]}
                  >
                    EDUCACIÓN
                  </Text>
                  {optionsPDF.reverseEducation
                    ? educacion.reverse()
                    : educacion}
                </View>
              )}

              {/* Skills Section */}
              {iaData.skills && (
                <View style={styles7.section}>
                  <Text
                    style={[
                      styles7.sectionTitle,
                      { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                    ]}
                  >
                    HABILIDADES
                  </Text>
                  <View style={styles7.skillsGrid}>
                    {iaData.skills.split("•").map(
                      (skill: any, index: number) =>
                        skill.trim() && (
                          <Text
                            key={index}
                            style={[
                              styles7.skillItem,
                              {
                                fontSize: getFontSize(
                                  11,
                                  optionsPDF.contadorContent
                                ),
                              },
                            ]}
                          >
                            • {skill.trim()}
                          </Text>
                        )
                    )}
                  </View>
                </View>
              )}

              {(cvData.licencia ||
                cvData.movilidad ||
                cvData.incorporacion ||
                cvData.disponibilidad ||
                cvData.office ||
                cvData.idiomas.length > 0) && (
                <View style={styles7.section}>
                  <Text
                    style={[
                      styles7.sectionTitle,
                      { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                    ]}
                  >
                    {optionsPDF.contadorContent < 2
                      ? "INFORMACIÓN ADICIONAL"
                      : "INFORMACIÓN ADICIONAL".split(" ").join("\n")}
                  </Text>
                  <View style={styles7.skillsGrid}>
                    {[
                      cvData.licencia && "Licencia de conducir",
                      cvData.movilidad && "Vehículo propio",
                      cvData.incorporacion && "Disponibilidad inmediata",
                      cvData.disponibilidad &&
                        cvData.disponibilidad != "NINGUNO" &&
                        `Jornada: ${
                          cvData.disponibilidad == "FULLTIME"
                            ? "completa"
                            : "parcial"
                        }`,
                      cvData.office && "Microsoft Office",
                      ...cvData.idiomas.map(
                        (idioma) =>
                          `${idioma.idioma} - ${idioma.nivel.toLowerCase()}`
                      ),
                    ]
                      .filter(Boolean)
                      .map((item: any, index: number) => (
                        <Text
                          key={`${index}`}
                          style={[
                            styles7.skillItem,
                            {
                              fontSize: getFontSize(
                                11,
                                optionsPDF.contadorContent
                              ),
                            },
                          ]}
                        >
                          • {item}
                        </Text>
                      ))}
                  </View>
                </View>
              )}
            </View>

            {/* Right Column */}
            <View style={styles7.rightColumn}>
              {cvData.experience.length > 0 && (
                <View style={styles7.section}>
                  <Text
                    style={[
                      styles7.sectionTitle,
                      { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                    ]}
                  >
                    EXPERIENCIA PROFESIONAL
                  </Text>
                  {optionsPDF.reverseExperience
                    ? experiencia.reverse()
                    : experiencia}
                </View>
              )}
              {cvData.cursos.length > 0 && (
                <View style={styles7.section}>
                  <Text
                    style={[
                      styles7.sectionTitle,
                      { fontSize: getFontSize(14, optionsPDF.contadorContent) },
                    ]}
                  >
                    CURSOS
                  </Text>
                  {optionsPDF.reverseCursos ? cursos.reverse() : cursos}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
