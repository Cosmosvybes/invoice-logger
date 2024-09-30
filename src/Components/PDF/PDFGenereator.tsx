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
      borderColor: "grey",
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
      borderBottom: "grey",
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
      fontSize: 8,
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
      backgroundColor: "#E4E4E4",
      "@media max-width: 400": {
        width: 300,
      },
      "@media orientation: landscape": {
        width: 400,
      },
    },
    header: {
      fontSize: 8,
      textAlign: "center",
      color: "grey",
      marginBottom: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image src={logo} style={styles.logo} />
        <View
          style={{
            display: "flex",
            paddingLeft: 140,
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Text style={styles.title}>
            ~ Invoice ref- {invoiceInformation.id} ~
          </Text>
        </View>

        <br />
        <View
          style={{
            display: "flex",
            paddingLeft: 140,
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Text style={{ textAlign: "justify", fontSize: 4 }}>
            {" "}
            Created since- {" " + invoiceInformation.DateIssued}
          </Text>
          <Text style={{ textAlign: "justify", fontSize: 4 }}>
            {" "}
            Company address -{invoiceInformation.BusinessAddress}
            {""} {invoiceInformation.ClientCity}, {""}
            {invoiceInformation.BusinessState}.
          </Text>
        </View>

        <br />
        <View
          style={{
            display: "flex",
            paddingLeft: 140,
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ textAlign: "left", fontSize: 8 }}>Products</Text>
        </View>

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
              <View style={styles.tableCol} key={product.itemID}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{product.itemID}</Text>
                  <Text style={styles.tableCell}>{product.description}</Text>
                  <Text style={styles.tableCell}>{product.quantity}</Text>
                  <Text style={styles.tableCell}>{product.unitPrice}</Text>
                  <Text style={styles.tableCell}>
                    {Number(product.unitTotal).toLocaleString()}
                  </Text>
                </View>
              </View>
            )
          )}
          <br />
          <View
            style={{
              display: "flex",
              paddingLeft: 140,
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "justify", fontSize: 4 }}>
              {" "}
              Transaction notes - {invoiceInformation.Notes}
            </Text>
            <Text style={{ textAlign: "justify", fontSize: 4 }}>
              {" "}
              Payment information - {invoiceInformation.paymentInformation}
            </Text>
            <Text style={{ textAlign: "justify", fontSize: 4 }}>
              {" "}
              Shipping Address - {invoiceInformation.shippingAddress}{" "}
            </Text>
          </View>

          <br />
          <View
            style={{
              display: "flex",
              paddingRight: 140,
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "right", fontSize: 4 }}>
              {" "}
              Discount - {invoiceInformation.Discount}%
            </Text>
            <Text style={{ textAlign: "right", fontSize: 4 }}>
              {" "}
              VAT - {invoiceInformation.VAT}%
            </Text>
            <Text style={{ textAlign: "right", fontSize: 4 }}>
              {" "}
              TOTAL - {invoiceInformation.TOTAL.toLocaleString()}{" "}
              {invoiceInformation.currency}
            </Text>
          </View>

          <br />
          <View
            style={{
              display: "flex",
              paddingLeft: 140,
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "justify", fontSize: 4 }}>
              {" "}
              Customer name - {invoiceInformation.Client}
            </Text>
            <Text style={{ textAlign: "justify", fontSize: 4 }}>
              {" "}
              Customer address- {invoiceInformation.ClientAddress}{" "}
              {invoiceInformation.City}
              {invoiceInformation.clientState} {invoiceInformation.Country}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GeneratePDF;
