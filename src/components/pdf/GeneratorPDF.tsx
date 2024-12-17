import {
  Document,
  Page,
  Text,
  View,
  Image,
  Svg,
  Circle,
} from "@react-pdf/renderer";
import { TypeIAData } from "../PreviewCV";
import React from "react";
import { styles as stylesDefault } from "@/lib/stylePdf/styleDefault";
import { CVDataPdf as CVData } from "@/lib/definitions";
import { styles2 } from "@/lib/stylePdf/style2";
import { styles3 } from "@/lib/stylePdf/style3";
import { styles4 } from "@/lib/stylePdf/style4";
import { componentStyles } from "@/lib/stylePdf/component4";
import { styles5 } from "@/lib/stylePdf/style5";
import { styles6 } from "@/lib/stylePdf/style6";
import { styles7 } from "@/lib/stylePdf/style7";
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
  optionsPDF: { color: string; spaceBetween: boolean; tipoPdf: number };
}> = ({ cvData, iaData, contador, optionsPDF }) => {
  switch (optionsPDF.tipoPdf) {
    case 0:
      return (
        <Layout0 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />
      );
      break;
      
      case 1:
      return <Layout1 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />
      break;

    case 2:
      return (
        <Layout2 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />
      );
      break;

    case 3:
      return (
        <Layout3 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />
      );
      break;
    case 4:
      return(
        <Layout4 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />
      )
      break;
    case 5:
      return (<Layout5 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />)
      break;

    case 6:
    return (
      <Layout6 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />
    )
      break;

      case 7:
       
      return (<Layout7 cvData={cvData} iaData={iaData} optionsPDF={optionsPDF} contador={contador} />)
        break;

  }

};

export default MyDocumentPDF;
