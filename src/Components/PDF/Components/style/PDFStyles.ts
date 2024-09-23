import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  table: {
    display: "flex",
    position: "relative",
    borderColor: "#bfbfbf",
    justifyContent: "center",
  },
  tableRow: {
    margin: "full",
    display: "flex",
    flexDirection: "row",
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
    borderStyle: "solid",
    borderColor: "lightgray",
  },
  tableCol: {
    borderStyle: "solid",
    borderColor: "gray",
    display: "flex",
    borderBottom: "lightgray",
    borderTop: "lightgray",
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
    marginTop: 5,
    marginLeft: 5,
    width: "25%",
  },
  title: {
    fontSize: 14,
    fontWeight: "extrabold",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  reportType: {
    fontSize: 10,
    fontWeight: "extrabold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});
export default styles;
