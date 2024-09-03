import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { initialStateI, userToken } from "./types";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (token: string | undefined) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status != 200) {
        return location.replace("/");
      }
      const userData = await response.json();
      return userData;
    } catch (error: any) {
        if (error.response.status == 200) {
          return location.replace("/");
        }
    }
  }
);

const initialState: initialStateI = {
  userToken: "",
  isLoggedIn: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<userToken>) => {
      const { token }: userToken = action.payload;
      state.userToken = token;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userToken = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      const { token } = action.payload;
      state.userToken = token;
    });
  },
});

export default userSlice.reducer;
export const { setIsLoggedIn } = userSlice.actions;
