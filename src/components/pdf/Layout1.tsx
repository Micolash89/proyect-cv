import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { TypeIAData } from "../PreviewCV";
import { styles1 } from "@/lib/stylePdf/style1";
import { getFontSize, getPadding } from "@/lib/utils";

export const Layout1: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  const experiencia = cvData.experience.map((exp, index) => (
    <View key={index} style={styles1.experienceEntry}>
      <Text
        style={[
          styles1.companyName,
          { fontSize: getFontSize(12, optionsPDF.contadorContent) },
        ]}
      >
        {exp.nombreEmpresa}
      </Text>
      <Text
        style={[
          styles1.jobTitle,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {exp.puesto}
      </Text>
      <Text
        style={[
          styles1.dateLocation,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} - {exp.anioFinExperiencia=="Actualidad"?"Actualidad ":`${exp.mesFinExperiencia}/${exp.anioFinExperiencia} `}|{" "}
        {exp.zonaEmpresa}
      </Text>
      <Text
        style={[
          styles1.description,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        • {iaData.descriptionWork.split("\n")[index]}
      </Text>
    </View>
  ));

  const educacion = cvData.education.map((edu, index) => (
    <View key={index} style={styles1.educationEntry}>
      <Text
        style={[
          styles1.institution,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {edu.institucion}
      </Text>
      <Text
        style={[
          styles1.degree,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {edu.carrera} ({edu.estado})
      </Text>
      <Text
        style={[
          styles1.dateLocation,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {edu.mesInicioEducacion}/{edu.anioInicioEducacion} - {edu.mesFinEducacion}/{edu.anioFinEducacion} |{" "}
        {edu.zonaInstitucion}
      </Text>
    </View>
  ));

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={index} style={styles1.educationEntry}>
      <Text
        style={[
          styles1.institution,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {curso.curso}
      </Text>
      <Text
        style={[
          styles1.degree,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {curso.institucion}
      </Text>
      <Text
        style={[
          styles1.dateLocation,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        {curso.anioInicioCurso=="Actualidad"?"Actualidad":`${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
      </Text>
    </View>
  ));

  const cutname = (
    <Text style={[styles1.name, { fontSize: getFontSize(20, contador) }]}>
      {cvData.name.split(" ")[0]}
      {`\n`}
      {cvData.lastName.split(" ")[0]}
    </Text>
  );

  const fullname = (
    <Text style={[styles1.name, { fontSize: getFontSize(20, contador) }]}>
      {cvData.name}
      {`\n`}
      {cvData.lastName}
    </Text>
  );

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}  >
      <Page size="A4" style={styles1.page}>
        <View style={styles1.container}>
          <View
            style={[
              styles1.sidebar,
              {
                backgroundColor: optionsPDF.color,
              },
            ]}
          >
            {cvData.imagenPerfil && (
              <Image src={cvData.imagenPerfil} style={styles1.profileImage} />
            )}
            {optionsPDF.fullName ? fullname : cutname}

            {optionsPDF.orientacionCVTitle && (
              <Text
                style={[
                  styles1.profession,
                  { fontSize: getFontSize(14, contador) },
                ]}
              >
                {cvData.orientadoCV}
              </Text>
            )}

            <View style={{ marginTop: 20 }}>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                {cvData.fechaNacimiento.split("-").reverse().join("/")}
              </Text>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                DNI: {cvData.dni}
              </Text>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                Tel: {cvData.phone}
              </Text>
              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
                wrap={true}
              >
                {cvData.email}
              </Text>

              <Text
                style={[
                  styles1.contactInfo,
                  { fontSize: getFontSize(10, contador) },
                ]}
              >
                {cvData.ciudad}, {cvData.provincia}
              </Text>
            </View>

            {iaData.skills && (
              <View>
                <Text
                  style={[
                    styles1.sidebarSectionTitle,
                    { fontSize: getFontSize(14, contador) },
                  ]}
                >
                  HABILIDADES
                </Text>
                {iaData.skills.split("•").map((skill, index) => (
                  <Text
                    key={index}
                    style={[
                      styles1.skillItem,
                      { fontSize: getFontSize(10, contador) },
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
                    styles1.sidebarSectionTitle,
                    { fontSize: getFontSize(14, contador) },
                  ]}
                >
                  IDIOMAS
                </Text>
                {cvData.idiomas.map((idioma, index) => (
                  <Text
                    key={index}
                    style={[
                      styles1.skillItem,
                      { fontSize: getFontSize(10, contador) },
                    ]}
                  >
                    •{" "}
                    {idioma.idioma.charAt(0).toUpperCase() +
                      idioma.idioma.slice(1).toLowerCase()}{" "}
                    -{" "}
                    {idioma.nivel == "BASICO"
                      ? "Básico"
                      : idioma.nivel.charAt(0).toUpperCase() +
                        idioma.nivel.slice(1).toLowerCase()}
                  </Text>
                ))}
              </View>
            )}

            { (cvData.licencia || cvData.movilidad || cvData.incorporacion || cvData.disponibilidad) &&
              <View>
              <Text
                style={[
                  styles1.sidebarSectionTitle,
                  { fontSize: getFontSize(14, contador) },
                ]}
              >
                INFORMACIÓN{"\n"}ADICIONAL
              </Text>
              {cvData.licencia && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  • Licencia de conducir
                </Text>
              )}
              {cvData.movilidad && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  • Vehículo propio
                </Text>
              )}
              {cvData.incorporacion && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  • Disponibilidad inmediata
                </Text>
              )}
              {cvData.disponibilidad && cvData.disponibilidad!= "NINGUNO" && (
                <Text
                  style={[
                    styles1.additionalInfo,
                    { fontSize: getFontSize(10, contador) },
                  ]}
                >
                  •{" "}
                  {cvData.disponibilidad == "FULLTIME"
                    ? "jornada completa"
                    : "jornada parcial"}
                </Text>
              )}
            </View>}
          </View>

          <View
            style={[
              styles1.mainContent,
              {
                justifyContent: optionsPDF.spaceBetween
                  ? "space-between"
                  : "flex-start",
              },
            ]}
          >

            {iaData.profile && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[
                    styles1.sectionTitle,
                    {
                      color: optionsPDF.color,
                      fontSize: getFontSize(16, optionsPDF.contadorContent),
                    },
                  ]}
                >
                  PERFIL PROFESIONAL
                </Text>
                <Text
                  style={[
                    styles1.description,
                    { fontSize: getFontSize(10, optionsPDF.contadorContent) },
                  ]}
                >
                  {iaData.profile}
                </Text>
              </View>
            )}

            {cvData.experience.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[
                    styles1.sectionTitle,
                    {
                      color: optionsPDF.color,
                      fontSize: getFontSize(16, optionsPDF.contadorContent),
                    },
                  ]}
                >
                  EXPERIENCIA PROFESIONAL
                </Text>
                {optionsPDF.reverseExperience
                  ? experiencia.reverse()
                  : experiencia}
              </View>
            )}

            {cvData.education.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[
                    styles1.sectionTitle,
                    {
                      color: optionsPDF.color,
                      fontSize: getFontSize(16, optionsPDF.contadorContent),
                    },
                  ]}
                >
                  EDUCACIÓN
                </Text>
                {optionsPDF.reverseEducation ? educacion.reverse() : educacion}
              </View>
            )}

            {cvData.cursos.length > 0 && (
              <View>
                <Text
                  style={[
                    styles1.sectionTitle,
                    {
                      color: optionsPDF.color,
                      fontSize: getFontSize(16, optionsPDF.contadorContent),
                    },
                  ]}
                >
                  CERTIFICACIONES
                </Text>
                {optionsPDF.reverseCursos ? cursos.reverse() : cursos}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
