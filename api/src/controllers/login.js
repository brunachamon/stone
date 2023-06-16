const bcrypt = require("bcrypt");

const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");

const userLogin = async ({ email, password }, res) => {
  try {
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
      config.jwtSecret,
      { expiresIn: "6h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

module.exports = {
  userLogin,
};
