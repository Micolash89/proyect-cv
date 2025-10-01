import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { TypeIAData } from "../PreviewCV";
import { styles2 } from "@/lib/stylePdf/style2";
import { getFontSize } from "@/lib/utils";

export const Layout2: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  const experiencia = cvData.experience.map((exp, index) => (
    <View key={index} style={styles2.entryContainer}>
      <View style={styles2.entryHeader}>
        {exp.nombreEmpresa && <Text
          style={[
            styles2.institution,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {exp.nombreEmpresa}
        </Text>}
       {exp.zonaEmpresa && <Text
          style={[
            styles2.location,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          {exp.zonaEmpresa}
        </Text>}
      </View>
      <View style={styles2.entryHeader}>
        <Text
          style={[
            styles2.degree,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {exp.puesto}
        </Text>
        <Text
          style={[
            styles2.dates,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          {exp.mesInicioExperiencia}/{exp.anioInicioExperiencia} - {exp.anioFinExperiencia=="Actualidad"?"Actualidad":`${exp.mesFinExperiencia}/${exp.anioFinExperiencia}`}
        </Text>
      </View>
      {iaData.descriptionWork && <Text
        style={[
          styles2.description,
          { fontSize: getFontSize(10, optionsPDF.contadorContent) },
        ]}
      >
        • {iaData.descriptionWork.split("\n")[index]}
      </Text>}
    </View>
  ));

  const educacion = cvData.education.map((edu, index) => (
    <View key={index} style={styles2.entryContainer}>
      <View style={styles2.entryHeader}>
        {edu.institucion && <Text
          style={[
            styles2.institution,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {edu.institucion}
        </Text>}
        <Text
          style={[
            styles2.location,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          {edu.zonaInstitucion}{" "}
          {optionsPDF.contadorContent > 2
            ? `${edu.mesInicioEducacion}/${edu.anioInicioEducacion} - ${edu.anioFinEducacion=="Actualidad"?`Actualidad`:`${edu.mesFinEducacion}/${edu.anioFinEducacion}`}`
            : ""}
        </Text>
      </View>
      <View style={styles2.entryHeader}>
        <Text
          style={[
            styles2.degree,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {edu.carrera} ({edu.estado.toLowerCase()})
        </Text>
        <Text
          style={[
            styles2.dates,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          {optionsPDF.contadorContent < 3
            ? `${edu.mesInicioEducacion}/${edu.anioInicioEducacion} - ${edu.anioFinEducacion=="Actualidad"?`Actualidad`:`${edu.mesFinEducacion}/${edu.anioFinEducacion}`}`
            : ""}
        </Text>
      </View>
    </View>
  ));

  const cursos = cvData.cursos.map((curso, index) => (
    <View key={`${index}-${curso.curso}-curso`} style={[styles2.entryContainer,{marginBottom:(cvData.cursos.length-1)==index? 0: 7}]}>
      <View style={styles2.entryHeader}>
        <Text
          style={[
            styles2.institution,
            { fontSize: getFontSize(11, optionsPDF.contadorContent) },
          ]}
        >
          {curso.curso}
        </Text>
        <Text
          style={[
            styles2.dates,
            { fontSize: getFontSize(10, optionsPDF.contadorContent) },
          ]}
        >
          {curso.anioInicioCurso=="Actualidad"?`Actualidad`:`${curso.mesInicioCurso}/${curso.anioInicioCurso}`}
        </Text>
      </View>
      <Text
        style={[
          styles2.degree,
          { fontSize: getFontSize(11, optionsPDF.contadorContent) },
        ]}
      >
        {curso.institucion}
      </Text>
    </View>
  ));

  const cutName = (
    <Text style={[styles2.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name.split(" ")[0]}
      {`\n`} {cvData.lastName.split(" ")[0]}
    </Text>
  );

  const fullName = (
    <Text style={[styles2.name, { fontSize: getFontSize(24, contador) }]}>
      {cvData.name.split(" ").join("\n")}
      {`\n`} {cvData.lastName}
    </Text>
  );

  return (
    <Document title={`Currículum Vitae - ${cvData.name} ${cvData.lastName}`}>
      <Page
        size="A4"
        style={[
          styles2.page,
          {
            fontSize: getFontSize(12, optionsPDF.contadorContent),
          },
        ]}
      >
        <View
          style={[
            styles2.leftColumn,
            {
              backgroundColor: optionsPDF.color,
              color: optionsPDF.color === "#F3F2E3" ? "#a3a3a3" : "white",
            },
          ]}
        >
          {cvData.imagenPerfil && (
            <Image
              src={cvData.imagenPerfil}
              style={[
                styles2.profileImage,
                { width: 100 + contador * 4, height: 100 + contador * 4 },
              ]}
            />
          )}
          {(cvData.name || cvData.lastName) &&
            (optionsPDF.fullName ? fullName : cutName)}
          {(cvData.orientadoCV && optionsPDF.orientacionCVTitle) && (
            <Text
              style={[
                styles2.profession,
                { fontSize: getFontSize(15, contador) },
              ]}
            >
              {cvData.orientadoCV}
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
                  { fontSize: getFontSize(10, contador), marginBottom: 0 },
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
                  color:
                    optionsPDF.color == "#34495E" ||
                    optionsPDF.color == "#F3F2E3"
                      ? "#a3a3a3"
                      : "#FFFFFF",
                  borderBottom: `1 solid ${
                    optionsPDF.color == "#34495E" ||
                    optionsPDF.color == "#F3F2E3"
                      ? "#A3A3A3"
                      : "#FFFFFF"
                  }`,
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
                <Text
                  key={index}
                  style={[
                    styles2.skill,
                    {
                      backgroundColor:
                        optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                      fontSize: getFontSize(8, contador),
                    },
                  ]}
                >
                  {skill.trim()}
                </Text>
              ))}
            </View>
          )}
          {cvData.idiomas.length > 0 && (
            <Text
              style={[
                styles2.sectionTitle,
                {
                  color:
                    optionsPDF.color == "#34495E" ||
                    optionsPDF.color == "#F3F2E3"
                      ? "#a3a3a3"
                      : "#FFFFFF",
                  borderBottom: `1 solid ${
                    optionsPDF.color == "#34495E" ||
                    optionsPDF.color == "#F3F2E3"
                      ? "#A3A3A3"
                      : "#FFFFFF"
                  }`,
                  fontSize: getFontSize(16, contador),
                  marginTop: 20,
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
              {idioma.idioma.toLocaleLowerCase()=="ingles"?"Inglés":
              idioma.idioma.charAt(0).toUpperCase() +
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
                  color:
                    optionsPDF.color == "#34495E" ||
                    optionsPDF.color == "#F3F2E3"
                      ? "#a3a3a3"
                      : "#FFFFFF",
                  borderBottom: `1 solid ${
                    optionsPDF.color == "#34495E" ||
                    optionsPDF.color == "#F3F2E3"
                      ? "#A3A3A3"
                      : "#FFFFFF"
                  }`,
                  fontSize: getFontSize(16, contador),
                  marginTop: 20,
                },
              ]}
            >
              {contador > 0
                ? "Información Adicional".split(" ").join("\n")
                : "Información Adicional"}
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
          {cvData.disponibilidad && cvData.disponibilidad != "NINGUNO" && (
            <Text
              style={[
                styles2.contactItem,
                { fontSize: getFontSize(10, contador) },
              ]}
            >
              {cvData.disponibilidad == "FULLTIME"
                ? "jornada completa"
                : "jornada parcial"}
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
        <View
          style={[
            styles2.rightColumn,
            {
              justifyContent: optionsPDF.spaceBetween
                ? "space-between"
                : "flex-start",
            },
          ]}
        >
          {iaData.profile && (
            <View>
              <Text
                style={[
                  styles2.sectionTitle,
                  {
                    color:
                      optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                    borderBottom: `1 solid ${
                      optionsPDF.color == "#34495E" ? "#A3A3A3" : "#808080"
                    }`,
                    fontSize: getFontSize(16, optionsPDF.contadorContent),
                  },
                ]}
              >
                Perfil
              </Text>
              <Text
                style={[
                  styles2.description,
                  {
                    textAlign: "justify",
                    fontSize: getFontSize(10, optionsPDF.contadorContent),
                  },
                ]}
              >
                {iaData.profile}
              </Text>
            </View>
          )}
          <View>
            {cvData.experience.length > 0 && (
              <Text
                style={[
                  styles2.sectionTitle,
                  {
                    color:
                      optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                    borderBottom: `1 solid ${
                      optionsPDF.color == "#34495E" ? "#A3A3A3" : "#808080"
                    }`,
                    fontSize: getFontSize(16, optionsPDF.contadorContent),
                  },
                ]}
              >
                Experiencia Profesional
              </Text>
            )}
            {optionsPDF.reverseExperience ? experiencia.reverse() : experiencia}
          </View>

          <View>
            {cvData.education.length > 0 && (
              <Text
                style={[
                  styles2.sectionTitle,
                  {
                    color:
                      optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                    borderBottom: `1 solid ${
                      optionsPDF.color == "#34495E" ? "#A3A3A3" : "#808080"
                    }`,
                    fontSize: getFontSize(16, optionsPDF.contadorContent),
                  },
                ]}
              >
                Educación
              </Text>
            )}
            {optionsPDF.reverseEducation ? educacion.reverse() : educacion}
          </View>
          <View>
            {cvData.cursos.length > 0 && (
              <Text
                style={[
                  styles2.sectionTitle,
                  {
                    color:
                      optionsPDF.color == "#34495E" ? "#a3a3a3" : "#808080",
                    borderBottom: `1 solid ${
                      optionsPDF.color == "#34495E" ? "#A3A3A3" : "#808080"
                    }`,
                    fontSize: getFontSize(16, optionsPDF.contadorContent),
                  },
                ]}
              >
                Certificaciones
              </Text>
            )}
            {optionsPDF.reverseCursos ? cursos.reverse() : cursos}
          </View>
        </View>
      </Page>
    </Document>
  );
};
