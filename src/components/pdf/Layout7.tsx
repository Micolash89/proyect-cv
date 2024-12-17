import { CVDataPdf } from '@/lib/definitions';
import { TypeIAData } from '../PreviewCV';
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
// import { styles } from "./styles";
// import { CVData, TypeIAData } from "@/lib/definitions";
import { styles7} from "@/lib/stylePdf/style7";

export const Layout7: React.FC<{
  cvData: CVDataPdf;
    iaData: TypeIAData;
    contador: number;
    optionsPDF: { color: string; spaceBetween: boolean; tipoPdf: number };
  }> = ({ cvData, iaData, contador, optionsPDF }) => {
  // Dynamic padding calculation based on content length
  const getPadding = () => {
    const baseSize = 45;
    const reduction = contador <= 5 ? contador * 5 : 25;
    return baseSize - reduction;
  };

  // Dynamic font size calculation
  const getFontSize = (baseSize: number) => baseSize + contador;

  return (
    <Document>
      <Page size="A4" style={[styles7.page, { padding: getPadding() }]}>
        {/* Header Section */}
        <View style={styles7.headerContainer}>
          {cvData.imagenPerfil && (
            <Image src={cvData.imagenPerfil} style={styles7.profileImage} />
          )}
          <View style={styles7.headerContent}>
            <Text style={[styles7.name, { fontSize: getFontSize(24) }]}>
              {cvData.name} {cvData.lastName}
            </Text>
            <Text style={[styles7.contactInfo, { fontSize: getFontSize(11) }]}>
              {cvData.ciudad}, {cvData.provincia}
              {cvData.dni && ` • DNI: ${cvData.dni}`} •{" "}
              {cvData.fechaNacimiento.split("-").reverse().join("/")} • Tel.: {cvData.phone}
              {cvData.email && ` • ${cvData.email}`}
            </Text>
          </View>
        </View>

        {/* Profile Summary */}
        {iaData.profile && (
          <View style={styles7.section}>
            <Text style={[styles7.profileText, { fontSize: getFontSize(10.5) }]}>
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
                <Text style={[styles7.sectionTitle, { fontSize: getFontSize(14) }]}>
                  EDUCACIÓN
                </Text>
                {cvData.education.map((edu: any, index:number) => (
                  <View key={index} style={styles7.entryContainer}>
                    <View style={styles7.entryHeader}>
                      <Text style={[styles7.institution, { fontSize: getFontSize(11) }]}>
                        {edu.institucion}
                      </Text>
                      <Text style={[styles7.dates, { fontSize: getFontSize(11) }]}>
                        {edu.anioInicioEducacion} - {edu.anioFinEducacion}
                      </Text>
                    </View>
                    <Text style={[styles7.degree, { fontSize: getFontSize(11) }]}>
                      {edu.carrera} ({edu.estado.toLowerCase()})
                    </Text>
                    <Text style={[styles7.location, { fontSize: getFontSize(11) }]}>
                      {edu.zonaInstitucion}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills Section */}
            {iaData.skills && (
              <View style={styles7.section}>
                <Text style={[styles7.sectionTitle, { fontSize: getFontSize(14) }]}>
                  HABILIDADES
                </Text>
                <View style={styles7.skillsGrid}>
                  {iaData.skills.split("•").map((skill:any, index:number) => (
                    skill.trim() && (
                      <Text key={index} style={[styles7.skillItem, { fontSize: getFontSize(11) }]}>
                        • {skill.trim()}
                      </Text>
                    )
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles7.rightColumn}>
            {/* Experience Section */}
            {cvData.experience.length > 0 && (
              <View style={styles7.section}>
                <Text style={[styles7.sectionTitle, { fontSize: getFontSize(14) }]}>
                  EXPERIENCIA PROFESIONAL
                </Text>
                {cvData.experience.map((exp, index) => (
                  <View key={index} style={styles7.entryContainer}>
                    <View style={styles7.entryHeader}>
                      <Text style={[styles7.institution, { fontSize: getFontSize(11) }]}>
                        {exp.nombreEmpresa}
                      </Text>
                      <Text style={[styles7.dates, { fontSize: getFontSize(11) }]}>
                        {exp.anioInicioExperiencia} - {exp.anioFinExperiencia}
                      </Text>
                    </View>
                    <Text style={[styles7.jobTitle, { fontSize: getFontSize(11) }]}>
                      {exp.puesto}
                    </Text>
                    <Text style={[styles7.location, { fontSize: getFontSize(11) }]}>
                      {exp.zonaEmpresa}
                    </Text>
                    <Text style={[styles7.description, { fontSize: getFontSize(11) }]}>
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
          {(cvData.licencia || cvData.movilidad || cvData.incorporacion || 
            cvData.disponibilidad || cvData.office || cvData.idiomas.length > 0) && (
            <View style={styles7.section}>
              <Text style={[styles7.sectionTitle, { fontSize: getFontSize(14) }]}>
                INFORMACIÓN ADICIONAL
              </Text>
              <Text style={[styles7.additionalInfo, { fontSize: getFontSize(11) }]}>
                {[
                  cvData.licencia && "Licencia de conducir",
                  cvData.movilidad && "Vehículo propio",
                  cvData.incorporacion && "Disponibilidad inmediata",
                  cvData.disponibilidad && `Jornada: ${cvData.disponibilidad}`,
                  cvData.office && "Microsoft Office",
                  ...cvData.idiomas.map(
                    (idioma) => `${idioma.idioma} - ${idioma.nivel.toLowerCase()}`
                  ),
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};