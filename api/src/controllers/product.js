const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");
const ValidationMessages = require("../utils/validationMessages");

const listProducts = async (res) => {
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

module.exports = {
  listProducts,
};
