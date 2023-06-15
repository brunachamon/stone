import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "./axios";

export const handleLogin = createAsyncThunk("user/login", async (userData) => {
  const { token } = await api.get("/login", userData);

  return token;
});

export const handleNewUser = createAsyncThunk(
  "user/register",
  async (userData) => await api.post("/user", userData)
);
