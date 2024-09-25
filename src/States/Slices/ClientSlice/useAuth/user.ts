import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { initialStateI, userToken } from "./types";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (token: string) => {
    try {
      const response = await fetch("https://ether-bill-server-1.onrender.com/api/user", {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
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
  }
);

const initialState: initialStateI = {
  userToken: "",
  isLoggedIn: false,
  loading: false,
  account: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    switchAuth: (state) => {
      state.isLoggedIn = false;
    },
    setIsLoggedIn: (state, action: PayloadAction<userToken>) => {
      const { token }: userToken = action.payload;
      state.userToken = token;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
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
      state.account = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setIsLoggedIn, logOut } = userSlice.actions;
