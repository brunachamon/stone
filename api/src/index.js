const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");

const RouteNames = require("./routes/RoutesNames");

const app = express();
const PORT = 4000;

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

// Conexao com o MongoDB
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection to Mongo DB is open!"))
  .catch((err) => console.log("Error trying to connect on MongoBD Atlas", err));

// Rotas de produtos
app.use(RouteNames.PRODUCTS, productRoutes);

// Rotas de usuário
app.use(RouteNames.USER, userRoutes);

// Rota de login
app.use(RouteNames.LOGIN, loginRoutes);

app.listen(PORT, () => {
  console.log(`Server alive in ${PORT}`);
});
