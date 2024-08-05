import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  Description: string;
  Amount: number;
  unit_price: string;
  id: number | string;
}
export interface Invoice {
  id: string | number;
  AdditionalInfo: string;
  Business: string;
  BusinessAddress: string;
  BusinessState: string;
  BusinessCountry: string;
  City: string;
  state: string;
  Client: string;
  ClientAddress: string;
  ClientCity: string;
  Country: string;
  clientState: string;
  DateDue: string;
  DateIssued: string;
  IssuedBy: string;
  itemList: Item[];
}
export interface Invoices {
  invoices: Invoice[];
}
const initialState: Invoices = {
  invoices: [],
};
const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    draftInvoice: (state, action: PayloadAction<Invoice>) => {
      let invoice: Invoice = action.payload;
      state.invoices.push(invoice);
    },
    // updateInvoice: (state, action: PayloadAction<Invoice>) => {
    //   const { id, data } = action.payload;
    //   let invoice = state.invoices.find((invoice) => invoice.id == id);
    // },
  },
});

export default invoiceSlice.reducer;
export const { draftInvoice } = invoiceSlice.actions;
