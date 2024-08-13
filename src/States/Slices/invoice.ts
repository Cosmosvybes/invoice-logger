import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import useModalController from "../../Components/UI/Tools/InvoiceModal/controller";
import {
  deletingItemId,
  Invoice,
  Invoices,
  Item,
  item,
  itemToDelete,
  keyValue,
  taxAndDiscount,
} from "./invoice.types";

const { combinedForm } = useModalController();

let invoiceStaticValue = combinedForm.reduce(
  (valuesBucket: any, currVa: any) => ({
    ...valuesBucket,
    [currVa.name]: currVa.value,
  }),
  { id: Date.now() }
);

export interface invoiceTotalUpdate {
  invoiceID: number;
  value: number;
}
const initialState: Invoices = {
  draft: [],
  sent: [],
  overdue: [],
  paid: [],
  revenue: 0,
  staticForm: invoiceStaticValue,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    deleteInvoice: (state, action: PayloadAction<deletingItemId>) => {
      const { id }: deletingItemId = action.payload;
      const invoice = state.draft.find((inv) => inv.id == id);
      state.draft.splice(state.draft.indexOf(invoice!), 1);
    },

    updateInvoiceInformation: (state, action: PayloadAction<keyValue>) => {
      const { key, value, invoiceID } = action.payload;
      let invoice: string | number | boolean | any = state.draft.find(
        (invoice) => invoice.id == invoiceID
      );
      invoice[key] = value;
      invoice!.updatedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        dayPeriod: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    createInvoice: (state, action: PayloadAction<Invoice>) => {
      let invoice: Invoice = action.payload;
      invoice.createdAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        dayPeriod: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      state.draft.push({
        ...invoice,
        id: localStorage.getItem("id")!,
        status: "Draft",
      });
    },

    updateInvoiceItems: (state, action: PayloadAction<item>) => {
      const { id, item }: item = action.payload;
      let invoice = state.draft.find(
        (invoice: { id: string | number }) => invoice.id == id
      );
      invoice!.itemList.push(item);
      invoice!.TOTAL += Number(item.amount);
      invoice!.updatedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        dayPeriod: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    deleteInvoiceItems: (state, action: PayloadAction<itemToDelete>) => {
      const { invoiceId, itemID }: itemToDelete = action.payload;
      let invoiceItemList: Item[] = state.draft.find(
        (invoice) => invoice.id == invoiceId
      )!.itemList!;

      let item: any = invoiceItemList?.find(
        (data: Item) => data!.itemID == itemID
      );
      let invoiceIndex = invoiceItemList!.indexOf(item);
      invoiceItemList!.splice(Number(invoiceIndex), 1);
      let invoiceItem = state.draft.find((invoice) => invoice.id == invoiceId);
      let invoice: Invoice = state.draft.find(
        (invoice) => invoice.id == invoiceId
      )!;
      invoice!.updatedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        dayPeriod: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      invoiceItem!.TOTAL -= item.amount;
    },

    updateInvoiceTotal: (state, action: PayloadAction<invoiceTotalUpdate>) => {
      const { invoiceID, value }: invoiceTotalUpdate = action.payload;
      let invoice = state.draft.find((inv: Invoice) => inv.id == invoiceID);
      invoice!.TOTAL = value;
    },

    updateDiscount: (state, action: PayloadAction<taxAndDiscount>) => {
      const { invoiceId, value }: taxAndDiscount = action.payload;
      let invoice = state.draft.find((inv: Invoice) => inv.id == invoiceId);
      let subtotal = invoice!.itemList.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      invoice!.Discount = value;
      invoice!.TOTAL =
        subtotal - (invoice!.Discount / 100) * subtotal + invoice!.VAT;

      invoice!.updatedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        dayPeriod: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    updateVAT: (state, action: PayloadAction<taxAndDiscount>) => {
      const { invoiceId, value }: taxAndDiscount = action.payload;
      let invoice = state.draft.find((inv: Invoice) => inv.id == invoiceId);
      let subtotal = invoice!.itemList.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      invoice!.VAT = value;
      invoice!.TOTAL =
        subtotal - (invoice!.Discount / 100) * subtotal + invoice!.VAT;

      invoice!.updatedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        dayPeriod: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
});

export default invoiceSlice.reducer;
export const {
  createInvoice,
  deleteInvoiceItems,
  updateInvoiceItems,
  updateInvoiceInformation,
  deleteInvoice,
  updateDiscount,
  updateInvoiceTotal,
  updateVAT,
} = invoiceSlice.actions;
