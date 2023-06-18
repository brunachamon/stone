import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";
import {
  handleFetchProducts,
  selectHasProductsError,
  selectIsProductsLoading,
  selectProducts,
} from "../slices/product";
import RouteNames from "../routes/RouteNames";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsProductsLoading);
  const hasError = useSelector(selectHasProductsError);

  const handleNewProduct = () => {
    navigate(RouteNames.NEW_PRODUCT);
  };

  useEffect(() => {
    dispatch(handleFetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (hasError) {
    return (
      <div>
        Erro:
        {hasError}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="submit"
          className=" text-white bg-sky-500/75 hover:bg-sky-500/50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleNewProduct}
        >
          Novo produto
        </button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
