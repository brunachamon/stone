const mongoose = require("mongoose");
const Product = require("../models/Product");

const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");
const ValidationMessages = require("../utils/validationMessages");

const listProducts = async (_, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    console.error(err.message);

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

const searchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Produto não encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

const newProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    const product = await newProduct.save();

    res.json(product);
  } catch (error) {
    console.error(error);

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image } = req.body;
    const objectId = new mongoose.Types.ObjectId(id);

    const updatedProduct = await Product.findByIdAndUpdate(
      objectId,
      { name, description, price, category, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Produto não encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const removedProduct = await Product.findByIdAndRemove(id);

    if (!removedProduct) {
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Produto não encontrado" });
    }

    res.json(removedProduct);
  } catch (error) {
    console.error(error);

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

module.exports = {
  listProducts,
  searchProduct,
  newProduct,
  editProduct,
  removeProduct,
};
