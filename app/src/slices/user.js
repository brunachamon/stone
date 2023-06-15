import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogged: false,
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
});

export const { login, logout } = userSlice.actions;

export const selectIsLogged = (state) => state.user.isLogged;

export default userSlice.reducer;
