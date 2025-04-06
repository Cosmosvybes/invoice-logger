import { configureStore } from "@reduxjs/toolkit";

import invoice from "./Slices/invoice";
import clientSlice from "./Slices/ClientSlice/clientSlice";
import userSlice from "./Slices/ClientSlice/useAuth/user";
import walletSlice from "./Slices/wallet";
export const store = configureStore({
  reducer: { clientSlice, userSlice, invoice, walletSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
