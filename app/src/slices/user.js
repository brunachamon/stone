import { createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "../services/user";

const initialState = {
  token: "",
  isLogged: false,
  hasError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStore() {
      // Essa funcao deve ficar vazia para limpar o estado
      // A verdadeira remoção do persist acontece com a configuração dentro do rootReducer, que é chamada por essa funcao
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.hasError = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isLogged = true;
        state.token = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLogged = false;
        state.token = null;
        state.hasError = action.error.message;
      });
  },
});

export const selectIsLogged = (state) => state.user.isLogged;
export const selectToken = (state) => state.user.token;

export const { clearStore } = userSlice.actions;

export default userSlice.reducer;
