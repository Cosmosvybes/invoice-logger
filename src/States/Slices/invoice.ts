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
const initialState: Invoices = {
  invoices: [],
  sent: [],
  revenue: 0,
  staticForm: invoiceStaticValue,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    deleteInvoice: (state, action: PayloadAction<deletingItemId>) => {
      const { id }: deletingItemId = action.payload;
      const invoice = state.invoices.find((inv) => inv.id == id);
      state.invoices.splice(state.invoices.indexOf(invoice!), 1);
    },

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

    updateDiscountAndTaxRate: (
      state,
      action: PayloadAction<taxAndDiscount>
    ) => {
      const { invoiceId, key, value }: taxAndDiscount = action.payload;

      let invoice: Invoice | any = state.invoices.find(
        (inv) => inv.id == String(invoiceId)
      );
      if (Number(value) === 0 || String(value) === "") {
        let allItemsAmount: any = invoice.itemList.reduce(
          (acc: any, curr: any) => acc + curr.amount,
          0
        );
        invoice["TOTAL"] = allItemsAmount;
        return;
      }

      invoice[key] = Number(value).toFixed(2);
      let updatedTotal =
        invoice["TOTAL"] - (Number(invoice[key]) / 100) * invoice["TOTAL"];
      invoice["TOTAL"] = updatedTotal;
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
  updateDiscountAndTaxRate,
} = invoiceSlice.actions;
