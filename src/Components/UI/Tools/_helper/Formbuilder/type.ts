type InputModel = {
  type_: string;
  name: string | any;
  value: string | boolean;
  placeholder?: string;
};

export type SENDER_ = {
  type: string;
  name: string;
  value: string;
  placeholder: string;
};

export interface FORM {
  reciepient: InputModel[];
  sender: SENDER_[];
  item?: object[];
}

export type ItemsType = {
  type: string;
  value: string | number;
  name: string;
  id: number;
  status?: boolean;
};

export type IProducts = {
  description: string | any;
  unitPrice: number | any;
  unitTotal: string | any;
  quantity: string | any;
  itemID: number | any;
};

export interface Reciept {
  AdditionalInfo: string;
  Amount: string;
  Business: string;
  BusinessAddress: string;
  BusinessCountry: string;
  City: string;
  Client: string;
  ClientAddress: string;
  Country: string;
  DateDue: string;
  DateIssued: string;
  Description: string;
  IssuedBy: string;
  "Save Text Doc": boolean;
}

export interface VAT_DISCOUNT {
  type: string;
  value: string | number;
  name: string;
  id: number;
  placeholder: string;
}
