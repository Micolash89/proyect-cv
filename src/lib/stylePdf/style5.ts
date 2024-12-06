import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
    family: 'Poppins',
    fonts: [
      { src: '/fonts/Poppins-Regular.ttf' },
      { src: '/fonts/Poppins-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Poppins-Italic.ttf', fontStyle: 'italic' },
    ],
  });

  export const styles5 = StyleSheet.create({
    page: {
      fontFamily: 'Poppins',
      fontSize: 12,
      paddingTop: 10,
      paddingBottom: 10,
      paddingHorizontal: 30,
      backgroundColor: '#F0F4F8',
    },
    header: {
      flexDirection: 'row',
      marginBottom: 20,
      backgroundColor: '#6C5CE7',
      padding: 20,
      borderRadius: 10,
    },
    headerLeft: {
      width: '70%',
    },
    headerRight: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    title: {
      fontSize: 16,
      color: '#FFFFFF',
      marginTop: 5,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#6C5CE7',
      borderBottom: '2 solid #6C5CE7',
      paddingBottom: 5,
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 15,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 5,
    },
    contactIcon: {
      width: 15,
      height: 15,
      marginRight: 5,
    },
    contactText: {
      fontSize: 10,
      color: '#4A4A4A',
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
      fontSize: 12,
      color: '#2D3748',
    },
    location: {
      fontSize: 10,
      color: '#718096',
    },
    degree: {
      fontStyle: 'italic',
      fontSize: 11,
      color: '#4A5568',
    },
    dates: {
      fontSize: 10,
      color: '#718096',
    },
    description: {
      fontSize: 10,
      marginLeft: 10,
      color: '#4A5568',
    },
    skills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
    },
    skill: {
      backgroundColor: '#6C5CE7',
      color: 'white',
      padding: '5 10',
      borderRadius: 15,
      margin: 2,
      fontSize: 9,
    },
    additionalInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
    },
    additionalInfoItem: {
      backgroundColor: '#E2E8F0',
      padding: '5 10',
      borderRadius: 15,
      margin: 2,
      fontSize: 9,
      color: '#4A5568',
    },
  });