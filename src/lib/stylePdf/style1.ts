import { StyleSheet, Font } from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", fontWeight: 300 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf", fontWeight: 500 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
});

export const styles1 = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 0,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#1a365d",
    padding: 20,
    color: "#FFFFFF",
  },
  mainContent: {
    width: "70%",
    padding: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    marginBottom: 20,
    alignSelf: "center",
    border: "4 solid #FFFFFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
    color: "#FFFFFF",
    textAlign: "center",
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3,
    color: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a365d",
    borderBottom: "2 solid #E2E8F0",
    paddingBottom: 5,
  },
  sidebarSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#FFFFFF",
    borderBottom: "1 solid #FFFFFF",
    paddingBottom: 3,
  },
  experienceEntry: {
    marginBottom: 15,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2D3748",
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "medium",
    color: "#4A5568",
    marginBottom: 3,
  },
  dateLocation: {
    fontSize: 10,
    color: "#718096",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: "#4A5568",
    lineHeight: 1.4,
  },
  skillItem: {
    fontSize: 10,
    color: "#E2E8F0",
    marginBottom: 5,
  },
  educationEntry: {
    marginBottom: 12,
  },
  institution: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2D3748",
  },
  degree: {
    fontSize: 10,
    color: "#4A5568",
  },
  additionalInfo: {
    fontSize: 10,
    color: "#E2E8F0",
    marginBottom: 3,
  },
});