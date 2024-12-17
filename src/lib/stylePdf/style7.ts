
import { StyleSheet } from "@react-pdf/renderer";

export const styles7 = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#2C3E50",
    padding: 20,
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    marginLeft: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    border: "3 solid #FFFFFF",
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactInfo: {
    color: "#ECF0F1",
  },
  mainContent: {
    flexDirection: "row",
    paddingTop: 20,
  },
  leftColumn: {
    width: "40%",
    paddingRight: 15,
  },
  rightColumn: {
    width: "60%",
    paddingLeft: 15,
    borderLeft: "1 solid #BDC3C7",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#2C3E50",
    fontWeight: "bold",
    borderBottom: "1 solid #BDC3C7",
    paddingBottom: 5,
    marginBottom: 10,
  },
  entryContainer: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  institution: {
    fontWeight: "bold",
    color: "#2C3E50",
  },
  dates: {
    color: "#7F8C8D",
  },
  location: {
    color: "#7F8C8D",
    fontStyle: "italic",
  },
  degree: {
    color: "#34495E",
  },
  jobTitle: {
    color: "#2980B9",
    fontWeight: "bold",
  },
  description: {
    color: "#34495E",
    marginTop: 5,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    color: "#34495E",
    marginRight: 10,
    marginBottom: 5,
  },
  profileText: {
    color: "#34495E",
    fontStyle: "italic",
    textAlign: "justify",
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
    borderTop: "1 solid #BDC3C7",
    paddingTop: 15,
  },
  additionalInfo: {
    color: "#34495E",
    textAlign: "center",
  },
});