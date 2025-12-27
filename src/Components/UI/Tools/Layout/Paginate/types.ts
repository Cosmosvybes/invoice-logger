export interface IPaginate {
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}
