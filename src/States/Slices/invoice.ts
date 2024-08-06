import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  description: string;
  amount: number;
  unit_price: string;
  itemID: number | string;
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
  drafts: [];
  outstanding: [];
}
const initialState: Invoices = {
  invoices: [],
  drafts: [],
  outstanding: [],
};

interface item {
  id: string | number;
  item: Item;
}

interface itemToDelete {
  invoiceId: number;
  itemId: number;
}
const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    draftInvoice: (state, action: PayloadAction<object>) => {
      state.drafts.push();
    },
    createInvoice: (state, action: PayloadAction<Invoice>) => {
      let invoice: Invoice = action.payload;
      state.invoices.push(invoice);
    },

    updateInvoiceItems: (state, action: PayloadAction<item>) => {
      const { id, item }: item = action.payload;
      let invoice = state.invoices.find((invoice) => invoice.id == id);
      invoice!.itemList.push(item);
    },

    deleteInvoiceItems: (state, action: PayloadAction<itemToDelete>) => {
      const { invoiceId, itemId }: itemToDelete = action.payload;
      let invoiceItemList = state.invoices.find(
        (invoice) => invoice.id == invoiceId
      )?.itemList;
      let item: any = invoiceItemList?.find(
        (data: Item) => data.itemID == itemId
      );
      let invoiceIndex = invoiceItemList!.indexOf(item);
      invoiceItemList!.splice(Number(invoiceIndex), 1);
      console.log(invoiceId, itemId);
    },
  },
});

export default invoiceSlice.reducer;
export const { createInvoice, deleteInvoiceItems, updateInvoiceItems } =
  invoiceSlice.actions;
