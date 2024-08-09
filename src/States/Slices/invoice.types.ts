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