const express = require("express");
const router = express.Router();

const { userLogin } = require("../controllers/login");

// Rota de login de usuário
router.post("/", userLogin);

module.exports = router;
