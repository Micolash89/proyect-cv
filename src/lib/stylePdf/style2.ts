import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: 'Roboto',
    fonts: [
      { src: '/fonts/Roboto-Regular.ttf' },
      { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic' },
    ],
  });

  export const styles2 = StyleSheet.create({
    page: {
      fontFamily: 'Roboto',
      fontSize: 12,
      flexDirection: 'row',
    },
    leftColumn: {
      width: '30%',
      backgroundColor: '#34495E',
      color: 'white',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    rightColumn: {
      width: '70%',
      padding: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      alignSelf: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    contactInfo: {
      marginBottom: 20,
    },
    contactItem: {

      fontSize: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      color: '#3498DB',
      borderBottom: '1 solid #3498DB',
      paddingBottom: 5,
    },
    entryContainer: {
      marginBottom: 10,
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    institution: {
      fontWeight: 'bold',
      fontSize: 11,
    },
    location: {
      fontSize: 10,
      color: '#7F8C8D',
    },
    degree: {
      fontStyle: 'italic',
      fontSize: 11,
    },
    dates: {
      fontSize: 10,
      color: '#7F8C8D',
    },
    description: {
      fontSize: 10,
      marginLeft: 10,
    },
    skills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
    },
    skill: {
      backgroundColor: '#3498DB',
      color: 'white',
      padding: '3 6',
      borderRadius: 10,
      margin: 2,
      fontSize: 8,
    },
  });