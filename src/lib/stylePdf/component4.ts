import { StyleSheet } from "@react-pdf/renderer";
import { colors } from "./colors4";

export const componentStyles = StyleSheet.create({
  headerBackground: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // height: 160,
    // backgroundColor: colors.primary,
    // zIndex: 0,
  },
  headerAccent: {
    // position: "absolute",
    // top: 0,
    // right: 0,
    // width: 200,
    // height: 160,
    // backgroundColor: colors.accent,
    // opacity: 0.1,
    // zIndex: 0,
  },
  profileContainer: {
    marginTop: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    border: `4 solid ${colors.text.white}`,
    backgroundColor: colors.background,
  },
  nameContainer: {
    marginLeft: 30,
  },
  name: {
    fontSize: 32,
    color: colors.text.white,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  title: {
    fontSize: 16,
    color: colors.text.white,
    opacity: 0.9,
    marginTop: 4,
  },
  mainContent: {
    flexDirection: "row",
    padding: "40 40 20 40",
  },
  leftColumn: {
    width: "32%",
    paddingRight: 30,
  },
  rightColumn: {
    width: "68%",
    paddingLeft: 30,
    borderLeft: `2 solid ${colors.border.light}`,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.text.accent,
    fontWeight: "bold",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactItem: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  skillContainer: {
    marginBottom: 15,
  },
  skillCategory: {
    fontSize: 11,
    color: colors.text.accent,
    fontWeight: "bold",
    marginBottom: 6,
  },
  skillItem: {
    fontSize: 10,
    color: colors.text.secondary,
    backgroundColor: colors.skill.background,
    padding: "4 8",
    borderRadius: 4,
    marginBottom: 4,
    marginRight: 4,
    // display: "inline",
  },
  languageItem: {
    marginBottom: 8,
  },
  languageName: {
    fontSize: 11,
    color: colors.text.primary,
    fontWeight: "medium",
  },
  languageLevel: {
    fontSize: 10,
    color: colors.text.light,
    marginTop: 2,
  },
  profileText: {
    fontSize: 11,
    color: colors.text.secondary,
    lineHeight: 1.6,
    marginBottom: 20,
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: `1 solid ${colors.border.light}`,
  },
  experienceHeader: {
    marginBottom: 8,
  },
  companyName: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 12,
    color: colors.text.accent,
    fontWeight: "medium",
    marginTop: 4,
  },
  dateLocation: {
    fontSize: 10,
    color: colors.text.light,
    marginTop: 4,
  },
  description: {
    fontSize: 10,
    color: colors.text.secondary,
    lineHeight: 1.5,
    marginTop: 8,
  },
  educationItem: {
    marginBottom: 15,
  },
  institutionName: {
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: "bold",
  },
  degree: {
    fontSize: 11,
    color: colors.text.accent,
    marginTop: 4,
  },
  certificationItem: {
    marginBottom: 10,
  },
  certificationName: {
    fontSize: 11,
    color: colors.text.primary,
    fontWeight: "medium",
  },
  certificationInstitution: {
    fontSize: 10,
    color: colors.text.light,
    marginTop: 2,
  },
});