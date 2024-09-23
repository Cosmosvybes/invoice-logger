import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "reactstrap";

interface PDFtype {
  file: any;
  reportType: string;
}
const PDFDownloader = ({ file, reportType }: PDFtype) => {
  return (
    <PDFDownloadLink document={file} fileName={`${reportType}.pdf`}>
      {({ loading }) =>
        loading ? <Button >Loading</Button> : <Button color="danger">Download</Button>
      }
    </PDFDownloadLink>
  );
};

export default PDFDownloader;
