import { useDispatch } from "react-redux";

import ProductForm from "./ProductForm";
import { handleNewProduct } from "../services/product";

const ProductRegister = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    //TODO: call backend
    dispatch(handleNewProduct(values));
  };

  return <ProductForm onSubmit={onSubmit} />;
};

export default ProductRegister;
