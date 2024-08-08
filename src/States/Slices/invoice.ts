import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "react-huge-icons/outline";
import useModalController from "../../Components/UI/Tools/InvoiceModal/controller";

export interface Item {
  description: string;
  amount: number;
  unit_price: string;
  itemID: number | string;
}
export interface Invoice {
  TOTAL: number;
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
  sent: [];
  revenue: number;
  staticForm: object | any;
}
const { combinedForm } = useModalController();

let invoiceStaticValue = combinedForm.reduce(
  (valuesBucket: any, currVa: any) => ({
    ...valuesBucket,
    [currVa.name]: currVa.value,
  }),
  { id: Date.now() }
);
const initialState: Invoices = {
  invoices: [],
  sent: [],
  revenue: 0,
  staticForm: invoiceStaticValue,
};

interface item {
  id: string | number;
  item: Item;
}

interface itemToDelete {
  invoiceId: number;
  itemID: number | string;
}

export interface keyValue {
  key: string | number | boolean | any;
  value: string | number | boolean;
  invoiceID: number | string | any;
}
const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    // deleteInvoice: (state, action) => {},

    updateInvoiceInformation: (state, action: PayloadAction<keyValue>) => {
      const { key, value, invoiceID } = action.payload;
      let outDatedinvoice: string | number | boolean | any =
        state.invoices.find((invoice) => invoice.id == invoiceID);
      outDatedinvoice[key] = value;
    },

    createInvoice: (state, action: PayloadAction<Invoice>) => {
      let invoice: Invoice = action.payload;
      state.invoices.push({ ...invoice, id: localStorage.getItem("id")! });
    },

    updateInvoiceItems: (state, action: PayloadAction<item>) => {
      const { id, item }: item = action.payload;
      let invoice = state.invoices.find(
        (invoice: { id: string | number }) => invoice.id == id
      );
      invoice!.itemList.push(item);
      invoice!.TOTAL += item.amount;
      console.log(invoice?.TOTAL)
    },

    deleteInvoiceItems: (state, action: PayloadAction<itemToDelete>) => {
      const { invoiceId, itemID }: itemToDelete = action.payload;
      let invoiceItemList: Item[] = state.invoices.find(
        (invoice) => invoice.id == invoiceId
      )!.itemList!;

      let item: any = invoiceItemList?.find(
        (data: Item) => data!.itemID == itemID
      );
      let invoiceIndex = invoiceItemList!.indexOf(item);
      invoiceItemList!.splice(Number(invoiceIndex), 1);
      let invoiceItem = state.invoices.find(
        (invoice) => invoice.id == invoiceId
      );
      invoiceItem!.TOTAL -= item.amount;
    },
  },
});

export default invoiceSlice.reducer;
export const {
  createInvoice,
  deleteInvoiceItems,
  updateInvoiceItems,
  updateInvoiceInformation,
} = invoiceSlice.actions;
