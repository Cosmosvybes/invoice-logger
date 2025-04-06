import { Invoice } from "../../../../../States/Slices/invoice.types";

export interface IPaginate {
  paginateHandler: (arg: number) => void;
  invoices: Invoice[] | any[];
  postsPerPage: number;
}
