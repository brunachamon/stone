import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/product-card";
import { fetchProducts } from "../services/product";
import {
  selectHasProductsError,
  selectIsProductsLoading,
  selectProducts,
} from "../slices/product";

const ProductList = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsProductsLoading);
  const hasError = useSelector(selectHasProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (hasError) {
    return <div>Erro: {hasError}</div>;
  }

  return (
    <div>
      <h1>Lista de produtos</h1>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>
              <ProductCard {...product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
