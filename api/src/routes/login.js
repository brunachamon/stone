const express = require("express");
const router = express.Router();

const { userLogin } = require("../controllers/login");

router.post("/", userLogin);

module.exports = router;
