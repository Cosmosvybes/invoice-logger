export interface userToken {
  token: string | undefined;
}
export interface initialStateI {
  userToken: string | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  account: object | any;
}
