import { configureStore } from "@reduxjs/toolkit";
import invoice from "./Slices/invoice";
import clientSlice from "./Slices/ClientSlice/clientSlice";
export const store = configureStore({
  reducer: { invoice, clientSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
