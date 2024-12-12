import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
    family: "Roboto",
    fonts: [
      { src: "/fonts/Roboto-Regular.ttf" },
      { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
      { src: "/fonts/Roboto-Italic.ttf", fontStyle: "italic" },
    ],
  });

  export const styles7 = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: 10,
      padding: 30,
      flexDirection: "row",
    },
    leftColumn: {
      width: "30%",
      paddingRight: 15,
      borderRight: "1 solid #cccccc",
    },
    rightColumn: {
      width: "70%",
      paddingLeft: 15,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    contactInfo: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
      marginTop: 10,
      color: "#333333",
      textTransform: "uppercase",
    },
    entryContainer: {
      marginBottom: 5,
    },
    entryTitle: {
      fontWeight: "bold",
    },
    entrySubtitle: {
      fontStyle: "italic",
    },
    entryDates: {
      fontSize: 9,
    },
    skillItem: {
      marginBottom: 3,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
  });