import { CVDataPdf, OptionsPDF } from "@/lib/definitions";
import { TypeIAData } from "../PreviewCV";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles7 } from "@/lib/stylePdf/style7";
import { getFontSize, getPadding } from "@/lib/utils";

export const Layout7: React.FC<{
  cvData: CVDataPdf;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  
  return (
    <Document>
      <Page size="A4" style={[styles7.page]}>
        {/* Header Section */}
        <View style={styles7.headerContainer}>
          {cvData.imagenPerfil && (
            <Image src={cvData.imagenPerfil} style={styles7.profileImage} />
          )}
          <View style={styles7.headerContent}>
            <Text style={[styles7.name, { fontSize: getFontSize(24,contador) }]}>
              {cvData.name} {cvData.lastName}
            </Text>
            <Text style={[styles7.contactInfo, { fontSize: getFontSize(11,contador) }]}>
              {cvData.ciudad}, {cvData.provincia}
              {cvData.dni && ` • DNI: ${cvData.dni}`} •{" "}
              {cvData.fechaNacimiento.split("-").reverse().join("/")} • Tel.:{" "}
              {cvData.phone}
              {cvData.email && ` • ${cvData.email}`}
            </Text>
          </View>
        </View>

        {/* Profile Summary */}
        <View style={{paddingHorizontal: getPadding(contador,45), paddingBottom: getPadding(contador,45)}}>
        
        {iaData.profile && (
          <View style={styles7.section}>
            <Text
              style={[styles7.profileText, { fontSize: getFontSize(10.5,contador) }]}
            >
              {iaData.profile}
            </Text>
          </View>
        )}

        {/* Main Content Grid */}
        <View style={styles7.mainContent}>
          {/* Left Column */}
          <View style={styles7.leftColumn}>
            {/* Education Section */}
            {cvData.education.length > 0 && (
              <View style={styles7.section}>
                <Text
                  style={[styles7.sectionTitle, { fontSize: getFontSize(14,contador) }]}
                >
                  EDUCACIÓN
                </Text>
                {cvData.education.map((edu: any, index: number) => (
                  <View key={index} style={styles7.entryContainer}>
                    <View style={styles7.entryHeader}>
                      <Text
                        style={[
                          styles7.institution,
                          { fontSize: getFontSize(11,contador) },
                        ]}
                      >
                        {edu.institucion}
                      </Text>
                      <Text
                        style={[styles7.dates, { fontSize: getFontSize(11,contador) }]}
                      >
                        {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                      </Text>
                    </View>
                    <Text
                      style={[styles7.degree, { fontSize: getFontSize(11,contador) }]}
                    >
                      {edu.carrera} ({edu.estado.toLowerCase()})
                    </Text>
                    <Text
                      style={[styles7.location, { fontSize: getFontSize(11,contador) }]}
                    >
                      {edu.zonaInstitucion}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills Section */}
            {iaData.skills && (
              <View style={styles7.section}>
                <Text
                  style={[styles7.sectionTitle, { fontSize: getFontSize(14,contador) }]}
                >
                  HABILIDADES
                </Text>
                <View style={styles7.skillsGrid}>
                  {iaData.skills.split("•").map(
                    (skill: any, index: number) =>
                      skill.trim() && (
                        <Text
                          key={index}
                          style={[
                            styles7.skillItem,
                            { fontSize: getFontSize(11,contador) },
                          ]}
                        >
                          • {skill.trim()}
                        </Text>
                      )
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles7.rightColumn}>
            {/* Experience Section */}
            {cvData.experience.length > 0 && (
              <View style={styles7.section}>
                <Text
                  style={[styles7.sectionTitle, { fontSize: getFontSize(14,contador) }]}
                >
                  EXPERIENCIA PROFESIONAL
                </Text>
                {cvData.experience.map((exp, index) => (
                  <View key={index} style={styles7.entryContainer}>
                    <View style={styles7.entryHeader}>
                      <Text
                        style={[
                          styles7.institution,
                          { fontSize: getFontSize(11,contador) },
                        ]}
                      >
                        {exp.nombreEmpresa}
                      </Text>
                      <Text
                        style={[styles7.dates, { fontSize: getFontSize(11,contador) }]}
                      >
                        {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                      </Text>
                    </View>
                    <Text
                      style={[styles7.jobTitle, { fontSize: getFontSize(11,contador) }]}
                    >
                      {exp.puesto}
                    </Text>
                    <Text
                      style={[styles7.location, { fontSize: getFontSize(11,contador) }]}
                    >
                      {exp.zonaEmpresa}
                    </Text>
                    <Text
                      style={[
                        styles7.description,
                        { fontSize: getFontSize(11,contador) },
                      ]}
                    >
                      • {iaData.descriptionWork.split("\n")[index]}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles7.footer}>
          {(cvData.licencia ||
            cvData.movilidad ||
            cvData.incorporacion ||
            cvData.disponibilidad ||
            cvData.office ||
            cvData.idiomas.length > 0) && (
            <View style={styles7.section}>
              <Text
                style={[styles7.sectionTitle, { fontSize: getFontSize(14,contador) }]}
              >
                INFORMACIÓN ADICIONAL
              </Text>
              <Text
                style={[styles7.additionalInfo, { fontSize: getFontSize(11,contador) }]}
              >
                {[
                  cvData.licencia && "Licencia de conducir",
                  cvData.movilidad && "Vehículo propio",
                  cvData.incorporacion && "Disponibilidad inmediata",
                  cvData.disponibilidad && `Jornada: ${cvData.disponibilidad}`,
                  cvData.office && "Microsoft Office",
                  ...cvData.idiomas.map(
                    (idioma) =>
                      `${idioma.idioma} - ${idioma.nivel.toLowerCase()}`
                  ),
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </Text>
            </View>
          )}
        </View>
        </View>
      </Page>
    </Document>
  );
};
