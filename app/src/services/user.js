import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { setAuthToken } from "./axios";

export const handleLogin = createAsyncThunk("user/login", async (userData) => {
  const { data: { token } = {} } = await api.post("/login", userData);

  setAuthToken(token);

  return token;
});

export const handleNewUser = createAsyncThunk(
  "user/register",
  async (userData) => await api.post("/user", userData)
);
