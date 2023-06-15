import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "./axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data = [] } = await api.get("/products");

    return data;
  }
);
