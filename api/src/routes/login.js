const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { userLogin } = require("../controllers/login");

// Middleware para autenticação do usuário
function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Token não fornecido." });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: "Token inválido." });
    }

    req.user = decoded.user;
    next();
  });
}

// Rota de login de usuário
router.post("/", authenticateUser, userLogin);

module.exports = router;
