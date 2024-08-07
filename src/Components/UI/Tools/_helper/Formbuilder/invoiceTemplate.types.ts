export interface Item {
  description: string;
  amount: number;
  unit_price: string;
  id: number | string;
  itemID: string | number;
}
export type Data = {
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
  itemList: Item[] | any;
};
