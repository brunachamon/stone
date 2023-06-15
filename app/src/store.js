import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import productReducer from "./slices/product";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});
