const { ObjectId } = require("mongodb");
const {
  listProducts,
  searchProduct,
  newProduct,
  editProduct,
  removeProduct,
} = require("./product");

const ValidationMessages = require("../utils/validationMessages");
const Product = require("../models/Product");

describe("Product Controller", () => {
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  const req = {
    params: {},
    body: {},
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listProducts", () => {
    test("should return the list of products", async () => {
      const products = [
        { name: "Product 1635036063060" },
        { name: "Product 646646446645564" },
        { name: "Product 65151561156515" },
      ];

      Product.find = jest.fn().mockResolvedValueOnce(products);

      await listProducts(req, res);

      expect(res.json).toHaveBeenCalledWith(products);
    });

    test("should handle errors and send an error response", async () => {
      const errorMessage = "Random error";
      Product.find = jest.fn().mockRejectedValue(new Error(errorMessage));

      await listProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(ValidationMessages.INTERNAL_ERROR);
    });
  });

  describe("searchProduct", () => {
    test("should return the product with the given ID", async () => {
      const productId = "2309";
      const product = {
        _id: productId,
        name: "Product 651651651651",
      };

      req.params.id = productId;

      Product.findById = jest.fn().mockResolvedValue(product);

      await searchProduct(req, res);

      //   expect(Product.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith(product);
    });

    test("should handle errors and send an error response", async () => {
      const errorMessage = "Random error";
      req.params.id = "invalid";

      Product.findById = jest.fn().mockRejectedValue(new Error(errorMessage));

      await searchProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(ValidationMessages.INTERNAL_ERROR);
    });
  });

  describe("newProduct", () => {
    test("should create a new product", async () => {
      const productData = {
        name: "Product 65161968196",
        description: "Description",
        price: 10,
        category: "B",
        image: "image.jpg",
      };

      const savedProduct = {
        _id: "2309",
        ...productData,
      };

      req.body = productData;

      Product.save = jest.fn().mockResolvedValue(savedProduct);

      await newProduct(req, res);

      //   expect(Product.save).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(savedProduct);
    });

    test("should handle errors and send an error response", async () => {
      const errorMessage = "Random error";
      req.body = {};

      Product.save = jest.fn().mockRejectedValue(new Error(errorMessage));

      await newProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(ValidationMessages.INTERNAL_ERROR);
    });
  });

  describe("editProduct", () => {
    test("should update the product with the given ID", async () => {
      const productId = "2309";
      const updatedProduct = {
        _id: productId,
        name: "Bruna's Product",
        description: "Description",
        price: 1.99,
        category: "A",
        image: "image.png",
      };

      req.params.id = productId;
      req.body = updatedProduct;

      Product.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedProduct);

      await editProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        productId,
        {
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          category: updatedProduct.category,
          image: updatedProduct.image,
        },
        { new: true }
      );

      expect(res.json).toHaveBeenCalledWith(updatedProduct);
    });

    test("should handle errors and send an error response", async () => {
      const errorMessage = "Random error";
      req.params.id = "TEste";

      Product.findByIdAndUpdate = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await editProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(ValidationMessages.INTERNAL_ERROR);
    });
  });

  describe("removeProduct", () => {
    test("should remove an existing product", async () => {
      const productId = "2309";
      const removedProduct = {
        _id: productId,
        name: "Product with discount",
      };

      req.params.id = productId;

      Product.findByIdAndRemove = jest.fn().mockResolvedValue(removedProduct);

      await removeProduct(req, res);

      expect(Product.findByIdAndRemove).toHaveBeenCalledWith(productId);
      expect(res.json).toHaveBeenCalledWith(removedProduct);
    });

    test("should handle errors and send an error response", async () => {
      const errorMessage = "Random error";
      const objectId = new ObjectId();

      req.params.id = objectId.toHexString();

      Product.findByIdAndRemove = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await removeProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(ValidationMessages.INTERNAL_ERROR);
    });
  });
});
