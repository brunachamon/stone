import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { selectProducts } from "../slices/product";
import ProductForm from "./ProductForm";
import { handleEditProduct } from "../services/product";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const products = useSelector(selectProducts);

  const product = useMemo(
    () => products.find((prd) => prd._id === +productId),
    [productId]
  );

  const onSubmit = (values) => {
    //TODO: call backend
    dispatch(handleEditProduct(values));
  };

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return <ProductForm isEditting product={product} onSubmit={onSubmit} />;
};

export default ProductDetails;
