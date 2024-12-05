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
    padding: 30,
    marginBottom: 20,
  },
  headerContent: {
    marginLeft: 20,
    flex: 1,
  },
  container: {
    flexDirection: "row",
    padding: "0 30",
  },
  leftColumn: {
    width: "30%",
    paddingRight: 20,
  },
  rightColumn: {
    width: "70%",
    borderLeft: "1 solid #E2E8F0",
    paddingLeft: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    border: "4 solid #FFFFFF",
  },
  name: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: "#CBD5E0",
    fontWeight: "medium",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
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
    fontSize: 10,
    color: "#4A5568",
    marginBottom: 3,
  },
  skillItem: {
    fontSize: 10,
    color: "#4A5568",
    marginBottom: 5,
  },
  languageItem: {
    marginBottom: 5,
  },
  languageName: {
    fontSize: 10,
    color: "#2D3748",
    fontWeight: "medium",
  },
  languageLevel: {
    fontSize: 9,
    color: "#718096",
  },
  profileText: {
    fontSize: 10,
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
    fontSize: 12,
    color: "#2D3748",
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 11,
    color: "#4A5568",
    fontWeight: "medium",
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 10,
    color: "#718096",
  },
  locationText: {
    fontSize: 10,
    color: "#718096",
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
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
    fontSize: 11,
    color: "#2D3748",
    fontWeight: "bold",
  },
  degree: {
    fontSize: 10,
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