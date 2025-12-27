import { createSlice } from "@reduxjs/toolkit";
import { initialStateI } from "./types";
import { getUser } from "../../invoice"; // Import the consolidated thunk from invoice

const initialState: initialStateI = {
  userToken: localStorage.getItem("token") || "",
  isAuthenticated: !!localStorage.getItem("token"),
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
      state.isAuthenticated = true;
    },
    setUser: (state, { payload }) => {
      state.account = payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.userToken = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.isAuthenticated = true;
        state.account = action.payload;
      } else {
        state.isAuthenticated = false;
        state.userToken = "";
        localStorage.removeItem("token");
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      if (action.payload === "AUTH_ERROR") {
        state.isAuthenticated = false;
        state.userToken = "";
        localStorage.removeItem("token");
        // We'll let the UI handle the redirect to login via withAuth
      }
    });
  },
});

export { getUser }; // Re-export the thunk if needed by other components
export default userSlice.reducer;
export const { setIsAuthenticated, logOut, setUser, switchAuth } = userSlice.actions;
