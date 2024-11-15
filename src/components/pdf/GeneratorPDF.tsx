import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { TypeIAData } from "../PreviewCV";

// Registramos las fuentes que vamos a usar
Font.register({
  family: 'Times',
  fonts: [
    {
      src: "/fonts/TimesNewRoman.ttf",
    },
    {
      src: "/fonts/TimesNewRoman.ttf",
      fontWeight: 'bold',
    },
    {
      src: "/fonts/TimesNewRoman.ttf",
      fontStyle: 'italic',
    }
  ]
});

interface CVData {
  name: string;
  lastName: string;
  email: string;
  fechaNacimiento: string;
  dni: string;
  phone: string;
  ciudad: string;
  provincia: string;
  education: Array<{
    carrera: string;
    estado: string;
    estudios: string;
    institucion: string;
    zonaInstitucion: string;
    anioInicioEducacion: string;
    anioFinEducacion: string;
  }>;
  experience: Array<{
    nombreEmpresa: string;
    puesto: string;
    zonaEmpresa: string;
    anioInicioExperiencia: string;
    anioFinExperiencia: string;
    descripcionExperiencia: string;
  }>;
  cursos: Array<{
    curso: string;
    institucion: string;
    anioInicioCurso: string;
  }>;
  idiomas: Array<{
    idioma: string;
    nivel: string;
  }>;
  licencia: string;
  movilidad: string;
  incorporacion: string;
  disponibilidad: string;
  office: string;
}

const styles = StyleSheet.create({
  page: {
   
    fontFamily: "Times",
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
    textAlign: "center",
  },
  contactInfo: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 4,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottom: "1 solid #000",
    marginTop: 12,
    marginBottom: 8,
    paddingBottom: 4,
  },
  entryContainer: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  institution: {
    fontWeight: "bold",
  },
  location: {
    fontStyle: "italic",
    color: "#666666",
  },
  degree: {
    fontStyle: "italic",
  },
  dates: {
    fontStyle: "italic",
  },
  description: {
    
    marginLeft: 12,
    marginTop: 2,
  },
  skills: {
    marginTop: 4,
  },
  additionalInfo: {
    marginTop: 4,
    fontStyle: "italic",
  },
  bullet: {
    width: 3,
    height: 3,
    marginRight: 6,
  }
});

const MyDocumentPDF: React.FC<{
  cvData: CVData;
  iaData: TypeIAData;
  contador: number;
}> = ({ cvData, iaData, contador }) => {
  return (
    <Document>
      <Page size="A4" style={[styles.page,{ padding: 45 - (contador<=5? contador*5:25)}]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.name, { fontSize: 20 + contador }]}>
            {cvData.name} {cvData.lastName}
          </Text>
          <Text style={[styles.contactInfo, { fontSize: 11 + contador }]}>
            {cvData.ciudad}, {cvData.provincia} • {cvData.phone}
            {cvData.email && ` • ${cvData.email}`}
          </Text>
        </View>

        {/* Profile Summary */}
        {iaData.profile && (
          <View>
            <Text style={[styles.sectionTitle, { fontSize: 14 + contador }]}>PERFIL</Text>
            <Text style={[styles.description, { fontSize: 11 + contador, fontStyle: "italic" }]}>{iaData.profile}</Text>
          </View>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { fontSize: 14 + contador }]}>EDUCACIÓN</Text>
            {cvData.education.map((edu, index) => (
              <View key={index} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <Text style={[styles.institution, { fontSize: 12 + contador }]}>{edu.institucion}</Text>
                  <Text style={[styles.location, { fontSize: 12 + contador }]}>{edu.zonaInstitucion}</Text>
                </View>
                <View style={styles.entryHeader}>
                  <Text style={[styles.degree, { fontSize: 12 + contador }]}>
                    {edu.carrera} ({edu.estado.toLowerCase()})
                  </Text>
                  <Text style={[styles.dates, { fontSize: 12 + contador }]}>
                    {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { fontSize: 14 + contador }]}>EXPERIENCIA PROFESIONAL</Text>
            {cvData.experience.map((exp, index) => (
              <View key={index} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <Text style={[styles.institution, { fontSize: 12 + contador }]}>{exp.nombreEmpresa}</Text>
                  <Text style={[styles.location, { fontSize: 12 + contador }]}>{exp.zonaEmpresa}</Text>
                </View>
                <View style={styles.entryHeader}>
                  <Text style={[styles.degree, { fontSize: 12 + contador }]}>{exp.puesto}</Text>
                  <Text style={[styles.dates, { fontSize: 12 + contador }]}>
                    {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                  </Text>
                </View>
                <Text style={[styles.description, { fontSize: 11 + contador }]}>
                  {iaData.descriptionWork.split("\n")[index]}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {iaData.skills && (
          <View>
            <Text style={[styles.sectionTitle, { fontSize: 14 + contador }]}>HABILIDADES</Text>
            <Text style={[styles.skills, { fontSize: 11 + contador }]}>{iaData.skills}</Text>
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
            <Text style={[styles.sectionTitle, { fontSize: 14 + contador }]}>INFORMACIÓN ADICIONAL</Text>
            <Text style={[styles.additionalInfo, { fontSize: 11 + contador }]}>
              {[
                cvData.licencia && "Licencia de conducir",
                cvData.movilidad && "Vehículo propio",
                cvData.incorporacion && "Disponibilidad inmediata",
                cvData.disponibilidad && `Jornada: ${cvData.disponibilidad}`,
                cvData.office && "Microsoft Office",
                ...cvData.idiomas.map(
                  (idioma) =>
                    `${idioma.idioma} - ${idioma.nivel.toLowerCase()}`
                ),
              ]
                .filter(Boolean)
                .join(" • ")}
            </Text>
          </View>
        )}

        {/* Certifications */}
        {cvData.cursos.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { fontSize: 14 + contador }]}>CERTIFICACIONES</Text>
            {cvData.cursos.map((curso, index) => (
              <View key={index} style={styles.entryContainer}>
                <Text style={[styles.description, { fontSize: 11 + contador }]}>
                  • {curso.curso}, {curso.institucion} ({curso.anioInicioCurso})
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MyDocumentPDF;