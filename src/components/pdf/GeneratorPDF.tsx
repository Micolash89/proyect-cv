
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
    // width:"100%",
    // height:"100%"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
  {
  
    console.log("pdf ",data);

    // const {nombre} = data.;

  return (<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text> {`${data.nombre} y React-PDF!`} </Text>
        <Text> {`${data.apellido} y React-PDF!`} </Text>
      </View>
      <View style={styles.section}>
        <Text>Este PDF se muestra directamente en la página.</Text>
      </View>
    </Page>
  </Document>)}
;