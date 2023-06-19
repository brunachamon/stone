const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");

const RouteNames = require("./routes/RoutesNames");
const { HTTP_STATUS_CODES } = require("./utils/httpStatusCodes");

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

// Middleware para validar token do usuário
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Token é obrigatório." });
  }

  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: "Token inválido." });
    }

    req.user = decoded.user;
    next();
  });
};

// Rotas de produtos
app.use(RouteNames.PRODUCTS, authenticateUser, productRoutes);

// Rotas de usuário
app.use(RouteNames.USER, userRoutes);

// Rota de login
app.use(RouteNames.LOGIN, loginRoutes);

app.listen(PORT, () => {
  console.log(`Server alive in ${PORT}`);
});

module.exports = app;