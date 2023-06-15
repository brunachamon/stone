const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("./config");
const { userCreate } = require("./controllers/user");
const { HTTP_STATUS_CODES } = require("./utils/httpStatusCodes");

const { listProducts } = require("./controllers/product");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Conexao com o MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.log("Erro ao conectar ao banco de dados:", err));

// Definir o modelo do usuário
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Middleware para autenticação do usuário
function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido." });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token de autenticação inválido." });
    }

    req.user = decoded.user;
    next();
  });
}

// Rota de registro de usuário
app.post(
  "/user",
  [
    body("name").notEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("O e-mail é inválido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("A senha deverá ter no mínimo 6 caracteres"),
  ],
  async (req, res) => await userCreate(req, res)
);

// Rota de login de usuário
app.post("/login", async (req, res) => userLogin(req, res));

// Middleware para autenticação e autorização
app.use(authenticateUser);

// // Definir o modelo do produto
// const ProductSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   category: String,
//   image: String,
// });
// const Product = mongoose.model("Product", ProductSchema);

// Rota para obter todos os produtos
app.get("/products", async (_, res) => listProducts(res));

// Rota para criar um novo produto
app.post("/products", async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
});

app.listen(PORT, () => {
  console.log(`Server alive in ${PORT}`);
});
