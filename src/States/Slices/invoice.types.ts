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
  AdditionalInfo: string;
  Business: string;
  BusinessAddress: string;
  BusinessState: string;
  BusinessCountry: string;
  City: string;
  State: string;
  Client: string;
  ClientAddress: string;
  ClientCity: string;
  Country: string;
  clientState: string;
  DateDue: string;
  DateIssued: string;
  IssuedBy: string;
  itemList: Item[];
  VAT: number;
  Discount: number;
  Notes: string;
  paymentInformation: string;
  shippingAddress: string;
  updatedAt: string;
  createdAt: string;
  status: string;
  currency: string;
  token: string | undefined;
  [key: string]: string | any;
}

export interface item {
  id: string | number;
  item: Item;
  token: string | undefined;
}
export interface ACCOUNT {
  draft: Invoice[];
  sent: Invoice[];
  overdue: Invoice[];
  paid: Invoice[];
  revenue: number;
  staticForm: object | any;
  loading: boolean;
  isLoggedIn: boolean;
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
