import { createSlice } from "@reduxjs/toolkit";

import { fetchProducts } from "../services/product";

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [
      {
        _id: 1,
        name: "Produto 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at dapibus nibh. Sed vehicula purus a lorem lobortis ullamcorper. Proin quis elementum tortor, non luctus massa. Vestibulum mollis rutrum dui sed ullamcorper. Fusce sagittis massa ligula, in laoreet tellus faucibus non. Donec pulvinar eros pretium lectus varius bibendum.",
        price: 100,
        category: "A",
        image:
          "https://images.pexels.com/photos/7362647/pexels-photo-7362647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        _id: 2,
        name: "Produto 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at dapibus nibh. Sed vehicula purus a lorem lobortis ullamcorper. Proin quis elementum tortor, non luctus massa. Vestibulum mollis rutrum dui sed ullamcorper. Fusce sagittis massa ligula, in laoreet tellus faucibus non. Donec pulvinar eros pretium lectus varius bibendum.",
        price: 85,
        category: "A",
        image:
          "https://images.pexels.com/photos/1065030/pexels-photo-1065030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        _id: 3,
        name: "Produto 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at dapibus nibh. Sed vehicula purus a lorem lobortis ullamcorper. Proin quis elementum tortor, non luctus massa. Vestibulum mollis rutrum dui sed ullamcorper. Fusce sagittis massa ligula, in laoreet tellus faucibus non. Donec pulvinar eros pretium lectus varius bibendum.",
        price: 62,
        category: "B",
        image:
          "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
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
