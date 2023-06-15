// import { useState } from "react";

const useProducts = () => {
  //   const [products, setProducts] = useState([]);

  //   React.useEffect(() => {
  //     api
  //       .get("/products")
  //       .then((response) => setProducts(response.data))
  //       .catch((error) => console.error(error));
  //   }, []);

  const products = [
    {
      name: "Produto 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at dapibus nibh. Sed vehicula purus a lorem lobortis ullamcorper. Proin quis elementum tortor, non luctus massa. Vestibulum mollis rutrum dui sed ullamcorper. Fusce sagittis massa ligula, in laoreet tellus faucibus non. Donec pulvinar eros pretium lectus varius bibendum.",
      price: 100,
      category: "A",
      image:
        "https://images.pexels.com/photos/7362647/pexels-photo-7362647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Produto 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at dapibus nibh. Sed vehicula purus a lorem lobortis ullamcorper. Proin quis elementum tortor, non luctus massa. Vestibulum mollis rutrum dui sed ullamcorper. Fusce sagittis massa ligula, in laoreet tellus faucibus non. Donec pulvinar eros pretium lectus varius bibendum.",
      price: 85,
      category: "A",
      image:
        "https://images.pexels.com/photos/1065030/pexels-photo-1065030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Produto 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at dapibus nibh. Sed vehicula purus a lorem lobortis ullamcorper. Proin quis elementum tortor, non luctus massa. Vestibulum mollis rutrum dui sed ullamcorper. Fusce sagittis massa ligula, in laoreet tellus faucibus non. Donec pulvinar eros pretium lectus varius bibendum.",
      price: 62,
      category: "B",
      image:
        "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return { products };
};

export default useProducts;
