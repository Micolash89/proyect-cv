import { StyleSheet, Font } from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Montserrat",
  fonts: [
    { src: "/fonts/Montserrat-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Montserrat-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Montserrat-Bold.ttf", fontWeight: 700 },
  ],
});

export const styles3 = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: "Montserrat",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A4365",
    padding: 20,
    marginBottom: 20,
  },
  headerContent: {
    marginLeft: 20,
    flex: 1,
  },
  container: {
    flexDirection: "row",
    padding: 20,
  },
  leftColumn: {
    width: "35%",
    paddingRight: 10,
  },
  rightColumn: {
    width: "65%",
    borderLeft: "1 solid #E2E8F0",
    paddingLeft: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 50,
    border: "4 solid #FFFFFF",
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    color: "#CBD5E0",
    fontWeight: "medium",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#2A4365",
    fontWeight: "bold",
    borderBottom: "2 solid #E2E8F0",
    paddingBottom: 5,
    marginBottom: 10,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactText: {
    color: "#4A5568",
    marginBottom: 3,
  },
  skillItem: {
    color: "#4A5568",
    marginBottom: 5,
  },
  languageItem: {
    marginBottom: 5,
  },
  languageName: {
    color: "#2D3748",
    fontWeight: "medium",
  },
  languageLevel: {
    color: "#718096",
  },
  profileText: {
    color: "#4A5568",
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  companyName: {
    color: "#2D3748",
    fontWeight: "bold",
  },
  jobTitle: {
    color: "#4A5568",
    fontWeight: "medium",
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 10,
    color: "#718096",
  },
  locationText: {
    color: "#718096",
    marginBottom: 3,
  },
  description: {
    color: "#4A5568",
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  institutionName: {
    color: "#2D3748",
    fontWeight: "bold",
  },
  degree: {
    color: "#4A5568",
    marginBottom: 2,
  },
  certificationItem: {
    marginBottom: 8,
  },
  certificationName: {
    fontSize: 10,
    color: "#2D3748",
    fontWeight: "medium",
  },
  certificationInstitution: {
    fontSize: 9,
    color: "#718096",
  },
});
