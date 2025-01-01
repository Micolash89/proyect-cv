import { TypeIAData } from "../PreviewCV";
import { CVDataPdf as CVData, OptionsPDF } from "@/lib/definitions";
import { Layout1 } from "./Layout1";
import { Layout0 } from "./Layout0";
import { Layout2 } from "./Layout2";
import { Layout3 } from "./Layout3";
import { Layout4 } from "./Layout4";
import { Layout5 } from "./Layout5";
import { Layout6 } from "./Layout6";
import { Layout7 } from "./Layout7";

const MyDocumentPDF: React.FC<{
  cvData: CVData;
  iaData: TypeIAData;
  contador: number;
  optionsPDF: OptionsPDF;
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  switch (optionsPDF.tipoPdf) {
    case 0:
      return (
        <Layout0
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;

    case 1:
      return (
        <Layout1
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;

    case 2:
      return (
        <Layout2
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;

    case 3:
      return (
        <Layout3
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;
    case 4:
      return (
        <Layout4
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;
    case 5:
      return (
        <Layout5
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;

    case 6:
      return (
        <Layout6
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;

    case 7:
      return (
        <Layout7
          cvData={cvData}
          iaData={iaData}
          optionsPDF={optionsPDF}
          contador={contador}
        />
      );
      break;
  }
};

export default MyDocumentPDF;
