import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import useModalController from "../../Components/UI/Tools/InvoiceModal/controller";

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
import { API_URL } from "../../Components/constants/Index";

import { combinedForm } from "../../Components/UI/Tools/InvoiceModal/controller";

// const { combinedForm } = useModalController();

const invoiceStaticValue = combinedForm.reduce(
  (valuesBucket: any, currVa: any) => ({
    ...valuesBucket,
    [currVa.name]: currVa.value,
  }),
  { id: Date.now(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
);

export interface invoiceTotalUpdate {
  invoiceID: number;
  value: number;
  token: string;
}

export interface settingsI {
  value: boolean | string;
  key: string;
  [key: string]: string | boolean;
}

export const getUser = createAsyncThunk(
  "user/getUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            return rejectWithValue("AUTH_ERROR");
        }
        return rejectWithValue("Failed to fetch user data");
      }
      const user = await response.json();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Session expired");
    }
  }
);
export const getInvoice = createAsyncThunk(
  "user/getInvoice",
  async (id: any) => {
    try {
      const response = await fetch(
        `${API_URL}/api/invoice?id=${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          method: "GET",
        }
      );
      if (response.status != 200) {
        return location.replace("/");
      }
      const invoice = await response.json();

      return invoice;
    } catch (error: any) {
      toast.error("session expired", { theme: "colored" });
      return location.replace("/");
    }
  }
);

export const createNewInvoice = createAsyncThunk(
  "user/createNewInvoice",
  async (_, { getState }) => {
    const state = (getState() as any).invoice;
    const token = localStorage.getItem("token");
    const newId = Date.now();
    
    const newInvoice = {
      ...state.staticForm,
      itemList: [],
      id: newId,
      TOTAL: 0,
      VAT: 0,
      Discount: 0,
      currency: state.settings?.defaultCurrency || "USD",
      status: "Draft",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_URL}/api/new/invoice`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      });

      if (response.status === 403 || response.status === 401) {
        return location.replace("/");
      }

      localStorage.setItem("id", String(newId));
      return newInvoice;
    } catch (error) {
       console.error("Failed to create invoice", error);
       throw error;
    }
  }
);

const defaultSettings = {
    tokenBalanceNotification: true,
    invoiceSentNotication: true,
    defaultCurrency: "USD",
    applyTax: false,
    defaultPaymentTerms: false,
    revenueNotification: true,
    sharingToken: false,
    autoRenewal: false,
    businessName: "",
    businessAddress: "",
};

const initialState: ACCOUNT = {
  currentData: [],
  draft: [],
  sent: [],
  overdue: [],
  paid: [],
  revenue: 0,
  tokens: 0,
  subscriptionStatus: "free",
  clients: [],
  inbox: [],
  recurring: [],
  accountCurrency: "",
  email: "", // Initialize email
  staticForm: invoiceStaticValue,
  loading: false,
  currentInvoice: {},
  settings: { ...defaultSettings },
  payout: {
      bank_name: "",
      account_number: "",
      account_name: "",
      bank_code: ""
  }
};

