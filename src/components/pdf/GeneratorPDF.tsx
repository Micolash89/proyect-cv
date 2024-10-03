
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Times New Roman',
  src: "/fonts/TimesNewRoman.ttf",
});

interface CVData {
  name: string;
  lastName: string;
  email: string;
  fechaNacimiento: string;
  phone: string;
  ciudad: string;
  provincia: string;
  education: Array<{ carrera: string; estado: string; estudios: string; anioInicioEducacion:string;anioFinEducacion:string;  }>;
  experience: Array<{ nombreEmpresa: string; puesto: string; anioInicioExperiencia: string; anioFinExperiencia: string; descripcionExperiencia: string }>;
  cursos: Array<{ curso: string; institucion: string; anioInicioCurso: string }>;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontFamily: 'Times New Roman',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  section2: {
   borderTop:'1px solid black',
 
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 11,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
});

// Componente principal
export const MyDocumentPDF: React.FC<{ cvData: CVData }> = ({ cvData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Encabezado */}
      <View style={styles.section}>
        <Text style={styles.title}>{`${cvData.name} ${cvData.lastName}`}</Text>
      <View style={styles.section2}>
        <Text style={styles.text}>{cvData.email} | {cvData.phone} | {cvData.ciudad}, {cvData.provincia} | {cvData.fechaNacimiento}</Text>
      </View>
        
      </View>

      {/* Educación */}
      <View style={styles.section}>
        <Text style={styles.header}>Educación</Text>
      <View style={[styles.section2]}>
        {cvData.education.map((edu, index) => (
          <View key={index} style={{ marginBottom: 5 }}>
            <Text style={styles.subHeader}>{edu.carrera}</Text>
            <Text style={styles.text}>{`${edu.estudios}, ${edu.estado}`}</Text>
            <Text style={styles.text}>{`${edu.anioInicioEducacion}, ${edu.anioFinEducacion}`}</Text>
          </View>
        ))}
        </View>
      </View>

      {/* Experiencia */}
      <View style={styles.section}>
        <Text style={styles.header}>Experiencia Profesional</Text>
        {cvData.experience.map((exp, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.subHeader}>{exp.puesto}</Text>
            <Text style={styles.text}>{`${exp.nombreEmpresa}, ${exp.anioInicioExperiencia} - ${exp.anioFinExperiencia}`}</Text>
            <Text style={styles.text}>{exp.descripcionExperiencia}</Text>
          </View>
        ))}
      </View>

      {/* Cursos */}
      <View style={styles.section}>
        <Text style={styles.header}>Cursos y Certificaciones</Text>
        {cvData.cursos.map((curso, index) => (
          <Text key={index} style={styles.text}>
            {`${curso.curso}, ${curso.institucion}, ${curso.anioInicioCurso}`}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyDocumentPDF;