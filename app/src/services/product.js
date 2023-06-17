import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "./axios";

export const handleFetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const { data = [] } = await api.get("/products");

    return data;
  }
);

export const handleNewProduct = createAsyncThunk(
  "products/register",
  async (data) => await api.post("/products", data)
);

export const handleEditProduct = createAsyncThunk(
  "products/edit",
  async (data) => {
    const { data: results = [] } = await api.put(`/products/${data._id}`, data);

    return results;
  }
);

export const handleSearchProductById = createAsyncThunk(
  "products/search",
  async (id) => {
    const { data: results = [] } = await api.get(`/products/${id}`);

    return results;
  }
);

export const handleRemoveProduct = createAsyncThunk(
  "products/remove",
  async (id) => await api.delete(`/products/${id}`)
);
