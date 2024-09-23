import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/react.svg";
import { Invoice } from "../../States/Slices/invoice.types";

export interface pdfPropTypes {
  headers: string[];
  invoiceInformation: Invoice;
}
const GeneratePDF = ({ headers, invoiceInformation }: pdfPropTypes) => {
  const styles = StyleSheet.create({
    table: {
      display: "flex",
      position: "relative",
      borderColor: "#bfbfbf",
      justifyContent: "flex-start",
    },
    tableRow: {
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      borderTopWidth: 1,
      justifyContent: "center",
      alignItems: "stretch",
      textAlign: "center",
    },
    tableCol: {
      borderStyle: "dotted",
      display: "flex",
      borderBottom: "black",
      flexDirection: "column",
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 4,
      marginBottom: 3,
      textAlign: "center",
      fontStyle: "serif",
      width: "10%",
    },
    logo: {
      position: "relative",
      width: "25%",
    },
    title: {
      fontSize: 24,
      marginBottom: 3,
      textAlign: "center",
    },
    reportType: {
      fontSize: 10,
      fontWeight: "extrabold",
      marginTop: 10,
      marginBottom: 10,
      textAlign: "center",
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
  });

  return (
    <Document>
      <Page size={"A4"} style={styles.body}>
        <Image src={logo} style={styles.logo} />
        <Text style={styles.title}>~ Invoice ref-11234567 </Text>
        <br />
        <Text style={styles.header}>
        
          Received since,
          {new Date().toLocaleString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "2-digit",
            minute: "numeric",
            hour: "numeric",
          })}
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {headers.map((header: any) => (
              <Text style={styles.tableCell} key={header}>
                {header}
              </Text>
            ))}
          </View>

          {invoiceInformation?.itemList?.map(
            (product: (typeof invoiceInformation.itemList)[0]) => (
              <View style={styles.tableCol}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{product.itemID}</Text>
                  <Text style={styles.tableCell}>{product.description}</Text>
                  <Text style={styles.tableCell}>{product.quantity}</Text>
                  <Text style={styles.tableCell}>{product.unitPrice}</Text>
                  <Text style={styles.tableCell}>{product.unitTotal}</Text>
                </View>
              </View>
            )
          )}
        </View>
      </Page>
    </Document>
  );
};

export default GeneratePDF;
