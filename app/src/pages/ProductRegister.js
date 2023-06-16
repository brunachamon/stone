import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import ProductForm from "./ProductForm";
import { handleNewProduct } from "../services/product";
import RouteNames from "../routes/RouteNames";

const ProductRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(handleNewProduct(values));

    navigate(RouteNames.PRODUCTS);
  };

  return <ProductForm onSubmit={onSubmit} />;
};

export default ProductRegister;
