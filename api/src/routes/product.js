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
