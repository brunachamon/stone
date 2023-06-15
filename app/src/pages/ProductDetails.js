import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { selectProducts } from "../slices/product";
import ProductForm from "./ProductForm";

const ProductDetails = () => {
  const params = useParams();

  const { id: productId } = params;

  const products = useSelector(selectProducts);

  console.log("products", typeof productId, typeof products[0]._id);

  const product = useMemo(
    () => products.find((prd) => prd._id === +productId),
    [productId]
  );

  console.log("product >>>>>>>>>>>>", product);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {/* <h1>{product.name}</h1>
      <p>Descrição: {product.description}</p>
      <p>Preço: {product.price}</p>
      <p>Categoria: {product.category}</p>
      <img src={product.image} alt={product.name} /> */}

      <ProductForm isEditting product={product} />
    </div>
  );
};

export default ProductDetails;
