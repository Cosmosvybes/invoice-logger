import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    padding: 40,
    lineHeight: 1.5,
    flexDirection: 'column',
    color: '#334155', // slate-700
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    marginBottom: 10,
  },
  brandName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a', // slate-900
  },
  title: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#7c3aed', // violet-600
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  invoiceId: {
    fontSize: 10,
    color: '#64748b', // slate-500
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  col: {
    flexDirection: 'column',
    width: '45%',
  },
  label: {
    fontSize: 8,
    color: '#94a3b8', // slate-400
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 11,
    color: '#0f172a', // slate-900
    fontFamily: 'Helvetica-Bold',
  },
  valueRegular: {
    fontSize: 11,
    color: '#334155', // slate-700
  },
  table: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc', // slate-50
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0', // slate-200
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9', // slate-100
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  cellId: { width: '6%', fontSize: 9 },
  cellDesc: { width: '44%', fontSize: 9 },
  cellQty: { width: '10%', textAlign: 'center', fontSize: 9 },
  cellPrice: { width: '20%', textAlign: 'right', fontSize: 9 },
  cellTotal: { width: '20%', textAlign: 'right', fontSize: 9, fontFamily: 'Helvetica-Bold' },
  
  cellHeader: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b', // slate-500
    textTransform: 'uppercase',
  },
  summary: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
  },
  rowSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  totalValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  grandTotal: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#7c3aed', // violet-600
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 8,
    color: '#94a3b8',
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: '#ecfccb', // lime-100
    color: '#4d7c0f', // lime-700
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
    fontSize: 9,
    marginTop: 10,
    alignSelf: 'flex-start',
    fontFamily: 'Helvetica-Bold',
  }
});

export default styles;
