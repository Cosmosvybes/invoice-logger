import { configureStore } from "@reduxjs/toolkit";

import invoice from "./Slices/invoice";
import clientSlice from "./Slices/ClientSlice/clientSlice";
import userSlice from "./Slices/ClientSlice/useAuth/user";
import walletSlice from "./Slices/wallet";
import marketplaceSlice from "./Slices/marketplace";
import escrowSlice from "./Slices/escrow";
import disputeSlice from "./Slices/disputes";
import dealProof from "./Slices/dealProof";
import admin from "./Slices/admin";
export const store = configureStore({
  reducer: {
    clientSlice,
    userSlice,
    invoice,
    walletSlice,
    marketplaceSlice,
    escrowSlice,
    disputeSlice,
    dealProof,
    admin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
