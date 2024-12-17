import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: "Times",
    fonts: [
      {
        src: "/fonts/TimesNewRoman.ttf",
      },
      {
        src: "/fonts/TimesNewRoman.ttf",
        fontWeight: "normal",
      },
      {
        src: "/fonts/TimesNewRomanBold.ttf",
        fontWeight: "bold",
      },
      {
        src: "/fonts/TimesNewRomanItalic.ttf",
        fontStyle: "italic",
      },
    ],
  });

 export const styles = StyleSheet.create({
    page: {
      fontFamily: "Times",
      fontSize: 12,
      fontWeight: "normal",
    },
    header: {
      marginBottom: 10,
    },
    name: {
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
      lineHeight: 1.5,
    },
    contactInfo: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 2,
      borderBottom: "1 solid #000",
    },
    sectionTitle: {
      fontWeight: "bold",
      textTransform: "uppercase",
      borderBottom: "1 solid #000",
      marginTop: 12,
      marginBottom: 8,
      lineHeight: 1,
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
      fontStyle: "normal",
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
      marginRight: 12,
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
    },
  });
