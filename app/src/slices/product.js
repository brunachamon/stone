import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../services/axios";

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

export const handleFetchSuggestedProducts = createAsyncThunk(
  "products/suggestions",
  async () => {
    const { data = [] } = await api.get("/suggestions");

    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    suggestions: [],
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
      })

      .addCase(handleFetchSuggestedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(handleFetchSuggestedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.products.list;
export const selectSuggestionsProducts = (state) => state.products.suggestions;
export const selectIsProductsLoading = (state) => state.products.loading;
export const selectHasProductsError = (state) => state.products.error;

export default productSlice.reducer;
