import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../services/axios";

export const handleFetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const { data = [] } = await api.get("/products");

    return data;
  },
);

export const handleNewProduct = createAsyncThunk(
  "products/register",
  async (data) => await api.post("/products", data),
);

export const handleEditProduct = createAsyncThunk(
  "products/edit",
  async (data) => {
    const { data: results = [] } = await api.put(`/products/${data._id}`, data);

    return results;
  },
);

export const handleSearchProductById = createAsyncThunk(
  "products/search",
  async (id) => {
    const { data: results = [] } = await api.get(`/products/${id}`);

    return results;
  },
);

export const handleRemoveProduct = createAsyncThunk(
  "products/remove",
  async (id) => await api.delete(`/products/${id}`),
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    isLoading: false,
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(handleFetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(handleFetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.products.list;
export const selectIsProductsLoading = (state) => state.products.loading;
export const selectHasProductsError = (state) => state.products.error;

export default productSlice.reducer;
