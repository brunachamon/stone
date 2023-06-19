const express = require("express");
const router = express.Router();

const { listSuggestions } = require("../controllers/suggestion");

router.get("/", listSuggestions);

module.exports = router;
