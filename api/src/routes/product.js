const express = require("express");
const router = express.Router();

const {
  listProducts,
  searchProduct,
  newProduct,
  editProduct,
  removeProduct,
} = require("../controllers/product");

router.get("/", listProducts);
router.get("/:id", searchProduct);
router.post("/", newProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

module.exports = router;

// // Rota para obter todos os produtos
// app.get("/products", (_, res) => listProducts(res));

// // Rota para buscar um produto em especifico
// app.get("/products/:id", (req, res) => searchProduct(req, res));

// // Rota para cadastrar um novo produto
// app.post("/products", (_, res) => newProduct(res));

// // Rota para editar um produto em especifico
// app.put("/products/:id", (req, res) => editProduct(req, res));

// // Rota para remover um produto em especifico
// app.delete("/products/:id", (req, res) => removeProduct(req, res));
