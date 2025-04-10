import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialStateI } from "./types";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.status != 200) {
      return location.replace("/");
    }
    const user = await response.json();
    return user;
  } catch (error: any) {
    toast.error("session expired", { theme: "colored" });
    return location.replace("/");
  }
});

const initialState: initialStateI = {
  userToken: "",
  isAuthenticated: false,
  loading: false,
  account: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    switchAuth: (state) => {
      state.isAuthenticated = false;
    },
    setIsAuthenticated: (state) => {
      // const { token }: userToken = action.payload;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.userToken = undefined;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.account = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setIsAuthenticated, logOut } = userSlice.actions;
