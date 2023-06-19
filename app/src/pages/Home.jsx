import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const fetchSuggestedProducts = () => null;

    fetchSuggestedProducts();
  }, []);

  return (
    <>
      Com base nos seus produtos visualizados, separamos algumas sugestões que
      você talvez possa gostar:{" "}
    </>
  );
}

export default Home;
