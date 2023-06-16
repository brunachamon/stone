import { createSlice } from "@reduxjs/toolkit";

import { fetchProducts } from "../services/product";

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    isLoading: false,
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.products.list;
export const selectIsProductsLoading = (state) => state.products.loading;
export const selectHasProductsError = (state) => state.products.error;

export default productSlice.reducer;
