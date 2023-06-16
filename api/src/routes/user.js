const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const { userCreate } = require("../controllers/user");

// Rota para criacao de usuário
// app.post("/user", async (req, res) => userCreate(req, res));
// Rota de login de usuário
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("O e-mail é inválido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("A senha deverá ter no mínimo 6 caracteres"),
  ],
  userCreate
);

module.exports = router;
