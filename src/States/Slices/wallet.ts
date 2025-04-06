import { createSlice } from "@reduxjs/toolkit";

export interface transaction {
  date: string;
  category: string;
  amount: string;
  etherAmountPaid: string;
  addressFrom: string;
  addressTo: string;
}
export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: null,
    balance: null,
    isConnected: false,
    loading: false,
    transactionHistory: [] as transaction[],
  },
  reducers: {
    setWalletAddress: (state, action) => {
      const { address } = action.payload;
      state.address = address;
    },
    setWalletBalance: (state, action) => {
      const { balanceValue } = action.payload;
      state.balance = balanceValue;
    },
    setIsConnected: (state) => {
      state.isConnected = !state.isConnected;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setTransactionHistory: (state, action) => {
      const { transactionHistory } = action.payload;
      state.transactionHistory = transactionHistory;
    },
  },
});

export const {
  setIsConnected,
  setWalletBalance,
  setWalletAddress,
  setLoading,
  setTransactionHistory,
} = walletSlice.actions;
export default walletSlice.reducer;
