import { StyleSheet } from "@react-pdf/renderer"

// Usamos Helvetica que viene por defecto en react-pdf
export const styles5 = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    flexDirection: "row",
  },
  leftColumn: {
    width: "35%",
    padding: 30,
    marginTop: 250,
  },
  rightColumn: {
    width: "65%",
    padding: 30,
    paddingTop: 280,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  headerImage: {
    width: "35%",
    height: 250,
    objectFit: "cover",
    zIndex: 2,
  },
  headerContent: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "65%",
    height: 250,
    padding: 30,
    backgroundColor: "#F5F5F5",
  },
  name: {
    fontSize: 40,
    fontWeight: "light",
    letterSpacing: 2,
    marginBottom: 5,
  },
  lastName: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    letterSpacing: 1,
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 15,
    letterSpacing: 1,
    color: "white",
  },
  rightSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    letterSpacing: 1,
    color: "#333333",
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
    marginBottom: 40,
  },
  skillItem: {
    fontSize: 11,
    marginBottom: 8,
    color: "white",
  },
  languageItem: {
    marginBottom: 8,
  },
  languageName: {
    fontSize: 11,
    color: "white",
  },
  languageLevel: {
    fontSize: 10,
    color: "#CCCCCC",
    fontStyle: "italic",
  },
  experienceEntry: {
    marginBottom: 25,
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
    lineHeight: 1.4,
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
  },
  educationDate: {
    fontSize: 11,
    color: "#333333",
  },
})

