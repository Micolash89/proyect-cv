import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
    family: 'Inter',
    fonts: [
      { src: '/fonts/Inter-Regular.ttf' },
      { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Inter-Medium.ttf', fontWeight: 'medium' },
    ],
  });

  export const styles6 = StyleSheet.create({
    page: {
      fontFamily: 'Inter',
      fontSize: 11,
      paddingVertical: 10,
      paddingHorizontal: 40,
      lineHeight: 1.5,
    },
    header: {
      flexDirection: 'row',
      marginBottom: 30,
      paddingBottom: 20,
      borderBottom: '1 solid #EAEAEA',
    },
    headerLeft: {
      width: '25%',
    },
    headerCenter: {
      width: '45%',
      paddingLeft: 20,
    },
    headerRight: {
      width: '30%',
      paddingLeft: 20,
    },
    profileImage: {
      width: 120,
      height: 150,
      objectFit: 'cover',
      border: '1 solid #EAEAEA',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    contactLabel: {
      fontSize: 10,
      fontWeight: 'medium',
      color: '#666666',
    },
    contactValue: {
      fontSize: 10,
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 20,
    },
    profileText: {
      fontSize: 10,
      color: '#333333',
      textAlign: 'justify',
    },
    timelineContainer: {
      marginLeft: 15,
    },
    timelineEntry: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#000000',
      marginRight: 15,
      marginTop: 6,
    },
    timelineContent: {
      flex: 1,
      borderLeft: '1 solid #EAEAEA',
      paddingLeft: 15,
      marginLeft: -19,
      paddingBottom: 15,
    },
    timelineTitle: {
      fontSize: 11,
      fontWeight: 'bold',
    },
    timelineSubtitle: {
      fontSize: 10,
      color: '#666666',
    },
    timelineDate: {
      fontSize: 10,
      color: '#666666',
    },
    timelineDescription: {
      fontSize: 10,
      marginTop: 5,
      color: '#333333',
    },
    twoColumnSection: {
      flexDirection: 'row',
      marginTop: 20,
      borderTop: '1 solid #EAEAEA',
      paddingTop: 20,
    },
    column: {
      flex: 1,
      paddingRight: 20,
    },
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    languageName: {
      fontSize: 10,
    },
    languageLevel: {
      fontSize: 10,
      color: '#666666',
    },
  });