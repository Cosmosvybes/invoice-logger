import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import useModalController from "../../Components/UI/Tools/InvoiceModal/controller";

import {
  deletingItemId,
  ICURRENCY,
  Invoice,
  ACCOUNT,
  Item,
  item,
  itemToDelete,
  keyValue,
  productKeyValue,
  taxAndDiscount,
} from "./invoice.types";
import { toast } from "react-toastify";

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
  token: string;
}

export const getUser = createAsyncThunk(
  "user/getUser",
  async (token: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/user", {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      if (response.status != 200) {
        return location.replace("/");
      }
      const user = await response.json();
      return user;
    } catch (error: any) {
      toast.error("session expired", { theme: "colored" });
      return location.replace("/");
    }
  }
);

const initialState: ACCOUNT = {
  draft: [],
  sent: [],
  overdue: [],
  paid: [],
  revenue: 0,
  clients: [],
  staticForm: invoiceStaticValue,
  loading: false,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<ICURRENCY>) => {
      const { id, currency, token }: ICURRENCY = action.payload;
      let invoice = state.draft.find((invoice) => invoice.id == id);
      invoice!.currency = currency;

      fetch("http://localhost:8080/api/invoice/updates", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            return location.replace("/");
          }
        });
    },

    deleteInvoice: (state, action: PayloadAction<deletingItemId>) => {
      const { id, token }: deletingItemId = action.payload;
      const invoice = state.draft.find((inv) => inv.id == id);
      state.draft.splice(state.draft.indexOf(invoice!), 1);

      fetch(`http://localhost:8080/api/invoice/delete/?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            return location.replace("/");
          }
        });
    },

    updateInvoiceInformation: (state, action: PayloadAction<keyValue>) => {
      const { key, value, invoiceID, token } = action.payload;
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

      // console.log(invoice);
      fetch("http://localhost:8080/api/invoice/updates", {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          if (result.status != 200) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            return (location.href = "/");
          }
        });
    },

    createInvoice: (state, action: PayloadAction<Invoice>) => {
      let invoice: Invoice = action.payload;
      state.draft.push({
        ...invoice,
      });

      fetch("http://localhost:8080/api/new/invoice", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${invoice.token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ ...invoice }),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          return result.json();
        })
        .then((_) => {
          localStorage.setItem("invoiceInformation", JSON.stringify(invoice));
          toast.success("New Invoice created", { theme: "colored" });
        })
        .catch((err) => {
          if (err.response && err.status == 401) {
            return location.replace("/");
          }
        });
    },

    addItem: (state, action: PayloadAction<productKeyValue>) => {
      const { key, value, index, id, token }: productKeyValue = action.payload;
      let invoice = state.draft.find((invoice) => invoice.id == id);

      invoice!.itemList[index][key] = value;
      const total =
        Number(invoice!.itemList[index].unitPrice) *
        Number(invoice!.itemList[index].quantity);
      invoice!.itemList[index].unitTotal = total;
      const total_ = invoice!.itemList.reduce(
        (acc, curr) => acc + curr.unitTotal,
        0
      );
      invoice!.TOTAL = Number(total_);
      fetch("http://localhost:8080/api/invoice/updates", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          if (result.status == 403 || result.status == 401) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateInvoiceItems: (state, action: PayloadAction<item>) => {
      const { id, item }: item = action.payload;
      let invoice = state.draft.find(
        (invoice: { id: string | number }) => invoice.id == id
      );
      invoice!.itemList.push(item);
      invoice!.TOTAL += Number(item.unitTotal);
      invoice!.updatedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        dayPeriod: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    deleteInvoiceItems: (state, action: PayloadAction<itemToDelete>) => {
      const { invoiceId, itemID, token }: itemToDelete = action.payload;
      let invoiceItemList: Item[] = state.draft.find(
        (invoice) => invoice.id == invoiceId
      )!.itemList!;
      let item: any = invoiceItemList?.find(
        (data: Item) => data!.itemID == itemID
      );
      let invoiceIndex = invoiceItemList!.indexOf(item);
      invoiceItemList!.splice(Number(invoiceIndex), 1);
      //
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
      invoiceItem!.TOTAL -= item.unitTotal;
      fetch("http://localhost:8080/api/invoice/updates", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            return location.replace("/");
          }
          console.log(err);
        });
    },

    updateInvoiceTotal: (state, action: PayloadAction<invoiceTotalUpdate>) => {
      const { invoiceID, value, token }: invoiceTotalUpdate = action.payload;
      let invoice = state.draft.find((inv: Invoice) => inv.id == invoiceID);
      fetch("http://localhost:8080/api/invoice/updates", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            return location.replace("/");
          }
          console.log(err);
        });
      invoice!.TOTAL = value;
    },
    updateDiscount: (state, action: PayloadAction<taxAndDiscount>) => {
      const { invoiceId, value, token }: taxAndDiscount = action.payload;
      let invoice = state.draft.find((inv: Invoice) => inv.id == invoiceId);
      let subtotal = invoice!.itemList.reduce(
        (acc, curr) => acc + curr.unitTotal,
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
      fetch("http://localhost:8080/api/invoice/updates", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            return location.replace("/");
          }
        });
    },
    updateVAT: (state, action: PayloadAction<taxAndDiscount>) => {
      const { invoiceId, value, token }: taxAndDiscount = action.payload;
      let invoice = state.draft.find((inv: Invoice) => inv.id == invoiceId);
      let subtotal = invoice!.itemList.reduce(
        (acc, curr) => acc + curr.unitTotal,
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
      fetch("http://localhost:8080/api/invoice/updates", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          if (result.status == 403) {
            return location.replace("/");
          }
          return result.json();
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            return location.replace("/");
          }
        });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      const { draft, sent, revenue, clients } = action.payload;
      state.draft = draft;
      state.sent = sent;
      state.revenue = revenue;
      state.clients = clients;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

//
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
  addItem,
  changeCurrency,
} = invoiceSlice.actions;
