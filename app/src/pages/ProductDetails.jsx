import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import ProductForm from "./ProductForm";
import RouteNames from "../routes/RouteNames";
import { handleEditProduct, handleSearchProductById } from "../slices/product";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { payload = {} } = await dispatch(
        handleSearchProductById(productId)
      );

      setProduct(payload);
    };

    fetchProduct();
  }, []);

  const onSubmit = async (values) => {
    await dispatch(handleEditProduct(values));

    navigate(RouteNames.PRODUCTS);
  };

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return <ProductForm isEditting product={product} onSubmit={onSubmit} />;
}

export default ProductDetails;
