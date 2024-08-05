import type { AppDispatch, RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";

//optimal hooks for state calling across the app.
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
