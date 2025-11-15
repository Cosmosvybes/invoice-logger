import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { initialStateI } from "./types";
import { toast } from "react-toastify";
import { API_URL } from "../../../../Components/constants/Index";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.status != 200) {
      if (response.status == 403) {
        return;
      }
      return;
    }
    const user = await response.json();
    return user;
  } catch (error: any) {
    toast.warn("Please sign in", { theme: "colored" });
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
    setUser: (state, { payload }) => {
      state.account = payload.user;
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

      if (action.payload == undefined || action.payload == null) {
        state.isAuthenticated = false;
        // location.assign("/");
      }
      state.isAuthenticated = true;
      state.account = action.payload;
      // console.log(action.payload);
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { setIsAuthenticated, logOut, setUser } = userSlice.actions;
