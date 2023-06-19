import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";
import {
  selectSuggestionsProducts,
  selectIsProductsLoading,
  handleFetchSuggestedProducts,
} from "../slices/product";

function Home() {
  const dispatch = useDispatch();

  const products = useSelector(selectSuggestionsProducts);
  const isLoading = useSelector(selectIsProductsLoading);

  useEffect(() => {
    dispatch(handleFetchSuggestedProducts());
  }, [dispatch]);

  return (
    <>
      Com base nos seus produtos visualizados, separamos algumas sugestões que
      você talvez possa gostar:{" "}
      {isLoading ? (
        <>Carregando</>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Home;
