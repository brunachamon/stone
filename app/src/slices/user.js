import { createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "../services/user";

const initialState = {
  user: null,
  isLogged: false,
  hasError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.hasError = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        console.log("action payload", action.payload);
        state.isLogged = true;
        state.user = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLogged = false;
        state.user = null;
        state.hasError = action.error.message;
      });
  },
});

export const { login, logout } = userSlice.actions;

export const selectIsLogged = (state) => state.user.isLogged;

export default userSlice.reducer;
