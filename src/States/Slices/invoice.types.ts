export interface itemToDelete {
  invoiceId: number;
  itemID: number | string;
}

export interface keyValue {
  key: string | number | boolean | any;
  value: string | number | boolean;
  invoiceID: number | string | any;
}

export interface deletingItemId {
  id: number | string;
}

export interface Item {
  description: string;
  amount: number;
  unit_price: string;
  quantity: string | number;
  itemID: number | string;
}

export interface taxAndDiscount {
  value: number;
  invoiceId: string | number;
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
}

export interface item {
  id: string | number;
  item: Item;
}
export interface Invoices {
  invoices: Invoice[];
  sent: [];
  revenue: number;
  staticForm: object | any;
}
