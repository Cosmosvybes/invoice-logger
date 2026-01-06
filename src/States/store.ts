import { configureStore } from "@reduxjs/toolkit";

import invoice from "./Slices/invoice";
import clientSlice from "./Slices/ClientSlice/clientSlice";
import userSlice from "./Slices/ClientSlice/useAuth/user";
import admin from "./Slices/admin";
export const store = configureStore({
  reducer: {
    clientSlice,
    userSlice,
    invoice,
    admin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
