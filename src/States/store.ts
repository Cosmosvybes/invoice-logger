import { configureStore } from "@reduxjs/toolkit";
import invoice from "./Slices/invoice";

export const store = configureStore({
  reducer: { invoice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
