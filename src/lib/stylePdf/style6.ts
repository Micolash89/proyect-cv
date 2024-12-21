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
      paddingVertical: 10,
      paddingHorizontal: 30,
      lineHeight: 1.5,
    },
    header: {
      flexDirection: 'row',
      paddingBottom: 10,
      
    },
    headerColumn: {
      display: 'flex',
      width: "75%",
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    headerLeft: {
      width: '25%',
      alignSelf: 'center',
      
    },
    headerCenter: {
      width: '50%',
    },
    headerRight: {
      width: '50%',
    },
    profileImage: {
      width: 100,
      height: 130,
      objectFit: 'cover',
      border: '1 solid #EAEAEA',
    },
    name: {
      fontWeight: 'bold',
    },
    contactLabel: {
      fontWeight: 'medium',
      color: '#666666',
    },
    contactValue: {
      marginBottom: 5,
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      paddingTop: 10,
      borderTop: '1 solid #EAEAEA',
    },
    content:{
      display: 'flex',
      flexDirection: 'column',
  
    },
    profileText: {
      color: '#333333',
      textAlign: 'justify',
    },
    timelineContainer: {
      // marginLeft: 15,
    },
    timelineEntry: {
      flexDirection: 'row',
    },
    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EAEAEA',
      border: '1 solid #EAEAEA',
      marginRight: 15,
      marginTop: 0,
      zIndex: 1,
    },
    timelineContent: {
      flex: 1,
      borderLeft: '1 solid #EAEAEA',
      paddingLeft: 15,
      marginLeft: -19,
      paddingBottom: 5,
      zIndex: 1,
    },
    timelineTitle: {
      fontWeight: 'bold',
    },
    timelineSubtitle: {
      color: '#666666',
    },
    timelineDate: {
      color: '#666666',
    },
    timelineDescription: {
      marginTop: 5,
      color: '#333333',
    },
    twoColumnSection: {
      flexDirection: 'row',
      marginTop: 20,
      borderTop: '1 solid #EAEAEA',
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
    },
    languageLevel: {
      color: '#666666',
    },
  });