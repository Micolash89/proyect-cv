
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Font.register({
//   family: 'Times New Roman', // Use desired font family name
//   src: "./Times-New-Roman.ttf", // Replace with your font file path
// });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    // fontFamily: 'Times New Roman',
    display:"flex",
    justifyContent:"space-between"
  },
  section: {
    marginBottom: 10,
    width:"100%",
    padding:"5px 0",
    
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    textTransform:"uppercase",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    borderBottom:"1px solid black",
  },
  text: {
    marginBottom: 5,
    // fontStyle:"italic"
  },
});


type User ={
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento: Date;
  email: string;
  domicilio: string;
  ciudad: string;
  provincia: string;
  linkedin?: string | null;
}

export const MyDocumentPDF = ({data}:{data:User}) => 
 (
  <Document>
    <Page size="A4" style={styles.page}>
    
      <View style={styles.section}>
        <Text style={styles.header}>{data.nombre} {data.apellido}</Text>
        <Text style={styles.header}></Text>
        <View style={{ flexDirection: 'row', margin:"auto", display:"flex" , alignItems:"center"}}>

        <Text style={styles.text}>• {data.email}</Text>
        <Text style={styles.text}>• {data.telefono}</Text>
        <Text style={styles.text}>• {data.ciudad} </Text>
        </View>
      </View>

   
      <View style={styles.section}>
        <Text style={styles.title}>Experiencia Laboral</Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Desarrollador Backend</Text> - LastByte (Abril 2019 - Julio 2022)
        </Text>
        <Text style={styles.text}>Responsabilidades: Desarrollo y mantenimiento de sistemas backend utilizando Java y Node.js.</Text>
      </View>

   
      <View style={styles.section}>
        <Text style={styles.title}>Educación</Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Full Stack JavaScript/Node.js</Text> - Codo a Codo
        </Text>
        <Text style={styles.text}>Curso completado con enfoque en desarrollo full stack.</Text>
      </View>

    
      <View style={styles.section}>
        <Text style={styles.title}>Habilidades</Text>
        <Text style={styles.text}>JavaScript, Node.js, React, Java, Spring Boot, SQL, Docker, Git</Text>
      </View>

     
      <View style={styles.section}>
        <Text style={styles.title}>Idiomas</Text>
        <Text style={styles.text}>Español (Nativo), Inglés (Intermedio)</Text>
      </View>
    </Page>
  </Document>
 );