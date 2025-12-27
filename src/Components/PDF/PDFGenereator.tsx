import {
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/react.svg"; // Fallback logo
import { Invoice } from "../../States/Slices/invoice.types";
import styles from "./Components/style/PDFStyles";

export interface pdfPropTypes {
  invoiceInformation: Invoice;
}

const GeneratePDF = ({ invoiceInformation }: pdfPropTypes) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logo} style={styles.logo} />
            <Text style={styles.brandName}>{invoiceInformation.Business || "Invoice Logger"}</Text>
            <Text style={styles.valueRegular}>{invoiceInformation.BusinessAddress}</Text>
            <Text style={styles.valueRegular}>
                {invoiceInformation.City}, {invoiceInformation.BusinessState}
            </Text>
            <Text style={styles.valueRegular}>{invoiceInformation.BusinessCountry}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceId}>#{invoiceInformation.id}</Text>
            <Text style={styles.invoiceId}>Date: {invoiceInformation.DateIssued}</Text>
            <Text style={styles.invoiceId}>Due: {invoiceInformation.DateDue}</Text>
            {/* Status Placeholder - ReactPDF doesn't support fancy badges well but we simulate it in styles */}
          </View>
        </View>

        {/* Bill To & Details Grid */}
        <View style={styles.grid}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill To:</Text>
            <Text style={styles.value}>{invoiceInformation.Client}</Text>
            <Text style={styles.valueRegular}>{invoiceInformation.ClientAddress}</Text>
            <Text style={styles.valueRegular}>
              {invoiceInformation.ClientCity} {invoiceInformation.clientState}
            </Text>
            <Text style={styles.valueRegular}>{invoiceInformation.Country}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Payment Info:</Text>
            <Text style={styles.valueRegular}>{invoiceInformation.paymentInformation || "Bank Transfer"}</Text>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.valueRegular}>{invoiceInformation.Notes || "Thank you for your business."}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
            {/* Header Row */}
            <View style={styles.tableHeader}>
                <Text style={[styles.cellId, styles.cellHeader]}>ID</Text>
                <Text style={[styles.cellDesc, styles.cellHeader]}>Description</Text>
                <Text style={[styles.cellQty, styles.cellHeader]}>Qty</Text>
                <Text style={[styles.cellPrice, styles.cellHeader]}>Price</Text>
                <Text style={[styles.cellTotal, styles.cellHeader]}>Total</Text>
            </View>

            {/* Rows */}
            {invoiceInformation?.itemList?.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                     <Text style={styles.cellId}>{index + 1}</Text>
                     <Text style={styles.cellDesc}>{item.description}</Text>
                     <Text style={styles.cellQty}>{item.quantity}</Text>
                     <Text style={styles.cellPrice}>{Number(item.unitPrice).toLocaleString()}</Text>
                     <Text style={styles.cellTotal}>{Number(item.unitTotal).toLocaleString()}</Text>
                </View>
            ))}
        </View>

        {/* Totals Summary */}
        <View style={styles.summary}>
            <View style={styles.rowSummary}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>
                    {(Number(invoiceInformation.TOTAL) / (1 + (Number(invoiceInformation.VAT) / 100))).toLocaleString()} {invoiceInformation.currency}
                </Text>
            </View>
            {Number(invoiceInformation.VAT) > 0 && (
                 <View style={styles.rowSummary}>
                    <Text style={styles.totalLabel}>VAT ({invoiceInformation.VAT}%)</Text>
                    <Text style={styles.totalValue}>
                        {(Number(invoiceInformation.TOTAL) - (Number(invoiceInformation.TOTAL) / (1 + (Number(invoiceInformation.VAT) / 100)))).toLocaleString()} {invoiceInformation.currency}
                    </Text>
                 </View>
            )}
            {Number(invoiceInformation.Discount) > 0 && (
                <View style={styles.rowSummary}>
                     <Text style={styles.totalLabel}>Discount ({invoiceInformation.Discount}%)</Text>
                      <Text style={[styles.totalValue, { color: '#ef4444' }]}>
                        -{invoiceInformation.Discount}%
                    </Text>
                </View>
            )}
             <View style={[styles.rowSummary, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#e2e8f0' }]}>
                <Text style={[styles.totalLabel, { fontSize: 14, color: '#7c3aed' }]}>Grand Total</Text>
                <Text style={styles.grandTotal}>
                     {Number(invoiceInformation.TOTAL).toLocaleString()} {invoiceInformation.currency}
                </Text>
            </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
            <Text style={styles.footerText}>Thank you for your business!</Text>
            <Text style={styles.footerText}>
                {invoiceInformation.Business} | {invoiceInformation.BusinessAddress} | Generated by Invoice Logger
            </Text>
        </View>

      </Page>
    </Document>
  );
};

export default GeneratePDF;
