import { StyleSheet, Font } from "@react-pdf/renderer"

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Light.ttf", fontWeight: "light" },
    { src: "/fonts/Inter-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Inter-Medium.ttf", fontWeight: "medium" },
  ],
})

export const styles5 = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    padding: 40,
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 32,
    fontWeight: "light",
    letterSpacing: 1,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "light",
    color: "#333333",
    marginBottom: 20,
  },
  summary: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 30,
    lineHeight: 1.4,
  },
  divider: {
    borderBottom: "1 solid #000000",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "medium",
    marginBottom: 15,
  },
  skillsList: {
    marginBottom: 5,
  },
  skillItem: {
    marginBottom: 8,
  },
  educationEntry: {
    marginBottom: 20,
  },
  educationTitle: {
    fontSize: 12,
    fontWeight: "medium",
    marginBottom: 3,
  },
  educationSubtitle: {
    fontSize: 11,
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 11,
    color: "#333333",
  },
  experienceEntry: {
    marginBottom: 25,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: "medium",
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 11,
    marginBottom: 8,
  },
  experienceDescription: {
    fontSize: 11,
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 11,
  },
  contactItem: {
    marginBottom: 5,
  },
})