// export const mySlice = createSlice({
//   name: "mySlice",
//   initialState,
//   reducers
// });

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setCurrrentInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.currentData = action.payload;
      // console.log(action.payload, state.currentData);
    },

    markAsPaid: (
      state,
      action: PayloadAction<{ invoiceID: string | number }>
    ) => {
      const { invoiceID } = action.payload;
      const invoice = state.sent.find((invoice) => invoice.id == invoiceID);
      const invoice_ = state.sent.find((inv) => inv.id == invoiceID);
      const index = state.sent.indexOf(invoice_!);
      state.paid.push(invoice!);
      state.sent.splice(index, 1);
    },
    removeDraft: (
      state,
      action: PayloadAction<{ invoiceID: string | number }>
    ) => {
      const { invoiceID } = action.payload;
      const invoice_ = state.draft.find((inv) => inv.id == invoiceID);
      const index = state.draft.indexOf(invoice_!);
      state.draft.splice(index, 1);
    },

    updateSettings: (state, action: PayloadAction<settingsI>) => {
      const { value, key }: settingsI = action.payload;
      if (!state.settings) {
        state.settings = { ...defaultSettings };
      }
      // Use Immer's draft to update safely
      state.settings[key] = value;
    },
    updatePayout: (state, action: PayloadAction<ACCOUNT['payout']>) => {
      state.payout = action.payload;
    },

    changeCurrency: (state, action: PayloadAction<ICURRENCY>) => {
      const { id, currency, token }: ICURRENCY = action.payload;
      const invoice = state.draft.find((invoice) => invoice.id == id);
      invoice!.currency = currency;

      fetch(`${API_URL}/api/invoice/updates`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          return result.json();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteInvoice: (state, action: PayloadAction<deletingItemId>) => {
      const { id, token }: deletingItemId = action.payload;
      const invoice = state.draft.find((inv) => inv.id == id);
      state.draft.splice(state.draft.indexOf(invoice!), 1);

      fetch(
        `${API_URL}/api/invoice/delete/?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoice),
        }
      )
        .then((result) => {
          return result.json();
        })
        .catch((err) => {
          console.log(err);
        });
    },


    deleteRecurring: (state, action: PayloadAction<deletingItemId>) => {
      const { id, token }: deletingItemId = action.payload;
      const invoice = state.recurring.find((inv) => inv.id == id);
      if (invoice) {
        state.recurring.splice(state.recurring.indexOf(invoice), 1);
        // If the current tab is recurring, update currentData as well
        state.currentData = state.recurring;
      }

      fetch(
        `${API_URL}/api/invoice/recurring?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) toast.success("Recurring profile stopped.");
      })
      .catch((err) => console.error("Failed to delete recurring", err));
    },

    deleteClient: (state, action: PayloadAction<{ email: string; token: string }>) => {
      const { email, token } = action.payload;
      const client = state.clients.find((c) => c.email === email);
      if (client) {
        state.clients.splice(state.clients.indexOf(client), 1);
      }

      fetch(`${API_URL}/api/client/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      .then((res) => {
        if (res.ok) toast.success("Client removed successfully");
        else toast.error("Failed to remove client");
      })
      .catch((err) => {
        console.error("Failed to delete client", err);
        toast.error("Operation failed");
      });
    },

    updateInvoiceInformation: (state, action: PayloadAction<keyValue>) => {
      const { key, value, invoiceID, token } = action.payload;
      const invoice: string | number | boolean | any = state.draft.find(
        (invoice) => invoice.id == invoiceID
      );
      invoice[key] = value;
      invoice!.updatedAt = new Date().toISOString();

      fetch(`${API_URL}/api/invoice/updates`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
      const invoice: Invoice = action.payload;
      state.draft.push({
        ...invoice,
      });
    },

    addItem: (state, action: PayloadAction<productKeyValue>) => {
      const { key, value, index, id, token }: productKeyValue = action.payload;
      const invoice = state.draft.find((invoice) => invoice.id == id);

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
      fetch(`${API_URL}/api/invoice/updates`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
      const invoice = state.draft.find(
        (invoice: { id: string | number }) => invoice.id == id
      );
      invoice!.itemList.push(item);
      invoice!.TOTAL += Number(item.unitTotal);
      invoice!.updatedAt = new Date().toISOString();
    },

    deleteInvoiceItems: (state, action: PayloadAction<itemToDelete>) => {
      const { invoiceId, itemID, token }: itemToDelete = action.payload;
      const invoiceItemList: Item[] = state.draft.find(
        (invoice) => invoice.id == invoiceId
      )!.itemList!;
      const item: any = invoiceItemList?.find(
        (data: Item) => data!.itemID == itemID
      );
      const invoiceIndex = invoiceItemList!.indexOf(item);
      invoiceItemList!.splice(Number(invoiceIndex), 1);
      //
      const invoiceItem = state.draft.find((invoice) => invoice.id == invoiceId);
      const invoice: Invoice = state.draft.find(
        (invoice) => invoice.id == invoiceId
      )!;
      invoice!.updatedAt = new Date().toISOString();
      invoiceItem!.TOTAL -= item.unitTotal;
      fetch(`${API_URL}/api/invoice/updates`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
      const invoice = state.draft.find((inv: Invoice) => inv.id == invoiceID);
      fetch(`${API_URL}/api/invoice/updates`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
      invoice!.updatedAt = new Date().toISOString();
    },

    updateDiscount: (state, action: PayloadAction<taxAndDiscount>) => {
      const { invoiceId, value, token }: taxAndDiscount = action.payload;
      const invoice = state.draft.find((inv: Invoice) => inv.id == invoiceId);
      const subtotal = invoice!.itemList.reduce(
        (acc, curr) => acc + curr.unitTotal,
        0
      );
      invoice!.Discount = value;
      invoice!.TOTAL =
        subtotal - (invoice!.Discount / 100) * subtotal + invoice!.VAT;

      invoice!.updatedAt = new Date().toISOString();
      fetch(`${API_URL}/api/invoice/updates`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      })
        .then((result) => {
          return result.json();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateVAT: (state, action: PayloadAction<taxAndDiscount>) => {
      const { invoiceId, value, token }: taxAndDiscount = action.payload;
      const invoice = state.draft.find((inv: Invoice) => inv.id == invoiceId);
      const subtotal = invoice!.itemList.reduce(
        (acc, curr) => acc + curr.unitTotal,
        0
      );
      invoice!.VAT = value;
      invoice!.TOTAL = subtotal + (invoice!.VAT / 100) * subtotal;

      invoice!.updatedAt = new Date().toISOString();

      fetch(`${API_URL}/api/invoice/updates`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
    builder.addCase(createNewInvoice.fulfilled, (state, action) => {
        state.draft.push(action.payload as Invoice);
        state.loading = false;
    });
    builder.addCase(createNewInvoice.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(createNewInvoice.rejected, (state) => {
        state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (!payload) return;

      const { draft, sent, revenue, clients, settings, inbox, paid, token, email, recurring, payout } =
        payload;
      state.draft = draft || [];
      state.sent = sent || [];
      state.revenue = revenue || 0;
      state.clients = clients || [];
      state.settings = settings || defaultSettings;
      state.payout = payout || { bank_name: "", account_number: "", account_name: "", bank_code: "" };
      state.email = email || "";
      state.inbox = inbox || [];
      state.paid = paid || [];
      state.tokens = token || 0;
      state.recurring = recurring || [];
      state.currentData = state.draft;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });

    // Handle getInvoice
    builder.addCase(getInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.currentInvoice = action.payload;
    });
    builder.addCase(getInvoice.rejected, (state) => {
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
  updateSettings,
  updatePayout,
  removeDraft,
  markAsPaid,
  deleteRecurring,
  deleteClient,
  setCurrrentInvoices,
} = invoiceSlice.actions;
