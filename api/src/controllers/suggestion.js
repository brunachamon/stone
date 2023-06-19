const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const Suggestion = require("../models/Suggestion");
const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");
const ValidationMessages = require("../utils/validationMessages");

const saveSuggestionKeywords = async (req, res, product) => {
  const token = req.headers.authorization;

  const decodedToken = jwt.verify(token, process.env.jwtSecret);
  const userId = decodedToken.user.id;

  try {
    const keywords = await getSuggestionKeywords(product, res);

    const oldSuggestion = await Suggestion.findOne({
      user: userId,
    });

    if (oldSuggestion) {
      oldSuggestion.keywords = keywords;

      oldSuggestion.save();
    } else {
      const newSuggestion = new Suggestion({
        user: new mongoose.Types.ObjectId(userId),
        keywords,
      });

      await newSuggestion.save();
    }
  } catch (error) {
    console.error(error);

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

const getSuggestionKeywords = async ({ description }, res) => {
  try {
    const { data: { amazon: { items = [] } = {} } = {} } = await axios.post(
      process.env.EDEN_AI_EXTRACTION_TEXT_KEYWORDS_URL,
      {
        providers: "amazon",
        language: "pt",
        text: description,
      },
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${process.env.EDEN_API_KEY}`,
        },
      }
    );

    const keywords = items.map(({ keyword = [] }) => keyword);

    return keywords;
  } catch (error) {
    console.error(error);

    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ValidationMessages.INTERNAL_ERROR);
  }
};

const listSuggestions = async (req, res) => {
  console.log("TODO");
};

module.exports = { saveSuggestionKeywords, listSuggestions };
