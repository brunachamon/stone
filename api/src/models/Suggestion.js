const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema({
  keywords: [],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Suggestion = mongoose.model("Suggestions", SuggestionSchema);

module.exports = Suggestion;
