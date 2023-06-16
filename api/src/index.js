const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");

const RouteNames = require("./routes/RoutesNames");

const app = express();
const PORT = 4000;

require("dotenv").config();

console.log(">>>", process.env.mongoURI);

app.use(bodyParser.json());

// Conexao com o MongoDB
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.log("Erro ao conectar ao banco de dados:", err));

// Rotas de produtos
app.use(RouteNames.PRODUCTS, productRoutes);

// Rotas de usuário
app.use(RouteNames.USER, userRoutes);

// Rota de login
app.use(RouteNames.LOGIN, loginRoutes);

app.listen(PORT, () => {
  console.log(`Server alive in ${PORT}`);
});
