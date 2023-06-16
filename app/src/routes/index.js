import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import RouteNames from "./RouteNames";

const ProductList = lazy(() => import("../pages/ProductList"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const UserRegister = lazy(() => import("../pages/UserRegister"));
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const ProductRegister = lazy(() => import("../pages/ProductRegister"));

const Router = () => (
  <Suspense fallback={<>Carregando...</>}>
    <Routes>
      <Route path={RouteNames.ROOT} element={<Home />} />

      <Route path={RouteNames.PRODUCTS} element={<ProductList />} />

      <Route path={`${RouteNames.PRODUCTS}/:id`} element={<ProductDetails />} />

      <Route path={RouteNames.REGISTER} element={<UserRegister />} />

      <Route path={RouteNames.LOGIN} element={<Login />} />

      <Route path={RouteNames.NEW_PRODUCT} element={<ProductRegister />} />
    </Routes>
  </Suspense>
);

export default Router;
