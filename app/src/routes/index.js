import { Routes, Route } from "react-router-dom";

import RouteNames from "./routenames";
import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import UserRegister from "../pages/UserRegister";
import Login from "../pages/Login";
import Home from "../pages/Home";

const Router = () => (
  <Routes>
    <Route path={RouteNames.ROOT} element={<Home />} />

    <Route path={RouteNames.PRODUCTS} element={<ProductList />} />

    <Route path={`${RouteNames.PRODUCTS}/:id`} element={<ProductDetails />} />

    <Route path={RouteNames.REGISTER} element={<UserRegister />} />

    <Route path={RouteNames.LOGIN} element={<Login />} />
  </Routes>
);

export default Router;
