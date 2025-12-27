export interface itemToDelete {
  invoiceId: number;
  itemID: number | string;
  token: string | undefined;
}

export interface keyValue {
  key: string | number | boolean | any;
  value: string | number | boolean;
  invoiceID: number | string | any;
  token: string | undefined;
}

export interface deletingItemId {
  id: number | string;
  token: string | undefined;
}

export interface Item {
  description: string | any;
  unitPrice: number | any;
  unitTotal: string | any;
  quantity: string | any;
  itemID: number | any;
  [key: string]: string | number;
}

export interface taxAndDiscount {
  value: number;
  invoiceId: string | number;
  token: string | undefined;
}

export interface Invoice {
  TOTAL: number;
  id: string | number;
  Business: string;
  BusinessAddress: string;
  Client: string;
  ClientAddress: string;
  DateDue: string;
  DateIssued: string;
  IssuedBy: string;
  itemList: Item[];
  VAT: number;
  Discount: number;
  Notes: string;
  updatedAt: string;
  createdAt: string;
  status: string;
  currency: string;
  paymentLink?: string; // Added for email
  token: string | undefined;
  [key: string]: string | any;
}

export interface item {
  id: string | number;
  item: Item;
  token: string | undefined;
}
export interface ACCOUNT {
  accountCurrency:string,
  email: string; // Dynamic user email
  currentData: Invoice[];
  draft: Invoice[];
  sent: Invoice[];
  overdue: Invoice[];
  paid: Invoice[];
  revenue: number;
  staticForm: object | any;
  loading: boolean;
  clients: any[];
  inbox: Invoice[];
  recurring: Invoice[]; // Added for recurring management
  currentInvoice: any;
  tokens: 0;
  subscriptionStatus: 'free' | 'pro';
  settings: {
    tokenBalanceNotification: boolean;
    invoiceSentNotication: boolean;
    defaultCurrency: string;
    applyTax: boolean;
    defaultPaymentTerms: boolean;
    revenueNotification: boolean;
    sharingToken: boolean;
    autoRenewal: boolean;
    businessName: string;
    businessAddress: string;
    [key: string]: boolean | string;
  };
  payout: {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_code: string;
  };
}
export interface productKeyValue {
  id: number;
  key: string;
  value: string | number;
  index: number;
  token: string | undefined;
}

export interface ICURRENCY {
  id: number;
  currency: string;
  token: string | undefined;
}
