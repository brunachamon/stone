const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");

const userCreate = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { body: { name, email, password } = {} } = req;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ message: "Já existe um usuário usando o email fornecido." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "6h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send("Ocorreu um erro não esperado. Visite os logs para mais detalhes.");
  }
};

module.exports = {
  userCreate,
};
