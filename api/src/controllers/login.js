const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");
const validationMessages = require("../utils/validationMessages");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(HTTP_STATUS_CODES.BAD_RESQUEST)
        .json({ message: "Verifique os dados do usuário." });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res
        .status(HTTP_STATUS_CODES.BAD_RESQUEST)
        .json({ message: "E-mail ou senha inválidos." });
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      process.env.jwtSecret,
      { expiresIn: "6h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(validationMessages.INTERNAL_ERROR);
  }
};

module.exports = {
  userLogin,
};
