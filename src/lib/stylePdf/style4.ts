import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "/fonts/Helvetica-Regular.ttf" },
    { src: "/fonts/Helvetica-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Helvetica-Oblique.ttf", fontStyle: "italic" },
  ],
});

Font.register({
  family: "Signature",
  fonts: [
    { src: "/fonts/Quensialy-Signature.ttf" },
  ],
});

export const styles4 = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
    fontFamily: "Helvetica",
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
  leftColumn: {
    width: "35%",
    paddingRight: 20,
    borderRight: "1 solid #DDDDDD",
  },
  rightColumn: {
    width: "65%",
    paddingLeft: 20,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#333333",
    fontWeight: "bold",
  },
  nameBack:{
    fontFamily: "Signature",
    fontSize: 75,
    position: "absolute",
    top: 0,
    right: "5%",
    color: "#DDDDDD",
  },
  title: {
    fontSize: 14,
    letterSpacing: 1,
    color: "#666666",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 10,
    color: "#333333",
    borderBottom: "1 solid #DDDDDD",
    paddingBottom: 5,
    fontWeight: "bold",
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
    color: "#444444",
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 5,
    color: "#444444",
  },
  languageItem: {
    fontSize: 10,
    marginBottom: 5,
    color: "#444444",
    textTransform: "capitalize",
  },
  profileSummary: {
    fontSize: 10,
    marginBottom: 15,
    lineHeight: 1.4,
    color: "#444444",
    textAlign: "justify",
  },
  experienceEntry: {
    marginBottom: 10,
  },
  companyName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333333",
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "medium",
    marginBottom: 3,
    color: "#444444",
  },
  dateLocation: {
    fontSize: 9,
    color: "#666666",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#444444",
    marginBottom: 5,
  },
  educationEntry: {
    marginBottom: 5,
  },
  institution: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333333",
  },
  degree: {
    fontSize: 10,
    color: "#444444",
    marginBottom: 2,
  },
  gpa: {
    fontSize: 9,
    color: "#666666",
  },
  divider: {
    borderBottom: "1 solid #DDDDDD",
    marginVertical: 10,
  },
  profileImage: {
    borderRadius: 50,
    marginBottom: 20,
    height: 150,
    alignSelf: "center",
    objectFit: "cover",
  },
  profession: {
    textAlign: "center",
    marginBottom: 5,
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
    fontSize: 8,
  },
});
