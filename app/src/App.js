import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import api from "./services/axios";
import Navbar from "./components/navbar";
import { RouteNames } from "./utils/constants";
import useProducts from "./hooks/useProducts";
import ProductCard from "./components/product-card";

function App() {
  const { products } = useProducts();
  // const [products, setProducts] = React.useState([]);

  // React.useEffect(() => {
  //   api
  //     .get("/products")
  //     .then((response) => setProducts(response.data))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path={RouteNames.ROOT} element={<Home />} />

        <Route
          path={RouteNames.PRODUCTS}
          element={<ProductList products={products} />}
        />

        <Route
          path={`${RouteNames.PRODUCTS}/:id`}
          element={<ProductDetails />}
        />

        <Route path={RouteNames.REGISTER} element={<Register />} />

        <Route path={RouteNames.LOGIN} element={<Login />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h1>Página inicial</h1>;
}

function ProductList({ products }) {
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
}

function ProductDetails() {
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const productId = window.location.pathname.split("/").pop();
    api
      .get(`/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Descrição: {product.description}</p>
      <p>Preço: {product.price}</p>
      <p>Categoria: {product.category}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    api
      .post("/register", newUser)
      .then((response) => {
        console.log(response.data);
        // redirecionar para a página de login ou exibir uma mensagem de sucesso
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const credentials = {
      email,
      password,
    };

    api
      .post("/login", credentials)
      .then((response) => {
        console.log(response.data);
        // redirecionar para a página de produtos ou armazenar o token JWT
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default App;
