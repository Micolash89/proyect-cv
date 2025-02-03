import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Hel",
  fonts: [
    { src: "/fonts/Helvetica-Light.ttf", fontWeight: "light" },
    { src: "/fonts/Helvetica-Medium.ttf", fontWeight: "medium" },
    { src: "/fonts/Helvetica-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Helvetica-Oblique.ttf", fontStyle: "italic" },
  ],
});

export const styles5 = StyleSheet.create({
  page: {
    fontFamily: "Hel",
    flexDirection: "row",
  },
  leftColumn: {
    width: "35%",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 5,
    paddingBottom: 0,
    marginTop: 230,
  },
  rightColumn: {
    width: "65%",
    paddingTop: 240,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 230,
  },
  headerImage: {
    width: "35%",
    height: 230,
    objectFit: "cover",
    filter: "grayscale(100%)",
  },
  headerContent: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "65%",
    height: 230,
    padding: 20,
    backgroundColor: "#ededed",
  },
  name: {
    fontSize: 45,
    fontWeight: "light",
    letterSpacing: 3,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    lineHeight: 1,
  },
  lastName: {
    fontSize: 45,
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 0,
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 30,
    marginLeft: 20,
    letterSpacing: 1,
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 5,
    letterSpacing: 1,
    color: "white",
  },
  rightSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 7,
    letterSpacing: 1,
    color: "#000000",
  },
  contactInfo: {
    marginBottom: 40,
  },
  contactItem: {
    fontSize: 11,
    marginBottom: 8,
    color: "white",
  },
  skillsList: {
    marginBottom: 30,
  },
  skillItem: {
    fontSize: 11,
    marginBottom: 8,
    color: "white",
  },
  profileText: {
    fontSize: 11,
    marginBottom: 5,
    color: "#333333",
  },
  languageItem: {
    marginBottom: 8,
  },
  languageName: {
    fontSize: 11,
    marginBottom: 3,
    color: "white",
  },
  languageLevel: {
    fontSize: 10,
    color: "#CCCCCC",
    fontStyle: "italic",
  },
  experienceEntry: {
    marginBottom: 10,
  },
  experienceDate: {
    fontSize: 11,
    marginBottom: 5,
    color: "#333333",
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333333",
  },
  experienceCompany: {
    fontSize: 11,
    marginBottom: 8,
    color: "#666666",
  },
  experienceDescription: {
    fontSize: 11,
    color: "#333333",
    lineHeight: 1.1,
  },
  educationEntry: {
    marginBottom: 20,
  },
  educationTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333333",
  },
  educationDetails: {
    fontSize: 11,
    color: "#666666",
    marginBottom: 3,
  },
  educationDate: {
    fontSize: 11,
    color: "#333333",
  },
});
