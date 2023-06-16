import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { selectProducts } from "../slices/product";
import ProductForm from "./ProductForm";

const ProductDetails = () => {
  const { id: productId } = useParams();

  const products = useSelector(selectProducts);

  const product = useMemo(
    () => products.find((prd) => prd._id === +productId),
    [productId]
  );

  const onSubmit = () => {
    //TODO: call backend
  };

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return <ProductForm isEditting product={product} onSubmit={onSubmit} />;
};

export default ProductDetails;
