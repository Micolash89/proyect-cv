import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Italic.ttf", fontStyle: "italic" },
  ],
});

export const styles2 = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    flexDirection: "row",
  },
  leftColumn: {
    width: "30%",
    color: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  rightColumn: {
    width: "70%",
    padding: 20,
    flexDirection: "column",
    display: "flex",
  },
  profileImage: {
    borderRadius: 50,
    marginBottom: 20,
    objectFit: "cover",
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  contactInfo: {
    marginBottom: 10,
  },
  profession: {
    textAlign: "center",
    marginBottom: 5,
  },
  contactItem: {},
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 5,
  },
  entryContainer: {
    marginBottom: 7,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  institution: {
    fontWeight: "bold",
  },
  location: {
    color: "#7F8C8D",
  },
  degree: {
    fontStyle: "italic",
  },
  dates: {
    color: "#7F8C8D",
  },
  description: {
    marginLeft: 10,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  skill: {
    backgroundColor: "#a3a3a3",
    color: "white",
    padding: "3 6",
    borderRadius: 10,
    margin: 2,
  },
});
